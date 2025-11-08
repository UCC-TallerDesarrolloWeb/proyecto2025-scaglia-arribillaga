import { useState } from "react";

export default function Filtros({ onFiltrar }) {
  const [tipos, setTipos] = useState([]);
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  // ✅ Manejar selección de tipos (máx 2)
  const toggleTipo = (tipo) => {
    if (tipos.includes(tipo)) {
      setTipos(tipos.filter((t) => t !== tipo));
      return;
    }

    if (tipos.length >= 2) {
      return; // no más de 2
    }

    setTipos([...tipos, tipo]);
  };

  // ✅ Selección única para altura
  const seleccionarAltura = (valor) => {
    setAltura(valor === altura ? "" : valor);
  };

  // ✅ Selección única para peso
  const seleccionarPeso = (valor) => {
    setPeso(valor === peso ? "" : valor);
  };

  // ✅ Enviar filtros
  const buscar = () => {
    onFiltrar({
      tipos,
      altura,
      peso,
    });
  };

  // ✅ Resetear filtros
  const resetear = () => {
    setTipos([]);
    setAltura("");
    setPeso("");

    onFiltrar({
      tipos: [],
      altura: "",
      peso: "",
    });
  };

  return (
    <div className="filtros-container">
      <div className="filtros">

        {/* ✅ Tipos */}
        <div className="filtroTipos">
          <h4>Tipo</h4>
          <div className="tipos">
            {[
              "acero", "fuego", "psiquico", "agua", "hada", "roca",
              "bicho", "hielo", "siniestro", "dragon", "lucha", "tierra",
              "electrico", "normal", "veneno", "fantasma", "planta", "volador"
            ].map((tipo) => (
              <div
                key={tipo}
                className={`tipoBtn ${tipo} ${tipos.includes(tipo) ? "activo" : ""}`}
                onClick={() => toggleTipo(tipo)}
              >
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Altura */}
        <div className="filtroTamanos">
          <h4>Altura</h4>
          <div className="alturas">
            <div
              className={`bajo ${altura === "bajo" ? "activo" : ""}`}
              onClick={() => seleccionarAltura("bajo")}
            >
              <img src="/pokemon-pequeno.png" alt="Pequeño" />
            </div>

            <div
              className={`mediano ${altura === "medio" ? "activo" : ""}`}
              onClick={() => seleccionarAltura("medio")}
            >
              <img src="/pokemon-mediano.png" alt="Mediano" />
            </div>

            <div
              className={`alto ${altura === "alto" ? "activo" : ""}`}
              onClick={() => seleccionarAltura("alto")}
            >
              <img src="/pokemon-alto.png" alt="Alto" />
            </div>
          </div>
        </div>

        {/* ✅ Peso */}
        <div className="filtroPeso">
          <h4>Peso</h4>
          <div className="pesos">
            <div
              className={`liviano ${peso === "liviano" ? "activo" : ""}`}
              onClick={() => seleccionarPeso("liviano")}
            >
              <img src="/pluma.png" alt="Liviano" />
            </div>

            <div
              className={`intermedio ${peso === "medio" ? "activo" : ""}`}
              onClick={() => seleccionarPeso("medio")}
            >
              <img src="/hombre.png" alt="Intermedio" />
            </div>

            <div
              className={`pesado ${peso === "pesado" ? "activo" : ""}`}
              onClick={() => seleccionarPeso("pesado")}
            >
              <img src="/tanque-de-guerra.png" alt="Pesado" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Botones */}
      <div className="botonesFiltro">
        <button type="button" onClick={buscar}>Buscar</button>
        <button type="button" onClick={resetear}>Restablecer</button>
      </div>
    </div>
  );
}
