import {styled} from 'styled-components'


export const Container_zineb = styled.div`
    padding: 1rem 8.8rem;
    /* overflow-x: hidden; */
    @media screen and (max-width:1109px){
        padding : 1rem 6rem;
    }
    @media screen and (max-width:920px){
        padding : 1rem 1.3rem;
    }
`
export const Container = styled.div`
    padding: 1rem 8.8rem;
    /* overflow-x: hidden; */
    @media screen and (max-width:1109px){
        padding : 1rem 6rem;
    }
    @media screen and (max-width:920px){
        padding : 1rem 1.3rem;
    }
`

export const ContainerLogin = styled.div`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.865)),
    url("./téléchargé.jpeg") center/cover no-repeat fixed;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    padding-top: 7em;
    /* background-color: rgba(3, 3, 3, 0.406); */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(3px);
      min-width: 450px;
      padding: 2em 0;
      margin-top: 2em;
      margin-bottom: 2em;
      /* gap: 1rem; */
      border-radius: 5px;
      .form {
        display: flex;
        justify-content: center;
        /* align-items: center; */
        gap: 3rem;
        flex-direction: column;
        #email {
          margin-right: 17px;
        }
        .input_form {
          display: flex;
          flex-direction: column-reverse;
          /* align-items: center; */
          justify-content: center;
          position: relative;
          visibility: visible;
          .input {
            outline: none;
            font-size: 1.1rem;
            /* height: 2.5rem; */
            color: white;
            background-color: transparent;
            border: none;
            border-bottom: solid 1px rgb(255, 255, 255);
            position: relative;
            width: 100%;
            color: white;
            &::placeholder{
               color: #dadada;
            }
          }
        }
      }
    }
  }
  .form .input_form label{
    
    position: absolute;
      /* left: 5%; */
      top: -20%;
      pointer-events: none;
      transition: all 0.3s ease;
      color: white;
  }
  .input_form .input:focus ~ label,
  .input_form .input:valid ~ label
  {
    transform : translateY(-20px);
    font-size: 15px;
    color: #dbdbdb;
  }
  .forgot-password{
    margin-bottom: 1rem;
    color: white;
  }
  .buttonn{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex-direction: column;
  }
  .butt{
    padding: 15px 35px;
    border: solid 1px #770202;
    border-radius: 15px;
    background-color: transparent;
    color: white;
    margin-bottom: 1rem;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
  }
  .eye{
    position: absolute;
    right: 0;
    color: #770202;
    background-color: transparent;
    font-size: 18px;
    background-color: transparent;
    border: none;
  }
  .butt:hover{
    color: white;
    border: solid 1px #770202;
    transition: 0.9s;
    background: #770202;
  }
  a{
    text-decoration: none;
    color: rgb(105, 103, 219);
  }
  a:hover{
    text-decoration: underline;
    color: #770202;
  }
  .account{
    color: white;
  }
  

  .logo {
    display: flex;
    flex-direction:column;
    align-items: center;
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom : 20px;
p{
    font-size:30px;
    font-weight:600;
    span {
      margin-right: 5px;
      color: #770202;
      font-weight: 700;
      font-size: 35px;
    }
}
    
    h3{
        font-size:1em;
        margin-bottom:20px;
    }
  }
`;