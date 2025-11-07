export const traduccionTipos = {
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
export async function obtenerDescripcion(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const es = data.flavor_text_entries.find(e => e.language.name === "es");
  if (es) return es.flavor_text.replace(/\n|\f/g, " ");

  const en = data.flavor_text_entries.find(e => e.language.name === "en");
  if (en) return en.flavor_text.StringreplaceAll(/\n|\f/g, " ");

  return "Descripción no disponible.";
}
export async function obtenerNombreEspanol(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();
  const nombre = data.names.find(n => n.language.name === "es");
  return nombre ? nombre.name : data.name;
}
export async function obtenerEvoluciones(id) {
  const resEspecie = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const dataEspecie = await resEspecie.json();

  const resCadena = await fetch(dataEspecie.evolution_chain.url);
  const dataCadena = await resCadena.json();

  const evoluciones = [];

  function recorrer(chain) {
    const id = chain.species.url.split("/").slice(-2, -1)[0];
    evoluciones.push(id.padStart(3, "0"));
    chain.evolves_to.forEach(recorrer);
  }

  recorrer(dataCadena.chain);
  return evoluciones;
}

