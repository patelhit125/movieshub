import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router';
import ReadMoreReact from 'read-more-react';
import { API_MOVIE, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, WIDTH_500, count_runtime, avg, currency, getDateShortest } from '../constant';
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
// const Image = lazy(() => retry(() => import('./Image')));
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
        <OverLay id={id} name='movie' title={data.title} />
      </div>
      <div className="container zidx-2">
        <div className="row">
          <div className="col-12 col-lg-2">
            <LazyLoadImage className="img-poster rounded hide-sm" src={POSTER_PATH + WIDTH_500 + data.poster_path} effect="opacity" alt={data.title} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
            {data.homepage && <div className='hide-sm mt-4'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
            <div className="avertaFont hide-md text-break title text-center">{data.title}</div>
            <div className='hide-sm'>
              <div><ExternalId id={id} name='movie' /></div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className='text-center'>
              <div className="avertaFont hide-sm text-break mb-2">{data.title}</div>
              <div className='text-secondary mt-2'>
                {data.release_date && getDateShortest(data.release_date)} &#8226; {data['genres'] && data['genres'].map((dataGenre, index) => (
                  <span className="genre" key={index}>{dataGenre.name}</span>
                ))} &#8226; {count_runtime(data.runtime)}
              </div>
              <div className='mt-3'>{data.vote_average && <span className="stars" style={{ '--rating': data.vote_average && avg(data.vote_average) }}></span>}</div>
            </div>
            <div className='mt-4'>{data.release_dates && data.release_dates['results'].map((dataCerti, index) => (
              dataCerti.iso_3166_1 === 'US' &&
              <div className='text-secondary badge py-2' key={index}>
                {dataCerti['release_dates'].map((dataC, index, row) => (
                  index + 1 === row.length && dataC.certification && dataC.certification
                ))}
              </div>
            ))}</div>
            <div className="text-bold">{data.tagline && '"' + data.tagline + '"'}</div>
            <div className='text-secondary'>
              {data.overview &&
                <ReadMoreReact text={data.overview}
                  ideal={idealLength}
                  max={maxLength}
                  readMoreText="Read more" />
              }
            </div>
            <div className='mt-4'>
              <Video id={id} name='movie' />
            </div>
            <CastList id={id} name='movie' />
            <Review id={id} name='movie' />
          </div>
          <div className='col-12 hide-sm col-lg-2 mt-2'>
            <div>{data.status && <><div className="text-bold">STATUS</div><div className='text-secondary'>{data.status}</div></>}</div>
            <div>{data.original_language && <><div className="mt-3 text-bold">LANGUAGE</div><div className='text-secondary'>{data.original_language}</div></>}</div>
            <div>{data['revenue']?.length > 0 && <><div className="mt-3 text-bold">REVENUE</div><div className='text-secondary'>{currency(data.revenue)}</div></>}</div>
            <div>{data['budget']?.length > 0 && <><div className="mt-3 text-bold">BUDGET</div><div className='text-secondary'>{currency(data.budget)}</div></>}</div>
            <Keyword id={id} name='movie' />
          </div>
        </div>
        {/* <Image id={id} name='movie' /> */}
        <RowList name='recommendationMovie' id={id} />
        <RowList name='similarMovie' id={id} />
        <div className='hide-md mt-5'>
          <h2 className='fw-bold'>MORE INFO</h2>
          {data.homepage && <div className='hide-md mt-4'><a href={data.homepage} target="_blank" rel="noreferrer">Homepage <FiExternalLink className="ms-2 mb-1" /></a></div>}
          <div><ExternalId id={id} name='movie' /></div>
          <div>{data.status && <><div className="text-bold mt-4">Status</div><div className='text-secondary'>{data.status}</div></>}</div>
          <div>{data.original_language && <><div className="mt-3 text-bold">Language</div><div className='text-secondary'>{data.original_language}</div></>}</div>
          <div>{data['revenue']?.length > 0 && <><div className="mt-3 text-bold">Revenue</div><div className='text-secondary'>{currency(data.revenue)}</div></>}</div>
          <div>{data['budget']?.length > 0 && <><div className="mt-3 text-bold">Budget</div><div className='text-secondary'>{currency(data.budget)}</div></>}</div>
          <Keyword id={id} name='movie' />
        </div>
      </div>
    </>
  )
}

export default Movie
