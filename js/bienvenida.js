document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formBienvenida");
    const resultado = document.getElementById("resultadoBienvenida");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const edad = document.getElementById("edad").value.trim();

        if (nombre === "" || apellido === "" || edad === "") {
            resultado.innerHTML = "Por favor complete todos los campos.";
            resultado.style.color = "red";
            return;
        }

        const mensajeEdad = evaluarEdad(parseInt(edad));

        resultado.innerHTML = `
            <p>👋 Bienvenido/a <strong>${nombre} ${apellido}</strong></p>
            <p>Tienes <strong>${edad}</strong> años</p>
            <p>${mensajeEdad}</p>
        `;
        resultado.style.color = "#22c55e";
    });

    // -------------------------
    // MENÚ RESPONSIVO
    // -------------------------
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

});
