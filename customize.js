import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import os from 'os'
import { input } from '@inquirer/prompts'

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
const slackUrl = await input({
  message: '請輸入 Slack 連結：'
})
const asanaUrl = await input({
  message: '請輸入 Asana 連結：'
})

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

const READMEFile = path.join(__dirname, 'README.md')
await replaceLineInFile(READMEFile, [
  ['# **', `# **${projectName}**`],
  ['- 流程圖：', `- 流程圖： [${flowUrl}](${flowUrl})`],
  ['- 設計稿：', `- 設計稿： [${designUrl}](${designUrl})`],
  ['- 後端文件：', `- 後端文件： [${apiUrl}](${apiUrl})`],
  ['- Slack：', `- Slack： [${slackUrl}](${slackUrl})`],
  ['- Asana：', `- Asana： [${asanaUrl}](${asanaUrl})`]
])

const packageFile = path.join(__dirname, 'package.json')
await replaceLineInFile(packageFile, [
  ['"name":', `  "name": "${projectName}",`]
])

const envGHPageFile = path.join(__dirname, '.env.gh-pages')
await replaceLineInFile(envGHPageFile, [
  ['NUXT_APP_BASE_URL=', `NUXT_APP_BASE_URL= '${projectName}'`]
])

console.log('專案客製化完成')

const copySlackCommand = () => {
  const slackCommand = `/github subscribe OsenseTech/${projectName}`
  const copyCommand = os.platform() === 'win32' ? 'clip' : 'pbcopy'

  console.log(`已成功將指令（${slackCommand}）複製至剪貼簿`)
  console.log('請將指令貼上至 Slack 頻道（https://osenseworkspace.slack.com/archives/C04SVJVHXHV）')

  exec(`echo ${slackCommand} | ${copyCommand}`, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.log('指令已成功複製到剪貼簿！')
    }
  })
}

copySlackCommand()
