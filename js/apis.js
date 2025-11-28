// ================================
// CONFIGURACIÓN GENERAL
// ================================
const OPENWEATHER_API_KEY = "4c18b2eb51944a9b42d33765242e6dc9";

// ================================
// 1️⃣ CLIMA - OpenWeather
// Página: clima.html
// ================================
document.addEventListener("DOMContentLoaded", () => {

    const formClima = document.getElementById("formClima");

    if (formClima) {
        formClima.addEventListener("submit", async (e) => {
            e.preventDefault();

            const ciudad = document.getElementById("ciudad").value.trim();
            const resultado = document.getElementById("resultadoClima");

            if (ciudad === "") {
                resultado.innerHTML = "❌ Ingrese una ciudad.";
                return;
            }

            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod !== 200) {
                    resultado.innerHTML = "❌ Ciudad no encontrada.";
                    return;
                }

                resultado.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>🌡 Temperatura: ${data.main.temp} °C</p>
                    <p>💧 Humedad: ${data.main.humidity}%</p>
                    <p>🌬 Viento: ${data.wind.speed} m/s</p>
                    <p>🌥 Clima: ${data.weather[0].description}</p>
                `;
            } catch (error) {
                resultado.innerHTML = "❌ Error al consultar el clima.";
            }
        });
    }

    // ================================
    // 2️⃣ PAÍSES - REST COUNTRIES
    // Página: paises.html
    // ================================
    const btnPaises = document.getElementById("btnPaises");

    if (btnPaises) {
        btnPaises.addEventListener("click", async () => {
            const contenedor = document.getElementById("resultadoPaises");

            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const data = await res.json();

                contenedor.innerHTML = "";

                data.slice(0, 12).forEach(pais => {
                    contenedor.innerHTML += `
                        <div class="card-descripcion">
                            <h3>${pais.name.common}</h3>
                            <img src="${pais.flags.png}" width="100">
                            <p>Capital: ${pais.capital ? pais.capital[0] : "N/A"}</p>
                            <p>Población: ${pais.population}</p>
                        </div>
                    `;
                });
            } catch (error) {
                contenedor.innerHTML = "❌ Error al cargar países.";
            }
        });
    }

    // ================================
    // 3️⃣ POKÉMON - PokéAPI
    // Página: pokemon.html
    // ================================
    const btnPokemon = document.getElementById("btnPokemon");

    if (btnPokemon) {
        btnPokemon.addEventListener("click", async () => {
            const resultado = document.getElementById("resultadoPokemon");
            const random = Math.floor(Math.random() * 151) + 1;

            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
                const data = await res.json();

                resultado.innerHTML = `
                    <h3>${data.name.toUpperCase()}</h3>
                    <img src="${data.sprites.front_default}">
                    <p>Altura: ${data.height}</p>
                    <p>Peso: ${data.weight}</p>
                `;
            } catch (error) {
                resultado.innerHTML = "❌ Error al cargar Pokémon.";
            }
        });
    }

    // ================================
    // 4️⃣ RICK & MORTY API
    // Página: rick_morty.html
    // ================================
    const btnRick = document.getElementById("btnRick");

    if (btnRick) {
        btnRick.addEventListener("click", async () => {
            const contenedor = document.getElementById("resultadoRick");

            try {
                const res = await fetch("https://rickandmortyapi.com/api/character");
                const data = await res.json();

                contenedor.innerHTML = "";

                data.results.slice(0, 6).forEach(per => {
                    contenedor.innerHTML += `
                        <div class="card-descripcion">
                            <img src="${per.image}" width="120">
                            <h3>${per.name}</h3>
                            <p>Estado: ${per.status}</p>
                            <p>Especie: ${per.species}</p>
                        </div>
                    `;
                });
            } catch (error) {
                contenedor.innerHTML = "❌ Error al cargar personajes.";
            }
        });
    }

    // ================================
    // 5️⃣ CRIPTOMONEDAS - CoinGecko
    // Página: criptomonedas.html
    // ================================
    const btnCripto = document.getElementById("btnCripto");

    if (btnCripto) {
        btnCripto.addEventListener("click", async () => {
            const contenedor = document.getElementById("resultadoCripto");

            try {
                const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
                const data = await res.json();

                contenedor.innerHTML = "";

                data.slice(0, 10).forEach(moneda => {
                    contenedor.innerHTML += `
                        <div class="card-descripcion">
                            <img src="${moneda.image}" width="50">
                            <h3>${moneda.name}</h3>
                            <p>Precio: $${moneda.current_price}</p>
                            <p>Ranking: ${moneda.market_cap_rank}</p>
                        </div>
                    `;
                });
            } catch (error) {
                contenedor.innerHTML = "❌ Error al cargar criptomonedas.";
            }
        });
    }

});
