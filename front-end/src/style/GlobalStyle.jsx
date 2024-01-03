import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin : 0;
        padding: 0;
        box-sizing: border-box;
        font-weight: lighter;
    }
    body{
        overflow-x: hidden;
        font-family: 'Open Sans', sans-serif;
        background: black;
        color:white;
    }
    img{
        object-fit: cover;
    }
    ul{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    button{
        cursor: pointer;

    }
    p{
        font-size: 18px;
    }
    h2{
    padding : 1em 0;
    font-size:2em;
    font-weight:bold;
    text-align:center;
}
    .mySwiper{
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 400px;
            /* height: auto; */
            margin: 15px;
            border-radius: 5px;
            /* padding: 15px 20px; */
            background-color:#770202;
            color:white;
       
            img {
                display: block;
                width: 100%;
                height: 320px;
            }
        }
    }
    a{
        color:white;
        text-decoration: none;
        &:hover{
            text-decoration:none;
        }
    }
    .red{
        background-color:#770202;
    }
    
`;

export default GlobalStyle;
