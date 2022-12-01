import React from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import  { VideoFrameModal } from './styles'
import './index.css'
function getYouTubeId(youtubeURL) {
    return youtubeURL
      .replace(
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
        '$7',
      );
  }
  //-------------


export default function ModalVideo(props){
  const esc = false;
  return(
   <div>
    <Modal
    disableEscapeKeyDown={esc}
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={props.open}
    onClose={props.handleClose}
    closeAfterTransition
    className="ClassModal"
    BackdropProps={{
      timeout: 500,
    }}
  >
     
    <Fade in={props.open}>
     <VideoFrameModal
        title="Video"
        src={`https://www.youtube.com/embed/${getYouTubeId(props.videoURL)}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />

    </Fade>
   
  </Modal>
  
  </div>
  );
}