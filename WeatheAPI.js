import axios from "axios";
export const getWeatherData = async (city) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=475d12ef0f077248c8916ba3971a94aa&units=metric`;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=475d12ef0f077248c8916ba3971a94aa&units=metric`;
    
  
    try {
  
      const response = await axios.get(url);
      
  
      const weatherData = response.data;
      console.log('Weather Data:', weatherData);
  
      return weatherData
    //   const temperature = weatherData.main.temp;
    //   const weatherDescription = weatherData.weather[0].description;
    //   const cityName = weatherData.name;
    //   console.log(`The temperature in ${cityName} is ${temperature}°C with ${weatherDescription}.`);
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

//   getWeatherData("nashik")
  
  
  