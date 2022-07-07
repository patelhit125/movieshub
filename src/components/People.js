import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_PEOPLE, POSTER_PATH, WIDTH_300 } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'

const People = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_PEOPLE)
        .then((data) => {
          setData(data.data.results);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, []);

  return (
    <div className="container">
      {data.length > 0 &&
        <div>
          <h2 className="mt-5 fw-bold">POPULAR PEOPLE</h2>
          <div className="row mt-3">
            {data.map((dataRow, index) => (
              <Link key={index} className="aLink col-6 col-sm-4 col-md-3 col-lg-2 mb-5" to={'/movieshub/people/' + dataRow.id}>
                <div className="card" key={index}>
                  <div className='card-img-top card-img-search rounded'>
                    <LazyLoadImage className="img-fluid" src={POSTER_PATH + WIDTH_300 + dataRow.profile_path} effect="opacity" alt={dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <div className='mt-1'>{dataRow.name}</div>
                      <div className="text-muted mt-1">{dataRow['known_for'].map((dataKnown, index) => (<span className="genre" key={index}>{dataKnown.title ? dataKnown.title : dataKnown.name}</span>))}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>}
    </div>
  )
}

export default People
