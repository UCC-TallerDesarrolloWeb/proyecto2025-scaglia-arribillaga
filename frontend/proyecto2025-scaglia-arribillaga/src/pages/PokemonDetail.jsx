import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemon } from "@Data/pokedex";
import "@styles/detalle.scss";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poke, setPoke] = useState(null);

  useEffect(() => {
    getPokemon(id).then(setPoke);
  }, [id]);

  if (!poke) return <p>Cargando...</p>;

  return (
    <div className="detallePokemon">
      <button className="volver" onClick={() => navigate(-1)}>Volver</button>

      <img src={poke.img} alt={poke.nombre} />
      <h1>#{poke.numero} {poke.nombre}</h1>

      <p><b>Tipo:</b> {poke.tipos.join(", ")}</p>
      <p><b>Altura:</b> {poke.altura} m</p>
      <p><b>Peso:</b> {poke.peso} kg</p>
      <p><b>Descripción:</b> {poke.descripcion}</p>

      <h3>Evoluciones</h3>
      <div className="evoluciones">
        {poke.evoluciones.map(evo => (
          <div
            key={evo}
            className="evo"
            onClick={() => navigate(`/pokemon/${Number(evo)}`)}
          >
            <span>{evo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
