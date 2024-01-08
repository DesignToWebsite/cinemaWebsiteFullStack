import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heartSvg from "../assets/heart.svg"
import priceSvg from "../assets/price.svg"
import timeSvg from '../assets/time.svg'
import movieSvg from "../assets/movie.svg"
import localisationSvg from "../assets/localisation.svg"

const Card_movie = ({movie_item}) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  const targetDayIndex = daysOfWeek.indexOf(movie_item.day);
  // console.log(movie_item)
  let dayLeft = targetDayIndex - currentDayIndex;
  // console.log( targetDayIndex)

  // If the target day is before the current day, add 7 to get the remaining days
  if (dayLeft <= 0) {
    dayLeft += 7;
  }
// console.log(movie_item)
  const consoleItem = ()=>{
    console.log(movie_item)
  }
  return (
    <Link  style={{color:'white'}}
    // to={"/movie_page/"+movie_item.id}
    to={{
      pathname: "/movie_page/" + movie_item.id
      }} 
      onClick="consoleItem"
    >
      <Card>
      
        <div className="img">
          <img src={movie_item.img} alt="" />
        </div>
        <div className="content">
          <h3>
            <img src={movieSvg} alt="" />
            {movie_item.name}
          </h3>
          <div className="info">
            <p>
              <img src={priceSvg} alt="" />
              <span>Price : </span> {movie_item.price} DH</p>
            <p>
              <img src={timeSvg} alt="" /> 
              <span>Days left :</span> {dayLeft}
            </p>
            <p>
              <img src={heartSvg} alt="" />
              <span>Likes : </span>
              {movie_item.star}
            </p>
            <p><span>Salle :</span> {movie_item.salle}</p>
            
          </div>
        </div>
      </Card>
    </Link>
  );
};

const Card = styled.div`
  
   .content{
        padding: 20px 15px;
        h3{
          justify-content:center;
          max-width:90%;
          display : flex;
          align-items:center;
          text-align:center;
            img{
              width:15px;
              margin-right:10px;
              height:15px;
            }
            font-size: 19px;
            font-weight:bold;
            margin-bottom: 15px;
        }
        .info{
            display: flex;
            flex-direction:column;
            /* align-items: baseline; */
            /* justify-content:center; */
            padding-bottom: 10px;
            p{
                display:flex;
                align-items:center;
                span{
                  font-weight:bold;
                }
                img{
                  color:white;
                  margin-right:5px;
                  width:10px;
                  height:10px;
                }
                font-size: 14px;
                ion-icon{
                    padding-right: 5px;
                }
            }
        }
    }
`;

export default Card_movie;