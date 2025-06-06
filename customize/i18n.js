import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { confirm, input } from '@inquirer/prompts'
import { replaceLineInFile } from './utils.js'

export const useCustomizeI18n = async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const parentDir = path.dirname(__dirname)

  const packageJsonFile = await fs.readFile('package.json', 'utf8')
  const READMEFile = path.join(parentDir, 'README.md')

  const isI18nUsed = await confirm({
    message: '是否使用 i18n 套件？'
  })

  // 移除 package json 內 i18n 用指令
  const removePackageJsonI18nCommand = () => {
  // 讀取 package.json
    const json = JSON.parse(packageJsonFile)
    // 刪除 i-18n
    delete json.scripts.locale
    // 將更新後的 JSON 寫回 package.json
    fs.writeFile('package.json', JSON.stringify(json, null, 2))
  }

  // 刪除 i18n 用資料夾
  const deleteLanguagesFolder = async () => {
    try {
      await fs.rm(path.join(parentDir, 'languages'), { recursive: true })
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

  let spreadsheetKey

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
    json.devDependencies.flat = '6.0.1'
    json.devDependencies['spreadsheet-to-json'] = '2.0.0'
    fs.writeFile('package.json', JSON.stringify(json, null, 2))

    const envFile = path.join(parentDir, '.env')

    await replaceLineInFile(envFile, [
      [
        'NUXT_PRIVATE_GOOGLE_SHEET_KEY=', `NUXT_PRIVATE_GOOGLE_SHEET_KEY= '${spreadsheetKey}'`
      ]
    ])
  }

  // - 是否使用i18n相關功能
  if (isI18nUsed) {
    await setI18n()
  } else {
    await runNuxtConfigSetting()
    await removePackageJsonI18nCommand()
    await deleteLanguagesFolder() // 調用刪除函數
  }
}
