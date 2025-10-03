// Mostrar formulario de registro
document.getElementById("mostrarRegistro").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("formRegistro").style.display = "flex";
});

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
    document.getElementById("bienvenida").textContent = `Bienvenido, ${usuario}`;
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
    }
  });

  document.getElementById("contador").textContent = `Se encontraron ${contador} Pokémon.`;
};

// Eventos
document.getElementById("formRegistro").addEventListener("submit", registrarUsuario);
document.getElementById("formLogin").addEventListener("submit", validarLogin);
document.getElementById("formBusquedaAvanzada").addEventListener("submit", buscarPokemon);

// Mostrar login por defecto
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formLogin").style.display = "flex";
  document.getElementById("formRegistro").style.display = "none";
});
