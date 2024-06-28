import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5d2c084770d9bb29d4bab385f9fa1430`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  useEffect(() => {
    if (data.name) {
      document.title = `${data.name} - ${data.main.temp.toFixed()}°C`;
    } else {
      document.title = 'Weather Wise';
    }

    const updateDate = () => {
      const date = new Date();
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
      const time = date.toLocaleTimeString('en-US', timeOptions).slice(0, 5);

      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear().toString().slice(2);

      const formattedDate = `${time} - ${weekday}, ${day} ${month} '${year}`;
      setFormattedDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">

        {data.name && (
          <div className="top">
            <div className="location">
              {data.main ? <p className="temperature">{data.main.temp.toFixed()}°</p> : null}
            </div>
            <div>
              <p className="temp">{data.name}</p>
              <p className="date">{formattedDate}</p>
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        )}

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Sensação Térmica</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Umidade</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
              <p>Vento</p>
            </div>

            <div className="temp_min_max">
              {data.main ? <p className='bold'>Min: {data.main.temp_min.toFixed()}°C</p> : null}
              {data.main ? <p className='bold'>Max: {data.main.temp_max.toFixed()}°C</p> : null}
            </div>
          </div>

        )}

      </div>
    </div>
  );
}

export default App;
