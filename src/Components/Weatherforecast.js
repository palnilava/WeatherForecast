import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForecast.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('kolkata');
  const [numOfDays, setNumOfDays] = useState(5);
  // const [submitted, setSubmitted] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    // setSubmitted(false);
  };
  
  const handleNumOfDaysChange = (e) => {
    setNumOfDays(Number(e.target.value));
    // setSubmitted(false);
  };

  useEffect(() => {
    // if (submitted) {
      const fetchForecastData = async () => {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=${numOfDays +1}`
          );
          console.log(response.data);
          setForecastData(response.data.forecast.forecastday);
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      };
  
      fetchForecastData();
    // }
  }, [location,numOfDays]); 

  if (!forecastData) {
    return <div>Loading...</div>;
  }



  // const handleSubmit = () => {
  //   setSubmitted(true);
  // };
  
  

  const currentDay = forecastData[0];
  // const currentWeather = forecastData[0].day;
  // const hourWeather = forecastData[0].hour;

  return (
    <div className="WeatherForecast">
     

      <h2>Weather Forecast</h2>
    
    <input
      type="text"
      value={location}
      onChange={handleLocationChange}
      placeholder="Enter location"
    />

    <input
      type="number"
      value={numOfDays}
      onChange={handleNumOfDaysChange}
      placeholder="Enter number of days"
    />

  {/* <button className="submitButton" onClick={handleSubmit}>Submit</button> */}

      <h3>{location}</h3>
      
      {/* Current weather */}
      {/* Current weather */}
      <div className="WeatherInfo">
        
      <Carousel showArrows={true}>
        {currentDay.hour.slice(1).map((hour) => (
          <div key={hour.time} className="ForecastItem">
            <div className="Time">{hour.time}</div>
            <div className='details-wrapper' style={{marginTop : "22px"}}> 
            <img
              className="icon"
              src={hour.condition.icon}
              alt={hour.condition.text}
            />
            <div className="temperature">{hour.temp_c}°C</div>
            <div className="condition">{hour.condition.text}</div>
            </div>
            <div className="extra-info">
              <span>Wind Speed: {hour.wind_kph} km/h</span>
              <span>Wind Direction: {hour.wind_dir}</span>
              <span>Humidity: {hour.humidity}%</span>
              {hour.air_quality && hour.air_quality.pm2_5(
              <span>AQI: {hour.air_quality.pm2_5}</span>
              )}
              <span>UV Index: {hour.uv}</span>
            </div>
           </div> 
        ))}
      </Carousel>
      </div>

      {/* Weather forecast */}
      <h2>Next {numOfDays} days</h2>
      <div className="ForecastContainer">
        {forecastData.slice(1).map((forecast) => (
          <div key={forecast.date} className="Forecastitem">
            <div className="Date">{forecast.date}</div>
            <img
              className="icon"
              src={forecast.day.condition.icon}
              alt={forecast.day.condition.text}
            />
            <div className="temperature">{forecast.day.avgtemp_c}°C</div>
            <div className="condition">{forecast.day.condition.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
