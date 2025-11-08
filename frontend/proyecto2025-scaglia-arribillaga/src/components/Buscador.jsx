import { useState } from "react";
import "@styles/buscador.scss";
import lupa from "@assets/lupa.png";

export default function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto.trim().toLowerCase());
  };

  return (
    <section className="buscador">
      <form id="formBusquedaPrincipal" onSubmit={handleSubmit}>
        <h1>Busca tu Pokémon</h1>

        <div className="busqueda">
          <label>Nombre o Número:</label>
          <div className="botonesBusqueda">
            <input
              type="text"
              maxLength="15"
              placeholder="Ej: Bulbasaur o 001"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

           <button type="submit" id="btnLupa">
            <img src={lupa} alt="Lupa" />
           </button>

          </div>
        </div>
      </form>
    </section>
  );
}
