import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPokemon } from "@api/pokemon";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemon(id).then(setPokemon).catch(() => setPokemon(null));
  }, [id]);

  if (!pokemon) return <p>Cargando...</p>;

  const prev = Number(id) - 1;
  const next = Number(id) + 1;

  return (
    <div>
      <h2>{pokemon.name} #{pokemon.id}</h2>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <br />

      <button 
        onClick={() => navigate(`/pokemon/${prev}`)}
        disabled={prev < 1}
      >
        Anterior
      </button>

      <button 
        onClick={() => navigate(`/pokemon/${next}`)}
        disabled={next > 1025}
      >
        Siguiente
      </button>
    </div>
  );
}
