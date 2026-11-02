# 🛍️ SPA con CRUD y Pinia en Vue 3

Single Page Application (SPA) desarrollada con **Vue 3**, **Vue Router 4** y **Pinia**, que implementa un sistema CRUD completo de productos y un carrito de compras interactivo con persistencia en `localStorage`.

---

## 📌 Tabla de Contenidos
- [Características Principales](#-características-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Gestión de Estado (Pinia)](#-gestión-de-estado-pinia)
- [Instalación y Ejecución Local](#-instalación-y-ejecución-local)
- [Publicación en GitHub y GitHub Pages](#-publicación-en-github-y-github-pages)
- [Lista de Verificación de Requisitos](#-lista-de-verificación-de-requisitos)
- [Guía para el Documento PDF de Evidencias](#-guía-para-el-documento-pdf-de-evidencias)

---

## 🚀 Características Principales

1. **SPA con Vue Router:** Navegación fluida e instantánea sin recargas de página mediante `<router-link>` y `<router-view>`.
2. **CRUD Completo de Productos:**
   - **Create (Crear):** Registro de productos con validación de campos.
   - **Read (Leer):** Visualización en tarjetas con filtros dinámicos por búsqueda y categoría.
   - **Update (Actualizar):** Formulario de edición con precarga de datos por ID.
   - **Delete (Eliminar):** Eliminación de productos con confirmación.
3. **Carrito de Compras:**
   - Agregar artículos desde el catálogo.
   - Modificar cantidades (+ / -).
   - Eliminar artículos específicos o vaciar el carrito por completo.
   - Cálculo automático de totales acumulados.
   - Resumen del pedido con número de orden generado al finalizar compra.
4. **Desacoplamiento Estricto:** Toda la lógica de datos se ubica dentro de los Stores de Pinia, no en los componentes de la vista.
5. **Persistencia de Datos:** Uso de `localStorage` para conservar productos y el carrito tras recargar la página.
6. **Diseño Visual Básico y Limpio:** Interfaz ordenada, accesible, responsiva y sin sobrecargas visuales.

---

## 📁 Estructura del Proyecto

```text
proyecto4/
├── .github/
│   └── workflows/
│       └── deploy.yml         # Flujo de GitHub Actions para despliegue automático en GitHub Pages
├── public/
├── src/
│   ├── assets/
│   │   └── main.css           # Estilos CSS ordenados, sencillos y responsivos
│   ├── router/
│   │   └── index.js           # Definición de rutas y configuración de Vue Router
│   ├── stores/
│   │   ├── cart.js            # Store de Pinia para el Carrito de Compras
│   │   └── products.js        # Store de Pinia para la gestión del CRUD de Productos
│   ├── views/
│   │   ├── CartView.vue           # Ruta /carrito (Resumen y gestión del pedido)
│   │   ├── HomeView.vue           # Ruta / (Bienvenida y métricas rápidas)
│   │   ├── ProductCreateView.vue  # Ruta /productos/crear (Formulario de alta)
│   │   ├── ProductEditView.vue    # Ruta /productos/:id (Formulario de edición)
│   │   └── ProductListView.vue    # Ruta /productos (Catálogo de productos con acciones)
│   ├── App.vue                # Componente raíz con Navbar (<router-link>) y Toast alerts
│   └── main.js                # Punto de entrada de la aplicación (Vue + Pinia + Router)
├── index.html                 # Plantilla HTML base
├── package.json               # Dependencias y scripts de Vite
├── vite.config.js             # Configuración de Vite con base relativa para GitHub Pages
└── README.md
```

---

## 🧭 Rutas de la Aplicación

| Ruta | URL | Descripción |
|---|---|---|
| **Inicio** | `/` | Página de bienvenida, resumen del proyecto y métricas rápidas |
| **Productos** | `/productos` | Lista completa de productos (Editar, Eliminar, Agregar al carrito) |
| **Crear producto** | `/productos/crear` | Formulario con validación para registrar un nuevo producto |
| **Editar producto** | `/productos/:id` | Formulario para modificar los datos de un producto existente |
| **Carrito** | `/carrito` | Resumen del carrito, lista de productos, total acumulado y finalizar compra |

---

## 🍍 Gestión de Estado (Pinia)

Toda la lógica de manipulación de estado se concentra en `src/stores/`:

### 1. Store de Productos (`src/stores/products.js`)
- **State:** `products` (arreglo de productos), `notification` (mensajes toast de éxito/error).
- **Getters:** `allProducts`, `totalCount`, `getProductById(id)`.
- **Actions:**
  - `addProduct(productData)`: Valida campos requeridos, genera ID único y almacena.
  - `updateProduct(id, updatedData)`: Actualiza las propiedades del producto seleccionado.
  - `deleteProduct(id)`: Remueve el elemento del listado.
  - `initProducts()` y `saveToStorage()`: Manejan la sincronización con `localStorage`.
  - `resetDefaultProducts()`: Restablece el inventario inicial de demostración.

### 2. Store del Carrito (`src/stores/cart.js`)
- **State:** `items` (arreglo de elementos en el carrito con cantidades).
- **Getters:**
  - `cartItems`: Lista de artículos.
  - `totalCount`: Cantidad total de unidades añadidas.
  - `totalPrice`: Total en dinero calculado automáticamente.
  - `isEmpty`: Indica si el carrito se encuentra vacío.
- **Actions:**
  - `addToCart(product)`: Añade un producto o incrementa su cantidad.
  - `removeFromCart(productId)`: Quita un producto específico.
  - `increaseQuantity(productId)` / `decreaseQuantity(productId)`: Ajusta unidades.
  - `clearCart()`: Vacía todos los productos del carrito.

---

## 💻 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd proyecto4
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre el enlace proporcionado en tu navegador (usualmente `http://localhost:5173/`).

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Publicación en GitHub y GitHub Pages

El proyecto está configurado para publicarse de forma directa y sencilla mediante el comando `npm run deploy` (utilizando la rama `gh-pages`).

### Pasos para publicar:

1. **Subir el código fuente a la rama principal:**
   ```bash
   git push -u origin main
   ```

2. **Publicar el sitio compilado en GitHub Pages con un solo comando:**
   ```bash
   npm run deploy
   ```
   *(Este comando compila el proyecto automáticamente con `npm run build` y sube los archivos a la rama `gh-pages` en tu repositorio).*

3. **Verificar GitHub Pages en tu repositorio:**
   - En tu repositorio de GitHub, entra a **Settings** > **Pages**.
   - En **Build and deployment > Source**, asegúrate de que esté en **Deploy from a branch**.
   - Selecciona la rama **`gh-pages`** y la carpeta **`/(root)`**, y haz clic en **Save**.
   - ¡Listo! En 1 o 2 minutos tu sitio estará en línea en:
     `https://<TU_USUARIO>.github.io/vue-crud-pinia-spa/`

---

## ✅ Lista de Verificación de Requisitos

- [x] **Uso de Vue Router para navegación:** Configurado con rutas requeridas (`/`, `/productos`, `/productos/crear`, `/productos/:id`, `/carrito`).
- [x] **Uso de Pinia para gestionar productos:** Store `products.js` con CRUD y persistencia.
- [x] **Uso de Pinia para gestionar el carrito:** Store `cart.js` con cálculo automático de totales y control de cantidades.
- [x] **Uso de `v-for`:** Renderizado de productos en catálogo, opciones de categorías e ítems en el carrito.
- [x] **Uso de `v-if` / `v-else`:** Estados condicionales de catálogo vacío, filtros sin resultados, carrito vacío y mensajes de éxito.
- [x] **Uso de `v-model` en formularios:** Formularios reactivos bidireccionales en vistas de creación y edición.
- [x] **CRUD completo de productos:** Crear, Listar, Editar y Eliminar funcionando en su totalidad.
- [x] **Funcionalidad de carrito de compras:** Agregar producto, ver resumen, calcular total acumulado, eliminar producto y vaciar carrito.
- [x] **Apartado visual básico y sencillo:** CSS legible, ordenado y responsivo.

---

## 📄 Guía para el Documento PDF de Evidencias

Para armar el PDF de entrega respetando las instrucciones del profesor:
- **Solo una captura por página.**
- **Título en cada página indicando la especificación.**
- **Explicación breve (máximo dos párrafos).**

### Estructura sugerida de páginas:

| Página | Título de la Especificación | Tipo de Captura | Explicación sugerida (Resumen) |
|---|---|---|---|
| **1** | Portada | Portada del trabajo | Datos de los integrantes, materia, fecha y enlaces al repo y GitHub Pages. |
| **2** | Navegación con Vue Router (Interfaz) | Pantalla de la Navbar y vista Inicio | Se implementó el menú de navegación con `<router-link>` permitiendo transiciones SPA instantáneas entre todas las vistas sin recargas. |
| **3** | Navegación con Vue Router (Código) | Captura de `src/router/index.js` | Se configuraron las 5 rutas principales y redirección por defecto utilizando `createWebHashHistory` para compatibilidad en GitHub Pages. |
| **4** | Pinia: Store de Productos (Código) | Captura de `src/stores/products.js` | El store centraliza el estado de los productos con acciones para agregar, editar y eliminar, desacoplando la lógica de los componentes. |
| **5** | Pinia: Store del Carrito (Código) | Captura de `src/stores/cart.js` | Se creó el store del carrito con getters para calcular el total acumulado y conteo de artículos, y acciones para modificar cantidades. |
| **6** | Catálogo y Directiva `v-for` (Interfaz) | Pantalla de `/productos` | Muestra el listado de productos en tarjetas con nombre, precio, categoría y botones de acción utilizando la directiva `v-for`. |
| **7** | Catálogo y Directiva `v-for` (Código) | Captura de `ProductListView.vue` | Demuestra la iteración de la colección de productos con `v-for` vinculando eventos al store de Pinia. |
| **8** | Formulario Crear y `v-model` (Interfaz) | Pantalla de `/productos/crear` | Formulario limpio con campos para nombre, precio, categoría y descripción con validaciones antes de guardar. |
| **9** | Formulario Crear y `v-model` (Código) | Captura de `ProductCreateView.vue` | Muestra el enlace bidireccional mediante `v-model` y la invocación de la acción `addProduct` del store. |
| **10** | Formulario Editar Producto (Interfaz) | Pantalla de `/productos/:id` | Interfaz que precarga los datos actuales del producto mediante el parámetro de ruta para su edición. |
| **11** | Formulario Editar Producto (Código) | Captura de `ProductEditView.vue` | Muestra la obtención del producto por ID (`getProductById`) y la actualización llamando a `updateProduct`. |
| **12** | Eliminación de Producto y `v-if` (Interfaz) | Diálogo de eliminación y lista actualizada | Evidencia el funcionamiento del botón Eliminar y el estado condicional cuando no hay productos con `v-if`. |
| **13** | Carrito de Compras (Interfaz) | Pantalla de `/carrito` con productos | Muestra la tabla de productos seleccionados, cantidades, precio unitario y total acumulado calculado por Pinia. |
| **14** | Carrito de Compras (Código) | Captura de `CartView.vue` | Demuestra el renderizado de los ítems del carrito y los métodos para eliminar artículo y vaciar el carrito. |
| **15** | Despliegue en GitHub Pages (Interfaz) | Pantalla del sitio publicado en vivo | Captura del navegador mostrando la URL de GitHub Pages con el proyecto en funcionamiento. |

