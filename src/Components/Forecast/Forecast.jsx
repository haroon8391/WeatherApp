import React from "react";
import "./Forecast.css";

const Forecast = ({ data }) => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayInAWeek = new Date().getDay();
  console.log(data);

  const forecastDays = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));

  const forecasts = data.list;
  const dailyForecasts = {};

  for (const item of forecasts) {
    const dateTimeParts = item.dt_txt.split(" ");
    let datePart = dateTimeParts[0];
    let timePart = dateTimeParts[1];

    if (timePart === "09:00:00") {
      if (!dailyForecasts[datePart]) {
        dailyForecasts[datePart] = item; // Store the first forecast for the day
      }
    }
  }

  const forecastArray = Object.values(dailyForecasts);
  console.log(forecastArray);

  return (
    <>
      <hr />
      <div className="forecast1">
        <div className="forecast2">
          <h2>Upcoming Weather Snapshot</h2>
          <div className="forecast3">
            {forecastArray.map((item, index) => {
              return (
                <div className="forecast4" key={index}>
                  <div className="forecastIcons">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt="error"
                      width={"40px"}
                    />
                  </div>
                  <div className="days">
                    <p>{forecastDays[index]}</p>
                  </div>
                  <div className="description">
                    <p>{item.weather[0].description}</p>
                  </div>
                  <div className="minTemperatureText">
                    <p>{parseInt(item.main.temp_min)}°C </p>
                  </div>
                  <div className="maxTemperatureText">
                    <p>{parseInt(item.main.temp_max)}°C</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
// data.list.slice(0, 7)
