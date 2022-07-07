import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import { API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_300, API_TV, count_runtime, avg, getDateShortest } from '../constant';
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
// const Image = lazy(() => retry(() => import('./Image')));

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
            <LazyLoadImage className="img-poster rounded hide-sm" src={POSTER_PATH + WIDTH_300 + data.poster_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
            {data.homepage && <div className='hide-sm mt-3'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
            <div className="avertaFont text-break hide-md text-center title">{data.name}</div>
            <div className='hide-sm'>
              <div className="mt-3"><ExternalId id={id} name='tv' /></div>
              <div>{data.status && <><div className="mt-4 text-bold">Status</div><div className='text-muted'>{data.status}</div></>}</div>
              <div>{data.type && <><div className="mt-3 text-bold">Type</div><div className='text-muted'>{data.type}</div></>}</div>
              <div>
                {data.networks?.length > 0 && <><div className="mt-3 text-bold">Network</div><div className='text-muted'>{data['networks'].map((dataNetwork, index) => (<div key={index}>{dataNetwork.name}</div>))}</div></>}
              </div>
              <div>{data.original_language && <><div className="mt-3 text-bold">Language</div><div className='text-muted'>{data.original_language}</div></>}</div>
              <Keyword id={id} name='tv' />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className='text-center'>
              <div className="avertaFont text-break hide-sm mb-2">{data.name}</div>
              <div className='text-muted mt-2'>
                {data.first_air_date && <>{getDateShortest(data.first_air_date)} &#8212; {getDateShortest(data.last_air_date)}</>} &#8226; {data['genres'] && data['genres'].map((dataGenre, index) => (
                  <span className="genre" key={index}>{dataGenre.name}</span>
                ))} &#8226; {count_runtime(data['episode_run_time']) && count_runtime(data['episode_run_time'])}
              </div>
              <div className='mt-3'><span className="stars" style={{ '--rating': data.vote_average && avg(data.vote_average) }}></span></div>
            </div>
            <div className='mt-4'>
              {data.content_ratings && data.content_ratings['results'].map((dataCerti, index) => (
                <div className='text-muted badge py-2' key={index}>{dataCerti.iso_3166_1 === 'US' && dataCerti.rating}</div>
              ))}
            </div>
            <div className="fw-bold">{data.tagline && '"' + data.tagline + '"'}</div>
            <div className='text-muted'>
              {data.overview &&
                <ReadMoreReact text={data.overview}
                  ideal={idealLength}
                  max={maxLength}
                  readMoreText="Read more" />
              }
            </div>
            <div className="mt-3">{data.created_by?.length > 0 && <div className='text-muted'>Created by: {data['created_by'].map((dataCreated, index) => (<span className="genre" key={index}><Link to={'/movieshub/person/' + dataCreated.id}>{dataCreated.name}</Link></span>))}</div>}</div>
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
        {/* <Image id={id} name='tv' /> */}
        <RowList name='recommendationTv' id={id} />
        <RowList name='similarTv' id={id} />
        <div className='hide-md mt-5'>
          <h2 className='fw-bold'>MORE INFO</h2>
          {data.homepage && <div className='hide-md mt-4'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
          <div className="mt-3"><ExternalId id={id} name='tv' /></div>
          <div>{data.status && <><div className="mt-4 text-bold">Status</div><div className='text-muted'>{data.status}</div></>}</div>
          <div>{data.type && <><div className="mt-4 text-bold">Type</div><div className='text-muted'>{data.type}</div></>}</div>
          <div>
            {data.networks?.length > 0 && <><div className="mt-4 text-bold">Network</div><div className='text-muted'>{data['networks'].map((dataNetwork, index) => (<div key={index}>{dataNetwork.name}</div>))}</div></>}
          </div>
          <div>{data.original_language && <><div className="mt-4 text-bold">Language</div><div className='text-muted'>{data.original_language}</div></>}</div>
          <Keyword id={id} name='tv' />
        </div>
      </div>
    </>
  )
}

export default Tv
