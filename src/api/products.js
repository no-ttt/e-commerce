import { mockProducts } from '../mock/products'

export const api = {
  fetchProducts() {
    return new Promise((resolve) => {
      // 為了能讓你看清楚轉圈圈動畫，把延遲調成 1.5 秒
      setTimeout(() => {
        resolve({ status: 200, data: mockProducts })
      }, 1500)
    })
  }
}

