import { useState } from "react";
import lupa from "@assets/lupa.png"; //imagen desde assets

export default function Buscador({ onBuscar }) {
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");

  //Validación en tiempo real 
  const handleChange = (e) => {
    const texto = e.target.value;
    setValor(texto);

    if (texto.trim() === "") {
      setError("Ingresá un nombre o número de Pokémon.");
    } else if (!isNaN(texto) && Number(texto) <= 0) {
      setError("El número debe ser mayor que 0.");
    } else {
      setError("");
    }
  };

  //Enviar búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();

    if (error || valor.trim() === "") {
      setError("Ingresá un valor válido.");
      return;
    }

    // Avisar al padre
    onBuscar(valor.toLowerCase());
  };

  return (
    <form className="buscador-form" onSubmit={handleSubmit}>
      <h1>Busca tu Pokémon</h1>

      <div className="busqueda">
        <label htmlFor="nombre">Nombre o Número:</label>

        <div className="botonesBusqueda">
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Bulbasaur o 001"
            value={valor}
            onChange={handleChange} //validación en tiempo real
            maxLength={15}
            autoComplete="off"
          />

          <button type="submit" className="btn-lupa">
            <img src={lupa} alt="Buscar" />
          </button>
        </div>
      </div>

      {/* Mensaje accesible (requisito del parcial) */}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
