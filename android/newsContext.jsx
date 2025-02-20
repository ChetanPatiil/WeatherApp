import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherNewsContext = createContext();

const WeatherNewsProvider = ({ children }) => {
  const [news, setNews] = useState(['']);
  const [error, setError] = useState(null);

  const getWeatherNews = async (city) => {
    if (!city) return;

    const url = `https://newsapi.org/v2/everything?q=${city}+weather+forecast&apiKey=749d60163cca4d6baafddd0d465cffd0`;

    try {
      const response = await axios.get(url);
      const newsData = response.data.articles;
      console.log('News Data:', newsData[0]);
  
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getWeatherNews('india'); 
  }, []); 

  return (
    <WeatherNewsContext.Provider value={{ news, error, getWeatherNews }}>
      {children}
    </WeatherNewsContext.Provider>
  );
};

export { WeatherNewsProvider, WeatherNewsContext };
