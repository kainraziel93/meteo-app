import React from 'react'

import './PrevisonCard.css'
import { FaWind } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { IoIosRainy } from "react-icons/io";
import Marquee from 'react-fast-marquee';
import humidité from'../../static/images/humidité.png'

const PrevisionCard = (props) => {
    const day = props.day.split(' ')
  return (

        <div className="card shadow card-container my-1 px-2" style={{border:props.active==='true'?"5px solid #08e119":""}}>

        <div className="card-title my-1 p-0" >
          
          <div className='d-flex justify-content-between '> 
            <div>
            <h5 className=' fw-bold ms-2' style={{color:"#004766"}} >{day[0].split(',')[0]}</h5>
            <div className="d-flex align-items-center gap-1">
              <img  src={props.condition.icon} alt=""  style={{width:"20px",overflow:"hidden"}} />
              <div>
              <Marquee autoFill={false}  speed="30" style={{width:"60px",color:"yellowgreen"}}>
              {props.condition.text}
              </Marquee>
              </div>

            </div>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2  ">
              <FaTemperatureHigh/>
              <h6 className='m-0 p-0' style={{color:"#e04747"}}>{props.temp+"°"}</h6>
              </div>
              <div className="d-flex align-items-center gap-2 " style={{marginTop:"12px"}}>
              <IoIosRainy style={{color:"#0000ba"}}/>
              <h6 className='m-0 p-0' style={{color:"#0000ba"}}>{props.precipitation}</h6>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 ">
              <FaWind />
              <h6 className='m-0 p-0'>{props.wind+"kph"}</h6>
              </div>

              <div className="d-flex align-items-center gap-2 " style={{marginTop:"15px"}}>
              <img src={humidité} className=''  alt="icon"  style={{width:"20px"}} />
              <h6 className='m-0 p-0'>{props.humidity}</h6>
              </div>
            </div>  
            </div>
        </div>    
  
        </div>
  )
}

export default PrevisionCard