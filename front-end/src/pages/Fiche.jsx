import React from "react";
import '../index.css'
import Carousel from 'react-bootstrap/Carousel';
import fiche1 from '../Authetification_system/gameOfThrones1.jpg'
import thrones2 from '../Authetification_system/thrones2.jpg'
import monster from '../Authetification_system/monsterGOT.jpg'




function Fiche(){
  
    
   
    return(
      <>
       <div>
           <Carousel>
      <Carousel.Item>
        <img style={{height:"100svh"}}
          className="d-block w-100"
          src={fiche1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="title">Game of thrones</h3>
          <p> is a highly popular and critically acclaimed fantasy television series that aired from 2011 to 2019. Created by David Benioff and D. B.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:"100svh"}}
          className="d-block w-100"
          src={thrones2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="title">WIN OR DIE</h3>
          <p>Key noble families include the Starks of the North, the Lannisters of the West, the Baratheons of the Stormlands, and the Targaryens who seek to reclaim the throne.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height:"100svh"}}
          className="d-block w-100"
          src={monster}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="title">Winter is coming</h3>
          <p>Magic and mythical elements, such as dragons and the undead, play significant roles in the later seasons.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
        <section className="principale-persona">
          <div className="personage"> kk</div>
        </section>
</>
       
        
        
         
       
        
       
    
           
        
        
        
    )
}
export default Fiche