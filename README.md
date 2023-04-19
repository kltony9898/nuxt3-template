# Nuxt 3 模板

## 專案描述

專案敘述

## 專案指令

```
yarn install // 安裝套件
yarn dev // 啟動專案
yarn dev:gh-pages // 啟動專案（GitHub Pages 模式）
yarn build // 打包 CSR 專案
yarn build:gh-pages // 打包 CSR 專案（GitHub Pages 模式）
yarn generate // 打包 SSG 專案
yarn generate:gh-pages // 打包 SSG 專案（GitHub Pages 模式）
yarn preview // 啟動打包後專案
yarn preview:gh-pages // 啟動打包後專案（GitHub Pages 模式）
yarn lint:script // 檢查 eslint 規則
```

## 專案資料

- 設計稿
- 架構/流程圖
- API 文件

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
- Tailwind CSS + Tailwind UI
- Vite

### VSCode 套件

- [VS Code](https://code.visualstudio.com/)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

### 開發套件
- [pinia](https://pinia.vuejs.org/)
- [vue-axios](https://github.com/imcvampire/vue-axios)

### 開發規範
- [ESLint Standard](https://standardjs.com/readme-zhtw.html)
- [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Vue 風格指南](https://v2.cn.vuejs.org/v2/style-guide/)
- [Nuxt 3 架構參考](https://www.nuxtjs.org.cn/directory-structure/nuxt.html)

## 開發流程

### 版控流程
- 預設使用 `GitHub Flow` 流程
- 視情況增加 `release/${主版號}.${次版號}` 分支維護單一版本
  - 不合併回 `master` 分支

### Issues
- 填寫需求或錯誤說明
- 填寫標籤
- 指派負責人
- 列出檢查清單
- 建立分支 
  - Master 分支改動 : `feature/#${issue_number}-${description}`
  - 特定 Release 分支改動 : `feature/${主版號}.${次版號}-#${issue_number}-${description}`

### Commits
- 只開發對應 Issue 的內容，不相關的內容請另開 Issue
- 複雜邏輯應適當註解
- 定期使用 `git merge master --no-ff` 同步主分支
- 提交通過 `commitlint` 檢查

### Pull Requests
- 填寫功能說明
- 指派工程師 Code Review，並通過至少一位工程師的檢查
  - 是否符合對應 Issue 的功能
  - 是否符合開發規範
  - 目標合併分支是否正確
- 通過 CI/CD 檢查
- 使用 `Squash and Merge` 模式合併 Pull Request

### Releases
- 版本號 : `v${主版號}.${次版號}.${修訂號}`
  - 主版號 : 不可相容的功能新增或修改
  - 次版號 : 可相容的功能新增或修改
  - 修訂號 : 可相容的功能問題修復
- 只能在 `master` 分支或 `release` 分支發布新版本

### 特殊情境
- Hotfix : 情境一樣將 `feature` 分支 合併回 `master` 分支，再用 `git cherry-pick` 的方式從 `master` 分支拿到 commit