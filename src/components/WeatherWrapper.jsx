import React, { useEffect, useState } from 'react'
import './weatherWrapper.css'
import  {getWeatherByCity}  from '../ServicesAndConstants/Api'
import humidityPng from '../static/images/humidité.png'
import windPng from '../static/images/wind.webp'
import pluisPng from '../static/images/pluis.webp'
import pressionPng from '../static/images/barometre.png'
const WeatherWrapper = (props) => {
const [degree,setDegree] = useState()
const [humidité,setHumidité] = useState()
const [ressentie,setRessentie] = useState()
const [icon,setIcon]= useState('')
const [pressure,setPressure] = useState()
const [vitesseVent,setVitesseVent] = useState()
const [precipitation,setPrecipitation] = useState()
const weatherToday =async ()=>{
 try
 {
     const  weather =  await getWeatherByCity(props.city)
     setIcon(weather.current.condition.icon)
     setRessentie(weather.current.feelslike_c)
     setDegree(weather.current.temp_c)
     setHumidité(weather.current.humidity)
     setVitesseVent(weather.current.wind_kph)
     setPressure(weather.current.pressure_mb)
     setPrecipitation(weather.current.precip_mm)
   }
 catch(e){
   console.log(e)
   }
}
useEffect( ()=>{
   weatherToday()
},[])
    
  return (
    <div className="col-sm-12 col-lg-12 col-md-12 mt-4  meteo-card" onClick={props.onClick} >
      <div className='card card-element ' style={{backgroundColor:"transparent",border:"2px solid"}}>
          <div className="card-title ps-3"> 
          <div className="d-flex justify-content-between align-items-center">
          <h4  style={{color:"#ffed1c",letterSpacing:"3px"}}>{props.city}</h4>
          <div>
          <h2 className='text-center' style={{color: "lightgreen"}}>{degree+"°C"}</h2>
          <h6 style={{color:"black"}}>Ressentie {ressentie+"°C"}</h6>
        </div>
          <img src={icon}  alt="icon"/>
          </div>
          
          </div>
      <div className="card-body mt-2 pb-2">

        <div className='d-flex justify-content-between align-items-center'>
          
        <div className='d-flex flex-column align-items-center'>
          <img src={humidityPng} style={{width:"40px"}}  alt=""  />
          <h6 style={{color:"white"}}>{humidité+"%"}</h6>
        </div>
        <div className='d-flex flex-column align-items-center'>
        <img src={windPng} style={{width:"40px"}} alt=""  />
        <h6 style={{color:"white"}}>{vitesseVent}</h6>
        </div>
        <div className='d-flex flex-column align-items-center'>
        <img src={pluisPng} style={{width:"40px"}} alt=""  />
        <h6 style={{color:"white"}}>{precipitation+"mm"}</h6>
        </div>

        <div className='d-flex flex-column align-items-center'>
        <img src={pressionPng} style={{width:"40px"}} alt=""  />
        <h6 style={{color:"white"}}>{pressure+"mb"}</h6>
        </div>


        
        </div>
      </div>

    </div>
</div>   
  )
}

export default WeatherWrapper