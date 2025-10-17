# AI 留學顧問 - 前端服務 (微服務架構)

## 📱 專案概述

這是 AI 留學顧問平台的前端應用，採用微服務架構設計，提供完整的用戶體驗，包括登入、設定、聊天和個人管理功能。支援 Google OAuth 2.0 和 LINE Login，具備響應式設計和智能用戶流程，通過後端服務與獨立的資料庫服務進行數據交互。

## 🏗️ 微服務架構

### 服務架構
```
前端服務 (aistudent.zeabur.app) ← 本專案
    ↓ API 調用
後端服務 (aistudentbackend.zeabur.app)
    ↓ API 調用
資料庫服務 (ai-studentdatabas.zeabur.app)
```

### 前端優勢
- ✅ **獨立部署**：前端可獨立更新和部署
- ✅ **靜態資源**：快速載入和 CDN 加速
- ✅ **用戶體驗**：專注於界面和交互設計
- ✅ **技術簡化**：純前端技術，無需後端依賴

## 🌟 完整功能列表

### 🔐 用戶認證系統
- ✅ **Google OAuth 2.0 登入**：安全的第三方認證
- ✅ **LINE Login 整合**：支援台灣用戶慣用的登入方式
- ✅ **智能登入流程**：自動判斷用戶是否為首次登入
- ✅ **跳過登入選項**：允許用戶直接體驗 AI 功能
- ✅ **跨瀏覽器兼容**：支援 iOS Safari、Chrome、Firefox 等

### 📋 個人化設定管理
- ✅ **留學需求設定**：學術背景、預算規劃、目標設定
- ✅ **角色選擇**：支援學生和家長兩種身份
- ✅ **資料編輯功能**：模態框形式的設定編輯
- ✅ **設定持久化**：與後端資料庫服務同步
- ✅ **智能重定向**：根據用戶狀態自動跳轉

### 💬 智能對話系統
- ✅ **即時 AI 對話**：與 Gemini AI 進行自然語言互動
- ✅ **上下文感知**：記住用戶的個人設定和對話歷史
- ✅ **角色感知回覆**：根據用戶身份提供相應建議
- ✅ **多語言支援**：中文/英文切換
- ✅ **載入動畫**：AI 回應時的視覺反饋
- ✅ **對話歷史**：本地儲存聊天記錄

### 👨‍👩‍👧‍👦 家長專用功能
- ✅ **學生進度查詢**：家長可查看孩子的諮詢進度
- ✅ **詳細統計報告**：活動統計、進度分析、建議
- ✅ **視覺化儀表板**：美觀的進度展示界面
- ✅ **AI 分析**：智能生成學生學習建議

### ⚙️ 個人設定中心
- ✅ **通知設定**：郵件和推送通知偏好
- ✅ **語言切換**：多語言界面支援
- ✅ **隱私控制**：個人資料管理
- ✅ **設定編輯**：即時更新用戶資料

## 🛠️ 技術架構

### 核心技術
- **HTML5**：語義化標記和現代化結構
- **CSS3 + Tailwind CSS**：響應式設計和快速開發
- **JavaScript (ES6+)**：現代化的前端邏輯
- **Fetch API**：與後端 RESTful API 通信

### 設計特色
- **響應式設計**：支援桌面、平板、手機
- **模態框交互**：流暢的用戶體驗
- **即時反饋**：載入狀態和錯誤處理
- **無障礙設計**：符合 WCAG 標準
- **iOS Safari 優化**：特別針對 iOS 設備優化

### 狀態管理
- **Local Storage**：用戶資料和設定持久化
- **JWT Token**：安全的身份認證
- **Profile ID**：用戶設定資料關聯
- **Chat History**：對話記錄本地儲存

## 🔗 與微服務整合

### API 通信架構
前端通過後端服務與資料庫服務進行通信：

```
用戶操作 → 前端 JavaScript → 後端 API → 資料庫服務 API → 資料存儲
```

### API 端點映射

#### 認證相關
```
前端調用 → 後端處理 → 資料庫服務
GET  /api/v1/auth/config          # 獲取認證配置
GET  /api/v1/auth/line/login      # 獲取 LINE 登入 URL
GET  /auth/google/callback        # Google OAuth 回調
GET  /auth/line/callback          # LINE Login 回調
```

#### 用戶資料管理
```
前端調用 → 後端處理 → 資料庫服務
GET  /api/v1/user/check-profile           # 檢查用戶設定狀態
GET  /api/v1/user/profile/<profile_id>    # 獲取用戶設定資料
PUT  /api/v1/user/update-profile/<id>     # 更新用戶設定
POST /api/v1/intake                       # 提交初始設定
```

#### 通知設定
```
前端調用 → 後端處理 → 資料庫服務
GET  /api/v1/user/notification-settings   # 獲取通知設定
POST /api/v1/user/notification-settings   # 更新通知設定
```

