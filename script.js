const validarInputs = (nombre, cantidad, combo) => {
  if (nombre.trim() === "" || isNaN(cantidad) || cantidad <= 0 || combo === "") {
    alert("Por favor completá todos los campos correctamente.");
    return false;
  }
  return true;
};

const calcularTotal = (cantidad, combo) => {
  let precio = 0;
  if (combo === "clásico") precio = 2500;
  if (combo === "doble") precio = 3500;
  if (combo === "vegano") precio = 3000;
  if (combo === "bbq") precio = 3200;
  return cantidad * precio;
};

document.getElementById("calcular").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const combo = document.getElementById("combo").value;

  if (!validarInputs(nombre, cantidad, combo)) {
    document.getElementById("formPedido").reset();
    return;
  }

  const total = calcularTotal(cantidad, combo);
  document.getElementById("resultado").innerText = `Hola ${nombre}, tu total es $${total}`;
});
