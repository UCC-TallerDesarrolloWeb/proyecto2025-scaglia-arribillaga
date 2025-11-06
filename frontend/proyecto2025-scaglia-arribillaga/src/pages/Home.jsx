import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const buscar = () => {
    if (!id || Number(id) <= 0) return;
    navigate(`/pokemon/${id}`);
  };

  return (
    <div>
      <h1>Pokédex React</h1>

      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Ingresá un número de Pokémon"
      />

      <button onClick={buscar}>Buscar</button>
    </div>
  );
}
