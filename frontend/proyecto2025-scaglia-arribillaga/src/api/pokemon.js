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

export async function getPokemons(limit = 1025) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();

  const detalles = await Promise.all(
    data.results.map(async (p) => {
      const r = await fetch(p.url);
      const d = await r.json();

      return {
        id: d.id,
        numero: String(d.id).padStart(3, "0"),
        nombre: d.name,
        nombreES: d.name,
        tipos: d.types.map((t) => traduccionTipos[t.type.name]),
        img: d.sprites.other["official-artwork"].front_default,
        altura: d.height / 10,
        peso: d.weight / 10,
      };
    })
  );

  return detalles;
}
