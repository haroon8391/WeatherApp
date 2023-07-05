import './App.css';
import Search from './Components/Search/Search';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import { weatherApiUrl, myApiKey } from './Components/Api';
import { useState } from 'react';
import Forecast from './Components/Forecast/Forecast';

function App() {

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {

    const [lat, lon] = searchData.value.split(" ");

    const weatherData = fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`)

    const forecastData = fetch(`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`)

    Promise.all([weatherData, forecastData])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => { console.error(err) })

  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {weather && < CurrentWeather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
