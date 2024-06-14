import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
<nav class="navbar navbar-expand-lg navbar-light "style={{backgroundColor:"transparent"}}>
  <div class="container-fluid">
    <div className="navbar-brand "><span style={{color:"white",fontWeight:"bold",fontFamily:"cursive"}}>By Achahbar adam</span></div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
       <Link to="/" class="nav-link  active" style={{color:"white"}}>Acceuil</Link> 
       <Link to="/ajouter" class="nav-link  active" style={{color:"white"}}>Ajouter Une Ville</Link> 


      </div>
    </div>
  </div>
</nav>
  )
}

export default Header