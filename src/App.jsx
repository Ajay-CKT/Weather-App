import {useEffect, useState} from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';
import humidityIMG from "./assets/images/humidity.png"
import windSpeedIMG from "./assets/images/wind-direction.png"
import clearSky from "./assets/images/clearSky.png"
import fewClouds from "./assets/images/cloudy.png"
import scatteredClouds from "./assets/images/scatteredClouds.png"
import brokenClouds from "./assets/images/brokenClouds.png"
import showerRain from "./assets/images/showerRain.png"
import rain from "./assets/images/heavyRain.png"
import thunderstorm from "./assets/images/thunderStrom.png"
import snow from "./assets/images/snow.png"
import mist from "./assets/images/mist.png"
import "./App.css"
import Spinner from "./Spinner";
import NotFound from "./NotFound";

const App = () => {
  const [text, setText] = useState("");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [weatherType, setWeatherType] = useState("01d");
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const weatherArray = {
    "01d": {img: clearSky, color: "orange"},
    "02d": {img: fewClouds, color: "#83d4ed"},
    "03d": {img: scatteredClouds, color: "#a3d4f7"},
    "04d": {img: brokenClouds, color: "#83d4ed"},
    "09d": {img: showerRain, color: "#5fb1d7"},
    "10d": {img: rain, color: "#62dbfb"},
    "11d": {img: thunderstorm, color: "#6d6d6d"},
    "13d": {img: snow, color: "#80c7ea"},
    "50d": {img: mist, color: "#ADD8E6"},
    "01n": {img: clearSky, color: "orange"},
    "02n": {img: fewClouds, color: "#83d4ed"},
    "03n": {img: scatteredClouds, color: "#a3d4f7"},
    "04n": {img: brokenClouds, color: "#83d4ed"},
    "09n": {img: showerRain, color: "#5fb1d7"},
    "10n": {img: rain, color: "#62dbfb"},
    "11n": {img: thunderstorm, color: "#6d6d6d"},
    "13n": {img: snow, color: "#80c7ea"},
    "50n": {img: mist, color: "#ADD8E6"},
  }

  const searchCity = async () => {
    let apiKey = "";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    try {
      setLoading(true);
      setCityNotFound(false);
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setTemp(data.main.temp);
        setCity(data.name);
        setCountry(data.sys.country);
        setLatitude(data.coord.lat);
        setLongitude(data.coord.lon);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setWeatherType(data.weather[0].icon);
        setLoading(false);
      } else {
        setCityNotFound(true);
      }
    } catch (error) {
        setLoading(false);
        console.error(error);
    }
  }
  useEffect(() => {
    searchCity();
  }, []);

  const HandleSearch = async (e) => {
    if (e.key === "Enter") {
      await searchCity();
    }
  }
  
  
  const weatherImage = weatherArray[weatherType] || {
    img: "",
    color: "black",
  };
  let color = { color: weatherImage.color };
  let image = weatherImage.img;

  return (
    <div className="bg-container">
      <h1 className="title"><i>Enter the city name to check the weather ..!</i></h1>
      <div className="container">

        <div className="input-container">
          <input 
            type="text" 
            placeholder="search" 
            id="cityName" 
            className="city" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            onKeyDown={HandleSearch} />
          <button onClick={searchCity}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        {cityNotFound && <NotFound />}

        {loading ? <Spinner loading={loading} /> : (
        
          <div className="weatherStatus">

            <img className="imgStatus" src={image} alt="weather"  />
            <div className="tempStatus">{temp} &#176; C</div>
            <div className="cityStatus" style={color}>{city}</div>
            <div className="countryCode">{country}</div>

            <div className="latlongStatus">
              <div className="latStatus">
                <span>{latitude}</span>
                <h5>latitude</h5>              
              </div>
              <div className="longStatus">
                <span>{longitude}</span>
                <h5>longitude</h5>  
              </div>
            </div>

            <div className="humiditySpeedStatus">
              <div className="humidity">
                <img src={humidityIMG} alt="" className="humidity-img" />
                <span>{humidity} %</span>
                <h5>Humidity</h5>
              </div>
              <div className="wind-speed">
                <img src={windSpeedIMG} alt="" className="wind-speed-img" />
                <span>{windSpeed} m/s</span>
                <h5>Wind-Speed</h5>
              </div>
            </div>
          </div>
        )}

        

      </div>
    </div>
  )
}

export default App