#### AI 對話
```
前端調用 → 後端處理 → AI 服務 + 資料庫服務
POST /api/v1/chat                         # 發送聊天訊息
```

#### 家長功能
```
前端調用 → 後端處理 → 資料庫服務
GET  /api/v1/parent/student-progress      # 查詢學生進度
```

### 資料流程
1. **用戶登入** → 後端驗證 → JWT Token 儲存 → 設定狀態檢查
2. **設定提交** → 後端驗證 → 資料庫服務儲存 → 前端更新
3. **AI 對話** → 用戶資料載入 → Gemini AI 處理 → 資料庫服務記錄 → 回覆顯示
4. **進度查詢** → 家長身份驗證 → 資料庫服務分析 → 報告展示

### 錯誤處理
- **網路錯誤**：自動重試和用戶提示
- **認證失敗**：重新導向登入頁面
- **資料驗證**：即時表單驗證和錯誤提示
- **API 錯誤**：友好的錯誤訊息顯示
- **服務不可用**：優雅的降級處理

## 📁 檔案結構

```
frontend/
├── index.html              # 主要應用頁面（完整功能）
├── zeabur.json            # 部署配置
├── .zeaburignore         # 部署忽略檔案
├── README.md             # 前端說明文檔
└── doc/                  # 文檔目錄
    └── README.md
```

## 🚀 部署指南

### 本地開發
```bash
# 進入前端目錄
cd frontend

# 使用本地伺服器
python -m http.server 8000
# 或
npx serve .

# 在瀏覽器中開啟
open http://localhost:8000
```

### 雲端部署 (Zeabur)
1. 將 `frontend/` 目錄推送到 GitHub
2. 在 Zeabur 中連接 GitHub 倉庫
3. 選擇 `frontend` 目錄作為根目錄
4. 設定部署類型為 "Static Site"
5. 自動部署完成

### 環境配置
前端需要配置後端 API 地址：
```javascript
window.__CONFIG__ = {
    API_BASE: 'https://aistudentbackend.zeabur.app/api/v1',
    TEST_MODE: true
};

// LINE Login 配置
window.__LINE_CHANNEL_ID__ = '2008117059';

// Google OAuth 配置
window.__GOOGLE_CLIENT_ID__ = '300123710303-m4j1laa65p664n5vtrdkfvfa7b42c2o6.apps.googleusercontent.com';
```

### 微服務環境配置
```javascript
// 服務端點配置
const SERVICES = {
    FRONTEND: 'https://aistudent.zeabur.app',
    BACKEND: 'https://aistudentbackend.zeabur.app',
    DATABASE: 'https://ai-studentdatabas.zeabur.app'
};

// API 基礎 URL
const API_BASE = `${SERVICES.BACKEND}/api/v1`;
```

## 🎨 頁面結構

### 1. 登入頁面 (`login-page`)
- Google 登入按鈕
- LINE 登入按鈕
- 跳過登入選項
- 語言切換功能

### 2. 用戶資訊頁面 (`user-info-page`)
- 用戶頭像和基本資訊
- 繼續諮詢按鈕
- 編輯設定按鈕
- 家長專用功能區

### 3. 設定頁面 (`setup-page`)
- 個人基本資訊
- 學術背景設定
- 預算和時間規劃
- 角色選擇（學生/家長）

### 4. 聊天頁面 (`chat-page`)
- AI 對話界面
- 快速動作按鈕
- 訊息輸入區域
- 返回首頁按鈕

### 5. 模態框系統
- 用戶設定模態框
- 編輯 profile 模態框
- 學生進度查詢模態框

## 🔧 核心功能實現

### 智能登入流程
```javascript
// 檢查用戶狀態並智能跳轉
function checkUserProfileStatus() {
    // 1. 檢查 JWT Token
    // 2. 調用後端 API 查詢用戶 profile 資料
    // 3. 根據結果跳轉到相應頁面
}
```

### 用戶資訊載入
```javascript
// 載入並顯示用戶資訊
function loadUserInfo() {
    // 1. 從 localStorage 讀取用戶資料
    // 2. 調用後端 API 獲取最新資料
    // 3. 顯示用戶名稱和角色
    // 4. 設定頭像（支援預設頭像）
    // 5. 根據角色顯示相應功能
}
```

### API 通信封裝
```javascript
// 統一的 API 調用函數
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJWTToken()}`
            },
            body: data ? JSON.stringify(data) : null
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}
```

### AI 載入動畫
```javascript
// 顯示 AI 思考動畫
function showAILoading() {
    // 創建載入動畫元素
    // 顯示旋轉動畫
}

