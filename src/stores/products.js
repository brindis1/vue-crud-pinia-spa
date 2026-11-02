import { defineStore } from 'pinia'

const STORAGE_KEY = 'tienda_spa_productos_v1'

const INITIAL_PRODUCTS = [
  {
    id: 1,
    nombre: 'Laptop Pro 15"',
    precio: 1299.99,
    categoria: 'Electrónica',
    descripcion: 'Portátil de alto rendimiento con procesador octa-core y 16GB RAM.',
    icono: '💻'
  },
  {
    id: 2,
    nombre: 'Smartphone Ultra',
    precio: 799.50,
    categoria: 'Electrónica',
    descripcion: 'Pantalla AMOLED 120Hz, cámara de 108MP y batería de larga duración.',
    icono: '📱'
  },
  {
    id: 3,
    nombre: 'Auriculares Inalámbricos',
    precio: 149.00,
    categoria: 'Audio',
    descripcion: 'Cancelación activa de ruido, audio espacial y 30h de autonomía.',
    icono: '🎧'
  },
  {
    id: 4,
    nombre: 'Teclado Mecánico RGB',
    precio: 89.90,
    categoria: 'Accesorios',
    descripcion: 'Switches mecánicos táctiles con retroiluminación personalizable.',
    icono: '⌨️'
  },
  {
    id: 5,
    nombre: 'Monitor 27" 4K',
    precio: 349.99,
    categoria: 'Monitores',
    descripcion: 'Resolución UHD con colores calibrados para diseño y productividad.',
    icono: '🖥️'
  },
  {
    id: 6,
    nombre: 'Mouse Ergonómico',
    precio: 45.00,
    categoria: 'Accesorios',
    descripcion: 'Sensor de alta precisión y agarre cómodo para largas jornadas.',
    icono: '🖱️'
  }
]

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    notification: null,
    notificationTimeout: null
  }),

  getters: {
    // Retorna todos los productos
    allProducts: (state) => state.products,

    // Cuenta total de productos
    totalCount: (state) => state.products.length,

    // Obtener un producto por ID (soporta string o number)
    getProductById: (state) => {
      return (id) => state.products.find((p) => String(p.id) === String(id))
    }
  },

  actions: {
    // Inicializar productos desde LocalStorage o con valores por defecto
    initProducts() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          this.products = JSON.parse(saved)
        } else {
          this.products = [...INITIAL_PRODUCTS]
          this.saveToStorage()
        }
      } catch (e) {
        console.error('Error cargando productos de localStorage:', e)
        this.products = [...INITIAL_PRODUCTS]
      }
    },

    // Guardar estado en LocalStorage
    saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products))
      } catch (e) {
        console.error('Error guardando productos en localStorage:', e)
      }
    },

    // Notificación emergente temporal
    showNotification(message, type = 'success') {
      if (this.notificationTimeout) {
        clearTimeout(this.notificationTimeout)
      }
      this.notification = { message, type }
      this.notificationTimeout = setTimeout(() => {
        this.notification = null
        this.notificationTimeout = null
      }, 3500)
    },

    // C - CREATE: Crear un nuevo producto
    addProduct(productData) {
      if (!productData.nombre || !productData.nombre.trim()) {
        this.showNotification('El nombre del producto es obligatorio', 'error')
        return { success: false, message: 'El nombre es requerido' }
      }

      const numericPrice = Number(productData.precio)
      if (isNaN(numericPrice) || numericPrice <= 0) {
        this.showNotification('El precio debe ser un número mayor a 0', 'error')
        return { success: false, message: 'Precio inválido' }
      }

      const newProduct = {
        id: Date.now(), // ID numérico único
        nombre: productData.nombre.trim(),
        precio: parseFloat(numericPrice.toFixed(2)),
        categoria: productData.categoria?.trim() || 'General',
        descripcion: productData.descripcion?.trim() || 'Sin descripción',
        icono: productData.icono || '📦'
      }

      this.products.push(newProduct)
      this.saveToStorage()
      this.showNotification(`Producto "${newProduct.nombre}" creado exitosamente`, 'success')
      return { success: true, product: newProduct }
    },

    // U - UPDATE: Actualizar un producto existente
    updateProduct(id, updatedData) {
      const index = this.products.findIndex((p) => String(p.id) === String(id))
      if (index === -1) {
        this.showNotification('Producto no encontrado para editar', 'error')
        return { success: false, message: 'Producto no encontrado' }
      }

      const numericPrice = Number(updatedData.precio)
      if (isNaN(numericPrice) || numericPrice <= 0) {
        this.showNotification('El precio debe ser un número mayor a 0', 'error')
        return { success: false, message: 'Precio inválido' }
      }

      this.products[index] = {
        ...this.products[index],
        nombre: updatedData.nombre.trim(),
        precio: parseFloat(numericPrice.toFixed(2)),
        categoria: updatedData.categoria?.trim() || 'General',
        descripcion: updatedData.descripcion?.trim() || 'Sin descripción',
        icono: updatedData.icono || this.products[index].icono || '📦'
      }

      this.saveToStorage()
      this.showNotification(`Producto "${this.products[index].nombre}" actualizado`, 'success')
      return { success: true, product: this.products[index] }
    },

    // D - DELETE: Eliminar un producto
    deleteProduct(id) {
      const index = this.products.findIndex((p) => String(p.id) === String(id))
      if (index === -1) {
        this.showNotification('Producto no encontrado', 'error')
        return false
      }

      const removed = this.products.splice(index, 1)[0]
      this.saveToStorage()
      this.showNotification(`Producto "${removed.nombre}" eliminado`, 'info')
      return true
    },

    // Restablecer a los productos de fábrica
    resetDefaultProducts() {
      this.products = [...INITIAL_PRODUCTS]
      this.saveToStorage()
      this.showNotification('Productos restablecidos a los valores por defecto', 'info')
    }
  }
})

