import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import styled from 'styled-components';
function VideoModel(props) {
    const videoId = "QGu6InUcdUY";

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
        key: 'AIzaSyDQ0VyyNdyJMgEgLrsz9Qa_R3qi1q8twJM',
      },
    };
  return (
        <ModelStyle
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
        >
        <ModelBody closeButton>
            <VideoYoutube videoId={props.videoId} opts={opts} />
        </ModelBody>
        
        </ModelStyle>
  );
}

 const ModelStyle = styled(Modal)`
    background-color:#28282852;

    .modal-content{
        background:transparent;
        width:fit-content;
    }  
 `;
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