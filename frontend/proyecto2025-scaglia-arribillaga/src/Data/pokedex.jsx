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

export async function getDescripcion(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const entradaES = data.flavor_text_entries.find(e => e.language.name === "es");
  if (entradaES) return entradaES.flavor_text.replace(/\n|\f/g, " ");

  const entradaEN = data.flavor_text_entries.find(e => e.language.name === "en");
  if (entradaEN) return entradaEN.flavor_text.replace(/\n|\f/g, " ");

  return "Descripción no disponible.";
}

export async function getNombreES(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const es = data.names.find(n => n.language.name === "es");
  return es ? es.name : data.name;
}

export async function getEvoluciones(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const resCadena = await fetch(data.evolution_chain.url);
  const cadena = await resCadena.json();

  const evos = [];

  function recorrer(nodo) {
    const url = nodo.species.url;
    const id = url.split("/").slice(-2, -1)[0].padStart(3, "0");
    evos.push(id);
    nodo.evolves_to.forEach(recorrer);
  }

  recorrer(cadena.chain);

  return evos;
}

export async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const numero = String(data.id).padStart(3, "0");

  return {
    id: data.id,
    numero,
    nombre: await getNombreES(id),
    tipos: data.types.map(t => traduccionTipos[t.type.name]),
    hp: data.stats[0].base_stat,
    atk: data.stats[1].base_stat,
    def: data.stats[2].base_stat,
    atkesp: data.stats[3].base_stat,
    defesp: data.stats[4].base_stat,
    vel: data.stats[5].base_stat,
    altura: data.height / 10,
    peso: data.weight / 10,
    img: data.sprites.other["official-artwork"].front_default,
    descripcion: await getDescripcion(id),
    evoluciones: await getEvoluciones(id)
  };
}

export async function getAllPokemon() {
  const limite = 1025;
  const lista = [];

  for (let i = 1; i <= limite; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    lista.push({
      id: i,
      numero: String(i).padStart(3, "0"),
      nombre: data.name,
      tipos: data.types.map(t => traduccionTipos[t.type.name]),
      img: data.sprites.other["official-artwork"].front_default,
      altura: data.height / 10,
      peso: data.weight / 10,
    });
  }

  return lista;
}
