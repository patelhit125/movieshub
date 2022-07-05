import React, { useState, useEffect } from 'react'
import { API_MOVIE, API_TV, API_PERSON, API_KEY } from '../constant';
import { FiFacebook, FiTwitter, FiInstagram, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

const ExternalId = (props) => {

  const { id, name } = props;
  const [data, setData] = useState([]);

  let api, link;
  switch (name) {
    case 'movie':
      api = API_MOVIE;
      link = 'https://www.imdb.com/title/';
      break;

    case 'tv':
      api = API_TV;
      link = 'https://www.imdb.com/title/';
      break;

    case 'person':
      api = API_PERSON;
      link = 'https://www.imdb.com/name/';
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api + id + '/external_ids?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

  return (
    <div className="mt-4 mb-4">
      {data.imdb_id && <><div className='mb-3'><a href={link + data.imdb_id} target="_blank" rel="noreferrer">More on IMDB <FiExternalLink className="ms-2 mb-1" /></a></div></>}
      {data.instagram_id && <a className="h4 me-3"  href={'https://www.instagram.com/' + data.instagram_id} target="_blank" rel="noreferrer"><FiInstagram /></a>}
      {data.facebook_id && <a className="h4 me-3"  href={'https://www.facebook.com/' + data.facebook_id} target="_blank" rel="noreferrer"><FiFacebook /></a>}
      {data.twitter_id && <a className="h4 me-3"  href={'https://twitter.com/' + data.twitter_id} target="_blank" rel="noreferrer"><FiTwitter /></a>}
    </div>
  )
}

export default ExternalId
