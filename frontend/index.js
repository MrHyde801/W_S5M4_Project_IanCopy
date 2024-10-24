async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  let weatherWidg = document.querySelector("#weatherWidget");
  let pinfo = document.querySelector('p.info');
  // console.log(weatherWidg)
  weatherWidg.style.display = 'none';

  let dropDown = document.querySelector('select');
  dropDown.addEventListener("change", event => {
    let targetCity = event.target.value
    let weatherURL = `http://localhost:3003/api/weather?city=${targetCity}`

    weatherWidg.style.display = 'none'
    pinfo.style.display = 'inline'
    pinfo.textContent = 'Fetching weather data...'
    dropDown.disabled = true;

    axios.get(weatherURL)
      .then(res => {
        // console.log(res.data.forecast);

        let data = res.data
        let forecast = data.forecast.daily
        pinfo.textContent = ''
        weatherWidg.style.display = 'inline';
        dropDown.disabled = false;
        // console.log(data.current)
        changeCurrentWeather(data)
        changeForecastWeather(forecast)
        document.querySelector('#location :first-child').textContent = targetCity
      })
      .catch(error => {
        console.log(`Something went wrong: ${error.message}`)
      })


  })

  function changeCurrentWeather(cityInfo) {
    let today = cityInfo.current;
    let todayEmoji
    descriptions.forEach(([type, emoji]) => {
      if(today.weather_description === type) {
        todayEmoji = emoji;
      }
    })
    let feelsLike = document.querySelector("#apparentTemp :last-child")

    let tempRange = document.createElement('div');
      tempRange.textContent = `${today.temperature_min}°/${today.temperature_max}°`
    let precipitation = document.createElement('div');
      precipitation.textContent = `Precipitation: ${today.precipitation_probability * 100}%`
    let humidity = document.createElement('div');
      humidity.textContent = `Humidity: ${today.humidity}%`
    let wind = document.createElement('div')
      wind.textContent = `Wind: ${today.wind_speed}m/s
      `
    let todayStats = document.querySelector('#todayStats');
    todayStats.innerHTML = '';
    todayStats.appendChild(tempRange)
    todayStats.appendChild(precipitation)
    todayStats.appendChild(humidity)
    todayStats.appendChild(wind)
    feelsLike.textContent = today.apparent_temperature + "°";
    
    document.querySelector('#todayDescription').textContent = todayEmoji
  }

  function changeForecastWeather(forecastInfo) {
    // console.log(forecastInfo)
  
    const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

    let nextDay = document.querySelectorAll('.next-day.card.col')
    nextDay.forEach((dayCard,index) => {
      let dayCardInfo = dayCard.children;
      let forecastEmoji
      let date = forecastInfo[index].date
      let forecastDate = new Date(`${date}`);
      let day = forecastDate.getDay();
      // console.log(daysOfWeek[day])
      

      descriptions.forEach(([type, emoji]) => {
        if(forecastInfo[index].weather_description === type) {
          forecastEmoji = emoji;
        }
      })
      dayCardInfo[0].textContent = `${daysOfWeek[day]}`;
      dayCardInfo[1].textContent = forecastEmoji;
      dayCardInfo[2].textContent = `${forecastInfo[index].temperature_min}°/${forecastInfo[index].temperature_max}°`
      dayCardInfo[3].textContent = `Precipitation: ${(forecastInfo[index].precipitation_probability * 100)}%`
    })
    
  }

  

  //dayCard info in order (by id)
  //date
  //weather_description
  //temperature_min / temperature_max
  //precipitation_probability

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
