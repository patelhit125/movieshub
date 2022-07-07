import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_MOVIE, API_KEY, POSTER_PATH, WIDTH_300, API_TV } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'

const CastList = (props) => {

  const [data, setData] = useState([]);
  const { id, name } = props;

  const ref = useRef(null);

  let api;
  switch (name) {
    case 'movie':
      api = API_MOVIE + id + '/credits?api_key=' + API_KEY;
      break;

    case 'tv':
      api = API_TV + id + '/aggregate_credits?api_key=' + API_KEY;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api)
        .then((data) => {
          setData(data.data.cast);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

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
    console.log(ref.current.scrollLeft, (ref.current.scrollWidth - (ref.current.clientWidth * 1.5)))
    if (!(ref.current.scrollLeft < (ref.current.scrollWidth - (ref.current.clientWidth * 1.5)))) {
      ref.current.children[1].classList.add('hide');
    }
    if (ref.current.scrollLeft >= 0) {
      ref.current.children[0].classList.remove('hide');
    }
  };

  return (
    <>
      {data.length > 0 &&
        <div className="position-relative">
          <h2 className="mt-5 fw-bold">CAST</h2>
          <div className="cast-row mt-3" ref={ref}>
            <button className="btn btn-outline-primary position-absolute scroll-button1 hide" onClick={() => scrollRight(500)}><FiChevronLeft /></button>
            <button className="btn btn-outline-primary position-absolute scroll-button2" onClick={() => scrollLeft(500)}><FiChevronRight /></button>
            {data.map((dataRow, index) => (
              <Link key={index} className="aLink card-link" to={'/movieshub/people/' + dataRow.id}>
                <div className="card frameWidth" key={index}>
                  <div className="card-img-top cast-img rounded-pill">
                    <LazyLoadImage className="img-fluid cast" src={POSTER_PATH + WIDTH_300 + dataRow.profile_path} effect="opacity" alt={dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                  </div>
                  <div className="card-body">
                    <div className="card-text text-center mt-2">
                      <div>{dataRow.name}</div>
                      <div className="text-muted mt-1">{dataRow['character']?.length >= 0 ? dataRow.character : dataRow['roles'].map((row, index) => (
                        <span className="genre" key={index}>{row.character}</span>
                      ))}</div>
                      {dataRow.total_episode_count && <div className="text-muted">[{dataRow.total_episode_count} Episodes]</div>}
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

export default CastList
