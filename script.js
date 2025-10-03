document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const contenido = document.getElementById("contenido");

<<<<<<< HEAD
// Volver al login
document.getElementById("mostrarLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("formRegistro").style.display = "none";
  document.getElementById("formLogin").style.display = "flex";
});

/**
 * Registrar un nuevo usuario y guardarlo en localStorage
 */
const registrarUsuario = (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuarioRegistro").value.trim();
  const password = document.getElementById("passwordRegistro").value.trim();

  if (usuario.length < 3) {
    alert("El usuario debe tener al menos 3 caracteres");
    return;
  }
  if (password.length < 4) {
    alert("La contraseña debe tener al menos 4 caracteres");
    return;
  }

  localStorage.setItem("usuario", usuario);
  localStorage.setItem("password", password);

  alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
  document.getElementById("formRegistro").reset();

  document.getElementById("formRegistro").style.display = "none";
  document.getElementById("formLogin").style.display = "flex";
};

/**
 * Validar login de usuario
 */
const validarLogin = (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuarioLogin").value.trim();
  const password = document.getElementById("passwordLogin").value.trim();

  const usuarioGuardado = localStorage.getItem("usuario");
  const passwordGuardado = localStorage.getItem("password");

  if (usuario === usuarioGuardado && password === passwordGuardado) {
    document.getElementById("login").style.display = "none";
    document.getElementById("contenido").style.display = "block";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
};

/**
 * Buscar Pokémon por nombre, tipo, altura o peso
 */
const buscarPokemon = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim().toLowerCase();
  const tipo = document.getElementById("tipo").value;
  const altura = document.getElementById("altura").value;
  const peso = document.getElementById("peso").value;

  const pokemons = document.querySelectorAll(".pokemon-card");
  let contador = 0;

  pokemons.forEach(pokemon => {
    const nombrePokemon = pokemon.dataset.nombre;
    const tipoPokemon = pokemon.dataset.tipo;

    if (
      (nombre && nombrePokemon.includes(nombre)) ||
      (tipo && tipoPokemon === tipo) ||
      (!nombre && !tipo) // si no hay filtros, muestra todo
    ) {
      pokemon.style.display = "block";
      contador++;
    } else {
      pokemon.style.display = "none";

        // Evento de intro
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
        contenido.classList.add("active");
      }, 500);
=======

>>>>>>> 65a0e5d367e0328368ec3230620d9e3b76db00f0
    }
  });

  /**
   * Buscar Pokémon por nombre, tipo, altura o peso
   */
  const buscarPokemon = (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim().toLowerCase();
    const tipo = document.getElementById("tipo").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;

    const pokemons = document.querySelectorAll(".pokemon-card");
    let contador = 0;

    pokemons.forEach(pokemon => {
      const nombrePokemon = pokemon.dataset.nombre;
      const tipoPokemon = pokemon.dataset.tipo;
      const alturaPokemon = pokemon.dataset.altura;
      const pesoPokemon = pokemon.dataset.peso;

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

  // Evento del buscador
  document.getElementById("formBusquedaAvanzada")
          .addEventListener("submit", buscarPokemon);
});
