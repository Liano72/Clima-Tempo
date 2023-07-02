// Variáveis e seleção de elementos
const apiKey = "65af5d9250ec8888c93806944ca355df";
const apiCountryURL = "https://www.countryflagicons.com/SHINY/64/DE.png";

//const apiImagensKey = createClient('FayzmuOMcb0vEm1zPcPbfYWsofiByMCuNQxpGVT5LCxqt2sEjphpkflc');

// const form = document.querySelector("#form");
const cityInput = document.querySelector("#city-input"); 
const searchBtn = document.querySelector("#search");

const erro = document.querySelector("#erro");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");


// Funcões
const getWeatherData = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}
const showWeathcerData = async (city) => {
    try {
        const data = await getWeatherData(city);

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", `https://www.countryflagicons.com/SHINY/64/${data.sys.country}.png`);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = parseInt(data.wind.speed) + "Km/h";
        weatherContainer.classList.remove("hide"); 
        erro.classList.add("hide");
    }
    catch(e){
        erro.classList.remove("hide");
        weatherContainer.classList.add("hide");
    }
};
// Eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeathcerData(city);
});
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter"){
        const city = e.target.value;

        showWeathcerData(city);
    }
})