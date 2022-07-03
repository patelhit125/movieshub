import React, { useEffect, useState } from 'react'
import { API_KEY, API_MOVIE, API_TV } from '../constant';
import YouTube from 'react-youtube';
import axios from 'axios';

const Trailer = (props) => {

  const { id, name, title } = props;
  const [data, setData] = useState([]);

  let api;
  switch (name) {
    case 'movie':
      api = API_MOVIE;
      break;

    case 'tv':
      api = API_TV;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api + id + '/videos?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data.results);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id]);

  return (
    <>
      {data.length > 0 &&
        <div className="card-link" to='/movieshub/'>
          <div className="card">
            <div className="card-body">
              <div className="card-text">
                {data.filter((item) => item.type === "Trailer").map((dataTrailer, index) => (index < 1 && dataTrailer &&
                  <span key={index}>
                    <YouTube
                      videoId={dataTrailer.key}
                      title={dataTrailer.name ? dataTrailer.name : dataTrailer.title}
                    />
                    <div className='text-break'>{title}</div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Trailer