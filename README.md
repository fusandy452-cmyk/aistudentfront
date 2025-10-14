# AI 留學顧問 - 前端

這是 AI 留學顧問智能體的前端界面，提供學生和家長專用的對話界面。

## 功能特色

- 🎓 學生專用頁面 (`student.html`)
- 👨‍👩‍👧‍👦 家長專用頁面 (`parent.html`)
- 🌐 中英文切換功能
- 🔐 Google 和 LINE 登入整合
- 📱 響應式設計

## 頁面說明

### 主頁面
- `index.html` - 原始版本
- `index-i18n.html` - 國際化版本（推薦使用）

### 專用頁面
- `student.html` - 學生模式對話界面
- `parent.html` - 家長模式對話界面

### 核心檔案
- `app.js` - 前端 JavaScript 邏輯
- `package.json` - 前端依賴配置
- `zeabur.json` - 前端部署配置

## 部署說明

1. 將此資料夾內容上傳到前端 GitHub 倉庫
2. 在 Zeabur 中創建新的靜態網站專案
3. 連接 GitHub 倉庫
4. 設定域名：`aistudent.zeabur.app`

## 環境變數

前端不需要額外的環境變數，API 端點已硬編碼在 `app.js` 中。

## 開發

```bash
npm install
npm run dev
```

## 注意事項

- 確保後端 API 已正常運行
- 檢查 API 端點 URL 是否正確
- 測試登入和語言切換功能
