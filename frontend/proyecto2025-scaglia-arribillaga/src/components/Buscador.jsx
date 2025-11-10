import { useState, useEffect } from "react";
import "@styles/buscador.scss";
import lupa from "@assets/lupa.png";
import Button from "@components/Button"; // nuevo botón genérico

export default function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  //  Validar en tiempo real
  const validar = (valor) => {
    if (valor.trim() === "") {
      setError("");
      return;
    }

    if (!isNaN(valor)) {
      const num = Number(valor);
      if (num < 1 || num > 1025) {
        setError("El número debe estar entre 1 y 1025.");
        return;
      }
    }

    if (valor.length > 15) {
      setError("El nombre no puede superar los 15 caracteres.");
      return;
    }

    setError("");
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setTexto(v);
    validar(v);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!error) {
      //  Guardar el valor en localStorage
      localStorage.setItem("ultimaBusqueda", texto);

      onBuscar(texto.trim().toLowerCase());
    }
  };

  //  Cargar la última búsqueda al entrar
  useEffect(() => {
    const guardado = localStorage.getItem("ultimaBusqueda");
    if (guardado) {
      setTexto(guardado);   // mostrarlo en el input
      validar(guardado);    // volver a validar
    }
  }, []);

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

            {/* Botón genérico */}
            <Button
              type="submit"
              disabled={!!error}
              className="btn-lupa-generico"
            >
              <img src={lupa} alt="Buscar" />
            </Button>
          </div>

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
