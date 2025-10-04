document.addEventListener("DOMContentLoaded", () => { 
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");
  const lista = document.getElementById("listaPokemons");
  const detalle = document.getElementById("detallePokemon");
  const resultados = document.getElementById("resultadosPokedex");
  const btnVolver = document.getElementById("btnVolver");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const formBusqueda = document.getElementById("formBusquedaPrincipal");
  const formBusquedaAvanzada = document.getElementById("formBusquedaAvanzada");

  let pokemonSeleccionado = null;

  /* ------------------ INTRO: Enter para continuar ------------------ */
  const introHandler = (e) => {
    if (e.key === "Enter") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
      document.removeEventListener("keydown", introHandler);
    }
  };
  document.addEventListener("keydown", introHandler);

  /* ------------------ BUSCADOR ------------------ */
 const buscarPokemon = (e) => {
  e.preventDefault();

  const termino = document.getElementById("nombre").value.trim().toLowerCase();
  const pokemons = document.querySelectorAll(".pokemon-card");
  let contador = 0;

  // Si el término es numérico, lo pasamos al formato 3 dígitos (001, 025, etc.)
  let terminoFormateado = termino;
  if (!isNaN(termino) && termino !== "") {
    terminoFormateado = termino.padStart(3, "0");
  }

  pokemons.forEach(pokemon => {
    const { nombre, numero } = pokemon.dataset;
    const nombreLower = nombre.toLowerCase();

    // Coincide si busca por nombre o por número (ya formateado)
    if (
      !termino ||
      nombreLower.includes(termino) ||
      numero === terminoFormateado
    ) {
      pokemon.style.display = "block";
      contador++;
    } else {
      pokemon.style.display = "none";
    }
  });

  document.getElementById("contador").textContent =
    `Se encontraron ${contador} Pokémon.`;
};


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
  if (!card) return;

  pokemonSeleccionado = card.dataset.numero;

  resultados.style.display = "none";
  detalle.style.display = "block";

  const { numero, nombre, tipo, altura, peso, evoluciones } = card.dataset;

  // Info principal
  detalle.querySelector("#detalleImg").src = `imagenes/Pokemones/${numero}.png`;
  detalle.querySelector("#detalleTitulo").textContent =
    `#${numero} ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`;
  detalle.querySelector("#detalleTipo").textContent = tipo;
  detalle.querySelector("#detalleAltura").textContent = altura;
  detalle.querySelector("#detallePeso").textContent = peso;

  // Evoluciones SOLO imágenes en círculos
  const evoContainer = detalle.querySelector("#detalleEvoluciones");
  evoContainer.innerHTML = "";

  if (evoluciones && evoluciones.trim() !== "") {
    const evoList = evoluciones.split(",");
    evoList.forEach(evo => {
      const evoCard = [...document.querySelectorAll(".pokemon-card")]
        .find(c => c.dataset.numero === evo);

      if (evoCard) {
        const evoDiv = document.createElement("div");
        evoDiv.classList.add("evo");
        evoDiv.innerHTML = `
          <div class="evo-circle">
            <img src="imagenes/Pokemones/${evo}.png" alt="${evoCard.dataset.nombre}">
          </div>
        `;
        evoContainer.appendChild(evoDiv);

        // Click en evolución → abre su detalle
        evoDiv.addEventListener("click", () => mostrarDetalle(evoCard));
      }
    });
  } else {
    evoContainer.innerHTML = "<p>Este Pokémon no tiene evoluciones.</p>";
  }

  }

  // Click en tarjeta → detalle
  lista.addEventListener("click", (e) => {
    const card = e.target.closest(".pokemon-card");
    if (card) mostrarDetalle(card);
  });

  // Botón volver
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

  /* ------------------ FLECHAS ROJAS ------------------ */
  btnAnterior.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(c => c.dataset.numero === pokemonSeleccionado);
    if (index > 0) {
      mostrarDetalle(cards[index - 1]);
    }
  });

  btnSiguiente.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(c => c.dataset.numero === pokemonSeleccionado);
    if (index < cards.length - 1) {
      mostrarDetalle(cards[index + 1]);
    }
  });
});