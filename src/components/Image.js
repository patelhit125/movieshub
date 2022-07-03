import React, { useState, useEffect, useRef } from 'react'
import { API_MOVIE, API_TV, API_KEY, POSTER_PATH, WIDTH_ORIGINAL } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import frame3 from '../resources/Frame3.png'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from "simple-react-lightbox"
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Image = (props) => {

  const { name, id } = props;
  const [data, setData] = useState([]);

  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => setClamped(!clamped);
  const containerRef = useRef(null);

  let api;
  switch (name) {
    case 'movie':
      api = API_MOVIE;
      break;

    case 'tv':
      api = API_TV;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api + id + '/images?api_key=' + API_KEY)
        .then((data) => {
          setTimeout(() => setData(data.data.backdrops), 5000);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();

    const hasClamping = (el) => {
      const { clientHeight, scrollHeight } = el;
      return clientHeight !== scrollHeight;
    };

    const checkButtonAvailability = () => {
      if (containerRef.current) {
        // Save current state to reapply later if necessary.
        const hadClampClass = containerRef.current.classList.contains("clamp");
        // Make sure that CSS clamping is applied if aplicable.
        if (!hadClampClass) containerRef.current.classList.add("clamp");
        // Check for clamping and show or hide button accordingly.
        setShowButton(hasClamping(containerRef.current));
        // Sync clamping with local state.
        if (!hadClampClass) containerRef.current.classList.remove("clamp");
      }
    };

    checkButtonAvailability();
  }, [api, id]);

  const options = {
    settings: {
      autoplaySpeed: 1500,
      transitionSpeed: 900,
      slideAnimationType: "slide"
    },
    buttons: {
      iconColor: "rgba(256, 256, 256, 1)",
      showDownloadButton: false,
      showThumbnailsButton: false,
      showAutoplayButton: false
    },
    caption: {
      showCaption: false
    },
    thumbnails: {
      showThumbnails: false
    }
  };

  return (
    <>
      {data.length > 0 &&
        <div>
          <h1 className="mt-5 fw-bold">IMAGES</h1>
          <div className={clamped ? "clamp" : "long-text"} ref={containerRef}>
            <SimpleReactLightbox>
              <SRLWrapper options={options}>
                <div className='row'>
                  {data.map((dataRow, index) => (
                    <div key={index} className='col-12 col-sm-6 col-md-4 mb-4'>
                      <a href={POSTER_PATH + WIDTH_ORIGINAL + dataRow.file_path}>
                        <LazyLoadImage key={index} className="img-fluid" src={POSTER_PATH + WIDTH_ORIGINAL + dataRow.file_path} effect="opacity" alt={dataRow.file_path} onError={(e) => { e.target.onerror = null; e.target.src = frame3 }} />
                      </a>
                    </div>
                  ))}
                </div>
              </SRLWrapper>
            </SimpleReactLightbox>
          </div>
          <div className='text-center mt-4'>
            {showButton && (
              <button className='btn bg-dark text-light' onClick={handleClick}>{clamped ? <FiChevronDown /> : <FiChevronUp />}</button>
            )}
          </div>
        </div>}
    </>
  )
}

export default Image