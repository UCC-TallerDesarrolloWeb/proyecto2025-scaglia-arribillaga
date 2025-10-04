document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");

  const lista = document.getElementById("listaPokemons");
  const detalle = document.getElementById("detallePokemon");
  const resultados = document.getElementById("resultadosPokedex");
  const btnVolver = document.getElementById("btnVolver");
  const formBusquedaPrincipal = document.getElementById("formBusquedaPrincipal");
  const formBusquedaAvanzada = document.getElementById("formBusquedaAvanzada");

  let pokemonSeleccionado = null;

  /* ------------------ INTRO ------------------ */
  document.addEventListener("keydown", function introHandler(e) {
    if (e.key === "Enter") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
      document.removeEventListener("keydown", introHandler);
    }
  });

  /* ------------------ FUNCIÓN DE BÚSQUEDA ------------------ */
  function buscarPokemon(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim().toLowerCase();
    const tipo = document.getElementById("tipo")?.value || "";
    const altura = document.getElementById("altura")?.value || "";
    const peso = document.getElementById("peso")?.value || "";

    let contador = 0;
    document.querySelectorAll(".pokemon-card").forEach(card => {
      const { nombre: n, numero, tipo: t, altura: a, peso: p } = card.dataset;
      const nombreCoincide = !nombre || n.includes(nombre) || numero === nombre.padStart(3, "0");
      const tipoCoincide = !tipo || t.toLowerCase() === tipo.toLowerCase();
      const alturaCoincide = !altura || a.toLowerCase().includes(altura.toLowerCase());
      const pesoCoincide = !peso || p.toLowerCase().includes(peso.toLowerCase());

      if (nombreCoincide && tipoCoincide && alturaCoincide && pesoCoincide) {
        card.style.display = "block";
        contador++;
      } else {
        card.style.display = "none";
      }
    });

    document.getElementById("contador").textContent = `Se encontraron ${contador} Pokémon.`;
  }

  /* --- BOTONES --- */
// lupa: búsqueda por nombre/número
document.getElementById("btnLupa").addEventListener("click", buscarPokemon);

// reset filtros
document.getElementById("btnResetear").addEventListener("click", () => {
  document.querySelectorAll("#formBusquedaAvanzada .activo").forEach(div => {
    div.classList.remove("activo");
  });
});

  /* ------------------ DESPLIEGUE MENU DE FILTROS ------------------ */
  
  const abrirFiltro = document.querySelector(".abrirFiltro");
  const abrirFiltroTexto = abrirFiltro.querySelector("h5");
  const abrirFiltroFlecha = abrirFiltro.querySelector("img");

  abrirFiltro.addEventListener("click", () => {
    formBusquedaAvanzada.classList.toggle("active");

    if (formBusquedaAvanzada.classList.contains("active")) {
      abrirFiltroTexto.textContent = "Ocultar búsqueda avanzada";
      abrirFiltroFlecha.src = "imagenes/chevron-arriba.png"; // cambias a flecha arriba
    } else {
      abrirFiltroTexto.textContent = "Mostrar búsqueda avanzada";
      abrirFiltroFlecha.src = "imagenes/chevron-abajo.png"; // vuelve a flecha abajo
    }
  });
  
  document.querySelectorAll("#formBusquedaAvanzada .tipos div, #formBusquedaAvanzada .alturas div, #formBusquedaAvanzada .pesos div")
  .forEach(div => {
    div.addEventListener("click", () => {
      div.classList.toggle("activo"); // activa/desactiva
    });
  });
  
  /* ------------------ MOSTRAR DETALLE ------------------ */
  function mostrarDetalle(card) {
    pokemonSeleccionado = card.dataset.numero;

    resultados.style.display = "none";
    detalle.style.display = "block";

    const { numero, nombre, tipo, altura, peso, evoluciones } = card.dataset;

    // Render detalle
    detalle.querySelector(".contenido-detalle").innerHTML = `
      <h3>#${numero} ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>
      <img src="imagenes/Pokemones/${numero}.png" alt="${nombre}">
      <p><strong>Tipo:</strong> ${tipo}</p>
      <p><strong>Altura:</strong> ${altura}</p>
      <p><strong>Peso:</strong> ${peso}</p>
    `;

    // Render evoluciones clickeables
    const evoContainer = detalle.querySelector(".evoluciones");
    evoContainer.innerHTML = "<h4>Evoluciones</h4>";
    evoluciones.split(",").forEach(evo => {
      evoContainer.innerHTML += `
        <img src="imagenes/Pokemones/${evo}.png" alt="Evolución ${evo}" data-numero="${evo}">
      `;
    });

    // Clic en evolución → abre detalle
    evoContainer.querySelectorAll("img").forEach(img => {
      img.addEventListener("click", () => {
        const evoCard = [...document.querySelectorAll(".pokemon-card")]
          .find(c => c.dataset.numero === img.dataset.numero);
        if (evoCard) mostrarDetalle(evoCard);
      });
    });
  }

  lista.addEventListener("click", (e) => {
    const card = e.target.closest(".pokemon-card");
    if (card) mostrarDetalle(card);
  });

  /* ------------------ VOLVER ------------------ */
  btnVolver.addEventListener("click", () => {
    detalle.style.display = "none";
    resultados.style.display = "block";

    document.querySelectorAll(".pokemon-card").forEach(card => {
      card.classList.toggle("seleccionado", card.dataset.numero === pokemonSeleccionado);
    });

    const seleccionado = document.querySelector(".pokemon-card.seleccionado");
    if (seleccionado) {
      seleccionado.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});
