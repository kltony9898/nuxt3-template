import fs from 'fs'
import path from 'path'
import type { ModuleOptions } from '@nuxtjs/i18n'
// 讀取 locales 資料夾中的 JSON 檔案
const localesDir = path.resolve(__dirname, './locales')
const localesFiles = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'))

// 自動生成 locales 配置
const locales = localesFiles.map((file) => {
  const code = file.split('.')[0] // 取檔名作為語言代碼
  return {
    code,
    iso: code,
    file: `locales/${file}`
  }
})

const i18n:ModuleOptions = {
  strategy: 'no_prefix',
  langDir: 'languages',
  defaultLocale: 'zh-TW',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root'
  },
  locales // 使用自動生成的 locales
}

const getI18nSetting = () => {
  if (localesFiles.length > 0) {
    return i18n
  }
}
// ... existing code ...

// ... existing code ...
export { getI18nSetting }
