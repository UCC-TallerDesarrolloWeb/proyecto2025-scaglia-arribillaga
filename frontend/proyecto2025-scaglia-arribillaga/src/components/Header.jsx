import { useState } from "react";
import Buscador from "@components/Buscador";
import Filtros from "@components/Filtros";

import logo from "@assets/logo.png";

export default function Header({ onBuscar, onFiltrar }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const toggleFiltros = () => {
    setMostrarFiltros((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logoPrincipal">
        <img src={logo} alt="Logo Pokédex" />
      </div>

      <section className="buscador">
        <Buscador onBuscar={onBuscar} />
        {mostrarFiltros && <Filtros onFiltrar={onFiltrar} />}
      </section>

      <div className="abrirFiltro" onClick={toggleFiltros}>
        <h5>
          {mostrarFiltros
            ? "Ocultar búsqueda avanzada"
            : "Mostrar búsqueda avanzada"}
        </h5>

        <img
          src={
            mostrarFiltros
              ? "/chevron-arriba.png"
              : "/chevron-abajo.png"
          }
          alt="flecha"
        />
      </div>
    </header>
  );
}
