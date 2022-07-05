import React, { useState, useEffect, useRef } from 'react';
import { API_MOVIE, API_TV, API_KEY } from '../constant';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoPlay } from 'react-icons/io5';
import axios from 'axios';
import YouTube from 'react-youtube';

const Video = (props) => {

  const { id, name } = props;
  const [data, setData] = useState([]);

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
      axios.get(api + id + '/videos?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.results);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

  const ref = useRef(null);

  const scrollRight = (scrollOffset) => {
    ref.current.scrollLeft -= scrollOffset;
    if (!(ref.current.scrollLeft < (ref.current.scrollWidth - (ref.current.clientWidth * 1.25)))) {
      ref.current.children[1].classList.remove('hide');
    }
    if (ref.current.scrollLeft <= 500) {
      ref.current.children[0].classList.add('hide');
    }
  };

  const scrollLeft = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    if (!(ref.current.scrollLeft < (ref.current.scrollWidth - (ref.current.clientWidth * 1.25)))) {
      ref.current.children[1].classList.add('hide');
    }
    if (ref.current.scrollLeft >= 0) {
      ref.current.children[0].classList.remove('hide');
    }
  };

  return (
    data.length > 0 &&
      <>
        <span className='align-middle'>{data.filter((item) => item.type === "Trailer").map((dataTrailer, index) => (index < 1 && dataTrailer ? <a className='aLink btn bg-dark text-light mt-3' key={index} href={"https://www.youtube.com/watch?v=" + dataTrailer.key} target="_blank" rel="noreferrer"><IoPlay className='me-2 mb-1' />Play trailer</a> : null))}</span>
        <div className="mt-5 position-relative">
          <h2 className='fw-bold'>VIDEOS</h2>
          <div className="d-flex flex-row" ref={ref}>
            <button className="btn btn-primary position-absolute scroll-button1 hide" onClick={() => scrollRight(500)}><FiChevronLeft /></button>
            <button className="btn btn-primary position-absolute scroll-button2" onClick={() => scrollLeft(500)}><FiChevronRight /></button>
            {data.map((dataRow, index) => (
              <div key={index} className="card-link" to='/movieshub/'>
                <div className="card" key={index}>
                  <div className="card-body">
                    <div className="card-text w-iframe">
                      <YouTube
                        videoId={dataRow.key}
                        title={dataRow.name ? dataRow.name : dataRow.title}
                        loading="lazy"
                      />
                      <div className='text-break'>{dataRow.name ? dataRow.name : dataRow.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
  )
}

export default Video
