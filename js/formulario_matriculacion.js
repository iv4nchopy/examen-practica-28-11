document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formMatriculacion");
    const resultado = document.getElementById("resultadoMatriculacion");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const cedula = document.getElementById("cedula").value.trim();
        const email = document.getElementById("email").value.trim();
        const curso = document.getElementById("curso").value;

        if (
            nombre === "" ||
            apellido === "" ||
            cedula === "" ||
            email === "" ||
            curso === ""
        ) {
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

        // Guardar datos en localStorage
        localStorage.setItem("matriculacion", JSON.stringify(datosMatricula));

        resultado.innerHTML = `
            ✅ <strong>Matrícula registrada correctamente</strong><br><br>
            <strong>Nombre:</strong> ${nombre} ${apellido}<br>
            <strong>Cédula:</strong> ${cedula}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Curso:</strong> ${curso}<br>
            <strong>Fecha:</strong> ${datosMatricula.fecha}
        `;
        resultado.style.color = "#22c55e";

        // Limpiar formulario
        form.reset();
    });

});
