import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import { API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_300, getDateShort, API_TV, count_runtime, avg } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { retry } from '../utils/CommonFunctions';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'
import frame2 from '../resources/Frame2.png'
import { FiExternalLink } from 'react-icons/fi';
const RowList = lazy(() => retry(() => import('./RowList')));
const CastList = lazy(() => retry(() => import('./CastList')));
const Keyword = lazy(() => retry(() => import('./Keyword')));
const Review = lazy(() => retry(() => import('./Review')));
const ExternalId = lazy(() => retry(() => import('./ExternalId')));
const Video = lazy(() => retry(() => import('./Video')));
const Season = lazy(() => retry(() => import('./Season')));
const Image = lazy(() => retry(() => import('./Image')));

const Tv = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);

  const idealLength = 250;
  const maxLength = 300;

  useEffect(() => {
    const getData = async () => {
      axios.get(API_TV + id + '?api_key=' + API_KEY + '&append_to_response=content_ratings')
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [id]);

  return (
        <>
          <div className='banner-inner'>
            <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + data.backdrop_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame2 }} />
            <div className='backdrop'></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-2">
                <LazyLoadImage className="img-poster rounded" src={POSTER_PATH + WIDTH_300 + data.poster_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                {data.homepage && <div className='hide-sm'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
                <div className="bebasFont text-break hide-md mt-3">{data.name}</div>
                {data.homepage && <div className='hide-md mt-3'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
                <div className='hide-sm'>
                  <div className="mt-4"><ExternalId id={id} name='tv' /></div>
                  <div>{data.status && <><div className="mt-4 text-bold">Status</div><div className='text-secondary'>{data.status}</div></>}</div>
                  <div>{data.type && <><div className="mt-4 text-bold">Type</div><div className='text-secondary'>{data.type}</div></>}</div>
                  <div>
                    {data.networks?.length > 0 && <><div className="mt-4 text-bold">Network</div><div className='text-secondary'>{data['networks'].map((dataNetwork, index) => (<div key={index}>{dataNetwork.name}</div>))}</div></>}
                  </div>
                  <div>{data.original_language && <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></>}</div>
                  <Keyword id={id} name='tv' />
                </div>
              </div>
              <div className="col-12 col-md-10 mt-3">
                <div className="bebasFont text-break hide-sm">{data.name}</div>
                <div>{data.content_ratings && data.content_ratings['results'].map((dataCerti, index) => (
                  <div className='text-secondary badge py-2' key={index}>{dataCerti.iso_3166_1 === 'US' && dataCerti.rating}</div>
                ))}</div>
                <div className='text-secondary'>
                  {data['genres'] && data['genres'].map((dataGenre, index) => (
                    <span className="genre" key={index}>{dataGenre.name}</span>
                  ))}
                </div>
                <div className='text-secondary'>{data.first_air_date && <>{getDateShort(data.first_air_date)} &#8212; {getDateShort(data.last_air_date)}</>}</div>
                <div className='text-secondary'>{count_runtime(data['episode_run_time']) && <>Runtime: {count_runtime(data['episode_run_time'])}</>}</div>
                <div>{data.vote_average && avg(data.vote_average)} <span className="stars" style={{ '--rating': data.vote_average && avg(data.vote_average)}}></span></div>
                <div className="mt-4 fw-bold">{data.tagline && '"' + data.tagline + '"'}</div>
                <div className='text-secondary'>
                  {data.overview &&
                    <ReadMoreReact text={data.overview}
                      ideal={idealLength}
                      max={maxLength}
                      readMoreText="Read more" />
                  }
                </div>
                <div className="mt-3">{data.created_by?.length > 0 && <div className='text-secondary'>Created by: {data['created_by'].map((dataCreated, index) => (<span className="genre" key={index}><Link to={'/movieshub/person/' + dataCreated.id}>{dataCreated.name}</Link></span>))}</div>}</div>
                <div className="mt-3">{data.number_of_seasons && <>Total Seasons: {data.number_of_seasons}</>}</div>
                <div>{data.number_of_episodes && <>Total Episodes: {data.number_of_episodes}</>}</div>
                <div className='mt-3'>
                  <Video id={id} name='tv' />
                </div>
                <Season id={id} />
                <CastList id={id} name='tv' />
                <Review id={id} name='tv' />
              </div>
            </div>
            <Image id={id} name='tv' />
            <RowList name='recommendationTv' id={id} />
            <RowList name='similarTv' id={id} />
            <div className='hide-md mt-5'>
              <h2 className='fw-bold'>More Info</h2>
              <div className="mt-4"><ExternalId id={id} name='tv' /></div>
              <div>{data.status && <><div className="mt-4 text-bold">Status</div><div className='text-secondary'>{data.status}</div></>}</div>
              <div>{data.type && <><div className="mt-4 text-bold">Type</div><div className='text-secondary'>{data.type}</div></>}</div>
              <div>
                {data.networks?.length > 0 && <><div className="mt-4 text-bold">Network</div><div className='text-secondary'>{data['networks'].map((dataNetwork, index) => (<div key={index}>{dataNetwork.name}</div>))}</div></>}
              </div>
              <div>{data.original_language && <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></>}</div>
              <Keyword id={id} name='tv' />
            </div>
          </div>
          </>
  )
}

export default Tv
