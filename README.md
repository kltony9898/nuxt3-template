# **Nuxt3 Template**

### 環境
- Node.js 版本 : `20.19.0` (建議版本，目前可在 20.13.1+ 運行)
- npm 版本 : `10.5.2` (或更高版本)
- 編輯器 : `VSCode`

### VSCode 套件
- [VS Code](https://code.visualstudio.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Vue 3 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)
- [i18n Ally](https://marketplace.cursorapi.com/items/?itemName=lokalise.i18n-ally)

### 啟動指令
```bash
npm install // 安裝套件
npm run customize // 客製化專案設定
npm run dev // 啟動專案
npm run dev:gh-pages // 啟動專案（GitHub Pages 模式）
npm run build // 使用 CSR 或 SSR 模式打包專案
npm run build:gh-pages // 使用 CSR 或 SSR 模式打包專案（GitHub Pages 模式）
npm run generate // 使用 SSG 模式打包專案
npm run generate:gh-pages // 使用 SSG 模式打包專案（GitHub Pages 模式）
npm run preview // 啟動打包後專案
npm run preview:gh-pages // 啟動打包後專案（GitHub Pages 模式）
npm run eslint // 檢查 ESLint 規則
npm run eslint:fix // 修正 ESLint 錯誤
npm run typelint // 檢查 TypeScript 類型規則
```

## 專案建立步驟

### GitHub 設定
- General
  - Pull Requests
    - Allow squash merging : `Default to pull request title and commit details`
- Branches
  - Branch protection rules
    - Branch name pattern : `master`
    - Require a pull request before merging
      - Require approvals : `1`
      - Require review from Code Owners : `true`
      - Dismiss stale pull request approvals when new commits are pushed : `true`
- Pages
  - Build and deployment
    - Branch : `gh-pages`

## 開發規範

### 框架
- Nuxt 3 + Composition API + `<script setup lang="ts">`
- TypeScript
- Tailwind CSS
- Nuxt CLI

### 套件
- [pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)
- [Nuxt Icon](https://github.com/nuxt/icon)

### 規範
- [ESLint Standard](https://standardjs.com/readme-zhtw.html)
- [ESLint Tailwind](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [ESLint Vue3](https://eslint.vuejs.org/rules/)
- [ESLint Nuxt3](https://github.com/nuxt/eslint-plugin-nuxt)
- [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Nuxt 3 架構參考](https://nuxt.com/docs/guide/directory-structure/app)

## GitHub 流程

### 流程
- 預設使用 `GitHub Flow` 流程
- master：主要分支（開發環境）
- tag：部署版本（正式環境）
- 多環境情境
  - 建立其他分支代表特定環境（ex. 建立 produciton 分支代表正式環境）
  - 若需進行更新
    - 使用 `git merge master --no-ff` 的方式合併 master 分支改動
- 多版本維護情境
  - 建立 `release/${主版號}.${次版號}` 分支維護單一版本
  - 若需進行更新（適用所有版本）
    - 建立分支並合併至 master
    - 使用 `git cherry-pick` 的方式從 master 分支更新改動
  - 若需進行更新（僅適用此版本）
    - 建立分支並合併至 release

### Issues
- 填寫標題、說明和標籤類型
- 指派至少一名負責人
- 建立分支
  - 右下角點擊 `Create a branch`
  - Master 分支改動 : `feature/#${issue_number}-${description}`
  - 特定 Release 分支改動 : `feature/${主版號}.${次版號}-#${issue_number}-${description}`

### Commits
- 只開發對應 Issue 的內容，不相關的內容請另開 Issue
- 複雜邏輯應適當註解
- 定期同步主分支
  - Master 分支為主分支 : `git merge master --no-ff` 
  - 特定 Release 分支為主分支 : `git merge release/${主版號}.${次版號} --no-ff` 
- 通過 `commitlint` 檢查

### Releases
- Choose a tag
  - 版本號 : `v${主版號}.${次版號}.${修訂號}-${測試環境}.${測試版號}`
    - 主版號 : 不可相容的功能新增或修改
    - 次版號 : 可相容的功能新增或修改
    - 修訂號 : 可相容的功能問題修復
    - 測試環境（選填）: alpha (內部)、beta (外部)
    - 測試版號（選填）: 內部或外部測版號
- Target
  - 選擇 `master` 或 `release`
- 填寫標題及改動說明
  - 可點擊 `Generate release notes` 自動產生



