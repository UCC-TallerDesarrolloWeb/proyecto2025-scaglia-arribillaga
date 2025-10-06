# Pokédex Interactiva

Una Pokédex moderna e interactiva desarrollada con **HTML, CSS y JavaScript**.  
Permite buscar, filtrar y explorar Pokémon de manera dinámica, con una interfaz visual atractiva y responsive.

---

## Características principales

- Búsqueda por nombre o número con autocompletado parcial (ejemplo: “Pika”, “025”).  
- Filtros avanzados por:
  - Tipos (Fuego, Agua, Planta, etc.) — selección hasta 2 tipos.
  - Altura (bajo, medio, alto).
  - Peso (liviano, medio, pesado).
- Vista detallada de cada Pokémon con:
  - Imagen oficial.
  - Tipo(s), altura, peso y descripción.
  - Estadísticas base (HP, Ataque, Defensa, Velocidad, etc.) con barras dinámicas.
  - Línea evolutiva navegable.
- Diseño responsivo adaptable a diferentes tamaños de pantalla.  
- Animaciones y efectos visuales para una experiencia fluida.  
- Navegación sencilla con botones de avance y retroceso entre Pokémon.

---

## Tecnologías usadas

| Tecnología | Uso |
|------------|------|
| **HTML5** | Estructura de la página y tarjetas de Pokémon. |
| **CSS3** | Estilos, animaciones y diseño responsive. |
| **JavaScript (Vanilla)** | Lógica de búsqueda, filtros y renderizado dinámico. |
| **Google Fonts** | Tipografía personalizada. |

---

## Estructura del proyecto

```
📦 proyecto-pokedex
 ┣ 📂 imagenes
 ┃ ┣ logo.png / logo.svg
 ┃ ┣ lupa.png
 ┃ ┣ chevron-abajo.png / chevron-arriba.png
 ┃ ┣ pokemon-pequeño.png / pokemon-mediano.png / pokemon-alto.png
 ┃ ┗ Pokemones/001.png ... (sprites de cada Pokémon)
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┗ 📜 script.js
```

---

## Instalación y uso

1. Clona este repositorio:
```bash
git clone https://github.com/tuusuario/tu-repositorio.git
```

2. Abre el archivo `index.html` en tu navegador o usa una extensión como **Live Server** para visualizar la página con recarga automática.

3. Explora la Pokédex:  
   - Usa el buscador principal para encontrar un Pokémon por nombre o número.  
   - Haz clic en “Mostrar búsqueda avanzada” para filtrar por tipo, altura y peso.  
   - Selecciona una tarjeta para ver sus estadísticas y evoluciones.

---

## Publicación con GitHub Pages

-
---

## Autores

- **Arribillaga**  
- **Scaglia**

---

## Mejoras futuras

- Agregar paginación para listas largas de Pokémon.  
- Integrar la API oficial (PokéAPI) para cargar datos dinámicos.  
- Implementar un modo oscuro y opciones de personalización de la interfaz.  
