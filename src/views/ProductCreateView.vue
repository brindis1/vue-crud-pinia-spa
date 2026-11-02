<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'

const router = useRouter()
const productsStore = useProductsStore()

// Estado local solo para los inputs del formulario (v-model)
const form = reactive({
  nombre: '',
  precio: '',
  categoria: 'Electrónica',
  icono: '📦',
  descripcion: ''
})

const errors = reactive({
  nombre: '',
  precio: ''
})

const availableIcons = ['📦', '💻', '📱', '🎧', '⌨️', '🖥️', '🖱️', '⌚', '📷', '🎮', '💡', '🎒']
const categoriesList = ['Electrónica', 'Audio', 'Accesorios', 'Monitores', 'Gaming', 'Oficina', 'General']

const validateForm = () => {
  let isValid = true
  errors.nombre = ''
  errors.precio = ''

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre del producto es obligatorio.'
    isValid = false
  }

  const priceNum = Number(form.precio)
  if (!form.precio || isNaN(priceNum) || priceNum <= 0) {
    errors.precio = 'El precio debe ser un número mayor a 0.'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  // Delegar la lógica de creación al store de Pinia
  const result = productsStore.addProduct({
    nombre: form.nombre,
    precio: form.precio,
    categoria: form.categoria,
    icono: form.icono,
    descripcion: form.descripcion
  })

  if (result.success) {
    router.push('/productos')
  }
}

const handleCancel = () => {
  router.push('/productos')
}
</script>

<template>
  <div class="product-create-view">
    <div class="page-header">
      <div>
        <h1 class="page-title">Crear Nuevo Producto</h1>
        <p class="page-subtitle">Ingresa la información para dar de alta el producto en el catálogo</p>
      </div>
      <router-link to="/productos" class="btn btn-secondary">
        ← Volver al catálogo
      </router-link>
    </div>

    <div class="card form-container">
      <form @submit.prevent="handleSubmit">
        <!-- Campo: Nombre (v-model) -->
        <div class="form-group">
          <label for="nombre" class="form-label">Nombre del Producto *</label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            class="form-input"
            placeholder="Ej. Auriculares Bluetooth Pro"
            autocomplete="off"
          />
          <span v-if="errors.nombre" class="form-error">
            {{ errors.nombre }}
          </span>
        </div>

        <!-- Campo: Precio (v-model.number) -->
        <div class="form-group">
          <label for="precio" class="form-label">Precio ($ USD) *</label>
          <input
            id="precio"
            v-model.number="form.precio"
            type="number"
            step="0.01"
            min="0.01"
            class="form-input"
            placeholder="Ej. 99.99"
          />
          <span v-if="errors.precio" class="form-error">
            {{ errors.precio }}
          </span>
        </div>

        <!-- Campo: Categoría (v-model) -->
        <div class="form-group">
          <label for="categoria" class="form-label">Categoría</label>
          <select id="categoria" v-model="form.categoria" class="form-select">
            <option v-for="cat in categoriesList" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- Selector de Icono visual (v-model) -->
        <div class="form-group">
          <label class="form-label">Icono representativo</label>
          <div class="icon-selector">
            <button
              v-for="icon in availableIcons"
              :key="icon"
              type="button"
              class="icon-option"
              :class="{ 'icon-active': form.icono === icon }"
              @click="form.icono = icon"
            >
              {{ icon }}
            </button>
          </div>
        </div>

        <!-- Campo: Descripción (v-model) -->
        <div class="form-group">
          <label for="descripcion" class="form-label">Descripción del Producto</label>
          <textarea
            id="descripcion"
            v-model="form.descripcion"
            rows="3"
            class="form-textarea"
            placeholder="Detalles sobre características, especificaciones, etc."
          ></textarea>
        </div>

        <!-- Botones de Acción -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            💾 Guardar Producto
          </button>
          <button type="button" @click="handleCancel" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.icon-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.icon-option {
  font-size: 1.5rem;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-option:hover {
  background: #e2e8f0;
}

.icon-option.icon-active {
  border-color: var(--primary);
  background-color: #dbeafe;
  outline: 2px solid var(--primary);
}
</style>

