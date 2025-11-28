document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formOperaciones");
    const resultado = document.getElementById("resultadoOperacion");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const num1 = parseFloat(document.getElementById("num1").value);
            const num2 = parseFloat(document.getElementById("num2").value);
            const operacion = document.getElementById("operacion").value;

            if (isNaN(num1) || isNaN(num2)) {
                resultado.innerHTML = "❌ Ingrese números válidos.";
                resultado.style.color = "red";
                return;
            }

            let res = 0;

            switch (operacion) {
                case "suma":
                    res = num1 + num2;
                    break;
                case "resta":
                    res = num1 - num2;
                    break;
                case "multiplicacion":
                    res = num1 * num2;
                    break;
                case "division":
                    if (num2 === 0) {
                        resultado.innerHTML = "❌ No se puede dividir entre 0.";
                        resultado.style.color = "red";
                        return;
                    }
                    res = num1 / num2;
                    break;
                default:
                    resultado.innerHTML = "❌ Operación no válida.";
                    resultado.style.color = "red";
                    return;
            }

            resultado.innerHTML = `✅ Resultado: <strong>${res}</strong>`;
            resultado.style.color = "#22c55e";
        });
    }

});
