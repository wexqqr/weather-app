let searchBtn = document.querySelector('#search-btn');
let inp = document.querySelector('#city-inp');
let weatherContainer = document.querySelector('.weather-container');
let weatherWrap = document.querySelector('.weather-wrap');
let title = document.querySelector('h1');
let temperature = document.querySelector('.temperature');

searchBtn.addEventListener('click', () => {
    let inpValue = inp.value;
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inpValue}&appid=70d2a276ea80b06b83a71280e5d1795c&units=metric`
    ).then((res) => {
        return res.json();
    }).then((val) => {
        console.log(val);

        function createWeather(weather, cityName, weatherInfo) {
            let a = `
                <h1>${cityName}</h1>
                <img class="weather-img" src="./icons/${checkWeatherDes(weatherInfo)}.png" alt="">
                <span class="temperature">${weather}°C</span>
                <span class="weather-info">${weatherInfo}</span>
                <div class="bottom-line"></div>
            `;
            weatherWrap.innerHTML = a;
        }

        function checkWeatherDes(val) {
            if (val == 'Clear') {
                return 'sun'
            }

            if (val == 'Clouds') {
                return 'cloud'
            }

            if (val == 'Rain') {
                return 'rain'
            }

            if (val == 'Thunderstorm') {
                return 'storm'
            }
        }

        createWeather(Math.floor(val.list[1].main.temp), val.city.name, val.list[1].weather[0].main);

        function getWeekDay(day) {
            const dateTimeStr = day;
            const date = new Date(dateTimeStr);
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            return dayOfWeek;
        }
        

        weatherContainer.innerHTML = `
            <div class="daily-weather">
                <span class="weak-span">${getWeekDay(val.list[7].dt_txt)}</span>
                <img class="daily-weather-img" src='./icons/${checkWeatherDes(val.list[7].weather[0].main)}.png'">
                <span class="daily-temp">${Math.floor(val.list[7].main.temp)}°C</span>
            </div>
            <div class="daily-weather">
                <span class="weak-span">${getWeekDay(val.list[15].dt_txt)}</span>
                <img class="daily-weather-img" src='./icons/${checkWeatherDes(val.list[15].weather[0].main)}.png'">
                <span class="daily-temp">${Math.floor(val.list[15].main.temp)}°C</span>
            </div>
            <div class="daily-weather">
                <span class="weak-span">${getWeekDay(val.list[23].dt_txt)}</span>
                <img class="daily-weather-img"src='./icons/${checkWeatherDes(val.list[23].weather[0].main)}.png'">
                <span class="daily-temp">${Math.floor(val.list[23].main.temp)}°C</span>
            </div>
            <div class="daily-weather">
                <span class="weak-span">${getWeekDay(val.list[31].dt_txt)}</span>
                <img class="daily-weather-img" src='./icons/${checkWeatherDes(val.list[31].weather[0].main)}.png'">
                <span class="daily-temp">${Math.floor(val.list[31].main.temp)}°C</span>
            </div>
            <div class="daily-weather">
                <span class="weak-span">${getWeekDay(val.list[39].dt_txt)}</span>
                <img class="daily-weather-img" src='./icons/${checkWeatherDes(val.list[39].weather[0].main)}.png'">
                <span class="daily-temp">${Math.floor(val.list[39].main.temp)}°C</span>
            </div>
        `;
    })
})