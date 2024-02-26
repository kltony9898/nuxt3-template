# Nuxt 3 模板

## 專案資訊

### 描述

這是一個使用 Nuxt3 + Typescript + Tailwind 開發的專案模板

### 資料

- 設計稿
- 架構/流程圖
- API 文件

## 專案啟動

### 環境需求

- node 版本 : `18.18.0`
- 編輯器 : `VSCode`

### 專案指令

```
yarn install // 安裝套件
yarn dev // 啟動專案
yarn dev:gh-pages // 啟動專案（GitHub Pages 模式）
yarn build // 使用 CSR 或 SSR 模式打包專案
yarn build:gh-pages // 使用 CSR 或 SSR 模式打包專案（GitHub Pages 模式）
yarn generate // 使用 SSG 模式打包專案
yarn generate:gh-pages // 使用 SSG 模式打包專案（GitHub Pages 模式）
yarn preview // 啟動打包後專案
yarn preview:gh-pages // 啟動打包後專案（GitHub Pages 模式）
yarn lint:script // 檢查 eslint 規則
```

### VSCode 套件

- [VS Code](https://code.visualstudio.com/)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Windi CSS IntelliSense](https://windicss.org/editors/vscode.html)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

## 專案建立

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

### 專案設定
- package.json
  - name : `${GitHub 專案名稱}`
- .env.gh-pages
  - NUXT_APP_BASE_URL : `${GitHub 專案名稱}`

### Slack 綁定
- 在 `#team-front-end-develop` 群組中輸入 `/github subscribe ${owner}/${repo}` 即可將進行綁定，未來群組成員可以收到 `issues`, `pulls`, `commits`, `releases`, `deployments` 相關的訊息
- 若專案結束，輸入 `/github unsubscribe ${owner}/${repo}` 即可解除綁定
- 若要綁定其他 Slack 群組，需要在該群組選項 `Integrations/Apps` 中新增 `Github`，並重複以上操作即可

## 開發習慣

### 技術框架

- Nuxt 3 + Composition API + `<script setup>`
- TypeScript
- Windi CSS + Unocss
- Nuxt CLI

### 開發套件
- [pinia](https://pinia.vuejs.org/)

### 開發規範
- [ESLint Standard](https://standardjs.com/readme-zhtw.html)
- [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Vue 風格指南](https://v2.cn.vuejs.org/v2/style-guide/)
- [Nuxt 3 架構參考](https://www.nuxtjs.org.cn/directory-structure/nuxt.html)

## 開發流程

### 版控流程
- 預設使用 `GitHub Flow` 流程
- 視情況增加 `release/${主版號}.${次版號}` 分支維護單一版本
  - 不合併回 master 分支

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

### Pull Requests
- Author
  - 標題、功能說明和標籤類型填寫正確且清楚
  - 通過 CI 檢查
  - 填寫測試清單
  - 指派至少一名 Code Review 負責人
- Reviewer
  - 確認標題、功能說明和標籤類型填寫符合對應 Issue
  - 確認目標合併分支正確
  - 進行 Code Review 確認是否符合開發規範
  - 確認通過測試清單
  - 使用 `Squash and Merge` 模式合併
  - 確認通過 CI/CD 且成功合併及部署

### Releases
- Choose a tag
  - 版本號 : `v${主版號}.${次版號}.${修訂號}`
    - 主版號 : 不可相容的功能新增或修改
    - 次版號 : 可相容的功能新增或修改
    - 修訂號 : 可相容的功能問題修復
- Target
  - 選擇 `master` 或 `release`
- 填寫標題及改動說明
  - 可點擊 `Generate release notes` 自動產生

### 特殊情境
- Hotfix : 先將 feature 分支合併回 master 分支，再用 `git cherry-pick` 從 master 分支拿到 commit