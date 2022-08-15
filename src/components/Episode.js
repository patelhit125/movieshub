import React, { useState, useEffect, lazy } from 'react'
import { useParams, useHistory } from 'react-router';
import { API_TV, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, avg, WIDTH_500, getDateShortest } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import { retry } from '../utils/CommonFunctions';
// import frame1 from '../resources/Frame1.png'
import frame2 from '../resources/Frame2.png'
import frame3 from '../resources/Frame3.png'
const OverLay = lazy(() => retry(() => import('./OverLay')));

const Episodes = () => {
  const id = useParams().id;
  const season = useParams().number;
  const history = useHistory();
  const [data, setData] = useState([]);
  
  const maxLength = 300;
  const idealLength = 200;

  useEffect(() => {
    const getData = async () => {
      axios.get(API_TV + id + '/season/' + season + '?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id, season]);

  return (
    <div>
      <div className='banner-inner'>
        <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + data.poster_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame2 }} />
        <div className='backdrop'></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-2">
            {/* <LazyLoadImage className="img-poster rounded" src={POSTER_PATH + WIDTH_300 + data.poster_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} /> */}
          </div>
          <div className="col-12 col-lg-10">
            <div className='aLink' onClick={history.goBack}>&#8592; Back</div>
            <div className="manropeFont text-break mt-4">{data.name}</div>
            <div className="text-muted">{getDateShortest(data.air_date)}</div>
            <div className="mt-3 mb-0 text-muted">
              {data.overview &&
                <ReadMoreReact text={data.overview}
                  ideal={idealLength}
                  max={maxLength}
                  readMoreText="Read more" />
              }  
            </div>
            <div>
              {data.episodes && Object.keys(data.episodes).map((dataRow, index) => (
                <div className="mt-5 card episodeWidth" key={index}>
                  <div className="row">
                    <div className="col-12 col-lg-6 mt-3">
                      <LazyLoadImage className="episodeImage rounded img-fluid" src={POSTER_PATH + WIDTH_500 + data['episodes'][dataRow].still_path} effect="opacity" alt={data['episodes'][dataRow].name} onError={(e) => { e.target.onerror = null; e.target.src = frame3 }} />
                    </div>
                    <div className="card-body col-12 col-lg-6 mt-3">
                      <div className="card-text">
                        <div className="text-muted">Episode {data['episodes'][dataRow].episode_number} &#8212; {data['episodes'][dataRow].air_date ? getDateShortest(data['episodes'][dataRow].air_date) : getDateShortest(data['episodes'][dataRow].first_air_date)}</div>
                        <div className="text-bold mt-1">{data['episodes'][dataRow].name ? data['episodes'][dataRow].name : data['episodes'][dataRow].episode_number}</div>
                        <div className='mt-2'>{data['episodes'][dataRow].vote_average ? <span className="stars" style={{ '--rating': data['episodes'][dataRow].vote_average && avg(data['episodes'][dataRow].vote_average) }}></span> : null}</div>
                        <div className="mt-3 text-muted">
                          <ReadMoreReact text={data['episodes'][dataRow].overview}
                            ideal={idealLength}
                            readMoreText="Read more" />
                        </div>
                        <div className='mt-3'>
                          <OverLay title={data.name} name='tv' id={id} play='Watch online' season={data['episodes'][dataRow].season_number} episode={data['episodes'][dataRow].episode_number} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Episodes
