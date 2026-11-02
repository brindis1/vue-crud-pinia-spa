<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const selectedCategory = ref('Todas')

// Categorías disponibles dinámicas
const categories = computed(() => {
  const cats = new Set(productsStore.products.map((p) => p.categoria).filter(Boolean))
  return ['Todas', ...Array.from(cats)]
})

// Filtrado de productos con v-for
const filteredProducts = computed(() => {
  return productsStore.products.filter((product) => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Todas' || product.categoria === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const handleEdit = (id) => {
  router.push(`/productos/${id}`)
}

const handleDelete = (id, nombre) => {
  if (confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
    productsStore.deleteProduct(id)
  }
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
  productsStore.showNotification(`"${product.nombre}" agregado al carrito`, 'success')
}

const handleReset = () => {
  if (confirm('¿Restablecer los productos a los valores por defecto?')) {
    productsStore.resetDefaultProducts()
  }
}
</script>

<template>
  <div class="product-list-view">
    <!-- Encabezado de la página -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Catálogo de Productos</h1>
        <p class="page-subtitle">Gestiona tu inventario con Vue 3 y Pinia</p>
      </div>
      <div class="header-actions">
        <button
          v-if="productsStore.products.length < 6"
          @click="handleReset"
          class="btn btn-secondary btn-sm"
          title="Restaurar productos de prueba"
        >
          🔄 Restaurar catálogo
        </button>
        <router-link to="/productos/crear" class="btn btn-primary">
          ➕ Registrar Nuevo Producto
        </router-link>
      </div>
    </div>

    <!-- Barra de búsqueda y filtros -->
    <div class="filters-bar card">
      <div class="filter-group search-group">
        <label for="search" class="filter-label">Buscar:</label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          class="form-input"
          placeholder="Escribe el nombre o descripción..."
        />
      </div>

      <div class="filter-group">
        <label for="category" class="filter-label">Categoría:</label>
        <select id="category" v-model="selectedCategory" class="form-select">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
    </div>

    <!-- Estado: Sin productos registrados (v-if) -->
    <div v-if="productsStore.products.length === 0" class="card empty-state">
      <div class="empty-state-icon">📭</div>
      <h3 class="empty-state-title">No hay productos en el catálogo</h3>
      <p class="page-subtitle" style="margin-bottom: 20px;">
        Todos los productos fueron eliminados. Puedes registrar uno nuevo o restaurar los datos iniciales.
      </p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <router-link to="/productos/crear" class="btn btn-primary">
          ➕ Crear primer producto
        </router-link>
        <button @click="productsStore.resetDefaultProducts" class="btn btn-secondary">
          🔄 Restaurar catálogo demo
        </button>
      </div>
    </div>

    <!-- Estado: No hay coincidencias con el filtro (v-else-if) -->
    <div v-else-if="filteredProducts.length === 0" class="card empty-state">
      <div class="empty-state-icon">🔍</div>
      <h3 class="empty-state-title">Sin resultados</h3>
      <p class="page-subtitle">No encontramos productos que coincidan con "{{ searchQuery }}".</p>
      <button @click="searchQuery = ''; selectedCategory = 'Todas'" class="btn btn-secondary" style="margin-top: 14px;">
        Limpiar filtros
      </button>
    </div>

    <!-- Lista de productos (v-else) utilizando v-for -->
    <div v-else class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div>
          <div class="product-card-top">
            <span class="product-icon">{{ product.icono || '📦' }}</span>
            <span class="product-category">{{ product.categoria }}</span>
          </div>

          <h3 class="product-title">{{ product.nombre }}</h3>
          <p class="product-desc">{{ product.descripcion }}</p>
        </div>

        <div class="product-card-bottom">
          <div class="product-price">
            ${{ Number(product.precio).toFixed(2) }}
          </div>

          <!-- Botones requeridos: Editar, Eliminar, Agregar al carrito -->
          <div class="product-actions">
            <button
              @click="handleAddToCart(product)"
              class="btn btn-success btn-sm btn-full"
              title="Añadir al carrito de compras"
            >
              🛒 Agregar al carrito
            </button>
            <div class="sub-actions">
              <button
                @click="handleEdit(product.id)"
                class="btn btn-secondary btn-sm"
                title="Editar este producto"
              >
                ✏️ Editar
              </button>
              <button
                @click="handleDelete(product.id, product.nombre)"
                class="btn btn-outline-danger btn-sm"
                title="Eliminar este producto"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filters-bar {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-group {
  flex: 1;
  min-width: 220px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
}

.product-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.product-card-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 14px;
  margin-top: 8px;
}

.sub-actions {
  display: flex;
  gap: 6px;
  width: 100%;
}

.sub-actions .btn {
  flex: 1;
}

.btn-full {
  width: 100%;
  margin-bottom: 6px;
}
</style>

