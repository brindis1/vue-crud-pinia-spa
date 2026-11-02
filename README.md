# Tienda SPA - Vue 3 + Pinia

Single Page Application (SPA) desarrollada con Vue 3 que implementa un CRUD de productos y un carrito de compras gestionados con Pinia y navegación con Vue Router.

---

## 🛠️ Tecnologías

- **Vue 3** (Composition API)
- **Pinia** (Gestión de estado global)
- **Vue Router 4** (Navegación SPA)
- **Vite** (Entorno de desarrollo y empaquetado)
- **CSS** (Diseño básico y responsive)

---

## ✨ Características

- **Rutas SPA:**
  - `/` : Página de bienvenida y métricas.
  - `/productos` : Catálogo con lista de productos.
  - `/productos/crear` : Formulario para dar de alta nuevos productos.
  - `/productos/:id` : Formulario para editar un producto existente.
  - `/carrito` : Resumen del pedido y carrito de compras.
- **CRUD de Productos:** Crear, listar, editar y eliminar con persistencia en `localStorage`.
- **Carrito de Compras:** Agregar productos, control de cantidades (+ / -), eliminar artículos, vaciar carrito y cálculo automático del total.
- **Lógica desacoplada:** Toda la lógica de datos está centralizada en los stores de Pinia (`products` y `cart`).

---

## 🚀 Instalación y Uso Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en GitHub Pages

Para publicar los cambios en GitHub Pages:

```bash
npm run deploy
```

> **Sitio publicado en:** [https://brindis1.github.io/vue-crud-pinia-spa/](https://brindis1.github.io/vue-crud-pinia-spa/)
