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

  /* ------------------ FUNCIÓN: QUITAR ACENTOS ------------------ */
  function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /* ------------------ INTRO: Enter para continuar ------------------ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && intro && intro.style.display !== "none") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
    }
  });

  /* ------------------ BUSCADOR PRINCIPAL ------------------ */
  const buscarPokemonTexto = (e) => {
    e.preventDefault();
    const termino = quitarAcentos(document.getElementById("nombre").value.trim().toLowerCase());
    const pokemons = document.querySelectorAll(".pokemon-card");
    let contador = 0;

    let terminoFormateado = termino;
    if (!isNaN(termino) && termino !== "") {
      terminoFormateado = termino.padStart(3, "0");
    }

    pokemons.forEach(pokemon => {
      const { nombre, numero } = pokemon.dataset;
      const nombreLower = quitarAcentos(nombre.toLowerCase());

      if (!termino || nombreLower.includes(termino) || numero === terminoFormateado) {
        pokemon.style.display = "block";
        contador++;
      } else {
        pokemon.style.display = "none";
      }
    });

    document.getElementById("contador").textContent =
      `Se encontraron ${contador} Pokémon.`;
  };

  document.getElementById("btnLupa").addEventListener("click", buscarPokemonTexto);

  /* ------------------ DESPLIEGUE MENU DE FILTROS ------------------ */
  const abrirFiltro = document.querySelector(".abrirFiltro");
  const abrirFiltroTexto = abrirFiltro.querySelector("h5");
  const abrirFiltroFlecha = abrirFiltro.querySelector("img");

  abrirFiltro.addEventListener("click", () => {
    formBusquedaAvanzada.classList.toggle("active");
    if (formBusquedaAvanzada.classList.contains("active")) {
      abrirFiltroTexto.textContent = "Ocultar búsqueda avanzada";
      abrirFiltroFlecha.src = "imagenes/chevron-arriba.png";
    } else {
      abrirFiltroTexto.textContent = "Mostrar búsqueda avanzada";
      abrirFiltroFlecha.src = "imagenes/chevron-abajo.png";
    }
  });

  /* ------------------ MOSTRAR DETALLE ------------------ */
  function mostrarDetalle(card) {
    if (!card) return;
    pokemonSeleccionado = card.dataset.numero;

    resultados.style.display = "none";
    detalle.style.display = "block";

  const { numero, nombre, tipo, altura, peso, evoluciones, hp, atk, def, atkesp, defesp, vel } = card.dataset;

  // Info principal
  detalle.querySelector("#detalleImg").src = `imagenes/Pokemones/${numero}.png`;
  detalle.querySelector("#detalleTitulo").textContent =
    `#${numero} ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`;
  detalle.querySelector("#detalleTipo").textContent = "Tipo: " + tipo;
  detalle.querySelector("#detalleAltura").textContent = "Altura: " + altura;
  detalle.querySelector("#detallePeso").textContent = "Peso: " + peso;
  detalle.querySelector("#statHP").textContent = hp;
  detalle.querySelector("#barraHP").innerHTML = "<div class='barraHP' style='width: " + hp/5 + "vw;'></div>";
  detalle.querySelector("#statAtk").textContent = atk;
  detalle.querySelector("#barraAtk").innerHTML = "<div class='barraAtk' style='width: " + atk/5 + "vw;'></div>";
  detalle.querySelector("#statDef").textContent = def;
  detalle.querySelector("#barraDef").innerHTML = "<div class='barraDef' style='width: " + def/5 + "vw;'></div>";
  detalle.querySelector("#statAtkEsp").textContent = atkesp;
  detalle.querySelector("#barraAtkEsp").innerHTML = "<div class='barraAtkEsp' style='width: " + atkesp/5 + "vw;'></div>";
  detalle.querySelector("#statDefEsp").textContent = defesp;
  detalle.querySelector("#barraDefEsp").innerHTML = "<div class='barraDefEsp' style='width: " + defesp/5 + "vw;'></div>";
  detalle.querySelector("#statVel").textContent = vel;
  detalle.querySelector("#barraVel").innerHTML = "<div class='barraVel' style='width: " + vel/5 + "vw;'></div>";

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
          evoDiv.addEventListener("click", () => mostrarDetalle(evoCard));
        }
      });
    } else {
      evoContainer.innerHTML = "<p>Este Pokémon no tiene evoluciones.</p>";
    }
  }

  lista.addEventListener("click", (e) => {
    const card = e.target.closest(".pokemon-card");
    if (card) mostrarDetalle(card);
  });

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
    if (index > 0) mostrarDetalle(cards[index - 1]);
  });

  btnSiguiente.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(c => c.dataset.numero === pokemonSeleccionado);
    if (index < cards.length - 1) mostrarDetalle(cards[index + 1]);
  });

  /* ------------------ FILTROS AVANZADOS ------------------ */
  const botonesTipo = document.querySelectorAll("#formBusquedaAvanzada .tipos div");
  const botonesAltura = document.querySelectorAll("#formBusquedaAvanzada .alturas div");
  const botonesPeso = document.querySelectorAll("#formBusquedaAvanzada .pesos div");

  [...botonesTipo, ...botonesAltura, ...botonesPeso].forEach(div => {
    div.addEventListener("click", () => {
      // TIPOS (máximo 2, deseleccionable)
      if (div.closest(".tipos")) {
        const activos = document.querySelectorAll("#formBusquedaAvanzada .tipos .activo");
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else if (activos.length < 2) {
          div.classList.add("activo");
        } else {
          div.style.animation = "shake 0.2s";
          setTimeout(() => (div.style.animation = "none"), 200);
        }
      }

      // ALTURA (solo uno)
      else if (div.closest(".alturas")) {
        const grupo = div.parentElement.querySelectorAll("div");
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else {
          grupo.forEach(d => d.classList.remove("activo"));
          div.classList.add("activo");
        }
      }

      // PESO (solo uno)
      else if (div.closest(".pesos")) {
        const grupo = div.parentElement.querySelectorAll("div");
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else {
          grupo.forEach(d => d.classList.remove("activo"));
          div.classList.add("activo");
        }
      }

    // Efecto neón rojo visual
if (div.classList.contains("activo")) {
  div.style.boxShadow = "0 0 5px 3px rgba(255, 255, 255, 0.8)"; // rojo
  div.style.border = "1px solid white";
} else {
  div.style.boxShadow = "none";
  div.style.border = "none";
}
    });
  });

  /* ------------------ BOTÓN BUSCAR ------------------ */
  document.getElementById("btnBusqueda").addEventListener("click", (e) => {
    e.preventDefault();

    const tiposSeleccionados = Array.from(document.querySelectorAll("#formBusquedaAvanzada .tipos .activo"))
      .map(b => quitarAcentos(b.dataset.tipo.toLowerCase()));

    const alturaSeleccionada = document.querySelector("#formBusquedaAvanzada .alturas .activo");
    const pesoSeleccionado = document.querySelector("#formBusquedaAvanzada .pesos .activo");

    const alturaValor = alturaSeleccionada ? alturaSeleccionada.dataset.altura : null;
    const pesoValor = pesoSeleccionado ? pesoSeleccionado.dataset.peso : null;

    const pokemons = document.querySelectorAll(".pokemon-card");
    let contador = 0;

    pokemons.forEach(card => {
      let mostrar = true;

      // TIPOS
      if (tiposSeleccionados.length > 0) {
        const tiposPokemon = quitarAcentos(card.dataset.tipo.toLowerCase()).split(",");
        const tieneTodos = tiposSeleccionados.every(tipo => tiposPokemon.includes(tipo));
        if (!tieneTodos) mostrar = false;
      }

      // ALTURA
      if (alturaValor) {
        const alturaStr = card.dataset.altura.replace(",", ".").replace("m", "").trim();
        const alturaNum = parseFloat(alturaStr);
        let catAltura = "medio";
        if (alturaNum < 1) catAltura = "bajo";
        else if (alturaNum > 2) catAltura = "alto";
        if (catAltura !== alturaValor) mostrar = false;
      }

      // PESO
      if (pesoValor) {
        const pesoStr = card.dataset.peso.replace(",", ".").replace("kg", "").trim();
        const pesoNum = parseFloat(pesoStr);
        let catPeso = "medio";
        if (pesoNum < 10) catPeso = "liviano";
        else if (pesoNum > 100) catPeso = "pesado";
        if (catPeso !== pesoValor) mostrar = false;
      }

      card.style.display = mostrar ? "block" : "none";
      if (mostrar) contador++;
    });

    document.getElementById("contador").textContent = `Se encontraron ${contador} Pokémon.`;
  });

  /* ------------------ BOTÓN RESTABLECER ------------------ */
  document.getElementById("btnResetear").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll("#formBusquedaAvanzada .activo").forEach(div => {
      div.classList.remove("activo");
      div.style.boxShadow = "none";
      div.style.border = "none";
    });
    document.querySelectorAll(".pokemon-card").forEach(card => {
      card.style.display = "block";
    });
    document.getElementById("contador").textContent = "Se muestran todos los Pokémon.";
  });
});
