import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { LoadingIndicator } from '../style/style';
import { useState } from 'react';

function VideoModel(props) {
  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const [isLoading, setIsLoading] = useState(true)
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
        key: youtubeApiKey,
      },
    };

     // Function to handle when video is loaded
     const handleVideoLoaded = () => {
      setIsLoading(false); // Set loading status to false when video is loaded
  };
  console.log(props)

  return (
    <>
      {(props.show && isLoading )&& 
           <Loading>
            <LoadingIndicator  data-test="loading"/>
           </Loading>
           }
           
            <ModelStyle
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
        >
           
        <ModelBody closeButton>
            <VideoYoutube 
            onReady={handleVideoLoaded} 
            videoId={props.videoId} 
            opts={opts} />
        </ModelBody>
        
        </ModelStyle>
    </>
       
  );
}

// const LoadingVideo = styled(LoadingIndicator)`
//   z-index: 10;
//   /* dispaly:flex; */
  
//   .modal-dialog.modal-lg.modal-dialog-centered{
//       display: flex; 
//     align-items: center;
//     justify-content: center;
//   }
// `
 const ModelStyle = styled(Modal)`
    background-color:#28282852;

    .modal-content{
        background:transparent;
        width:fit-content;
    }  
    
 `;
 const Loading = styled.div`
      z-index: 100;
      position: absolute;
      display: flex;
      top: 10px;
      left: 0;
      height: 100vh;
      width: 100vh;
      justify-content: flex-end;
      align-items: center;
      
    `
const ModelBody = styled(Modal.Body)`
    position : relative;
    border: none;
    padding:0;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const VideoYoutube = styled(YouTube)`
    display : flex;
    align-items:center;
    justify-content:center;
    max-width: 45em;
    height:auto;
`;
export default VideoModel;