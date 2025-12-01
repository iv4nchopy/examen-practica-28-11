// =====================================
// CONFIGURACIÓN GENERAL
// =====================================
const OPENWEATHER_API_KEY = "4c18b2eb51944a9b42d33765242e6dc9";

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1️⃣ CLIMA - OpenWeather (clima.html)
  // =====================================
  const formClima = document.getElementById("formClima");

  if (formClima) {
    formClima.addEventListener("submit", async (e) => {
      e.preventDefault();

      const ciudad = document.getElementById("ciudad").value.trim();
      const resultado = document.getElementById("resultadoClima");

      if (!ciudad) {
        resultado.innerHTML = "❌ Ingrese una ciudad.";
        return;
      }

      resultado.innerHTML = "🔎 Buscando clima...";

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
          resultado.innerHTML = "❌ Ciudad no encontrada.";
          return;
        }

        resultado.innerHTML = `
          <div class="card-descripcion">
            <h3>${data.name}</h3>
            <p>🌡 Temperatura: ${data.main.temp} °C</p>
            <p>💧 Humedad: ${data.main.humidity}%</p>
            <p>🌬 Viento: ${data.wind.speed} m/s</p>
            <p>🌥 Clima: ${data.weather[0].description}</p>
          </div>
        `;
      } catch (error) {
        resultado.innerHTML = "⚠️ Error al consultar el clima.";
      }
    });
  }

  // =====================================
  // 2️⃣ PAÍSES - REST Countries (paises.html)
  // =====================================
  const inputPais = document.getElementById("paisInput");
  const btnBuscarPais = document.getElementById("btnBuscarPais");
  const resultadoPais = document.getElementById("resultadoPais");

  if (inputPais && btnBuscarPais && resultadoPais) {
    btnBuscarPais.addEventListener("click", async () => {
      const nombrePais = inputPais.value.trim();

      if (!nombrePais) {
        resultadoPais.innerHTML = "❌ Ingrese el nombre de un país.";
        return;
      }

      resultadoPais.innerHTML = "🔎 Buscando país...";

      try {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}`);
        if (!resp.ok) {
          resultadoPais.innerHTML = "❌ País no encontrado.";
          return;
        }

        const data = await resp.json();
        const pais = data[0];

        resultadoPais.innerHTML = `
          <div class="card-descripcion">
            <h3>${pais.name.common}</h3>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" style="width:150px;">
            <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No disponible"}</p>
            <p><strong>Región:</strong> ${pais.region}</p>
            <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
          </div>
        `;
      } catch (error) {
        resultadoPais.innerHTML = "⚠️ Error al consultar el país.";
      }
    });
  }

  // =====================================
  // 3️⃣ POKÉMON - PokéAPI (pokemon.html)
  // =====================================
  const inputPokemon = document.getElementById("pokemonInput");
  const btnBuscarPokemon = document.getElementById("btnBuscarPokemon");
  const resultadoPokemon = document.getElementById("resultadoPokemon");

  if (inputPokemon && btnBuscarPokemon && resultadoPokemon) {
    btnBuscarPokemon.addEventListener("click", async () => {
      const nombrePokemon = inputPokemon.value.trim().toLowerCase();

      if (!nombrePokemon) {
        resultadoPokemon.innerHTML = "❌ Ingrese el nombre de un Pokémon.";
        return;
      }

      resultadoPokemon.innerHTML = "🔎 Buscando Pokémon...";

      try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombrePokemon)}`);
        if (!resp.ok) {
          resultadoPokemon.innerHTML = "❌ Pokémon no encontrado.";
          return;
        }

        const data = await resp.json();

        resultadoPokemon.innerHTML = `
          <div class="card-descripcion">
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${data.sprites.other['official-artwork'].front_default}" 
                 alt="${data.name}" class="pokemon-img">
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
          </div>
        `;
      } catch (error) {
        resultadoPokemon.innerHTML = "⚠️ Error al consultar el Pokémon.";
      }
    });
  }

  // =====================================
  // 4️⃣ RICK & MORTY (rick_morty.html)
  // =====================================
  const inputRick = document.getElementById("rickInput");
  const btnBuscarRick = document.getElementById("btnBuscarRick");
  const resultadoRick = document.getElementById("resultadoRick");

  if (inputRick && btnBuscarRick && resultadoRick) {
    btnBuscarRick.addEventListener("click", async () => {
      const nombrePersonaje = inputRick.value.trim();

      if (!nombrePersonaje) {
        resultadoRick.innerHTML = "❌ Ingrese el nombre de un personaje.";
        return;
      }

      resultadoRick.innerHTML = "🔎 Buscando personaje...";

      try {
        const resp = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nombrePersonaje)}`);
        if (!resp.ok) {
          resultadoRick.innerHTML = "❌ Personaje no encontrado.";
          return;
        }

        const data = await resp.json();
        const personaje = data.results[0];

        resultadoRick.innerHTML = `
          <div class="card-descripcion">
            <h3>${personaje.name}</h3>
            <img src="${personaje.image}" alt="${personaje.name}" class="rick-img">
            <p><strong>Estado:</strong> ${personaje.status}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
          </div>
        `;
      } catch (error) {
        resultadoRick.innerHTML = "⚠️ Error al consultar personaje.";
      }
    });
  }

  // =====================================
  // 5️⃣ CRIPTOMONEDAS - CoinGecko (criptomonedas.html)
  // =====================================
  const inputCripto = document.getElementById("criptoInput");
  const btnBuscarCripto = document.getElementById("btnBuscarCripto");
  const resultadoCripto = document.getElementById("resultadoCripto");

  if (inputCripto && btnBuscarCripto && resultadoCripto) {
    btnBuscarCripto.addEventListener("click", async () => {
      const nombreCripto = inputCripto.value.trim().toLowerCase();

      if (!nombreCripto) {
        resultadoCripto.innerHTML = "❌ Ingrese el nombre de una criptomoneda.";
        return;
      }

      resultadoCripto.innerHTML = "🔎 Buscando criptomoneda...";

      try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/coins/${encodeURIComponent(nombreCripto)}`);
        if (!resp.ok) {
          resultadoCripto.innerHTML = "❌ Criptomoneda no encontrada.";
          return;
        }

        const data = await resp.json();

        resultadoCripto.innerHTML = `
          <div class="card-descripcion">
            <h3>${data.name}</h3>
            <img src="${data.image.large}" alt="${data.name}" style="width:120px; margin:10px auto; display:block;">
            <p><strong>Precio USD:</strong> $${data.market_data.current_price.usd}</p>
            <p><strong>Capitalización:</strong> $${data.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>Ranking:</strong> #${data.market_cap_rank}</p>
          </div>
        `;
      } catch (error) {
        resultadoCripto.innerHTML = "⚠️ Error al consultar la criptomoneda.";
      }
    });
  }

});
