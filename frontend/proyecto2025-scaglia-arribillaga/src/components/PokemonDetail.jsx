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

  // Evoluciones: vienen como ["001","002","003"] -> las mapeo usando listaCompleta
  const evoObjs = (pokemon.evoluciones || [])
    .map((num) =>
      (pokemon.listaCompleta || []).find((p) => p.numero === num)
    )
    .filter(Boolean);

  return (
    <section id="detallePokemon" className="detalle-activo">
      
      {/* Volver */}
       <button id="btnVolver" onClick={onVolver}>⬅ Volver</button>

      <div className="paginaPokemon">
        <div className="detalleGrid">

          {/* Flecha izquierda SOLO si no es el primer Pokémon */}
      {Number(pokemon.numero) > 1 && (
        <button
          className="flechaNav flechaIzquierda"
          onClick={onAnterior}
        >
          ⬅
        </button>
      )}

      {/* Flecha derecha SOLO si no es el último Pokémon */}
      {Number(pokemon.numero) < 1025 && (
        <button
          className="flechaNav flechaDerecha"
          onClick={onSiguiente}
        >
          ➡
        </button>
      )}

          {/* === 1) Imagen + datos === */}
          <div className="detalleCard detallePrincipal">
            <img src={pokemon.img} alt={pokemon.nombreES || pokemon.nombre} />

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

          {/* === 2) Estadísticas === */}
          <div className="detalleCard">
            <h2>Estadísticas</h2>

            <div className="stats">

              {/* HP */}
              <div className="statLabel">HP:</div>
              <div className="statValue">{pokemon.hp}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.hp / 250) * 100}%` }}
                ></div>
              </div>

              {/* Ataque */}
              <div className="statLabel">Ataque:</div>
              <div className="statValue">{pokemon.atk}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.atk / 250) * 100}%` }}
                ></div>
              </div>

              {/* Defensa */}
              <div className="statLabel">Defensa:</div>
              <div className="statValue">{pokemon.def}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.def / 250) * 100}%` }}
                ></div>
              </div>

              {/* Ataque Especial */}
              <div className="statLabel">Ataque Esp:</div>
              <div className="statValue">{pokemon.atkesp}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.atkesp / 250) * 100}%` }}
                ></div>
              </div>

              {/* Defensa Especial */}
              <div className="statLabel">Defensa Esp:</div>
              <div className="statValue">{pokemon.defesp}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.defesp / 250) * 100}%` }}
                ></div>
              </div>

              {/* Velocidad */}
              <div className="statLabel">Velocidad:</div>
              <div className="statValue">{pokemon.vel}</div>
              <div className="statBarContainer">
                <div
                  className="statBar"
                  style={{ width: `${(pokemon.vel / 250) * 100}%` }}
                ></div>
              </div>

            </div>
          </div>

          {/* === 3) Descripción === */}
          <div className="detalleCard">
            <h2 className="descripcionTitulo">Descripción</h2>
            <p>{pokemon.descripcion}</p>
          </div>

          {/* === 4) Evoluciones === */}
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
