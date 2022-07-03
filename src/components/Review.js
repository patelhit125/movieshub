import React, { useState, useEffect, useRef } from 'react';
import { API_MOVIE, API_KEY, API_TV, getDate, avg } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import frame5 from '../resources/Frame5.png'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Review = (props) => {

  const { id, name } = props;
  const [data, setData] = useState([]);

  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => setClamped(!clamped);

  const containerRef = useRef(null);

  const idealLength = 200;

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
      axios.get(api + id + '/reviews?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.results)
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
  }, [api, id, containerRef]);

  return (
    <div>
      {data.length > 0 &&
        <>
          <h2 className="mt-5 fw-bold">REVIEWS</h2>
          <div className={clamped ? "clamp" : "long-text"} ref={containerRef}>
            {data.map((dataRow, index) => (
              <div key={index}>
                <div className="row mb-5">
                  <div className="col-lg-1 col-md-2 col-12">
                    <LazyLoadImage key={index} className="rounded-circle" src={dataRow['author_details']['avatar_path'] && dataRow['author_details']['avatar_path'].substring(1)} effect="opacity" alt={dataRow.author} onError={(e) => { e.target.onerror = null; e.target.src = frame5 }} />
                  </div>
                  <div className="col-lg-11 col-md-10 col-12 mt-3">
                    <h5 className="text-bold">A review by {dataRow.author}</h5>
                    <div className="text-secondary">{getDate(dataRow.created_at)}</div>
                    <div>{dataRow['author_details']['rating'] && avg(dataRow['author_details']['rating'])} <span className="stars" style={{ '--rating': dataRow['author_details']['rating'] && avg(dataRow['author_details']['rating']) }}></span></div>
                    <div className="mt-3 text-preline text-muted">
                      <ReadMoreReact text={dataRow.content}
                        ideal={idealLength}
                        readMoreText="Read more" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='text-center mt-4'>
            {showButton && (
              <button className='btn bg-dark text-light' onClick={handleClick}>{clamped ? <FiChevronDown /> : <FiChevronUp />}</button>
            )}
          </div>
        </>}
    </div>
  )
}

export default Review
