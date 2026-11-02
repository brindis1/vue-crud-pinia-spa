<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from './stores/products'
import { useCartStore } from './stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

onMounted(() => {
  // Inicializar stores desde localStorage al montar la app
  productsStore.initProducts()
  cartStore.initCart()
})
</script>

<template>
  <div class="app-container">
    <!-- Menú de navegación principal con router-link -->
    <header class="navbar">
      <div class="nav-content">
        <router-link to="/" class="nav-brand">
          <span>🛍️</span>
          <span>Tienda SPA</span>
        </router-link>

        <nav>
          <ul class="nav-links">
            <li>
              <router-link to="/" class="nav-link">
                🏠 Inicio
              </router-link>
            </li>
            <li>
              <router-link to="/productos" class="nav-link">
                📦 Productos
              </router-link>
            </li>
            <li>
              <router-link to="/productos/crear" class="nav-link">
                ➕ Nuevo Producto
              </router-link>
            </li>
            <li>
              <router-link to="/carrito" class="nav-link">
                🛒 Carrito
                <span v-if="cartStore.totalCount > 0" class="cart-badge">
                  {{ cartStore.totalCount }}
                </span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Notificación flotante global (v-if) -->
    <div
      v-if="productsStore.notification"
      class="alert-toast"
      :class="productsStore.notification.type"
    >
      <span>{{ productsStore.notification.message }}</span>
    </div>

    <!-- Contenido dinámico renderizado por Vue Router -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Pie de página ordenado y sencillo -->
    <footer class="footer">
      <p>
        SPA con CRUD y Pinia en Vue 3 • Desarrollado con <strong>Vue 3</strong>, <strong>Pinia</strong> y <strong>Vue Router</strong>
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos específicos de App si se requieren, los globales están en main.css */
</style>

