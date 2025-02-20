import axios from "axios";
const getWeatherNews = async () => {
    const url = `https://newsapi.org/v2/everything?q=weather&apiKey=749d60163cca4d6baafddd0d465cffd0`; 

    try {
      const response = await axios.get(url);
      const newsData = response.data.articles;
      console.log('News Data:', newsData[0]);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };
  getWeatherNews()