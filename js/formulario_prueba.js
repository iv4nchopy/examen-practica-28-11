document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPrueba");
    const resultado = document.getElementById("resultadoPrueba");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const p1 = document.querySelector('input[name="p1"]:checked');
        const p2 = document.querySelector('input[name="p2"]:checked');
        const p3 = document.getElementById("p3").value.trim();
        const p4 = document.querySelector('input[name="p4"]:checked');
        const p5 = document.querySelector('input[name="p5"]:checked');

        if (!nombre || !p1 || !p2 || !p3 || !p4 || !p5) {
            resultado.innerHTML = "❌ Debes completar todas las preguntas.";
            resultado.style.color = "red";
            return;
        }

        let puntaje = 0;

        // Respuestas correctas
        if (p1.value === "python") puntaje++;
        if (p2.value === "true") puntaje++;
        if (p3.toLowerCase().includes("html")) puntaje++;
        if (p4.value === "cpu") puntaje++;
        if (p5.value === "true") puntaje++;

        const datosExamen = {
            nombre,
            puntaje,
            fecha: new Date().toLocaleDateString()
        };

        localStorage.setItem("resultadoPrueba", JSON.stringify(datosExamen));

        resultado.innerHTML = `
            ✅ <strong>Examen finalizado correctamente</strong><br><br>
            <strong>Alumno:</strong> ${nombre}<br>
            <strong>Puntaje:</strong> ${puntaje} / 5<br>
            <strong>Fecha:</strong> ${datosExamen.fecha}
        `;
        resultado.style.color = "#22c55e";

        form.reset();
    });

});