function hideAILoading() {
    // 移除載入動畫
}
```

### 聊天歷史管理
```javascript
// 載入聊天歷史
function loadChatHistory() {
    // 1. 從 localStorage 讀取歷史記錄
    // 2. 重新渲染聊天界面
    // 3. 如果沒有歷史，發送歡迎訊息
}

// 儲存聊天記錄
function saveChatHistory(message, sender) {
    // 1. 將新訊息加入歷史
    // 2. 限制歷史記錄數量（最多50條）
    // 3. 儲存到 localStorage
}
```

## 🎯 用戶體驗特色

### 視覺設計
- **漸層背景**：多層次色彩漸變
- **圓角設計**：現代化的圓角元素
- **陰影效果**：立體感的視覺層次
- **動畫效果**：流暢的懸停和點擊動畫

### 互動體驗
- **智能跳轉**：根據用戶狀態自動導航
- **即時反饋**：載入狀態和錯誤提示
- **表單驗證**：即時輸入驗證
- **響應式設計**：適配各種設備尺寸

### 無障礙設計
- **鍵盤導航**：支援 Tab 鍵導航
- **螢幕閱讀器**：語義化標記支援
- **色彩對比**：符合無障礙標準
- **觸控優化**：iOS Safari 特別優化

## 🔗 微服務集成

### 服務發現
```javascript
// 自動檢測服務狀態
async function checkServicesHealth() {
    try {
        const backendHealth = await fetch(`${SERVICES.BACKEND}/api/v1/health`);
        const databaseHealth = await fetch(`${SERVICES.DATABASE}/health`);
        
        return {
            backend: backendHealth.ok,
            database: databaseHealth.ok
        };
    } catch (error) {
        console.error('Service health check failed:', error);
        return { backend: false, database: false };
    }
}
```

### 錯誤處理策略
```javascript
// 服務不可用時的降級處理
function handleServiceUnavailable(service) {
    switch (service) {
        case 'backend':
            showMessage('後端服務暫時不可用，請稍後再試');
            break;
        case 'database':
            showMessage('資料庫服務暫時不可用，部分功能可能受限');
            break;
        default:
            showMessage('服務暫時不可用，請稍後再試');
    }
}
```

## 🐛 常見問題

### Q: 如何解決 CORS 錯誤？
A: 確保後端已正確配置 CORS 設定，允許前端域名訪問。

### Q: 登入後無法跳轉？
A: 檢查 JWT Token 是否正確儲存，以及後端認證 API 是否正常。

### Q: AI 對話沒有回應？
A: 確認後端服務正常運行，Gemini API Key 已正確配置。

### Q: 設定資料無法儲存？
A: 檢查 profileId 是否正確，以及後端和資料庫服務是否可訪問。

### Q: iOS Safari 按鈕無法點擊？
A: 使用 `onclick` 屬性而非 `addEventListener`，並添加 iOS 兼容性 CSS。

### Q: LINE 登入在內建瀏覽器中失敗？
A: 系統會自動檢測並提供友好的提示，建議使用「透過電子郵件帳號登入」選項。

### Q: 頭像無法顯示？
A: 系統已實現本地預設頭像，不依賴外部服務，確保穩定顯示。

### Q: 微服務通信失敗？
A: 檢查後端服務和資料庫服務是否正常運行，確認服務 URL 配置正確。

## 📊 性能優化

### 前端優化
- **靜態資源壓縮**：HTML、CSS、JS 文件壓縮
- **CDN 加速**：通過 Zeabur CDN 加速資源載入
- **本地存儲**：減少 API 調用頻率
- **懶載入**：按需載入非關鍵資源

### 網絡優化
- **API 快取**：合理的 API 響應快取策略
- **錯誤重試**：網絡錯誤自動重試機制
- **超時處理**：合理的請求超時設定
- **降級處理**：服務不可用時的優雅降級

## 📞 技術支援

如需技術支援，請聯繫：
- **GitHub Issues**: [專案 Issues 頁面](https://github.com/your-repo/issues)
- **Email**: frontend-support@aistudyadvisor.com

---

**前端開發團隊** - 為用戶提供最佳的留學顧問體驗 🎓✨

## 📝 更新日誌

### 最新更新 (2025-10-17)
- ✅ **微服務架構適配**：適配新的微服務架構
- ✅ **API 通信優化**：改進與後端服務的通信
- ✅ **錯誤處理增強**：完善的微服務錯誤處理
- ✅ **服務監控**：添加服務健康檢查功能
- ✅ **文檔更新**：更新 README 以反映微服務架構

### 歷史更新 (2024)
- ✅ 完整實現所有 README.md 中提到的功能
- ✅ 美化用戶資訊頁面設計
- ✅ 修正頭像載入錯誤問題
- ✅ 實現智能登入流程
- ✅ 添加家長專用功能
- ✅ 完善錯誤處理和用戶反饋
- ✅ 優化響應式設計和無障礙功能