import React, { useState, useEffect, lazy } from 'react'
import { useParams } from 'react-router';
import { retry } from '../utils/CommonFunctions';
import { API_PERSON, API_KEY, POSTER_PATH, WIDTH_ORIGINAL, getDateShort } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import frame4 from '../resources/Frame4.png'
const Images = lazy(() => retry(() => import('./Images')));
const ExternalId = lazy(() => retry(() => import('./ExternalId')));
const RowList = lazy(() => retry(() => import('./RowList')));

const Person = () => {

  const id = useParams().id;
  const [data, setData] = useState([]);

  const idealLength = 250;
  const maxLength = 300;

  useEffect(() => {
    const getData = async () => {
      axios.get(API_PERSON + id + '?api_key=' + API_KEY)
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
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 col-md-3 col-sm-12">
            <div className="bebasFont text-break hide-md">{data.name}</div>
            <LazyLoadImage className="img-fluid w-100 rounded" src={POSTER_PATH + WIDTH_ORIGINAL + data.profile_path} effect="opacity" alt={data.name} onError={(e) => { e.target.onerror = null; e.target.src = frame4 }} />
            <div className="mt-4">
              <ExternalId id={id} name='person' />
              <div className='hide-sm'>
                <h4 className="mt-4 fw-bold">PERSONAL INFO</h4>
                {data['known_for_department']?.length > 0 && <><div className="mt-3"><b>Known for</b></div><div className='text-muted'>{data.known_for_department}</div></>}
                <div className="mt-3">
                  {data['gender']?.length > 0 &&
                    <div>
                      <div className="text-bold">Gender</div>
                      <div className='text-muted'>{data.gender === 1 ? 'Female' : 'Male'}</div>
                    </div>}
                </div>
                <div className="mt-3">
                  {data['birthday']?.length > 0 &&
                    <div>
                      <div className="text-bold">Birthday</div>
                      <div className='text-muted'>{getDateShort(data.birthday)}</div>
                    </div>}
                </div>
                <div className="mt-3">
                  {data['deathday']?.length > 0 &&
                    <div>
                      <div className="text-bold">Deathday</div>
                      <div className='text-muted'>{getDateShort(data.deathday)}</div>
                    </div>}
                </div>
                <div className="mt-3">
                  {data['place_of_birth']?.length > 0 &&
                    <div>
                      <div className="text-bold">Place of birth</div>
                      <div className='text-muted'>{data.place_of_birth}</div>
                    </div>}
                </div>
                <div className="mt-3">
                  {data['also_known_as']?.length > 0 &&
                    <div>
                      <div className="text-bold">Also known as</div>
                      {data.also_known_as && data['also_known_as'].map((data, index) => (
                        <div className='text-muted' key={index}>{data}</div>
                      ))}
                    </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 col-sm-12">
            <div className="bebasFont text-break hide-sm">{data.name}</div>
            <div className="text-preline text-muted">
              {data.biography ?
                <ReadMoreReact text={data.biography}
                  ideal={idealLength}
                  max={maxLength}
                  readMoreText="Read more" /> : 'Biography not available'}
            </div>
            <RowList id={id} name='movieCredits' />
            <RowList id={id} name='tvCredits' />
            <div className='hide-md mt-5'>
              <h4 className="mt-4 fw-bold">PERSONAL INFO</h4>
              <div className="mt-3"><b>Known for</b></div><div className='text-muted'>{data.known_for_department}</div>
              <div className="mt-3">
                {data['gender'] && data['gender'].length !== 0 &&
                  <div>
                    <div className="text-bold">Gender</div>
                    <div className='text-muted'>{data.gender === 1 ? 'Female' : 'Male'}</div>
                  </div>}
              </div>
              <div className="mt-3">
                {data['birthday'] && data['birthday'].length !== 0 &&
                  <div>
                    <div className="text-bold">Birthday</div>
                    <div className='text-muted'>{getDateShort(data.birthday)}</div>
                  </div>}
              </div>
              <div className="mt-3">
                {data['deathday'] && data['deathday'].length !== 0 &&
                  <div>
                    <div className="text-bold">Deathday</div>
                    <div className='text-muted'>{getDateShort(data.deathday)}</div>
                  </div>}
              </div>
              <div className="mt-3">
                {data['place_of_birth'] && data['place_of_birth'].length !== 0 &&
                  <div>
                    <div className="text-bold">Place of birth</div>
                    <div className='text-muted'>{data.place_of_birth}</div>
                  </div>}
              </div>
              <div className="mt-3">
                {data['also_known_as'] && data['also_known_as'].length !== 0 &&
                  <div>
                    <div className="text-bold">Also known as</div>
                    {data.also_known_as && data['also_known_as'].map((data, index) => (
                      <div className='text-muted' key={index}>{data}</div>
                    ))}
                  </div>}
              </div>
            </div>
            <Images id={id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Person
