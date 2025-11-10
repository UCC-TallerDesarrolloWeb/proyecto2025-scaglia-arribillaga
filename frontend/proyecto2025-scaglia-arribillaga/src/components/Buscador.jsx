import { useState } from "react";
import "@styles/buscador.scss";
import lupa from "@assets/lupa.png";

export default function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  const validar = (valor) => {
    // vacío = no error
    if (valor.trim() === "") {
      setError("");
      return;
    }

    // si es número → validar rango
    if (!isNaN(valor)) {
      const num = Number(valor);
      if (num < 1 || num > 1025) {
        setError("El número debe estar entre 1 y 1025.");
        return;
      }
    }

    // nombre demasiado largo
    if (valor.length > 15) {
      setError("El nombre no puede superar los 15 caracteres.");
      return;
    }

    setError("");
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setTexto(v);
    validar(v); // ✅ validación en tiempo real
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) onBuscar(texto.trim().toLowerCase());
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
              onChange={handleChange}
              aria-describedby="error-busqueda"
            />

            <button type="submit" id="btnLupa" disabled={!!error}>
              <img src={lupa} alt="Buscar" />
            </button>
          </div>

          {/* ✅ mensaje accesible */}
          {error && (
            <p
              id="error-busqueda"
              role="alert"
              aria-live="assertive"
              style={{ color: "red", marginTop: "5px" }}
            >
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
