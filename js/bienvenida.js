document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formBienvenida");
  const resultado = document.getElementById("resultadoBienvenida");

  if (!form || !resultado) return;

  // ✅ RESTAURAR DATOS GUARDADOS
  const datosGuardados = localStorage.getItem("datosUsuario");
  if (datosGuardados) {
    const datos = JSON.parse(datosGuardados);
    const estadoEdad = datos.edad > 20 ? "✅ Es mayor de 20 años." : "⚠️ Es menor de 20 años.";

    resultado.innerHTML = `
      <strong>Bienvenido:</strong> ${datos.nombre} ${datos.apellido}<br>
      <strong>Edad:</strong> ${datos.edad}<br>
      ${estadoEdad}
    `;
  }

  // ✅ EVENTO DEL BOTÓN INGRESAR
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = parseInt(document.getElementById("edad").value);

    if (!nombre || !apellido || isNaN(edad)) {
      resultado.innerHTML = "❌ Complete todos los campos correctamente.";
      resultado.style.color = "red";
      return;
    }

    const estadoEdad = edad > 20
      ? "✅ Es mayor de 20 años."
      : "⚠️ Es menor de 20 años.";

    const datosUsuario = {
      nombre,
      apellido,
      edad
    };

    // ✅ GUARDAR EN LOCALSTORAGE
    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

    // ✅ MOSTRAR MENSAJE
    resultado.innerHTML = `
      <strong>Bienvenido:</strong> ${nombre} ${apellido}<br>
      <strong>Edad:</strong> ${edad}<br>
      ${estadoEdad}
    `;
    resultado.style.color = "#22c55e";

    form.reset();
  });

});
