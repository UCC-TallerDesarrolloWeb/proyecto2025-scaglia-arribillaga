import { useState } from "react";

export default function Filtros({ onFiltrar }) {
  const [tipos, setTipos] = useState([]);
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  const toggleTipo = (tipo) => {
    if (tipos.includes(tipo)) {
      setTipos(tipos.filter((t) => t !== tipo));
      return;
    }
    if (tipos.length >= 2) return;
    setTipos([...tipos, tipo]);
  };

  const buscar = () => onFiltrar({ tipos, altura, peso });
  const resetear = () =>
    onFiltrar({ tipos: [], altura: "", peso: "" }) ||
    (setTipos([]), setAltura(""), setPeso(""));

  return (
    <form id="formBusquedaAvanzada" className="active">
      <div className="filtros">

        <div className="filtroTipos">
          <h4>Tipo</h4>
          <div className="tipos">
            {[
              "acero","fuego","psiquico","agua","hada","roca",
              "bicho","hielo","siniestro","dragon","lucha","tierra",
              "electrico","normal","veneno","fantasma","planta","volador",
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

        <div className="filtroTamanos">
          <h4>Altura</h4>
          <div className="alturas">
            <div className={`bajo ${altura==="bajo"?"activo":""}`} onClick={() => setAltura(altura==="bajo"?"": "bajo")}>
              <img src="/pokemon-pequeno.png" />
            </div>
            <div className={`mediano ${altura==="medio"?"activo":""}`} onClick={() => setAltura(altura==="medio"?"": "medio")}>
              <img src="/pokemon-mediano.png" />
            </div>
            <div className={`alto ${altura==="alto"?"activo":""}`} onClick={() => setAltura(altura==="alto"?"": "alto")}>
              <img src="/pokemon-alto.png" />
            </div>
          </div>
        </div>

        <div className="filtroPeso">
          <h4>Peso</h4>
          <div className="pesos">
            <div className={`liviano ${peso==="liviano"?"activo":""}`} onClick={() => setPeso(peso==="liviano"?"": "liviano")}>
              <img src="/pluma.png" />
            </div>
            <div className={`intermedio ${peso==="medio"?"activo":""}`} onClick={() => setPeso(peso==="medio"?"": "medio")}>
              <img src="/hombre.png" />
            </div>
            <div className={`pesado ${peso==="pesado"?"activo":""}`} onClick={() => setPeso(peso==="pesado"?"": "pesado")}>
              <img src="/tanque-de-guerra.png" />
            </div>
          </div>
        </div>

      </div>

      <div className="botonesFiltro">
        <button type="button" id="btnBusqueda" onClick={buscar}>Buscar</button>
        <button type="button" id="btnResetear" onClick={resetear}>Restablecer</button>
      </div>
    </form>
  );
}
