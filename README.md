# 迷你電商系統 (Mini E-commerce System)

這是一個以 **Vue 2** 實作的單頁式迷你電商系統前端檢定專案。

## 🛠 技術限制與核心架構
- **框架**: Vue `2.6.x`
- **狀態管理**: Vuex `3.x`
- **樣式預處理**: SCSS / SASS
- **建置工具**: Vite (使用 `vite-plugin-vue2`)
- **路由管理**: Vue Router `3.x`

## ✨ 核心功能
* **首頁商品列表** (`/`)
    * 使用 CSS Grid 設計響應式商品陳列
    * 顯示商品圖片、名稱、價格
    * **Hover 互動**: 滑鼠懸停商品圖片時，顯示「加入購物車 (Add to Cart)」按鈕並放大圖片
* **動態彈跳視窗 (Dialog)**
    * 點擊「加入購物車」後開啟，背景模糊處理
    * 顯示被選取的商品資訊
    * 要求使用者輸入**數量 (必填、預設 1、支援防呆邏輯)**
    * 確認後使用 Vuex 將資料送入購物車狀態
* **購物車管理** (`/cart`)
    * 顯示所有已選商品列表 (圖片、單價、當前數量、小計)
    * 自動依據狀態計算並顯示「總金額 (Grand Total)」
    * 支援直接於清單中「修改數量」或「移除商品」
    * 導覽列即時反映購物車內商品總數 (Badge)

## 🚀 快速啟動 (How to start)

1. **進入專案目錄**
   ```bash
   cd e-commerce
   ```

2. **安裝依賴套件**
   請確保您的環境中已安裝 Node.js。
   ```bash
   npm install
   ```

3. **啟動本地開發伺服器** (Dev Server)
   ```bash
   npm run dev
   ```
   預設會透過 Vite 秒速啟動，請點擊終端機內出現的 `http://localhost:xxxx` 在瀏覽器中進行測試。

4. **打包編譯** (Production Build)
   ```bash
   npm run build
   ```
