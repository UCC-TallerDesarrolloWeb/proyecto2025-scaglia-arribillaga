import "@styles/card.scss";

export default function PokemonCard({ pokemon, onClick }) {
  return (
    <article className="pokemon-card" onClick={onClick}>
      <img src={pokemon.img} alt={pokemon.nombreES} />

      <h3>{pokemon.nombreES}</h3>

      <div className="tiposCard">
        {pokemon.tipos.map((t) => (
          <div key={t} className={`${t}Card`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>
    </article>
  );
}
