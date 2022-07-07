import React, { useRef } from 'react'
import { FiX } from 'react-icons/fi';
import { IoPlay } from 'react-icons/io5';
import { EMBEDLINK } from '../constant';

const OverLay = (props) => {

  const { title, name, id, season, episode, play } = props;
  const overlayRef = useRef(null);

  const handleClick = () => {
    if (overlayRef.current.classList.contains("hide")) {
      overlayRef.current.classList.remove("hide")
      document.getElementById("body").classList.add("overflow")
      document.getElementById('iframe').src = EMBEDLINK + name + '?id=' + id + '&s=' + season + '&e=' + episode;
      document.getElementById('iframe').src = document.getElementById('iframe').src;
    }
  }

  const handleClose = () => {
    if (!overlayRef.current.classList.contains("hide")) {
      overlayRef.current.classList.add("hide")
      document.getElementById("body").classList.remove("overflow")
      document.getElementById('iframe').src = '';
      document.getElementById('iframe').src = document.getElementById('iframe').src;
    }
  }

  return (
    <div className='btn-overlay'>
      {title &&
        <div>
          <div className='btn-play' onClick={handleClick}><IoPlay /> {play}</div>
          <div className='overlay hide' ref={overlayRef}>
            <div className='close' onClick={handleClose}><FiX /></div>
            <iframe id="iframe" className='w-100 h-100' title={title} frameBorder="0" allowFullScreen={true} width="100%" height="100%" loading="lazy" src={EMBEDLINK + name + '?id=' + id + '&s=' + season + '&e=' + episode}></iframe>
          </div>
        </div>
      }
    </div>
  )
}

export default OverLay