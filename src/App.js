import React from 'react';
import WeatherForecast from './Components/Weatherforecast';
import './App.css';

import BgVideo from './assests/BgVideo.mp4'

const App = () => {
  return (
    <div className="App">
      <video autoPlay muted loop className="backgroundVideo">
        <source src={BgVideo} type="video/mp4" />
      </video>
      <div className="contentWrapper">      
      <WeatherForecast />
      </div>
    </div>
  );
};

export default App;
