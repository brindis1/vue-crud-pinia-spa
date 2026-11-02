<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useProductsStore } from '../stores/products'

const cartStore = useCartStore()
const productsStore = useProductsStore()

const orderCompleted = ref(false)
const orderSummary = ref(null)

const handleRemoveItem = (item) => {
  cartStore.removeFromCart(item.id)
  productsStore.showNotification(`"${item.nombre}" eliminado del carrito`, 'info')
}

const handleClearCart = () => {
  if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
    cartStore.clearCart()
    productsStore.showNotification('Carrito vaciado', 'info')
  }
}

const handleCheckout = () => {
  if (cartStore.isEmpty) return

  // Generar resumen del pedido
  orderSummary.value = {
    orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    items: [...cartStore.items],
    total: cartStore.totalPrice,
    itemCount: cartStore.totalCount,
    date: new Date().toLocaleString()
  }

  // Vaciar carrito mediante el store
  cartStore.clearCart()
  orderCompleted.value = true
  productsStore.showNotification('¡Pedido realizado con éxito!', 'success')
}

const handleResetOrderState = () => {
  orderCompleted.value = false
  orderSummary.value = null
}
</script>

<template>
  <div class="cart-view">
    <div class="page-header">
      <div>
        <h1 class="page-title">Resumen del Carrito de Compras</h1>
        <p class="page-subtitle">Revisa tus productos seleccionados y el total de tu orden</p>
      </div>

      <div class="header-actions">
        <router-link to="/productos" class="btn btn-secondary">
          ← Continuar Comprando
        </router-link>
        <button
          v-if="!cartStore.isEmpty"
          @click="handleClearCart"
          class="btn btn-outline-danger"
          title="Eliminar todos los productos"
        >
          🗑️ Vaciar Carrito
        </button>
      </div>
    </div>

    <!-- Mensaje de pedido completado exitosamente (v-if) -->
    <div v-if="orderCompleted && orderSummary" class="card order-success-card">
      <div class="success-icon">🎉</div>
      <h2 class="order-success-title">¡Gracias por tu compra!</h2>
      <p class="page-subtitle">Tu pedido ha sido procesado exitosamente.</p>

      <div class="order-ticket">
        <div class="ticket-row">
          <span>Número de Pedido:</span>
          <strong>{{ orderSummary.orderNumber }}</strong>
        </div>
        <div class="ticket-row">
          <span>Fecha y Hora:</span>
          <span>{{ orderSummary.date }}</span>
        </div>
        <div class="ticket-row">
          <span>Total Artículos:</span>
          <span>{{ orderSummary.itemCount }} unidades</span>
        </div>
        <div class="ticket-row ticket-total">
          <span>Total Pagado:</span>
          <strong>${{ orderSummary.total.toFixed(2) }}</strong>
        </div>
      </div>

      <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center;">
        <button @click="handleResetOrderState" class="btn btn-primary">
          Realizar otra compra
        </button>
        <router-link to="/productos" class="btn btn-secondary">
          Volver a Productos
        </router-link>
      </div>
    </div>

    <!-- Si el carrito está vacío (v-else-if) -->
    <div v-else-if="cartStore.isEmpty" class="card empty-state">
      <div class="empty-state-icon">🛒</div>
      <h3 class="empty-state-title">Tu carrito está vacío</h3>
      <p class="page-subtitle" style="margin-bottom: 20px;">
        Aún no has agregado ningún producto a tu carrito de compras.
      </p>
      <router-link to="/productos" class="btn btn-primary">
        📦 Explorar Catálogo de Productos
      </router-link>
    </div>

    <!-- Resumen y tabla del carrito (v-else) -->
    <div v-else class="cart-layout">
      <!-- Tabla con lista de productos añadidos -->
      <div class="cart-main">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th style="text-align: right;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- Renderizado de la lista con v-for -->
              <tr v-for="item in cartStore.items" :key="item.id">
                <td>
                  <div class="cart-product-info">
                    <span class="cart-item-icon">{{ item.icono || '📦' }}</span>
                    <div>
                      <strong class="cart-item-name">{{ item.nombre }}</strong>
                      <div class="cart-item-category">{{ item.categoria }}</div>
                    </div>
                  </div>
                </td>
                <td>${{ Number(item.precio).toFixed(2) }}</td>
                <td>
                  <div class="qty-control">
                    <button
                      @click="cartStore.decreaseQuantity(item.id)"
                      class="qty-btn"
                      title="Disminuir"
                    >
                      -
                    </button>
                    <span class="qty-value">{{ item.cantidad }}</span>
                    <button
                      @click="cartStore.increaseQuantity(item.id)"
                      class="qty-btn"
                      title="Aumentar"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <strong>${{ (item.precio * item.cantidad).toFixed(2) }}</strong>
                </td>
                <td style="text-align: right;">
                  <button
                    @click="handleRemoveItem(item)"
                    class="btn btn-outline-danger btn-sm"
                    title="Eliminar del carrito"
                  >
                    🗑️ Quitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Resumen del Pedido (Sidebar de totales) -->
      <div class="cart-sidebar">
        <div class="card summary-card">
          <h2 class="summary-title">Resumen del Pedido</h2>

          <div class="summary-row">
            <span>Productos ({{ cartStore.totalCount }} uds):</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <div class="summary-row">
            <span>Envío estimado:</span>
            <span class="text-success font-semibold">Gratis</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total-row">
            <span>Total Acumulado:</span>
            <span class="total-amount">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>

          <button
            @click="handleCheckout"
            class="btn btn-success btn-checkout"
          >
            💳 Finalizar Compra
          </button>

          <p class="summary-note">
            🔒 Compra simulada. Todos los cambios se administran globalmente en Pinia.
          </p>
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

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 860px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

.cart-product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cart-item-icon {
  font-size: 1.6rem;
  background-color: #f1f5f9;
  padding: 6px;
  border-radius: 6px;
}

.cart-item-name {
  color: var(--text-main);
  display: block;
}

.cart-item-category {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: #ffffff;
}

.qty-btn {
  background: none;
  border: none;
  padding: 4px 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--text-main);
  transition: background 0.15s;
}

.qty-btn:hover {
  background-color: #f1f5f9;
}

.qty-value {
  padding: 0 8px;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
}

/* Sidebar Resumen */
.summary-card {
  padding: 20px;
}

.summary-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-main);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.text-success {
  color: var(--success);
}

.font-semibold {
  font-weight: 600;
}

.summary-divider {
  border-top: 1px solid var(--border-color);
  margin: 16px 0;
}

.total-row {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
}

.total-amount {
  color: var(--primary);
  font-size: 1.35rem;
}

.btn-checkout {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  margin-top: 16px;
}

.summary-note {
  font-size: 0.78rem;
  color: var(--text-muted);
  text-align: center;
  margin-top: 14px;
}

/* Modal / Pantalla de éxito */
.order-success-card {
  text-align: center;
  max-width: 550px;
  margin: 0 auto;
  padding: 36px 24px;
}

.success-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.order-success-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.order-ticket {
  background-color: #f8fafc;
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  padding: 18px;
  margin-top: 20px;
  text-align: left;
}

.ticket-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.ticket-total {
  border-top: 1px solid var(--border-color);
  padding-top: 8px;
  margin-top: 8px;
  font-size: 1.05rem;
}
</style>

