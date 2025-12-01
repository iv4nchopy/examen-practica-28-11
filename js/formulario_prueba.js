// ✅ INICIALIZAR EMAILJS CON TU PUBLIC KEY
(function () {
  emailjs.init("EdeNOwbMBpBqhSrMF");
})();

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("formPrueba");
  const resultado = document.getElementById("resultadoPrueba");
  const areaRespuestas = document.getElementById("respuestas");

  if (!form || !resultado || !areaRespuestas) {
    console.error("Elementos del formulario de examen no encontrados.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ DATOS DEL ALUMNO (COINCIDEN CON TU TEMPLATE)
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const curso = document.getElementById("curso").value.trim();

    // ✅ RESPUESTAS
    const p1 = document.querySelector('input[name="p1"]:checked');
    const p2 = document.querySelector('input[name="p2"]:checked');
    const p3 = document.getElementById("p3").value.trim();
    const p4 = document.querySelector('input[name="p4"]:checked');
    const p5 = document.querySelector('input[name="p5"]:checked');

    // ✅ VALIDACIÓN TOTAL
    if (!nombre || !apellido || !email || !curso || !p1 || !p2 || !p3 || !p4 || !p5) {
      resultado.innerHTML = "❌ Debes completar todos los datos y preguntas.";
      resultado.style.color = "red";
      return;
    }

    // ✅ CÁLCULO DEL PUNTAJE
    let puntaje = 0;
    if (p1.value === "Python") puntaje++;
    if (p2.value === "Verdadero") puntaje++;
    if (p3.toLowerCase().includes("html")) puntaje++;
    if (p4.value === "Central Processing Unit") puntaje++;
    if (p5.value === "Verdadero") puntaje++;

    // ✅ GENERAR RESUMEN PARA EL TEMPLATE
    const resumenRespuestas = `
1) Lenguaje más usado: ${p1.value}
2) Hardware es físico: ${p2.value}
3) ¿Qué es HTML?: ${p3}
4) Significado de CPU: ${p4.value}
5) Sistema operativo es software: ${p5.value}

PUNTAJE FINAL: ${puntaje} / 5
    `.trim();

    areaRespuestas.value = resumenRespuestas;

    const datosExamen = {
      nombre,
      apellido,
      email,
      curso,
      respuestas: resumenRespuestas,
      puntaje,
      fecha: new Date().toLocaleDateString()
    };

    // ✅ GUARDAR EN LOCALSTORAGE
    localStorage.setItem("resultadoPrueba", JSON.stringify(datosExamen));

    resultado.innerHTML = "⏳ Enviando examen por correo...";
    resultado.style.color = "#eab308";

    // ✅ ENVÍO REAL A TU TEMPLATE DEL EXAMEN
    emailjs.send(
      "service_6dunyyq",     // ✅ TU SERVICE
      "template_kbu100p",    // ✅ TU TEMPLATE DE EXAMEN
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        curso: curso,
        respuestas: resumenRespuestas
      }
    )
    .then(() => {
      resultado.innerHTML = `
        ✅ <strong>Examen enviado correctamente</strong><br><br>
        <strong>Alumno:</strong> ${nombre} ${apellido}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Curso:</strong> ${curso}<br>
        <strong>Puntaje:</strong> ${puntaje} / 5<br>
        <strong>Fecha:</strong> ${datosExamen.fecha}
      `;
      resultado.style.color = "#22c55e";

      form.reset();
      areaRespuestas.value = "";
    })
    .catch((error) => {
      console.error("❌ ERROR EMAILJS EXAMEN:", error);
      resultado.innerHTML = `
        ⚠️ Examen guardado, pero hubo un error al enviar por correo.
      `;
      resultado.style.color = "orange";
    });

  });

});
