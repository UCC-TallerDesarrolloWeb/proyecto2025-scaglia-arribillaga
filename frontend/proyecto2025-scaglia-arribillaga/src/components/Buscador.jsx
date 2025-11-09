import { useState } from "react";
import "@styles/buscador.scss";
import lupa from "@assets/lupa.png";


export default function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  const valor = texto.trim().toLowerCase();

  // Campo vacío
  if (valor === "") {
    alert("No existe un Pokémon con ese número o nombre. Por favor, ingrese un valor existente.");
    return;
  }

  // Validación numérica 1–1025
  const numero = Number(valor);
  if (!isNaN(numero)) {
    if (numero < 1 || numero > 1025) {
      alert("El número ingresado está fuera del rango válido (1 a 1025).");
      return;
    }
  }

  //Si todo está ok
  onBuscar(valor);
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
