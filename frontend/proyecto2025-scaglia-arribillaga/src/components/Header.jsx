import { useState } from "react";
import Buscador from "@components/Buscador";
import Filtros from "@components/Filtros";

import logo from "@assets/logo.svg"; // imagen desde assets

export default function Header() {
  //Estado para abrir/cerrar el panel de filtros
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const toggleFiltros = () => {
    setMostrarFiltros((prev) => !prev);
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logoPrincipal">
        <img src={logo} alt="Logo Pokédex" />
      </div>

      {/*Buscador principal + filtros */}
      <section className="buscador">
        <Buscador />

        {/*Filtros solo se muestran si mostrarFiltros = true */}
        {mostrarFiltros && <Filtros />}
      </section>

      {/* ✅ Botón para abrir filtros */}
      <div className="abrirFiltro" onClick={toggleFiltros}>
        <h5>
          {mostrarFiltros
            ? "Ocultar búsqueda avanzada"
            : "Mostrar búsqueda avanzada"}
        </h5>

        <img
          src={
            mostrarFiltros
              ? "/chevron-arriba.png" // desde public
              : "/chevron-abajo.png"
          }
          alt="flecha"
        />
      </div>
    </header>
  );
}
