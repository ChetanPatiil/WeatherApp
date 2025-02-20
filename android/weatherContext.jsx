import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async (city = 'Nashik') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=475d12ef0f077248c8916ba3971a94aa&units=metric`;

    // try {
      const response = await axios.get(url);
      const weatherData = response.data;
      console.log('Weather Data:', weatherData);
      setWeather(weatherData);
    // } catch (error) {
    //   console.error('Error fetching weather data:', error);
    //   setError(error.message);
    // }
  };

  // Use useEffect to call getWeatherData once on component mount
  useEffect(() => {
    getWeatherData('london'); // You can pass the city name as an argument here if needed.
  }, []); // Empty array ensures this only runs once
 console.log(weather);
 
  return (
    <WeatherContext.Provider value={{ weather, error, getWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
