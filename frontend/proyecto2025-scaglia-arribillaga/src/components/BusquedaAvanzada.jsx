import { useState } from "react";
import "@styles/busquedaAvanzada.scss";

export default function BusquedaAvanzada({ onFiltrar }) {
  const [mostrar, setMostrar] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [altura, setAltura] = useState(null);
  const [peso, setPeso] = useState(null);

  const toggleTipo = (t) => {
    if (tipos.includes(t)) return setTipos(tipos.filter((x) => x !== t));
    if (tipos.length >= 2) return;
    setTipos([...tipos, t]);
  };

  const aplicar = () => onFiltrar({ tipos, altura, peso });
  const reset = () => {
    setTipos([]); setAltura(null); setPeso(null);
    onFiltrar({ tipos: [], altura: null, peso: null });
  };

  return (
    <div className="busqueda-avanzada">

      {/* FORMULARIO */}
      <form id="formBusquedaAvanzada" className={mostrar ? "active" : ""}>
        <div className="filtros">
          {/* TIPOS */}
          <div className="filtroTipos">
            <h4>Tipo</h4>
            <div className="tipos">
              {[
                "acero","fuego","psiquico","agua","hada","roca",
                "bicho","hielo","siniestro","dragon","lucha","tierra",
                "electrico","normal","veneno","fantasma","planta","volador"
              ].map((t) => (
                <div
                  key={t}
                  className={`${t} ${tipos.includes(t) ? "activo" : ""}`}
                  onClick={() => toggleTipo(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </div>
              ))}
            </div>
          </div>

          {/* ALTURA */}
          <div className="filtroAltura">
            <h4>Altura</h4>
            <div className="alturas">
              <div className={altura === "bajo" ? "activo" : ""}  onClick={() => setAltura("bajo")}  >
                <img src="/pokemon-pequeño.png" alt="Pequeño" />
              </div>
              <div className={altura === "medio" ? "activo" : ""} onClick={() => setAltura("medio")} >
                <img src="/pokemon-mediano.png" alt="Mediano" />
              </div>
              <div className={altura === "alto" ? "activo" : ""}  onClick={() => setAltura("alto")}  >
                <img src="/pokemon-alto.png" alt="Alto" />
              </div>
            </div>
          </div>

          {/* PESO */}
          <div className="filtroPeso">
            <h4>Peso</h4>
            <div className="pesos">
              <div className={peso === "liviano" ? "activo" : ""} onClick={() => setPeso("liviano")}>
                <img src="/pluma.png" alt="Liviano" />
              </div>
              <div className={peso === "medio" ? "activo" : ""} onClick={() => setPeso("medio")}>
                <img src="/hombre.png" alt="Intermedio" />
              </div>
              <div className={peso === "pesado" ? "activo" : ""} onClick={() => setPeso("pesado")}>
                <img src="/tanque-de-guerra.png" alt="Pesado" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTONES */}
        <div className="botonesFiltro">
          <button type="button" id="btnBusqueda" onClick={aplicar}>Buscar</button>
          <button type="button" id="btnResetear" onClick={reset}>Restablecer</button>
        </div>
      </form>

      {/* BOTÓN MOSTRAR/OCULTAR – AHORA ABAJO */}
      <div className="abrirFiltro" onClick={() => setMostrar(!mostrar)}>
        <h5>{mostrar ? "Ocultar búsqueda avanzada" : "Mostrar búsqueda avanzada"}</h5>
        <img src={mostrar ? "/chevron-arriba.png" : "/chevron-abajo.png"} alt="Toggle" />
      </div>
    </div>
  );
}
