document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");
  const lista = document.getElementById("listaPokemons");
  const detalle = document.getElementById("detallePokemon");
  const resultados = document.getElementById("resultadosPokedex");
  const btnVolver = document.getElementById("btnVolver");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnteriorPantallaChica = document.getElementById(
    "btnAnteriorMediaChica"
  );
  const btnSiguientePantallaChica = document.getElementById(
    "btnSiguienteMediaChica"
  );
  const formBusqueda = document.getElementById("formBusquedaPrincipal");
  const formBusquedaAvanzada = document.getElementById("formBusquedaAvanzada");

  let pokemonSeleccionado = null;

  /**
   * Elimina los acentos o tildes de un texto para facilitar las comparaciones.
   * @method quitarAcentos
   * @param {string} texto - Cadena original con posibles acentos.
   * @returns {string} - Cadena sin acentos ni caracteres diacríticos.
   */
  const quitarAcentos = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /**
   * Maneja la tecla Enter en la pantalla de introducción.
   * Si se presiona Enter mientras el bloque #intro está visible,
   * aplica una transición y muestra el contenido principal.
   * @method manejarIntroEnter
   * @param {KeyboardEvent} e - Evento de teclado disparado a nivel documento.
   * @returns {void}
   */
  const manejarIntroEnter = (e) => {
    if (e.key === "Enter" && intro && intro.style.display !== "none") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
    }
  };

  document.addEventListener("keydown", manejarIntroEnter);

  /**
   * Valida la entrada del buscador principal.
   * Comprueba si el campo está vacío, o si contiene valores no válidos (cero o negativos).
   * @method validarEntradaBuscador
   * @returns {string|null} - Devuelve el texto limpio o null si no es válido.
   */
  const validarEntradaBuscador = () => {
    const input = document.getElementById("nombre");
    const termino = quitarAcentos(input.value.trim().toLowerCase());

    if (!termino || (!isNaN(termino) && Number(termino) <= 0)) {
      alert(
        "No existe un Pokémon con ese número o nombre. Por favor, ingrese un valor existente."
      );
      input.value = "";

      document.querySelectorAll(".pokemon-card").forEach((card) => {
        card.style.display = "block";
      });
      document.getElementById("contador").textContent =
        "Se muestran todos los Pokémon.";
      resultados.style.display = "block";
      detalle.style.display = "none";

      return null;
    }

    return termino;
  };

  /**
   * Realiza la búsqueda principal de Pokémon según nombre o número.
   * Filtra las tarjetas visibles y muestra la cantidad de resultados encontrados.
   * @method buscarPokemonTexto
   * @param {Event} e - Evento del click o submit del formulario.
   * @returns {void}
   */
  const buscarPokemonTexto = (e) => {
    e.preventDefault();
    const terminoInput = validarEntradaBuscador();
    if (terminoInput === null) return; // se mostró alerta y se limpia

    const pokemons = document.querySelectorAll(".pokemon-card");
    const termino = isNaN(terminoInput)
      ? terminoInput
      : terminoInput.padStart(3, "0");

    let contador = 0;

    pokemons.forEach((pokemon) => {
      const { nombre, numero } = pokemon.dataset;
      const nombreLower = quitarAcentos(nombre.toLowerCase());
      if (nombreLower.includes(termino) || numero === termino) {
        pokemon.style.display = "block";
        contador++;
      } else {
        pokemon.style.display = "none";
      }
    });

    if (contador === 0) {
      alert(
        "No existe un Pokémon con ese número o nombre. Por favor, ingrese un valor existente."
      );
      document.getElementById("nombre").value = "";

      document.querySelectorAll(".pokemon-card").forEach((card) => {
        card.style.display = "block";
      });
      document.getElementById("contador").textContent =
        "Se muestran todos los Pokémon.";
      resultados.style.display = "block";
      detalle.style.display = "none";
      return;
    }

    document.getElementById(
      "contador"
    ).textContent = `Se encontraron ${contador} Pokémon.`;
    resultados.style.display = "block";
    detalle.style.display = "none";
    document
      .getElementById("resultadosPokedex")
      .scrollIntoView({ behavior: "smooth" });
  };

  document
    .getElementById("btnLupa")
    .addEventListener("click", buscarPokemonTexto);
  formBusqueda.addEventListener("submit", buscarPokemonTexto);

  /**
   * Muestra u oculta el formulario de filtros avanzados.
   * Cambia el texto y el ícono de la flecha según el estado actual.
   * @method abrirFiltro
   * @returns {void}
   */
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

  /**
   * Muestra el detalle de un Pokémon seleccionado, incluyendo imagen, stats y evoluciones.
   * @method mostrarDetalle
   * @param {HTMLElement} card - Tarjeta HTML del Pokémon seleccionado.
   * @returns {void}
   */
  const mostrarDetalle = (card) => {
    if (!card) return;
    pokemonSeleccionado = card.dataset.numero;

    resultados.style.display = "none";
    detalle.style.display = "block";

    const {
      numero,
      nombre,
      tipo,
      altura,
      peso,
      evoluciones,
      hp,
      atk,
      def,
      atkesp,
      defesp,
      vel,
      descripcion,
    } = card.dataset;

    detalle.querySelector(
      "#detalleImg"
    ).src = `imagenes/Pokemones/${numero}.png`;
    detalle.querySelector("#detalleTitulo").textContent = `#${numero} ${
      nombre.charAt(0).toUpperCase() + nombre.slice(1)
    }`;
    detalle.querySelector("#detalleTipo").textContent = "Tipo: " + tipo;
    detalle.querySelector("#detalleAltura").textContent = "Altura: " + altura;
    detalle.querySelector("#detallePeso").textContent = "Peso: " + peso;
    detalle.querySelector("#detalleDescripcion").textContent = descripcion;
    detalle.querySelector("#statHP").textContent = hp;
    detalle.querySelector("#barraHP").innerHTML =
      "<div class='barraHP' style='width: calc((" + hp + "/250)*100%);'></div>";
    detalle.querySelector("#statAtk").textContent = atk;
    detalle.querySelector("#barraAtk").innerHTML =
      "<div class='barraAtk' style='width: calc((" +
      atk +
      "/250)*100%);'></div>";
    detalle.querySelector("#statDef").textContent = def;
    detalle.querySelector("#barraDef").innerHTML =
      "<div class='barraDef' style='width: calc((" +
      def +
      "/250)*100%);'></div>";
    detalle.querySelector("#statAtkEsp").textContent = atkesp;
    detalle.querySelector("#barraAtkEsp").innerHTML =
      "<div class='barraAtkEsp' style='width: calc((" +
      atkesp +
      "/250)*100%);'></div>";
    detalle.querySelector("#statDefEsp").textContent = defesp;
    detalle.querySelector("#barraDefEsp").innerHTML =
      "<div class='barraDefEsp' style='width: calc((" +
      defesp +
      "/250)*100%);'></div>";
    detalle.querySelector("#statVel").textContent = vel;
    detalle.querySelector("#barraVel").innerHTML =
      "<div class='barraVel' style='width: calc((" +
      vel +
      "/250)*100%);'></div>";

    const evoContainer = detalle.querySelector("#detalleEvoluciones");
    evoContainer.innerHTML = "";

    if (evoluciones && evoluciones.trim() !== "") {
      const evoList = evoluciones.split(",");
      evoList.forEach((evo) => {
        const evoCard = [...document.querySelectorAll(".pokemon-card")].find(
          (c) => c.dataset.numero === evo
        );

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

    const totalPokemons = document.querySelectorAll(".pokemon-card").length;
    const num = Number(numero);
    
    btnAnterior.style.visibility = num === 1 ? "hidden" : "visible";
    btnSiguiente.style.visibility = num === totalPokemons ? "hidden" : "visible";

    btnAnteriorPantallaChica.style.visibility = num === 1 ? "hidden" : "visible";
    btnSiguientePantallaChica.style.visibility =
    num === totalPokemons ? "hidden" : "visible";
  };

  lista.addEventListener("click", (e) => {
    const card = e.target.closest(".pokemon-card");
    if (card) mostrarDetalle(card);
  });

  /**
   * Permite volver de la vista de detalle a la lista general de Pokémon.
   * Mantiene seleccionado el Pokémon previo y hace scroll hacia él.
   * @method volverALista
   * @returns {void}
   */
  btnVolver.addEventListener("click", () => {
    detalle.style.display = "none";
    resultados.style.display = "block";
    document.querySelectorAll(".pokemon-card").forEach((card) => {
      card.classList.toggle(
        "seleccionado",
        card.dataset.numero === pokemonSeleccionado
      );
    });
    const seleccionado = document.querySelector(".pokemon-card.seleccionado");
    if (seleccionado) {
      seleccionado.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  /**
   * Navega al Pokémon anterior o siguiente en la lista.
   * @method navegarEntrePokemons
   * @param {string} direccion - Define si se navega "anterior" o "siguiente".
   * @returns {void}
   */
  btnAnterior.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(
      (c) => c.dataset.numero === pokemonSeleccionado
    );
    if (index > 0) mostrarDetalle(cards[index - 1]);
  });

  btnSiguiente.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(
      (c) => c.dataset.numero === pokemonSeleccionado
    );
    if (index < cards.length - 1) mostrarDetalle(cards[index + 1]);
  });

  btnAnteriorPantallaChica.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(
      (c) => c.dataset.numero === pokemonSeleccionado
    );
    if (index > 0) mostrarDetalle(cards[index - 1]);
  });

  btnSiguientePantallaChica.addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".pokemon-card")];
    let index = cards.findIndex(
      (c) => c.dataset.numero === pokemonSeleccionado
    );
    if (index < cards.length - 1) mostrarDetalle(cards[index + 1]);
  });

  /**
   * Maneja los clics de los botones de filtros, activando/desactivando clases y efectos visuales.
   * @method manejarInteraccionFiltros
   * @returns {void}
   */
  const botonesTipo = document.querySelectorAll(
    "#formBusquedaAvanzada .tipos div"
  );
  const botonesAltura = document.querySelectorAll(
    "#formBusquedaAvanzada .alturas div"
  );
  const botonesPeso = document.querySelectorAll(
    "#formBusquedaAvanzada .pesos div"
  );

  [...botonesTipo, ...botonesAltura, ...botonesPeso].forEach((div) => {
    div.addEventListener("click", () => {
      if (div.closest(".tipos")) {
        const activos = document.querySelectorAll(
          "#formBusquedaAvanzada .tipos .activo"
        );
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else if (activos.length < 2) {
          div.classList.add("activo");
        } else {
          div.style.animation = "shake 0.2s";
          setTimeout(() => (div.style.animation = "none"), 200);
        }
      } else if (div.closest(".alturas")) {
        const grupo = div.parentElement.querySelectorAll("div");
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else {
          grupo.forEach((d) => d.classList.remove("activo"));
          div.classList.add("activo");
        }
      } else if (div.closest(".pesos")) {
        const grupo = div.parentElement.querySelectorAll("div");
        if (div.classList.contains("activo")) {
          div.classList.remove("activo");
        } else {
          grupo.forEach((d) => d.classList.remove("activo"));
          div.classList.add("activo");
        }
      }

      if (div.classList.contains("activo")) {
        div.style.boxShadow = "0 0 5px 3px rgba(255, 255, 255, 0.8)";
        div.style.border = "1px solid white";
      } else {
        div.style.boxShadow = "none";
        div.style.border = "none";
      }
    });
  });

  /**
   * Aplica los filtros avanzados seleccionados (tipo, altura y peso) a la lista de Pokémon.
   * Si no hay coincidencias, muestra una alerta y restaura la Pokédex completa.
   * @method aplicarFiltrosAvanzados
   * @param {Event} e - Evento del botón Buscar.
   * @returns {void}
   */
  const aplicarFiltrosAvanzados = (e) => {
    e.preventDefault();

    const tiposSeleccionados = Array.from(
      document.querySelectorAll("#formBusquedaAvanzada .tipos .activo")
    ).map((b) => quitarAcentos(b.dataset.tipo.toLowerCase()));

    const alturaSeleccionada = document.querySelector(
      "#formBusquedaAvanzada .alturas .activo"
    );
    const pesoSeleccionado = document.querySelector(
      "#formBusquedaAvanzada .pesos .activo"
    );

    const alturaValor = alturaSeleccionada
      ? alturaSeleccionada.dataset.altura
      : null;
    const pesoValor = pesoSeleccionado ? pesoSeleccionado.dataset.peso : null;

    const pokemons = document.querySelectorAll(".pokemon-card");
    let contador = 0;

    pokemons.forEach((card) => {
      let mostrar = true;

      if (tiposSeleccionados.length > 0) {
        const tiposPokemon = quitarAcentos(
          card.dataset.tipo.toLowerCase()
        ).split(",");
        const tieneTodos = tiposSeleccionados.every((tipo) =>
          tiposPokemon.includes(tipo)
        );
        if (!tieneTodos) mostrar = false;
      }

      if (alturaValor) {
        const alturaStr = card.dataset.altura
          .replace(",", ".")
          .replace("m", "")
          .trim();
        const alturaNum = parseFloat(alturaStr);
        let catAltura = "medio";
        if (alturaNum < 1) catAltura = "bajo";
        else if (alturaNum > 2) catAltura = "alto";
        if (catAltura !== alturaValor) mostrar = false;
      }

      if (pesoValor) {
        const pesoStr = card.dataset.peso
          .replace(",", ".")
          .replace("kg", "")
          .trim();
        const pesoNum = parseFloat(pesoStr);
        let catPeso = "medio";
        if (pesoNum < 10) catPeso = "liviano";
        else if (pesoNum > 100) catPeso = "pesado";
        if (catPeso !== pesoValor) mostrar = false;
      }

      card.style.display = mostrar ? "block" : "none";
      if (mostrar) contador++;
    });

    if (contador === 0) {
      alert("No existe ningún Pokémon con las características ingresadas.");

      pokemons.forEach((card) => {
        card.style.display = "block";
      });

      document.getElementById("contador").textContent =
        "Se muestran todos los Pokémon.";
      resultados.style.display = "block";
      detalle.style.display = "none";
      document
        .getElementById("resultadosPokedex")
        .scrollIntoView({ behavior: "smooth" });

      return;
    }

    document.getElementById(
      "contador"
    ).textContent = `Se encontraron ${contador} Pokémon.`;
    resultados.style.display = "block";
    detalle.style.display = "none";
    document
      .getElementById("resultadosPokedex")
      .scrollIntoView({ behavior: "smooth" });
  };

  document
    .getElementById("btnBusqueda")
    .addEventListener("click", aplicarFiltrosAvanzados);

  /**
   * Restablece todos los filtros avanzados y muestra nuevamente todos los Pokémon.
   * @method resetearFiltros
   * @param {Event} e - Evento del botón Resetear.
   * @returns {void}
   */
  document.getElementById("btnResetear").addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll("#formBusquedaAvanzada .activo")
      .forEach((div) => {
        div.classList.remove("activo");
        div.style.boxShadow = "none";
        div.style.border = "none";
      });
    document.querySelectorAll(".pokemon-card").forEach((card) => {
      card.style.display = "block";
    });
    document.getElementById("contador").textContent =
      "Se muestran todos los Pokémon.";
  });
});
