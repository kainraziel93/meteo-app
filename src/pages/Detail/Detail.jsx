import React, { useEffect, useState } from 'react';
import { getWeatherByCity } from '../../ServicesAndConstants/Api.js';
import { useLocation } from 'react-router-dom';
import PrevisionCard from './PrevisionCard.jsx';
import './Detail.css';
import Marquee from 'react-fast-marquee';

const Detail = () => {
  const city = useLocation().state.city;
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dateInfo, setDateInfo] = useState(null);

  const handleSelectedIndex = (index) => {
    setSelectedIndex(index);
    console.log(index)
  };
  const allowedIndexs = ()=>{
    const values=[]
    for(let i=0;i<=23;i+=3){
      values.push(i)
    }
    values.push(23)
    return values;
  }
  const fetchWeather = async () => {
    try {
      const response = await getWeatherByCity(city, 7);
      setWeather(response);
      setDateInfo(response?.forecast.forecastday[0].hour);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    setDateInfo(weather?.forecast.forecastday[selectedIndex]?.hour);
  }, [selectedIndex, weather]);

  if (isLoading) return (
    <div style={{minHeight:"700px"}}>
       <div className='  d-flex align-items-center gap-4' style={{position:"absolute",top:"20%",left:"35%"}}>
      <h1 className='text-center '> chargement en cours</h1>
      <div class="spinner-border "  style={{width:"80px",height:"80px"}} role="status"></div>

    </div>
    </div>
   
  )

  return (
    <div className="container">
      <div className="detail-page-container shadow p-4" style={{borderRadius:"23px",border:"1px #9797b9 solid"}}>
        <div className="row">
        <h2 className='text-center' style={{color:"#8f8f8f",fontWeight:"800"}}>Meteo  {weather.current.last_updated}</h2>
          <div className="col-lg-6  col-md-12 col-sm-12  pt-4">
            <h5 style={{color:"#8f8f8f",textAlign:"center"}}> Auhourd'hui a {weather.current.last_updated.split(' ')[1]}</h5>
            <div className='section-wrapper d-flex align-items-center  justify-content-between px-3  pb-3  mt-4  ' style={{borderRadius:"20px",border:"1px #60577e solid"}}>
              <div className='col-container  ' style={{borderRadius:"20px"}} >
                <div> <h5>Ville</h5> <h6>{weather.location.name}</h6></div>
                <div><h5>Vitesse vent</h5>  <h6>{weather.current.wind_kph} km/h</h6></div>

                <div><h5>Condition </h5> <h6>{weather.current.condition.text}</h6></div>
                <div> <h5>Pression</h5> <h6>{weather.current.pressure_mb+" MB"}</h6> </div>
              </div>

              <div className='col-container'>
              <div> <h5>Precipitation</h5> <h6>{weather.current.precip_mm+"mm"}</h6></div>
                <div><h5>Direction du vent</h5>  <h6>{weather.current.wind_dir}</h6> </div>
                <div> <h5> Ressentie</h5> <h6> {weather.current.feelslike_c+"°C"}</h6>  </div>
                <div> <h5>Temperature min</h5> <h6>{weather.forecast.forecastday[0].day.mintemp_c+"°C"}</h6> </div>
              </div>

              <div className='col-container'>
              <div><h5>temperature</h5>  <h6>{weather.current.temp_c+"°C"}</h6> </div>
                <div> <h5> humidité</h5> <h6 > {weather.current.humidity+"%"}</h6></div>
                <div> <h5>Cloud</h5> <h6>{weather.current.cloud+"%"}</h6></div>
                <div> <h5>Temperature max</h5> <h6>{weather.forecast.forecastday[0].day.maxtemp_c+"°C"}</h6></div>

              </div>

            </div>

          </div>
          <div  className="col-lg-6 col-sm-12 mt-5"> 
          {weather.forecast.forecastday.map((element,index)=>{
            return (
  
              <div  key={index} onClick={()=>handleSelectedIndex(index)}>
              <PrevisionCard 
              
              active={index===selectedIndex?"true":"false"}
             
              precipitation={element.day.totalprecip_mm+" mm"} 
              temp={element.day.avgtemp_c+"°C"} 
              humidity={element.day.avghumidity+"%"}
              day={new Date(element.date).toUTCString()}
              wind={element.day.maxwind_kph}
              condition={element.day.condition}
            
              />
                </div>
)
          })}
                      </div>
          <div className='col-12 mt-3 bg-white py-2' style={{borderRadius:"20px"}}>
              <Marquee >
                <div className='d-flex align-items-center gap-5 marquee-container'>
                  <h6> {"  Date:"+weather.forecast.forecastday[selectedIndex].date }</h6> 
                  <div className='d-flex  align-items-center gap-2'>
                    <img src={weather.forecast.forecastday[selectedIndex].day.condition.icon} style={{width:"40px",paddingBottom:"5px"}} />
                    <h6>{" Condition: "+weather.forecast.forecastday[selectedIndex].day.condition.text}</h6>
                  </div>
                  <h6>{ " Temperature: "+weather.forecast.forecastday[selectedIndex].day.avgtemp_c+"°C"}</h6>
                  <h6>{ " Precipitation: "+weather.forecast.forecastday[selectedIndex].day.totalprecip_mm+"mm"}</h6>
                  <h6>{" Lever du solei: "+weather.forecast.forecastday[selectedIndex].astro.sunrise}</h6>
                  <h6>{ " Coucher du soleil: "+weather.forecast.forecastday[selectedIndex].astro.sunset}</h6>
               </div>
              </Marquee>
            </div>            
          
            <div className="col-12 bg-white mt-4" style={{borderRadius:"20px"}}>
              <h3 className='text-center my-3' style={{color:"#60577e",fontFamily:"fantasy"}}> Detail </h3>
              <div className="table-responsive">
                
                <table className='table table-borderless '>
                <thead>
                  <tr>
                    <th>Heure</th>
                    <th>Temp</th>
                    <th>Ressentie</th>
                    <th>Precip</th>
                    <th>Humidite</th>
                    <th>Cloud</th>
                    <th>Pression</th>
                    <th>D.vent</th>
                    <th>V.Vent</th>
                  </tr>
                </thead>
                <tbody>
                    {dateInfo.map((value,index)=>{
                     if(allowedIndexs().includes(index)) {
                     return (<tr key={index}>
                    <td>{value.time.split(' ')[1]}</td>
                    <td>{value.temp_c+"°C"}</td>
                    <td>{value.feelslike_c+"°C"}</td>
                    <td>{value.precip_mm+"mm"}</td>
                    <td>{value.humidity+"%"}</td>
                    <td>{value.cloud+"%"}</td>
                    <td>{value.pressure_mb+"mb"}</td>
                    <td>{value.wind_dir}</td>
                    <td>{value.wind_kph+"kph"}</td>
                      </tr>)}
                    })}
                </tbody>
              </table>
              </div>
              
            </div>

        </div>
      </div>
    </div>
  );
};

export default Detail;
