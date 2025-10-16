# AI 留學顧問 - 前端應用

## 📱 概述

這是 AI 留學顧問平台的前端應用，提供用戶友好的網頁界面，讓學生和家長能夠與 AI 留學顧問進行互動，獲得個人化的留學建議和規劃指導。

## 🌟 主要功能

### 🔐 用戶認證系統
- **Google OAuth 2.0 登入**：安全的第三方認證
- **LINE Login 整合**：支援台灣用戶慣用的登入方式
- **智能登入流程**：自動判斷用戶是否為首次登入
- **跳過登入選項**：允許用戶直接體驗 AI 功能

### 📋 個人化設定管理
- **留學需求設定**：學術背景、預算規劃、目標設定
- **角色選擇**：支援學生和家長兩種身份
- **資料編輯功能**：模態框形式的設定編輯
- **設定持久化**：與後端資料庫同步

### 💬 智能對話系統
- **即時 AI 對話**：與 Gemini AI 進行自然語言互動
- **上下文感知**：記住用戶的個人設定和對話歷史
- **角色感知回覆**：根據用戶身份提供相應建議
- **多語言支援**：中文/英文切換

### 👨‍👩‍👧‍👦 家長專用功能
- **學生進度查詢**：家長可查看孩子的諮詢進度
- **詳細統計報告**：活動統計、進度分析、建議
- **視覺化儀表板**：美觀的進度展示界面

### ⚙️ 個人設定中心
- **通知設定**：郵件和推送通知偏好
- **語言切換**：多語言界面支援
- **隱私控制**：個人資料管理

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

### 狀態管理
- **Local Storage**：用戶資料和設定持久化
- **JWT Token**：安全的身份認證
- **Profile ID**：用戶設定資料關聯

## 🔗 與後端整合

### API 通信
前端通過以下 API 與後端進行通信：

#### 認證相關
```
GET  /api/v1/auth/config          # 獲取認證配置
GET  /auth/google/callback        # Google OAuth 回調
GET  /auth/line/callback          # LINE Login 回調
```

#### 用戶資料管理
```
GET  /api/v1/user/check-profile           # 檢查用戶設定狀態
GET  /api/v1/user/profile/<profile_id>    # 獲取用戶設定資料
PUT  /api/v1/user/update-profile/<id>     # 更新用戶設定
POST /api/v1/intake                       # 提交初始設定
```

#### 通知設定
```
GET  /api/v1/user/notification-settings   # 獲取通知設定
POST /api/v1/user/notification-settings   # 更新通知設定
```

#### AI 對話
```
POST /api/v1/chat                         # 發送聊天訊息
```

#### 家長功能
```
GET  /api/v1/parent/student-progress      # 查詢學生進度
```

### 資料流程
1. **用戶登入** → JWT Token 儲存 → 設定狀態檢查
2. **設定提交** → 後端驗證 → 資料庫儲存 → 前端更新
3. **AI 對話** → 用戶資料載入 → Gemini AI 處理 → 回覆顯示
4. **進度查詢** → 家長身份驗證 → 學生資料分析 → 報告展示

### 錯誤處理
- **網路錯誤**：自動重試和用戶提示
- **認證失敗**：重新導向登入頁面
- **資料驗證**：即時表單驗證和錯誤提示
- **API 錯誤**：友好的錯誤訊息顯示

## 📁 檔案結構

```
frontend/
├── index.html              # 主要應用頁面
├── zeabur.json            # 部署配置
├── .zeaburignore         # 部署忽略檔案
└── README.md             # 前端說明文檔
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
    API_BASE: 'https://aistudentbackend.zeabur.app'
};
```

## 🔧 開發指南

### 添加新功能
1. 在 `index.html` 中添加 HTML 結構
2. 在 `<script>` 區塊中添加 JavaScript 邏輯
3. 確保與後端 API 的通信正確
4. 測試響應式設計和用戶體驗

### 樣式修改
使用 Tailwind CSS 類別進行樣式調整：
```html
<!-- 響應式按鈕 -->
<button class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    按鈕文字
</button>

<!-- 模態框 -->
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <!-- 模態框內容 -->
</div>
```

### API 調用範例
```javascript
// 發送聊天訊息
fetch(window.__CONFIG__.API_BASE + '/api/v1/chat', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: '用戶訊息',
        user_role: 'student',
        profile_id: profileId,
        language: 'zh'
    })
})
.then(response => response.json())
.then(result => {
    if (result.ok) {
        // 處理成功回應
    } else {
        // 處理錯誤
    }
});
```

## 🌍 國際化支援

### 語言切換
支援中文和英文兩種語言：
```html
<span data-zh="中文文字" data-en="English text">中文文字</span>
```

### 語言切換邏輯
```javascript
function switchLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}
```

## 📱 響應式設計

### 斷點設定
- **手機**：< 768px
- **平板**：768px - 1024px
- **桌面**：> 1024px

### 響應式元件
```html
<!-- 響應式網格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- 內容 -->
</div>

<!-- 響應式按鈕 -->
<button class="w-full sm:w-auto px-4 py-2">
    按鈕
</button>
```

## 🔒 安全性考量

### 資料保護
- **JWT Token**：安全的身份認證
- **HTTPS**：所有通信加密
- **輸入驗證**：前端表單驗證
- **XSS 防護**：安全的 DOM 操作

### 隱私設定
- **本地儲存**：敏感資料加密
- **會話管理**：自動登出機制
- **資料最小化**：只儲存必要資訊

## 🐛 常見問題

### Q: 如何解決 CORS 錯誤？
A: 確保後端已正確配置 CORS 設定，允許前端域名訪問。

### Q: 登入後無法跳轉？
A: 檢查 JWT Token 是否正確儲存，以及後端認證 API 是否正常。

### Q: AI 對話沒有回應？
A: 確認 Gemini API Key 已正確配置，並檢查網路連接。

### Q: 設定資料無法儲存？
A: 檢查 profileId 是否正確，以及後端 API 是否可訪問。

## 📞 技術支援

如需技術支援，請聯繫：
- **GitHub Issues**: [專案 Issues 頁面](https://github.com/your-repo/issues)
- **Email**: frontend-support@aistudyadvisor.com

---

**前端開發團隊** - 為用戶提供最佳的留學顧問體驗 🎓✨
