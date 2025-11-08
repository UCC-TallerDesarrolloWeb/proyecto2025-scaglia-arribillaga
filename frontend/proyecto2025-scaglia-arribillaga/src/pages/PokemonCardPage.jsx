import { useState, useEffect } from "react";
import "@styles/layout.scss";

import Buscador from "@components/Buscador";
import BusquedaAvanzada from "@components/BusquedaAvanzada";
import PokemonCard from "@components/PokemonCard";
import PokemonDetail from "@components/PokemonDetail";
import { getPokemons } from "@api/pokemon";
import logo from "/logo.svg";

export default function PokemonCardPage() {
  const [pokemons, setPokemons] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

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

    if (tipos.length > 0) {
      resultado = resultado.filter((p) =>
        tipos.every((t) => p.tipos.includes(t))
      );
    }

    if (altura) {
      resultado = resultado.filter((p) => {
        if (altura === "bajo") return p.altura < 1;
        if (altura === "medio") return p.altura >= 1 && p.altura <= 2;
        if (altura === "alto") return p.altura > 2;
      });
    }

    if (peso) {
      resultado = resultado.filter((p) => {
        if (peso === "liviano") return p.peso < 10;
        if (peso === "medio") return p.peso >= 10 && p.peso <= 100;
        if (peso === "pesado") return p.peso > 100;
      });
    }

    setFiltrados(resultado);
  };

  // ✅ SELECCIONAR POKÉMON
  const handleSeleccionar = (p) => {
    setPokemonSeleccionado({
      ...p,

      // ✅ IMPORTANTE: mantener array de tipos
      tipos: p.tipos,

      // ✅ Para que evoluciones funcione
      listaCompleta: pokemons,

      cambiarPokemon: (num) => {
        const evo = pokemons.find((x) => x.numero === num);
        if (evo) handleSeleccionar(evo);
      },
    });
  };

  return (
    <div id="contenido" className="active">
      <header>
        <div className="logoPrincipal">
          <img src={logo} alt="Logo Pokédex" />
        </div>
      </header>

      <Buscador onBuscar={buscar} />
      <BusquedaAvanzada onFiltrar={filtrarAvanzado} />

      {/* ✅ Lista de pokémon */}
      {!pokemonSeleccionado && (
        <div id="resultadosPokedex">
          <div className="lista">
            {filtrados.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={() => handleSeleccionar(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ✅ MOSTRAR DETALLE */}
      {pokemonSeleccionado && (
        <PokemonDetail
          pokemon={pokemonSeleccionado}
          onVolver={() => setPokemonSeleccionado(null)}
          onAnterior={() => {
            const i = pokemons.findIndex(
              (x) => x.id === pokemonSeleccionado.id
            );
            if (i > 0) handleSeleccionar(pokemons[i - 1]);
          }}
          onSiguiente={() => {
            const i = pokemons.findIndex(
              (x) => x.id === pokemonSeleccionado.id
            );
            if (i < pokemons.length - 1) handleSeleccionar(pokemons[i + 1]);
          }}
        />
      )}
    </div>
  );
}
