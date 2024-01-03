import React from "react";
import background from "../data/background";
import './Section3.scss'
import gallery from "../data/gallery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



function Section3() {

    const sectionStyle = {
        backgroundImage: `url(${background.backgroundImages})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        with: '100%' ,
        
      };
    return(
        <section style={sectionStyle}>
            <div className="title-gallerie">
            <h2>Gallerie</h2>
            </div>
            <div className="gallery">
            <img src={gallery.imageGallerie2} alt="Image 1" className="images" />
            <img src={gallery.imageGallerie1} alt="Image 2" className="images"/>
            </div>
            <Link to="/reservation/:id">
                <button className="button">Shop now
                <FontAwesomeIcon icon={faShoppingCart} className="cartIcon" />
                </button>
            </Link>

     
        </section>

    )
}
export default Section3
