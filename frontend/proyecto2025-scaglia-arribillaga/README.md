# **Pokédex Interactiva — Versión React**

Una Pokédex moderna e interactiva desarrollada con **React**, **SCSS** y **Vite**, que permite buscar, filtrar y explorar Pokémon de forma dinámica.
Incluye animaciones, rutas, filtros avanzados, detalle completo y navegación entre Pokémon.

---

## 📚 Índice

* [Características principales](#caracteristicas-principales)
* [Tecnologías usadas](#tecnologias-usadas)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Instalación y uso](#instalacion-y-uso)
* [Publicación con GitHub Pages](#publicacion-con-github-pages)
* [Autores](#autores)

---

## Características principales

* **Página de introducción animada**, con transición mediante tecla *Enter*.
* **Enrutamiento profesional** usando `react-router-dom` con `<Outlet />` y rutas hijas.
* **Búsqueda por nombre o número**, con:

  * Validación en tiempo real.
  * Mensajes de error accesibles.
  * Última búsqueda guardada en **localStorage**.
* **Filtros avanzados**:

  * Tipos (máximo 2 seleccionados).
  * Altura (bajo, medio, alto).
  * Peso (liviano, medio, pesado).
  * Validaciones accesibles y dinámicas.
* **Detalle completo del Pokémon**:

  * Imagen oficial.
  * Tipo(s), altura, peso y descripción.
  * Stats con barras dinámicas.
  * Línea evolutiva navegable con botones *Anterior* y *Siguiente*.
* **Componente genérico reutilizable** (`Button`), aplicado en búsqueda y filtros.
* **Diseño responsive**, adaptable a distintos tamaños de pantalla.
* **Animaciones suaves**, transiciones y efectos visuales.
* Importaciones limpias mediante **alias** (`@components`, `@styles`, `@pages`, etc.).

---

## Tecnologías usadas

| Tecnología            | Uso                                                          |
| --------------------- | --------------------------------------------------------     |
| **React 18 + Vite**   | Base del proyecto, enrutamiento, estado y renderizado.       |
| **SCSS**              | Estilos, animaciones y responsive design.                    |
| **react-router-dom**  | Navegación entre Intro, Pokédex y Detalle.                   |
| **LocalStorage**      | Persistencia de la última búsqueda realizada.                |
| **JavaScript (ES6+)** | Lógica de búsqueda, filtros, validaciones y navegación.      |
| **Google Fonts**      | Tipografía personalizada.                                    |
| **PokéAPI**           | Datos reales de Pokémon (nombre, stats, tipo, imágenes,etc). |

---

## Estructura del proyecto

```
📦 proyecto2025-scaglia-arribillaga
 ┣ 📂 src
 ┃ ┣📂 api
 ┃ ┃┗ Pokemon.jsx
 ┃ ┣📂 assets
 ┃ ┃┣ lupa.png
 ┃ ┃┗ logo.svg
 ┃ ┣ 📂 components
 ┃ ┃ ┣ Buscador.jsx
 ┃ ┃ ┣ BusquedaAvanzada.jsx
 ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┣ PokemonCard.jsx
 ┃ ┃ ┗ PokemonDetail.jsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ Intro.jsx
 ┃ ┃ ┗ PokemonCardPage.jsx
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ Buscador.scss
 ┃ ┃ ┣ BusquedaAvanzada.scss
 ┃ ┃ ┣ card.scss
 ┃ ┃ ┣ detalle.scss
 ┃ ┃ ┣ globals.scss
 ┃ ┃ ┣ intro.scss
 ┃ ┃ ┗ layout.scss
 ┃ ┣ App.jsx
 ┃ ┣ AppRoutes.jsx
 ┃ ┗ main.jsx
 ┣ 📂 public
 ┃ ┣ chevron-abajo.png / chevron-arriba.png
 ┃ ┣ pokemon-pequeño.png / pokemon-mediano.png / pokemon-alto.png
 ┃ ┗ pluma.png / hombre.png / tanque-de-guerra.png
 ┃ 
 ┣ package.json
 ┗ vite.config.js
```

---

## Instalación y uso

1. Clona este repositorio:

   ```bash
   git clone https://github.com/ucc-tallerdesarrolloweb/proyecto2025-scaglia-arribillaga.git
   ```

2. Ingresa a la carpeta del proyecto:

   ```bash
   cd proyecto2025-scaglia-arribillaga/frontend/proyecto2025-scaglia-arribillaga
   ```

3. Instala dependencias:

   ```bash
   npm install
   ```

4. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la aplicación en tu navegador:

   ```
   http://localhost:5173
   ```

---

## Publicación con GitHub Pages

Este proyecto está publicado en GitHub Pages mediante la rama `gh-pages`.

Puedes acceder a la página desde:

👉 [https://ucc-tallerdesarrolloweb.github.io/proyecto2025-scaglia-arribillaga/](https://ucc-tallerdesarrolloweb.github.io/proyecto2025-scaglia-arribillaga/)

---

### Autores

* **Facundo Arribillaga**
* **Juan Ignacio Scaglia**

---