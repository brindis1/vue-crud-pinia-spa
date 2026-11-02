import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductListView from '../views/ProductListView.vue'
import ProductCreateView from '../views/ProductCreateView.vue'
import ProductEditView from '../views/ProductEditView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Inicio - Tienda SPA' }
  },
  {
    path: '/productos',
    name: 'products',
    component: ProductListView,
    meta: { title: 'Lista de Productos - Tienda SPA' }
  },
  {
    path: '/productos/crear',
    name: 'product-create',
    component: ProductCreateView,
    meta: { title: 'Crear Producto - Tienda SPA' }
  },
  {
    path: '/productos/:id',
    name: 'product-edit',
    component: ProductEditView,
    meta: { title: 'Editar Producto - Tienda SPA' }
  },
  {
    path: '/carrito',
    name: 'cart',
    component: CartView,
    meta: { title: 'Carrito de Compras - Tienda SPA' }
  },
  {
    // Redirección ante rutas no encontradas
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// Usamos createWebHashHistory para garantizar compatibilidad total con GitHub Pages
// (evita errores 404 al recargar la página en servidores estáticos)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

