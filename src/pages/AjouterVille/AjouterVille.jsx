import React, { useEffect, useState } from 'react';
import CONFIG_CONSTANTS from '../../ServicesAndConstants/Config';
import './ajouterVille.css'
const AddCityPage = () => {
  const [nomVille, setNomVille] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const villeFavorite = JSON.parse(localStorage.getItem('citys')) || [];

  const getCitys = async (city) => {
       fetch(`${CONFIG_CONSTANTS.citySearchApi}${city}`)
       .then(data=>data.json())
       .then(zone=>setFilteredResults(zone.map((x) => (zoneMap(x)))))
       .catch(err=>console.error("erreur",err));
  };
  const zoneMap = (zone)=>{
    return {
      name:zone.name,
      region:zone.region,
      country:zone.country,
      lon:zone.lon,
      lat:zone.lat
    }
  }
  const handleSearch = async (e) => {
    
   
    setNomVille(e.target.value);
    if (e.target.value === "") {
      setFilteredResults([]);
    } else {

      await getCitys(e.target.value);
    }
  };

 const  updateLocalStorage =async (ville,suppression)=>{
  if(suppression ===true){
    const updatedCitys = villeFavorite.filter((c) => c.toLowerCase() !== ville.toLowerCase());
    localStorage.setItem('citys', JSON.stringify(updatedCitys));
  }
  else {
    const updatedCitys = [...villeFavorite, ville];
    localStorage.setItem('citys', JSON.stringify(updatedCitys));
  }
   return await getCitys(nomVille)
  }

  const checkCityExist = (city) => {
    return villeFavorite.map((x) => x.toLowerCase()).indexOf(city.toLowerCase()) !== -1;
  };


  return (
    <div className='container' style={{minHeight:"500px"}}>
      <h1 className="my-4" style={{fontSize: "50px", textAlign: "center", color: "#1e0b0b" }}>Chercher Une Ville</h1>
      <input
        className="form-control"
        type="text"
        style={{backgroundColor:"transparent"}}
        value={nomVille}
        onChange={handleSearch}
        placeholder="Rechercher une ville pour ajouter"
      />
      <div>
        {filteredResults.length > 0 && (
          <div className="row mt-3 gx-3 gy-3">
            {filteredResults.map((result, index) => (
              <div key={index} className='col-sm-6 col-lg-4 col-lg-3'>
                <div className="card card-wrapper" style={{backgroundColor:"transparent"}}>
                  <div className="card-title bold text-center">
                    <h3 style={{color:"#1e0b0b"}}>Pays:{" "+result.country}</h3>
                    <h3 style={{color:"green"}}>Region:{" "+result.region}</h3>
                    <div className='card-body'>
                      <h5 className='text-center' style={{ color: "red" }}>{result.name}</h5>
                      <div className='d-flex justify-content-around align-items-center'>
                        <div style={{color:"#1e0b0b",fontSize:"25px"}}><span className='text-info'>Lat: </span> {result.lat}</div>
                        <div style={{color:"#1e0b0b",fontSize:"25px"}}><span className='text-success'>lon: </span> {result.lon}</div>
                      </div>
                    </div>
                    {checkCityExist(result.name) ? <h6 className='text-danger fs-2' style={{cursor:"pointer"}} onClick={() => updateLocalStorage(result.name,true)}>Supprimer ville</h6>
                      : <h6 className='text-success fs-2' style={{cursor:"pointer"}} onClick={() => updateLocalStorage(result.name,false)}>Ajouter ville</h6>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

   
    </div>
  );
};

export default AddCityPage;
