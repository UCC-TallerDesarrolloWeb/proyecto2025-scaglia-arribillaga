import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllPokemon } from "@api/pokemon";
import PokemonCard from "@components/PokemonCard";

export default function PokemonCardPage({ onBuscar, onFiltrar }) {
  const [pokemons, setPokemons] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setBuscar, setFiltrar } = useOutletContext();

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      const data = await getAllPokemon();
      setPokemons(data);
      setFiltrados(data);
      setLoading(false);
    }

    cargar();
  }, []);

  const buscarPokemon =
    onBuscar ||
    ((valor) => {
      const texto = valor.toLowerCase().trim();

      if (texto === "") {
        setFiltrados(pokemons);
        return;
      }

      const resultado = pokemons.filter((p) => {
        return (
          p.nombre.toLowerCase().includes(texto) ||
          p.numero.includes(texto)
        );
      });

      setFiltrados(resultado);
    });

  const aplicarFiltros =
    onFiltrar ||
    (({ tipos, altura, peso }) => {
      let lista = [...pokemons];

      if (tipos.length > 0) {
        lista = lista.filter((p) => {
          const tiposPokemon = p.tipos.map((t) => t.toLowerCase());
          return tipos.every((t) => tiposPokemon.includes(t));
        });
      }

      if (altura) {
        lista = lista.filter((p) => p.alturaCategoria === altura);
      }

      if (peso) {
        lista = lista.filter((p) => p.pesoCategoria === peso);
      }

      setFiltrados(lista);
    });

  useEffect(() => {
    setBuscar(() => buscarPokemon);
    setFiltrar(() => aplicarFiltros);
  }, [pokemons]);

  return (
    <div className="pokedex-page">
      <section id="resultadosPokedex">
        <h2>Resultados</h2>

        {loading ? (
          <p>Cargando Pokédex...</p>
        ) : (
          <>
            <div className="lista">
              {filtrados.length === 0 && (
                <p>No se encontró ningún Pokémon con esos criterios.</p>
              )}

              {filtrados.map((p) => (
                <PokemonCard key={p.numero} pokemon={p} />
              ))}
            </div>

            <p id="contador">
              Se encontraron {filtrados.length} Pokémon.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
