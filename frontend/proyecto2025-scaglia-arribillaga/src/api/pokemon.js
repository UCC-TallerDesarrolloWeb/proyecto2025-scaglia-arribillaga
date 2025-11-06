export async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error("Pokémon no encontrado");
  }

  return await res.json();
}

const traduccionTipos = {
  grass: "planta",
  fire: "fuego",
  water: "agua",
  electric: "electrico",
  ground: "tierra",
  rock: "roca",
  psychic: "psiquico",
  fighting: "lucha",
  ghost: "fantasma",
  ice: "hielo",
  poison: "veneno",
  normal: "normal",
  bug: "bicho",
  flying: "volador",
  fairy: "hada",
  steel: "acero",
  dragon: "dragon",
  dark: "siniestro",
};

// ✅ Obtener la descripción en español
async function obtenerDescripcion(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const entradaES = data.flavor_text_entries.find(
    (e) => e.language.name === "es"
  );

  return entradaES
    ? entradaES.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
    : "Descripción no disponible.";
}

async function obtenerNombreEspanol(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const nombreES = data.names.find((n) => n.language.name === "es");
  return nombreES ? nombreES.name : data.name; // fallback
}

// ✅ Obtener lista de evoluciones como ["001","002","003"]
async function obtenerEvoluciones(id) {
  const resEspecie = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  const dataEspecie = await resEspecie.json();

  const urlCadena = dataEspecie.evolution_chain.url;
  const resCadena = await fetch(urlCadena);
  const dataCadena = await resCadena.json();

  const evoluciones = [];

  function recorrer(cadena) {
    const url = cadena.species.url;
    const id = url.split("/").slice(-2, -1)[0];
    const num = id.padStart(3, "0");
    evoluciones.push(num);

    if (cadena.evolves_to.length > 0) {
      cadena.evolves_to.forEach((evo) => recorrer(evo));
    }
  }

  recorrer(dataCadena.chain);
  return evoluciones;
}

// ✅ Cargar todos los pokémon completos
async function cargarPokemons() {
  const lista = document.getElementById("listaPokemons");
  lista.innerHTML = "";

  const limite = 1025;

  for (let i = 1; i <= limite; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    const numero = String(data.id).padStart(3, "0");
    const nombre = await obtenerNombreEspanol(i);

    // TIPOS traducidos
    const tiposTraducidos = data.types.map((t) => traduccionTipos[t.type.name]);

    // Stats
    const hp = data.stats[0].base_stat;
    const atk = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;
    const atkesp = data.stats[3].base_stat;
    const defesp = data.stats[4].base_stat;
    const vel = data.stats[5].base_stat;

    const peso = data.weight / 10 + " kg";
    const altura = data.height / 10 + " m";

    // Imagen oficial
    const img = data.sprites.other["official-artwork"].front_default;

    // ✅ obtener descripción en español
    const descripcion = await obtenerDescripcion(i);

    // ✅ obtener cadena evolutiva completa
    const listaEvos = await obtenerEvoluciones(i); // ejemplo: ["001","002","003"]
    const evoluciones = listaEvos.join(",");

    // Crear la card
    const card = document.createElement("article");
    card.classList.add("pokemon-card");

    card.dataset.numero = numero;
    card.dataset.nombre = nombre;
    card.dataset.tipo = tiposTraducidos.join(",");
    card.dataset.altura = altura;
    card.dataset.peso = peso;
    card.dataset.evoluciones = evoluciones;
    card.dataset.hp = hp;
    card.dataset.atk = atk;
    card.dataset.def = def;
    card.dataset.atkesp = atkesp;
    card.dataset.defesp = defesp;
    card.dataset.vel = vel;
    card.dataset.descripcion = descripcion;
    card.dataset.img = img;

    // HTML interno
    card.innerHTML = `
      <img src="${img}" alt="${nombre}">
      <h3>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h3>
      <div class="tiposCard">
        ${tiposTraducidos
          .map(
            (t) =>
              `<div class="${t}Card">${
                t.charAt(0).toUpperCase() + t.slice(1)
              }</div>`
          )
          .join("")}
      </div>
    `;

    lista.appendChild(card);
  }
}
cargarPokemons();
