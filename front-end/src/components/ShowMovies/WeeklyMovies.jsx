import React, { useState } from 'react'
import './WeeklyMovies.css'

function WeeklyMovies() {
    const [films,setFilm]= useState(
        [
        {id:1,title:'Titanic',image:'https://th.bing.com/th/id/R.d844fe9a6e4dc024688949177cff2f98?rik=saw011uxifWFDg&pid=ImgRaw&r=0',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        ,
        {id:2,title:'La la land',image:'https://th.bing.com/th/id/OIP._tw7yMJxA7RFQBIKDXGW0QHaLH?pid=ImgDet&rs=1',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        ,
        {id:3,title:'Mission impossible',image:'https://th.bing.com/th/id/OIP.dtSWmDK-Twsi39Bi6QuNoAHaLH?pid=ImgDet&rs=1',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        ,
        {id:1,title:'Titanic',image:'https://th.bing.com/th/id/R.d844fe9a6e4dc024688949177cff2f98?rik=saw011uxifWFDg&pid=ImgRaw&r=0',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        ,
        {id:2,title:'La la land',image:'https://th.bing.com/th/id/OIP._tw7yMJxA7RFQBIKDXGW0QHaLH?pid=ImgDet&rs=1',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        ,
        {id:3,title:'Mission impossible',image:'https://th.bing.com/th/id/OIP.dtSWmDK-Twsi39Bi6QuNoAHaLH?pid=ImgDet&rs=1',description:'romantic drama directed by James Cameron. It tells the tragic love story between Jack and Rose, passengers on the ill-fated maiden voyage of the RMS Titanic in 1912.'}
        
        ]
    );
    console.log(films);
    
  return (
    <>
        <div className='row gx-0 d-flex justify-content-center align-items-center mb-4'>
            <div className='card' id='search--bar'>
                <div className='card-body '>
                    <form id='form--edit'>
                        
                                <input name='search' className='form-control' id='input--search' placeholder='day...'></input>
                            
                                <button className='btn btn-danger'><i className="bi bi-search"></i></button>
                            
                        
                    </form>
                </div>
            </div>
        </div>
        <div className="row gx-0 d-flex justify-content-center align-items-center">
            {films.map((film)=>(
                <div key={film.id} className="card justify-content-center m-3" id="card">
                <img src={film.image}/>
                <div className="card-bodyy">
                <h1 className="card-title">{film.title}</h1>
                <ul>
                    <li>{film.description}</li>
                </ul>
                <button className='plus--info--btn'>further information</button>
                </div>
            </div>
            ))
                
            }
        </div>
    </>
  )
}

export default WeeklyMovies