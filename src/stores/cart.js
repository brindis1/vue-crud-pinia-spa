import { defineStore } from 'pinia'

const STORAGE_KEY = 'tienda_spa_carrito_v1'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    lastActionMessage: null
  }),

  getters: {
    // Lista completa de artículos en el carrito
    cartItems: (state) => state.items,

    // Cantidad total de unidades añadidas
    totalCount: (state) => {
      return state.items.reduce((total, item) => total + item.cantidad, 0)
    },

    // Total acumulado en dinero (suma de precio * cantidad)
    totalPrice: (state) => {
      const sum = state.items.reduce((total, item) => {
        return total + (item.precio * item.cantidad)
      }, 0)
      return parseFloat(sum.toFixed(2))
    },

    // Booleano para saber si el carrito está vacío
    isEmpty: (state) => state.items.length === 0,

    // Consultar la cantidad actual de un producto específico en el carrito
    getProductQuantity: (state) => {
      return (productId) => {
        const found = state.items.find((item) => String(item.id) === String(productId))
        return found ? found.cantidad : 0
      }
    }
  },

  actions: {
    // Inicializar carrito desde LocalStorage
    initCart() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          this.items = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Error cargando carrito de localStorage:', e)
        this.items = []
      }
    },

    // Guardar carrito en LocalStorage
    saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      } catch (e) {
        console.error('Error guardando carrito en localStorage:', e)
      }
    },

    // Agregar producto al carrito
    addToCart(product) {
      if (!product || !product.id) return

      const existingIndex = this.items.findIndex(
        (item) => String(item.id) === String(product.id)
      )

      if (existingIndex > -1) {
        this.items[existingIndex].cantidad += 1
      } else {
        this.items.push({
          id: product.id,
          nombre: product.nombre,
          precio: Number(product.precio),
          categoria: product.categoria || 'General',
          icono: product.icono || '📦',
          cantidad: 1
        })
      }

      this.saveToStorage()
      this.lastActionMessage = `Se añadió "${product.nombre}" al carrito`
    },

    // Eliminar producto específico del carrito
    removeFromCart(productId) {
      const index = this.items.findIndex((item) => String(item.id) === String(productId))
      if (index > -1) {
        const removed = this.items.splice(index, 1)[0]
        this.saveToStorage()
        this.lastActionMessage = `Se eliminó "${removed.nombre}" del carrito`
      }
    },

    // Incrementar cantidad de un producto
    increaseQuantity(productId) {
      const item = this.items.find((i) => String(i.id) === String(productId))
      if (item) {
        item.cantidad += 1
        this.saveToStorage()
      }
    },

    // Disminuir cantidad de un producto (si llega a 0, se elimina)
    decreaseQuantity(productId) {
      const item = this.items.find((i) => String(i.id) === String(productId))
      if (item) {
        if (item.cantidad > 1) {
          item.cantidad -= 1
        } else {
          this.removeFromCart(productId)
          return
        }
        this.saveToStorage()
      }
    },

    // Vaciar todo el carrito
    clearCart() {
      this.items = []
      this.saveToStorage()
      this.lastActionMessage = 'El carrito ha sido vaciado'
    }
  }
})

