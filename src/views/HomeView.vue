<script setup>
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()
</script>

<template>
  <div class="home-view">
    <div class="card hero-card">
      <div class="hero-badge">Proyecto SPA Vue 3 + Pinia</div>
      <h1 class="hero-title">Sistema de Gestión de Productos y Carrito</h1>
      <p class="hero-subtitle">
        Aplicación de una sola página desarrollada con Vue 3, Vue Router y Pinia.
        Implementa un CRUD completo de productos y un carrito de compras con persistencia local.
      </p>

      <div class="hero-actions">
        <router-link to="/productos" class="btn btn-primary">
          📦 Ver Catálogo de Productos
        </router-link>
        <router-link to="/productos/crear" class="btn btn-secondary">
          ➕ Crear Nuevo Producto
        </router-link>
        <router-link to="/carrito" class="btn btn-success">
          🛒 Ver Carrito ({{ cartStore.totalCount }})
        </router-link>
      </div>
    </div>

    <!-- Resumen de estadísticas rápidas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <div class="stat-value">{{ productsStore.totalCount }}</div>
          <div class="stat-label">Productos Registrados</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div class="stat-info">
          <div class="stat-value">{{ cartStore.totalCount }}</div>
          <div class="stat-label">Artículos en Carrito</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💵</div>
        <div class="stat-info">
          <div class="stat-value">${{ cartStore.totalPrice.toFixed(2) }}</div>
          <div class="stat-label">Total en Carrito</div>
        </div>
      </div>
    </div>

    <!-- Especificaciones Técnicas y Cumplimiento -->
    <div class="card specs-card">
      <h2 class="section-title">Tecnologías y Especificaciones del Proyecto</h2>
      <ul class="specs-list">
        <li>
          <strong>Vue Router:</strong> Enrutamiento SPA con rutas para Inicio (<code>/</code>), Productos (<code>/productos</code>), Crear (<code>/productos/crear</code>), Editar (<code>/productos/:id</code>) y Carrito (<code>/carrito</code>).
        </li>
        <li>
          <strong>Pinia Stores:</strong> Estado global centralizado en dos stores separados (<code>useProductsStore</code> y <code>useCartStore</code>) con toda la lógica de negocio desacoplada de los componentes.
        </li>
        <li>
          <strong>Directivas de Vue:</strong> Uso riguroso de <code>v-for</code> para renderizar listas, <code>v-if</code> / <code>v-else</code> para estados de carga/vacío, y <code>v-model</code> para formularios bidireccionales.
        </li>
        <li>
          <strong>Publicación:</strong> Configurado para despliegue estático continuo en <strong>GitHub Pages</strong>.
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.hero-card {
  text-align: center;
  padding: 40px 24px;
  margin-bottom: 24px;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
}

.hero-badge {
  display: inline-block;
  background-color: #dbeafe;
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
}

.hero-subtitle {
  max-width: 650px;
  margin: 0 auto 24px auto;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 2rem;
  background-color: #f1f5f9;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.specs-card {
  margin-top: 12px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.specs-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.specs-list li {
  padding-left: 20px;
  position: relative;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.5;
}

.specs-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: bold;
}

code {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--primary);
  font-family: monospace;
}
</style>

