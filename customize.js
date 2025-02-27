import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { input, confirm } from '@inquirer/prompts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectName = await input({
  message: '請輸入專案名稱（GitHub）：'
})
const flowUrl = await input({
  message: '請輸入流程圖連結：'
})
const designUrl = await input({
  message: '請輸入設計稿連結：'
})
const apiUrl = await input({
  message: '請輸入後端文件連結：'
})
const isI18nUsed = await confirm({
  message: '是否使用 i18n 套件？'
})

const READMEFile = path.join(__dirname, 'README.md')
const packageJsonFile = await fs.readFile('package.json', 'utf8')

const replaceLineInFile = async (filePath, replacements) => {
  try {
    const data = await fs.readFile(filePath, 'utf8')

    const lines = data.split('\n')

    for (let i = 0; i < lines.length; i++) {
      for (const [searchValue, replaceValue] of replacements) {
        if (lines[i].includes(searchValue)) {
          lines[i] = replaceValue
        }
      }
    }

    const updatedData = lines.join('\n')

    await fs.writeFile(filePath, updatedData, 'utf8')
  } catch (error) {
    console.error(error)
  }
}

let spreadsheetKey

// 移除package json內 i18n用指令
const removePackageJsonI18nCommand = () => {
  // 讀取 package.json
  const json = JSON.parse(packageJsonFile)
  // 刪除 i-18n
  delete json.scripts.locale
  // 將更新後的 JSON 寫回 package.json
  fs.writeFile('package.json', JSON.stringify(json, null, 2))
}

// 刪除 i18n用資料夾
const deleteLanguagesFolder = async () => {
  try {
    await fs.rm(path.join(__dirname, 'languages'), { recursive: true })
    await replaceLineInFile(READMEFile, [
      ['- [nuxtjs/i18n]', '']
    ])
    console.log('資料夾 ./languages 已成功刪除')
  } catch (error) {
    console.error('刪除資料夾時發生錯誤:', error)
  }
}

// 刪除i18n Config設定
const runNuxtConfigSetting = () => {
  return new Promise((resolve, reject) => {
    exec('node languages/nuxtConfigSetting', (error, stdout, stderr) => {
      if (error) {
        console.error(`執行錯誤: ${error.message}`)
        reject(error) // 拒絕 Promise
        return
      }
      if (stderr) {
        console.error(`錯誤輸出: ${stderr}`)
        reject(new Error(stderr)) // 拒絕 Promise
        return
      }
      console.log(`標準輸出: ${stdout}`)
      resolve(stdout) // 解決 Promise
    })
  })
}

// i18n套件初始化設定
const setI18n = async () => {
  spreadsheetKey = await input({ message: 'key in spreadsheetKey：' })
  await replaceLineInFile(READMEFile, [
    ['- [nuxtjs/i18n]', '- [nuxtjs/i18n](https://hackmd.io/2oydsUESTuKVu07PHGzFXA)']
  ])

  const json = JSON.parse(packageJsonFile)
  const key = 'i-18n'
  const script = ` && ${key}`
  json.scripts.build += script
  json.scripts.generate += script
  json.scripts['i-18n'] = 'node languages/googleSheetToJson'
  fs.writeFile('package.json', JSON.stringify(json, null, 2))
}

// - 是否使用i18n相關功能
if (isI18nUsed) {
  await setI18n()
} else {
  await runNuxtConfigSetting()
  await removePackageJsonI18nCommand()
  await deleteLanguagesFolder() // 調用刪除函數
}

await replaceLineInFile(READMEFile, [
  ['# **', `# **${projectName}**`],
  ['- 流程圖：', `- 流程圖： [${flowUrl}](${flowUrl})`],
  ['- 設計稿：', `- 設計稿： [${designUrl}](${designUrl})`],
  ['- 後端文件：', `- 後端文件： [${apiUrl}](${apiUrl})`],
])

const packageFile = path.join(__dirname, 'package.json')
await replaceLineInFile(packageFile, [
  ['"name":', `  "name": "${projectName}",`]
])

const envGHPageFile = path.join(__dirname, '.env.gh-pages')
const envFile = path.join(__dirname, '.env')

await replaceLineInFile(envGHPageFile, [
  [
    'NUXT_APP_BASE_URL=', `NUXT_APP_BASE_URL= '/${projectName}/'`
  ]
])

await replaceLineInFile(envFile, [
  [
    'NUXT_PRIVATE_GOOGLE_SHEET_KEY=', `NUXT_PRIVATE_GOOGLE_SHEET_KEY= '${spreadsheetKey}'`
  ]
])
console.log('專案客製化完成')

