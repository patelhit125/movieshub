import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { API_KEY, POSTER_PATH, WIDTH_500, API_TV, getDateShortest } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'

const Season = (props) => {
  const { id } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_TV + id + '?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.seasons);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id]);

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
    <>
      {data.length > 0 &&
        <div className="mt-5 position-relative">
          <h2 className='fw-bold'>SEASONS</h2>
          <div className="d-flex flex-row mt-3" ref={ref}>
            <button className="btn btn-primary position-absolute scroll-button1 hide" onClick={() => scrollRight(500)}><FiChevronLeft /></button>
            <button className="btn btn-primary position-absolute scroll-button2" onClick={() => scrollLeft(500)}><FiChevronRight /></button>
            {data.map((dataRow, index) => (
              <Link key={index} className="aLink card-link" to={'/movieshub/tv/' + id + '/season/' + dataRow.season_number}>
                <div className="card frameWidth" key={index}>
                  <div className='card-img-top rounded'>
                    <LazyLoadImage className="img-fluid" src={POSTER_PATH + WIDTH_500 + dataRow.poster_path} effect="opacity" alt={dataRow.title ? dataRow.title : dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <div className='text-muted'>{dataRow.air_date && getDateShortest(dataRow.air_date)}</div>
                      <div className='mt-1'>{dataRow.title ? dataRow.title : dataRow.name}</div>
                      <div className="text-muted mt-1">{dataRow.episode_count} Episodes</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>}
    </>
  )
}

export default Season
