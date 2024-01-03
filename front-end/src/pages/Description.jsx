import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Caroussel from "../data/Caroussel";
import background from "../data/background";
import Liste from "./Liste";
import Section3 from "./Section3";
import './Description.css'




function Description(){
    const sectionStyle = {
        backgroundImage: `url(${background.backgroundImages2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%' ,
        position:'relative',
        minHeight:'100vh'
        
      };
  
  
   
    return(
        
     
      <div style={{width:'100vw'}}>
      
           <Carousel>
      <Carousel.Item>
        <img style={{height:"100svh"}}
          className="d-block w-100"
          src={Caroussel.fiche1}
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
          src={Caroussel.thrones}
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
          src={Caroussel.monster}
          alt="Third slide"
        />
            <Carousel.Caption>
            <h3 className="title">Winter is coming</h3>
            <p>Magic and mythical elements, such as dragons and the undead, play significant roles in the later seasons.</p>
            </Carousel.Caption>
             </Carousel.Item>
        </Carousel>
    
        <section className="principale-persona" style={sectionStyle}>
            <div className="Title-for-mainCharacter">
              <h2 className="principale-h2">Main characters</h2>
            </div>
            <Liste/>
        </section>
        <Section3 />

       
</div>
       
        
        
         
       
        
       
    
           
        
        
        
    )
}
export default Description;