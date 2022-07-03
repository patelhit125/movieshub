import React, { useState, useEffect, useRef } from 'react'
import { API_UPCOMING_MOVIE, API_ONTHEAIR_TV } from '../constant';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import Trailer from './Trailer';

const TrailerList = (props) => {
  const { name } = props;
  const [data, setData] = useState([]);

  let api;
  switch (name) {
    case 'movie':
      api = API_UPCOMING_MOVIE;
      break;

    case 'tv':
      api = API_ONTHEAIR_TV;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api)
        .then((data) => {
          setData(data.data['results']);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api]);

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
    <div className="mt-5">
      {data.length > 0 &&
        <div className="position-relative">
          <h2>TRAILERS</h2>
          <div className="d-flex flex-row" ref={ref}>
            <button className="btn btn-primary position-absolute scroll-button1 hide" onClick={() => scrollRight(500)}><FiChevronLeft /></button>
            <button className="btn btn-primary position-absolute scroll-button2" onClick={() => scrollLeft(500)}><FiChevronRight /></button>
            {data.map((dataRow, index) => (
              <div key={index} className="card-link aLink">
                <Trailer id={dataRow.id} name={name} title={dataRow.title ? dataRow.title : dataRow.name} />
              </div>
            ))}
          </div>
        </div>}
    </div>
  )
}

export default TrailerList