import path from 'path'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 指定配置文件的路徑
const configFilePath = path.join(__dirname, '../nuxt.config.ts')

// 讀取配置文件
const data = await fs.readFile(configFilePath, 'utf8')
const updatedData = data
  .replace("import { getI18nSetting } from './languages/i18nConfig'", '') // 移除 import 行
  .replace(' i18n: getI18nSetting(),\n ', '') // 移除 i18n 行

// 寫入更新後的內容到文件
fs.writeFile(configFilePath, updatedData, 'utf8', (err) => {
  if (err) {
    console.error('寫入文件時出錯:', err)
    return
  }
  console.log('配置文件已成功更新！')
})
