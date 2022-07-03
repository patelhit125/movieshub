import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router';
import ReadMoreReact from 'read-more-react';
import { API_MOVIE, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_500, count_runtime, avg, currency } from '../constant';
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
const Image = lazy(() => retry(() => import('./Image')));
const OverLay = lazy(() => retry(() => import('./OverLay')));

const Movie = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);

  const idealLength = 250;
  const maxLength = 300;


  useEffect(() => {
    const getData = async () => {
      axios.get(API_MOVIE + id + '?api_key=' + API_KEY + '&append_to_response=release_dates')
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
        <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + data.backdrop_path} effect="opacity" alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = frame2 }} />
        <div className='backdrop'></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2">
            <LazyLoadImage className="img-poster rounded" src={POSTER_PATH + WIDTH_500 + data.poster_path} effect="opacity" alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
            {data.homepage && <div className='hide-sm'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
            <div className="bebasFont hide-md mt-3 mb-3 text-break">{data.title}</div>
            {data.homepage && <div className='hide-md mt-3'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
            <div className='hide-sm'>
              <div><ExternalId id={id} name='movie' /></div>
              <div>{data.status && <><div className="text-bold">Status</div><div className='text-secondary'>{data.status}</div></>}</div>
              <div>{data.original_language && <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></>}</div>
              <div>{data['revenue']?.length > 0 && <><div className="mt-4 text-bold">Revenue</div><div className='text-secondary'>{currency(data.revenue)}</div></>}</div>
              <div>{data['budget']?.length > 0 && <><div className="mt-4 text-bold">Budget</div><div className='text-secondary'>{currency(data.budget)}</div></>}</div>
              <Keyword id={id} name='movie' />
            </div>
          </div>
          <div className="col-12 col-md-10 mt-3">
            <div className="bebasFont hide-sm text-break">{data.title}</div>
            <div>{data.release_dates && data.release_dates['results'].map((dataCerti, index) => (
              dataCerti.iso_3166_1 === 'US' &&
              <div className='text-secondary badge py-2' key={index}>
                {dataCerti['release_dates'].map((dataC, index, row) => (
                  index + 1 === row.length && dataC.certification && dataC.certification
                ))}
              </div>
            ))}</div>
            <div className='text-secondary'>
              {data['genres'] && data['genres'].map((dataGenre, index) => (
                <span className="genre" key={index}>{dataGenre.name}</span>
              ))}
            </div>
            <div className='text-secondary'>{data.release_date && <>{data.release_date} &#8212;</>} {count_runtime(data.runtime)}</div>
            <div>{data.vote_average && avg(data.vote_average)} <span className="stars" style={{ '--rating': data.vote_average && avg(data.vote_average) }}></span></div>
            <div className="mt-4 text-bold">{data.tagline && '"' + data.tagline + '"'}</div>
            <div className='text-secondary'>
              {data.overview &&
                <ReadMoreReact text={data.overview}
                  ideal={idealLength}
                  max={maxLength}
                  readMoreText="Read more" />
              }
            </div>
            <div className='mt-4'>
              <OverLay id={id} name='movie' title={data.title} />
              <Video id={id} name='movie' />
            </div>
            <CastList id={id} name='movie' />
            <Review id={id} name='movie' />
          </div>
        </div>
        <Image id={id} name='movie' />
        <RowList name='recommendationMovie' id={id} />
        <RowList name='similarMovie' id={id} />
        <div className='hide-md mt-5'>
          <h2 className='fw-bold'>More Info</h2>
          <div><ExternalId id={id} name='movie' /></div>
          <div>{data.status && <><div className="text-bold">Status</div><div className='text-secondary'>{data.status}</div></>}</div>
          <div>{data.original_language && <><div className="mt-4 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></>}</div>
          <div>{data['revenue']?.length > 0 && <><div className="mt-4 text-bold">Revenue</div><div className='text-secondary'>{currency(data.revenue)}</div></>}</div>
          <div>{data['budget']?.length > 0 && <><div className="mt-4 text-bold">Budget</div><div className='text-secondary'>{currency(data.budget)}</div></>}</div>
          <Keyword id={id} name='movie' />
        </div>
      </div>
    </>
  )
}

export default Movie
