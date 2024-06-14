import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WeatherWrapper from '../components/WeatherWrapper'
const HomePage = (props) => {
  const [citys,setCitys] = useState(JSON.parse(localStorage.getItem('citys')))
  const [searchedCitys,setSearchedCitys] = useState(JSON.parse(localStorage.getItem('citys')))
    const navigate = useNavigate()
    

    const handleSearch = (e) => {
      let keyword = e.target.value.toLowerCase();
      if (keyword === "") {
        setSearchedCitys(citys);
      } else {
        let searchedCitys = citys.filter((city) => {
          return city.toLowerCase().includes(keyword);
        });
        setSearchedCitys(searchedCitys);
      }
    };
    
  return (
    <div className='container pt-5'>
      <h1 className="pb-5" style={{textAlign:"center",fontSize:"60px",color:"#1e0b0b"}}> Villes Disponible</h1>
        <input className="form-control " 
        type="text" 
        style={{backgroundColor:"transparent"}}
        name="citysearch shadow"
        onChange={(e)=>handleSearch(e)}
        placeHolder="rechercher une ville"/>
        <div className='row'>
          {searchedCitys.map((city,index)=>{
            return(
                <WeatherWrapper
                key={index} 
                city={city} 
                onClick={()=>{
                    navigate(`/detail/${city}`,{state:{city:city}})
                }}/>
            )
        })}
        </div>


    </div>
  )
}

export default HomePage