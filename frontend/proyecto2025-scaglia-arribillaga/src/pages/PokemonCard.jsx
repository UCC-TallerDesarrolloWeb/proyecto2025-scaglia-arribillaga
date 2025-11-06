import { useEffect, useState } from "react";
import { getAllPokemon } from "@Data/pokedex";
import PokemonCard from "@components/PokemonCard";
import "@styles/pokedex.scss";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getAllPokemon().then(setPokemons);
  }, []);

  const filtrados = pokemons.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.numero.includes(busqueda)
  );

  return (
    <div className="home">
      <input
        className="inputBusqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar Pokémon..."
      />

      <div className="listaPokemons">
        {filtrados.map(p => (
          <PokemonCard key={p.id} data={p} />
        ))}
      </div>
    </div>
  );
}
