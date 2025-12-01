// ✅ INICIALIZAR EMAILJS CON TU PUBLIC KEY REAL
(function () {
  emailjs.init("EdeNOwbMBpBqhSrMF");
})();

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formMatriculacion");
  const resultado = document.getElementById("resultadoMatriculacion");

  if (!form || !resultado) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const email = document.getElementById("email").value.trim();
    const curso = document.getElementById("curso").value;

    // ✅ VALIDACIÓN
    if (!nombre || !apellido || !cedula || !email || !curso) {
      resultado.innerHTML = "❌ Por favor complete todos los campos.";
      resultado.style.color = "red";
      return;
    }

    const datosMatricula = {
      nombre,
      apellido,
      cedula,
      email,
      curso,
      fecha: new Date().toLocaleDateString()
    };

    // ✅ GUARDAR EN LOCALSTORAGE (SIGUE FUNCIONANDO COMO ANTES)
    localStorage.setItem("matriculacion", JSON.stringify(datosMatricula));

    // ✅ MENSAJE DE ENVÍO
    resultado.innerHTML = "⏳ Enviando matrícula por correo...";
    resultado.style.color = "#eab308";

    // ✅ DATOS PARA TU TEMPLATE:
    // {{nombre}} {{apellido}} {{email}} {{curso}}
    const datosEmail = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      curso: curso
    };

    // ✅ ENVÍO REAL CON TUS IDs
    emailjs.send(
      "service_6dunyyq",       // TU SERVICE ID
      "template_je3remf",      // TU TEMPLATE DE MATRÍCULA
      datosEmail
    )
    .then(() => {
      resultado.innerHTML = `
        ✅ <strong>Matrícula registrada y enviada correctamente</strong><br><br>
        <strong>Nombre:</strong> ${nombre} ${apellido}<br>
        <strong>Cédula:</strong> ${cedula}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Curso:</strong> ${curso}<br>
        <strong>Fecha:</strong> ${datosMatricula.fecha}
      `;
      resultado.style.color = "#22c55e";

      form.reset();
    })
    .catch((error) => {
      console.error("❌ ERROR EMAILJS:", error);

      resultado.innerHTML = `
        ⚠️ Matrícula guardada localmente, pero hubo un error al enviar el correo.<br>
        Intenta nuevamente.
      `;
      resultado.style.color = "orange";
    });
  });

});
