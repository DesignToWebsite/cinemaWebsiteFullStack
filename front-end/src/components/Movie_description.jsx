import React, { useEffect } from 'react';
import axios from 'axios';

import { useState } from 'react';
import VideoModel from './vidoeModel';
import Button from 'react-bootstrap/Button';
import image_movie from "../assets/gameOfThrones.jpg";
import styled from "styled-components"
import { Container_zineb } from '../style/style';
import playSvg from "../assets/play.svg"
import reserveSvg from "../assets/reserve.svg"
import startSvg from "../assets/star.svg";
import ButtonReserve from './ButtonReserve';
import { data } from '../data/data';
import { useLocation, useParams } from 'react-router-dom';
const Movie_description = ()=>{
    
    const location = useLocation();
    const url = location.pathname;

    const { id } = useParams();
    // console.log(id)

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseURL = `http://127.0.0.1:8000/api/movies/${id}?includeReservations=true`;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(baseURL);
            setMovie(response.data);
            if(movie){
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
        };

        fetchData();
    }, [loading]);
      
    let MovieDesc = {};
    if(!loading){
        // console.log(movie.data)
         MovieDesc = {
            minHeight: '100vh',
            width: '100vw',
            background: `linear-gradient(50deg, rgba(6, 6, 6, 0.76) 0%, rgba(0, 0, 0, 0.59) 100%), url(${movie.data.img})`,
            // backgroundColor: 'blue',
            backgroundSize: 'cover',
            // marginBottom: '2em',
          };
        // const movie = data.filter(item=>item.id == id)[0];
        
    }

    const [modalShowVideo, setModalShowVideo] = React.useState(false);
    
    // if(data)
  return (
    <div style={MovieDesc}>
        {!loading &&
            (
                <>
                    <Description>
                    <h1>{movie.data.name}</h1>
                    <div className="btns">
                        <button className='play' onClick={() => setModalShowVideo(true)}>
                            <img className='icon' src={playSvg} alt="play icon" />
                            Play now
                        </button>
                        {/* <button className='reserve' >
                            <img className='icon' src={reserveSvg} alt="play icon" />
                            <a href="">Reserve your place  </a>
                        </button> */}
                        {/* <ButtonReserve time={movie.data.time} day={movie.data.day} />
                            */}
                            <ButtonReserve id={movie.data.id} date={movie.data.day} time={movie.data.time} />
                    </div>
                    <div className="info">
                        <span className='date'>{movie.data.day}</span>
                        <span className="age">{movie.data.age}</span>
                        <span className='star'>
                            <img src={startSvg} alt="" className="icon" />
                            {movie.data.star}
                        </span>
                        <span> | </span>
                        <span className='category'>{movie.data.category.replace(/,/g,' ')}</span>
                    </div>
                    <p>{movie.data.description}</p>
                    <p className='actors'><span>Actors:</span> {movie.data.actors} </p>
                    </Description>
                    <VideoModel
                        videoId = {movie.data.video}
                        show={modalShowVideo}
                        onHide={() => setModalShowVideo(false)}
                    />
                </>
            )
        }
         
      
    </div>
  );
}
// const MovieDesc = styled.div`
//     min-height:100vh;
//     width:100vw;
//     background: linear-gradient(to right, rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.59)), url(${image_movie});
//     background-color:blue;
//     background-size:cover;
//     margin-bottom: 2em;
    
    
// `;
const Description = styled(Container_zineb)`

    min-height : 100vh;
    color : white;
    display:flex;
    flex-direction:column;
    align-items:baseline;
    justify-content:center;
    padding-top:8em;
    h1{
        font-size:4em;
        padding-bottom : .8em;
        width:70%;
    }
    .icon{
        margin-right: 7px;
    }
    .btns{
        button{
            border-color:transparent;
            margin-right: 20px;
            padding : 7px 15px;
            font-size : 1em;
            font-weight:600;
            border-radius : 50px;
            &.play{
                background-color:#770202;
                color:white;
            }
            &.reserve{
                a{
                    color:black;
                    font-weight:bold;
                }
            }
            
        }
    }
    .info{
        display:flex;
        padding : 1.5em 0;
        span{
            font-size:18px;
            margin-right:20px;
            padding : 5px;
            display : flex;
            flex-direction:row;
            align-items:center;
            &.date{
                font-weight:700;
            }
            &.age{
                background-color:#770202;
                border-radius:10px;
                padding:5px 10px;
                font-weight:700;
            }
            &.star{
                font-weight:bold;
            }
            &.category{
                color:#c3c3c3;
                font-weight : 500;
                word-spacing:15px;
            }
        }
    }
    p{
        max-width : 60%;
        /* font-weight:400; */
        &.actors{
            span{
                font-weight:700;
                margin-right : 10px;
            }
            
        }
    }
`;

export default Movie_description;