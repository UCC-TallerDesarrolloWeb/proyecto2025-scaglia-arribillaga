import { useState, useEffect } from "react";
import "@styles/layout.scss";

import Buscador from "@components/Buscador";
import BusquedaAvanzada from "@components/BusquedaAvanzada"; // ✅ IMPORTANTE
import PokemonCard from "@components/PokemonCard";
import { getPokemons } from "@api/pokemon";
import logo from "/logo.svg";

export default function PokemonCardPage() {
  const [pokemons, setPokemons] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    getPokemons(1025).then((data) => {
      setPokemons(data);
      setFiltrados(data);
    });
  }, []);

  // ✅ BÚSQUEDA NORMAL
  const buscar = (texto) => {
    if (!texto) {
      setFiltrados(pokemons);
      return;
    }

    const termino = isNaN(texto)
      ? texto.toLowerCase()
      : String(texto).padStart(3, "0");

    const resultados = pokemons.filter((p) => {
      const nombre = p.nombre.toLowerCase();
      return nombre.includes(termino) || p.numero === termino;
    });

    setFiltrados(resultados);
  };

  // ✅ BÚSQUEDA AVANZADA
  const filtrarAvanzado = ({ tipos, altura, peso }) => {
    let resultado = pokemons;

    // TIPOS (máx 2)
    if (tipos.length > 0) {
      resultado = resultado.filter((p) =>
        tipos.every((t) => p.tipos.includes(t))
      );
    }

    // ALTURA
    if (altura) {
      resultado = resultado.filter((p) => {
        if (!p.altura) return false;

        if (altura === "bajo") return p.altura < 1;
        if (altura === "medio") return p.altura >= 1 && p.altura <= 2;
        if (altura === "alto") return p.altura > 2;
      });
    }

    // PESO
    if (peso) {
      resultado = resultado.filter((p) => {
        if (!p.peso) return false;

        if (peso === "liviano") return p.peso < 10;
        if (peso === "medio") return p.peso >= 10 && p.peso <= 100;
        if (peso === "pesado") return p.peso > 100;
      });
    }

    setFiltrados(resultado);
  };

  return (
    <div id="contenido" className="active">
      <header>
        <div className="logoPrincipal">
          <img src={logo} alt="Logo Pokédex" />
        </div>
      </header>

      {/* ✅ Búsqueda normal */}
      <Buscador onBuscar={buscar} />

      {/* ✅ Búsqueda avanzada */}
      <BusquedaAvanzada onFiltrar={filtrarAvanzado} />

      <div id="resultadosPokedex">
        <div className="lista">
          {filtrados.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      </div>
    </div>
  );
} 