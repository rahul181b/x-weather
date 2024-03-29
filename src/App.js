import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      if (city) {
        setIsLoading(true);
        const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=2b183e66c581405c8cb113315230912&q=${city}&aqi=no`);
        setData(res.data);
        setIsLoading(false);
      }
      else {
        return;
      }
    } catch (e) {
      alert("Failed to fetch weather-card data");
      console.log(e);
      setData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      setData(null)
    }
  }, [city]);

  return (
    <div>
      <div className="display-search">
        <input className="searchbox" type="text" placeholder="Enter city name" onChange={(e) => setCity(e.target.value)} />
        <button type="submit" onClick={() => handleSearch(city)}>Search</button>
      </div>
      {isLoading && <div style={{ textAlign: "center", margin: "auto" }}> <p>Loading data...</p> </div>}
      {data != null ? (
        <div className="display-Data">
          <div className="weather-cards">
            <h2>Temperature</h2>
            <p>{data.current.temp_c}°C</p>
          </div>
          <div className="weather-cards">
            <h2>Humidity</h2>
            <p>{data.current.humidity}%</p>
          </div>
          <div className="weather-cards">
            <h2>Condition</h2>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-cards">
            <h2>Wind speed</h2>
            <p>{data.current.wind_kph} km/h</p>
          </div>
        </div>
      ) : <div></div>}
    </div>
  );
}

export default App;
