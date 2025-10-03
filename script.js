document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");

  // Intro: Enter para continuar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
    }
  });

  // Buscar Pokémon
  const buscarPokemon = (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim().toLowerCase();
    const tipo = document.getElementById("tipo").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;

    const pokemons = document.querySelectorAll(".pokemon-card");
    let contador = 0;

    pokemons.forEach(pokemon => {
      const { nombre: nombrePokemon, tipo: tipoPokemon, altura: alturaPokemon, peso: pesoPokemon } = pokemon.dataset;

      if (
        (!nombre || nombrePokemon.includes(nombre)) &&
        (!tipo || tipoPokemon === tipo) &&
        (!altura || alturaPokemon === altura) &&
        (!peso || pesoPokemon === peso)
      ) {
        pokemon.style.display = "block";
        contador++;
      } else {
        pokemon.style.display = "none";
      }
    });

    document.getElementById("contador").textContent = `Se encontraron ${contador} Pokémon.`;
  };

  document.getElementById("formBusquedaAvanzada")
          .addEventListener("submit", buscarPokemon);
});
