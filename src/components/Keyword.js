import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, API_MOVIE, API_TV } from '../constant';
import axios from 'axios';

const Keyword = (props) => {
  const { id, name } = props;
  const [data, setData] = useState([]);

  let api, obj;
  switch (name) {
    case 'movie':
      api = API_MOVIE;
      obj = 'keywords';
      break;

    case 'tv':
      api = API_TV;
      obj = 'results';
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(api + id + '/keywords?api_key=' + API_KEY)
        .then((data) => {
          setData(data.data[obj]);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [api, id, obj]);

  return (
    <div>

      <div>
        {data.length > 0 &&
          <>
            <div className="text-bold mt-4">Keyword Cloud</div>
            <div className="mt-1">{data.map((dataRow, index) => (
              <Link to={'/movieshub/keyword/' + dataRow.id} className="badge" key={index}>{dataRow.name}</Link>
            ))}
            </div>
          </>}
      </div>
    </div>
  )
}

export default Keyword
