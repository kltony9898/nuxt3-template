import { checkbox } from '@inquirer/prompts'
import { createFile } from './utils.js'

const typeList = await checkbox({
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

const createProductionFlow = () => {
  const content = `
  name: Blob Storage Website CI

  on:
    push:
      tags:
        - v[0-9]+.[0-9]+.[0-9]+
    workflow_dispatch:

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '>=18'
      - name: Install dependencies
        run: yarn install
      - name: Build project
        run: yarn generate
      - uses: azure/login@v1
        with:
            creds: \${{ secrets.AZURE_CREDENTIALS }}
      
      # Delete existing content in $web container
      - name: Delete existing content in $web container
        uses: azure/CLI@v1
        with:
          inlineScript: |
            az storage blob delete-batch --account-name \${{ vars.ACCOUNT_NAME }} --auth-mode key -s '$web'
            
      - name: Upload to blob storage
        uses: azure/CLI@v1
        with:
          inlineScript: |
              az storage blob upload-batch --account-name \${{ vars.ACCOUNT_NAME }} --auth-mode key -d '$web' -s ./dist

    # Azure logout
      - name: logout
        run: |
              az logout
        if: always()
  `

  createFile('.github/workflows/blob_storage_website.yml', content)
}

typeList.includes('production') && createProductionFlow()

const createBetaFlow = () => {
  const content = `
  name: Blob Storage Website CI Beta

  on:
    push:
      tags:
        - v[0-9]+.[0-9]+.[0-9]+-beta.[0-9]+
    workflow_dispatch:

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '>=18'
      - name: Install dependencies
        run: yarn install
      - name: Build project
        run: yarn generate
      - uses: azure/login@v1
        with:
            creds: \${{ secrets.AZURE_CREDENTIALS_BETA }}
      
      # Delete existing content in $web container
      - name: Delete existing content in $web container
        uses: azure/CLI@v1
        with:
          inlineScript: |
            az storage blob delete-batch --account-name \${{ vars.ACCOUNT_NAME_BETA }} --auth-mode key -s '$web'
            
      - name: Upload to blob storage
        uses: azure/CLI@v1
        with:
          inlineScript: |
              az storage blob upload-batch --account-name \${{ vars.ACCOUNT_NAME_BETA }} --auth-mode key -d '$web' -s ./dist

    # Azure logout
      - name: logout
        run: |
              az logout
        if: always()
  `

  createFile('.github/workflows/blob_storage_website_beta.yml', content)
}

typeList.includes('beta') && createBetaFlow()
