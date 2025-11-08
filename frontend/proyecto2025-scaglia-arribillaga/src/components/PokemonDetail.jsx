import React from "react";
import "@styles/detalle.scss";

export default function PokemonDetail({
  pokemon,
  onVolver,
  onAnterior,
  onSiguiente,
}) {
  if (!pokemon) return null;

  // Asegurar que tipos sea SIEMPRE un array
  const tipos = Array.isArray(pokemon.tipos)
    ? pokemon.tipos
    : String(pokemon.tipos || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  // Evoluciones: vienen como ["001","002","003"] -> las mapeo a objetos usando la lista completa
  const evoObjs = (pokemon.evoluciones || [])
    .map((num) =>
      (pokemon.listaCompleta || []).find((p) => p.numero === num)
    )
    .filter(Boolean);

  return (
    <section id="detallePokemon" className="detalle-activo">
      {/* Volver */}
      <button id="btnVolver" onClick={onVolver}>
        ⬅ Volver
      </button>

      {/* Flechas laterales */}
      <div className="pokemonAnterior">
        <button onClick={onAnterior}>⬅</button>
      </div>
      <div className="pokemonPosterior">
        <button onClick={onSiguiente}>➡</button>
      </div>

      <div className="paginaPokemon">
        <div className="detalleGrid">
          {/* 1) Imagen + datos */}
          <div className="detalleCard detallePrincipal">
            <img
              src={pokemon.img}
              alt={pokemon.nombreES || pokemon.nombre}
            />

            <div className="detalleTexto">
              <h2>
                #{pokemon.numero} {pokemon.nombreES || pokemon.nombre}
              </h2>

              <div className="detalleTipos">
                {tipos.map((t) => (
                  <div key={t} className={`${t}Card`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                ))}
              </div>

              <p>Altura: {pokemon.altura} m</p>
              <p>Peso: {pokemon.peso} kg</p>
            </div>
          </div>

          {/* 2) Stats */}
          <div className="detalleCard">
            <h2>Estadísticas</h2>

            <div className="stats">
              {[
                ["HP", pokemon.hp, "barraHP"],
                ["Ataque", pokemon.atk, "barraAtk"],
                ["Defensa", pokemon.def, "barraDef"],
                ["Ataque Esp", pokemon.atkesp, "barraAtkEsp"],
                ["Defensa Esp", pokemon.defesp, "barraDefEsp"],
                ["Velocidad", pokemon.vel, "barraVel"],
              ].map(([label, val, cls]) => (
                <div key={cls} className="statItem">
                  <span>{label}:</span>
                  <strong>{val}</strong>
                  <div className="statBar">
                    <div
                      className={cls}
                      style={{ width: `calc((${val}/250)*100%)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3) Descripción */}
          <div className="detalleCard">
            <h2 className="descripcionTitulo">Descripción</h2>
            <p>{pokemon.descripcion}</p>
          </div>

          {/* 4) Evoluciones */}
          <div className="detalleCard">
            <h2>Línea Evolutiva</h2>

            <div id="detalleEvoluciones">
              {evoObjs.length ? (
                evoObjs.map((evo) => (
                  <img
                    key={evo.numero}
                    src={evo.img}
                    alt={evo.nombreES || evo.nombre}
                    onClick={() => pokemon.cambiarPokemon(evo.numero)}
                  />
                ))
              ) : (
                <p>Este Pokémon no tiene evoluciones.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
