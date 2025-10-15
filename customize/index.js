import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { input } from '@inquirer/prompts'
import { replaceLineInFile } from './utils.js'
import { useCustomizeI18n } from './i18n.js'
import { useCustomizeBlob } from './blob.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const parentDir = path.dirname(__dirname)

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
const slackUrl = await input({
  message: '請輸入 Slack 連結：'
})
const asanaUrl = await input({
  message: '請輸入 Asana 連結：'
})

await useCustomizeI18n()
await useCustomizeBlob()

const READMEFile = path.join(parentDir, 'README.md')

await replaceLineInFile(READMEFile, [
  ['# **', `# **${projectName}**`],
  ['- 流程圖：', `- 流程圖： [${flowUrl}](${flowUrl})`],
  ['- 設計稿：', `- 設計稿： [${designUrl}](${designUrl})`],
  ['- 後端文件：', `- 後端文件： [${apiUrl}](${apiUrl})`],
  ['- Slack：', `- Slack： [${slackUrl}](${slackUrl})`],
  ['- Asana：', `- Asana： [${asanaUrl}](${asanaUrl})`]
])

const packageFile = path.join(parentDir, 'package.json')
await replaceLineInFile(packageFile, [
  ['"name":', `  "name": "${projectName}",`]
])

const envGHPageFile = path.join(parentDir, '.env.gh-pages')

await replaceLineInFile(envGHPageFile, [
  [
    'NUXT_APP_BASE_URL=', `NUXT_APP_BASE_URL= '/${projectName}/'`
  ]
])

console.log('專案客製化完成')

const copySlackCommand = () => {
  const slackCommand = `/github subscribe OsenseTech/${projectName}`
  const copyCommand = os.platform() === 'win32' ? 'clip' : 'pbcopy'

  exec(`echo ${slackCommand} | ${copyCommand}`, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.log(`已成功將指令（${slackCommand}）複製至剪貼簿`)
      console.log('請將指令貼上至 Slack 頻道（https://osenseworkspace.slack.com/archives/C04SVJVHXHV）')
    }
  })
}

copySlackCommand()
