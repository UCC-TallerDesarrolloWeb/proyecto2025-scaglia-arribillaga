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

// CACHE para species y cadenas evolutivas (ultra importante)
const speciesCache = {};
const chainCache = {};

//Obtener species ES (nombre + descripción)
async function getSpecies(id) {
  if (speciesCache[id]) return speciesCache[id];

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const entradaES = data.flavor_text_entries.find(
    (e) => e.language.name === "es"
  );

  const descripcion = entradaES
    ? entradaES.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
    : "Descripción no disponible.";

  const nombreES =
    data.names.find((n) => n.language.name === "es")?.name || data.name;

  // guardar en cache
  speciesCache[id] = {
    descripcion,
    nombreES,
    evolution_chain_url: data.evolution_chain.url,
  };

  return speciesCache[id];
}

// Obtener cadena evolutiva completa optimizada
async function getEvolutionChain(url) {
  if (chainCache[url]) return chainCache[url];

  const res = await fetch(url);
  const data = await res.json();

  const lista = [];

  function recorrer(node) {
    const url = node.species.url;
    const id = url.split("/").slice(-2, -1)[0];
    const num = id.padStart(3, "0");
    lista.push(num);

    node.evolves_to.forEach((e) => recorrer(e));
  }

  recorrer(data.chain);

  chainCache[url] = lista;
  return lista;
}

// Obtener un Pokémon completo (rápido y con cache)
async function obtenerPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const d = await res.json();

  const species = await getSpecies(id);
  const evolucionIds = await getEvolutionChain(species.evolution_chain_url);

  return {
    id: d.id,
    numero: String(d.id).padStart(3, "0"),
    nombre: d.name,
    nombreES: species.nombreES,
    tipos: d.types.map((t) => traduccionTipos[t.type.name]),
    img: d.sprites.other["official-artwork"].front_default,

    altura: d.height / 10,
    peso: d.weight / 10,

    hp: d.stats[0].base_stat,
    atk: d.stats[1].base_stat,
    def: d.stats[2].base_stat,
    atkesp: d.stats[3].base_stat,
    defesp: d.stats[4].base_stat,
    vel: d.stats[5].base_stat,

    descripcion: species.descripcion,
    evoluciones: evolucionIds, // ["001","002","003"]
  };
}

// Obtener los pokemones super rápido
export async function getPokemons(limit = 1025) {
  const promesas = [];

  for (let i = 1; i <= limit; i++) {
    promesas.push(obtenerPokemon(i));
  }

  const lista = await Promise.all(promesas);
  return lista;
}

/* ======================================================
                        MOCK 
   ====================================================== */

let logs = []; // base simulada

export function addLog(texto) {
  logs.push({
    texto,
    fecha: new Date().toISOString(),
  });

  // Simula una request exitosa
  return Promise.resolve({ status: "ok" });
}
