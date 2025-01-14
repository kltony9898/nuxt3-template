(async () => {
  const { unflatten } = await import('flat')
  const fs = await import('fs-extra')
  const { extractSheets } = await import('spreadsheet-to-json')
  const path = await import('path')
  const env = await import('dotenv')
  env.config()

  const jsonFiles = await fs.default.readdir(
    path.dirname(
      new URL(import.meta.url).pathname
    )
  )
  const firstJsonFile = jsonFiles.find(file => file.endsWith('.json')) // 找到第一個以 .json 結尾的檔案

  const googleSheetJson = await import(`./${firstJsonFile}`, { assert: { type: 'json' } })
  const googleSheetApiKey = JSON.parse(JSON.stringify(googleSheetJson)).default

  extractSheets(
    {
      spreadsheetKey: process.env.NUXT_PRIVATE_GOOGLE_SHEET_KEY, // google sheet key
      credentials: googleSheetApiKey // google sheet private key
    },
    (err, data) => {
      if (err) { throw err }

      const result = {}
      const files = []
      const languages = []
      const allKeys = Object.values(data).flatMap(item => item)
      allKeys.forEach((item) => {
        Object.keys(item).forEach((key) => {
          // 檢察非i-18n格式不計入語言列表
          const langCodePattern = /^[a-z]{2}-[A-Z]{2}$/ // i18n 國際碼格式
          if (langCodePattern.test(key) && !languages.includes(key)) {
            languages.push(key) // 新增到 languages 陣列中
          }
        })
      })
      const read = Object.keys(data).flatMap(page =>
        data[page].map((item) => {
          // 檢查 item 中的鍵是否符合 i18n 國際碼格式
          const newItem = { key: `${page}.${item.key}` }
          languages.forEach((lang) => {
            newItem[lang] = item[lang]
          })
          return newItem
        })
      )

      for (const key in read[0]) {
        if (key !== 'key') {
          files.push(key)
          result[key] = {}
        }
      }

      read.forEach((el) => {
        files.forEach((file) => {
          result[file][el.key] = el[file] || ''
        })
      })
      files.forEach((fileName) => {
        const filePath = path.resolve('./languages/locales', `${fileName}.json`)
        const fileDir = path.dirname(filePath)
        fs.ensureDirSync(fileDir)
        fs.default.writeJSONSync(filePath, unflatten(result[fileName], { object: true }), { spaces: 2 })
      })
    }
  )
})()
