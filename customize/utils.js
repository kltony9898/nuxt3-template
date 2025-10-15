import { promises as fs } from 'fs'

export const createFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content, 'utf8')
    console.log(`檔案已成功創建：${filePath}`)
  } catch (error) {
    console.error(`創建檔案時發生錯誤：${error}`)
  }
}

export const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath)
    console.log(`檔案已成功刪除：${filePath}`)
  } catch (error) {
    console.error(`刪除檔案時發生錯誤：${error}`)
  }
}

export const replaceLineInFile = async (filePath, replacements) => {
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
