import React, { useState, ChangeEvent} from 'react';
import { optionType } from '../../types';
import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh, faTint, faCloud, faEye, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


const REACT_APP_API_KEY = '76c7e71d8075fe76e26292ef243b5678';

const Weather: React.FC = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<optionType[]>([]);
    const [weatherData, setWeatherData] = useState<any[]>([]);
    console.log(weatherData);
    
    async function http(req: string): Promise<any> {
        const res = await fetch(req);
        const body = await res.json();
        return body;
    }

    const fetchWeatherData = async () => {
        const weatherPromises = options.map(option =>
            http(`https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&appid=${REACT_APP_API_KEY}`)
        );
        try {
            const weatherResults = await Promise.all(weatherPromises);
            setWeatherData(weatherResults);
        } catch (error) {
            console.error(error);
        }
    };

    const getSearch = async (value: string) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${REACT_APP_API_KEY}`);
            const data = await response.json();
            const parsedOptions: optionType[] = data.map((item: any) => ({
                name: item.name,
                lat: item.lat,
                lon: item.lon
            }));
            setOptions(parsedOptions);
            await fetchWeatherData();
        } catch (error) {
            console.error(error);
        }
    };

    const searchSubmit: React.FormEventHandler = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = term.trim();
        if (value) {
            getSearch(value);
        }
    };

    return (
        <div className="weather">
            <div className='weatherText'>
                <h2>Weather</h2>
                <p>Find your Location</p>
            </div>
            <form onSubmit={searchSubmit}>
                <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
                <button>Search</button>
            </form>
            <div className="foundWeather">
                {weatherData?.map((el: any, index: number) => {
                    return (
                        <div key={index}>
                            <h4> <FontAwesomeIcon icon={faMapMarkerAlt}/>  {el.name}</h4>
                            <div className="weatherInfo">
                                <h6>Temperature <br/>
                                <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: 'white' }}/>
                                {el.main.temp}</h6>
                                <h6>Humidity <br />
                                <FontAwesomeIcon icon={faTint} style={{ color: 'blue' }}/> 
                                {el.main.humidity}</h6>
                                <h6>Clouds <br />
                                <FontAwesomeIcon icon={faCloud} style={{ color: 'gray' }}/> 
                                {el.clouds.all}</h6>
                                <h6>Visibility <br />
                                <FontAwesomeIcon icon={faEye} style={{ color: 'white' }}/> 
                                {el.visibility}</h6>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Weather;