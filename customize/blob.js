import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { checkbox, confirm } from '@inquirer/prompts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const parentDir = path.dirname(__dirname)

export const useCustomizeBlob = async () => {
  const isBlobUsed = await confirm({
    message: '是否使用 Azure Blob 部署流程？'
  })

  let typeList = []

  if (isBlobUsed) {
    typeList = await checkbox({
      message: '使用何種部署環境',
      choices: [
        {
          name: '正式環境（vX.X.X）',
          value: 'production'
        },
        {
          name: '外部測試環境（vX.X.X-beta.X）',
          value: 'beta'
        }
      ]
    })
  }

  !typeList.includes('production') && fs.rm(path.join(parentDir, '.github/workflows/blob_storage_website.yml'), { force: true })
  !typeList.includes('beta') && fs.rm(path.join(parentDir, '.github/workflows/blob_storage_website_beta.yml'), { force: true })
}
