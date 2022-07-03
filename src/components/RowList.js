import React, { useState, useEffect, useRef } from 'react'
import { API_KEY, dataList, POSTER_PATH, API_MOVIE, API_TV, avg, API_PERSON, WIDTH_500, getDateShortest } from '../constant';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'

const RowList = (props) => {
  const { name, id } = props;
  const [data, setData] = useState([]);

  let dataNameRow, obj = 'results';
  switch (name) {
    case 'trending':
      dataNameRow = dataList.trending;
      break;

    case 'discoverMovie':
      dataNameRow = dataList.discoverMovies;
      break;

    case 'discoverTv':
      dataNameRow = dataList.discoverTv;
      break;

    case 'similarMovie':
      dataNameRow = dataList.similarMovie;
      dataNameRow.api = API_MOVIE + id + '/similar?api_key=' + API_KEY;
      break;

    case 'similarTv':
      dataNameRow = dataList.similarTv;
      dataNameRow.api = API_TV + id + '/similar?api_key=' + API_KEY;
      break;

    case 'recommendationMovie':
      dataNameRow = dataList.recommendationMovie;
      dataNameRow.api = API_MOVIE + id + '/recommendations?api_key=' + API_KEY;
      break;

    case 'recommendationTv':
      dataNameRow = dataList.recommendationTv;
      dataNameRow.api = API_TV + id + '/recommendations?api_key=' + API_KEY;
      break;

    case 'movieCredits':
      dataNameRow = dataList.movieCredits;
      dataNameRow.api = API_PERSON + id + '/movie_credits?api_key=' + API_KEY;
      obj = 'cast';
      break;

    case 'tvCredits':
      dataNameRow = dataList.tvCredits;
      dataNameRow.api = API_PERSON + id + '/tv_credits?api_key=' + API_KEY;
      obj = 'cast';
      break;

    case 'nowPlayingMovie':
      dataNameRow = dataList.nowPlayingMovies;
      break;

    case 'topRatedMovie':
      dataNameRow = dataList.topRatedMovies;
      break;

    case 'upcomingMovie':
      dataNameRow = dataList.upcomingMovies;
      break;

    case 'airingTodayTv':
      dataNameRow = dataList.airingTodayTvs;
      break;

    case 'topRatedTv':
      dataNameRow = dataList.topRatedTvs;
      break;

    case 'onTheAirTv':
      dataNameRow = dataList.onTheAirTvs;
      break;

    case 'topActionMovie':
      dataNameRow = dataList.actionMovies;
      break;

    case 'topAnimationMovie':
      dataNameRow = dataList.animationMovies;
      break;

    case 'topComedyMovie':
      dataNameRow = dataList.comedyMovies;
      break;

    case 'topDocumentaryMovie':
      dataNameRow = dataList.documentaryMovies;
      break;

    case 'topHorrorMovie':
      dataNameRow = dataList.horroMovies;
      break;

    case 'topRomanceMovie':
      dataNameRow = dataList.romanceMovies;
      break;

    case 'topScifiMovie':
      dataNameRow = dataList.scifiMovies;
      break;

    case 'topThrillerMovie':
      dataNameRow = dataList.thrillerMovies;
      break;

    case 'topActionTv':
      dataNameRow = dataList.actionTv;
      break;

    case 'topAnimationTv':
      dataNameRow = dataList.animationTv;
      break;

    case 'topComedyTv':
      dataNameRow = dataList.comedyTv;
      break;

    case 'topDocumentaryTv':
      dataNameRow = dataList.documentaryTv;
      break;

    case 'topKidsTv':
      dataNameRow = dataList.kidsTv;
      break;

    case 'topFamilyTv':
      dataNameRow = dataList.familyTv;
      break;

    case 'topScifiTv':
      dataNameRow = dataList.scifiTv;
      break;

    default:
      break;
  }

  useEffect(() => {
    const getData = async () => {
      axios.get(dataNameRow.api)
        .then((data) => {
          setData(data.data[obj]);
        })
        .catch((error) => {
          console.error(error);
        })
    }

    getData();
  }, [dataNameRow.api, obj]);

  const ref = useRef(null);

  const scrollRight = (scrollOffset) => {
    ref.current.scrollLeft -= scrollOffset;
    if (!(ref.current.scrollLeft < (ref.current.scrollWidth - (ref.current.clientWidth * 1.25)))) {
      ref.current.children[1].classList.remove('hide');
    }
    if (ref.current.scrollLeft <= 500) {
      ref.current.children[0].classList.add('hide');
    }
  };

  const scrollLeft = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    if (!(ref.current.scrollLeft < (ref.current.scrollWidth - (ref.current.clientWidth * 1.25)))) {
      ref.current.children[1].classList.add('hide');
    }
    if (ref.current.scrollLeft >= 0) {
      ref.current.children[0].classList.remove('hide');
    }
  };

  return (
    <div className="mt-5">
      {data.length > 0 &&
        <div className="position-relative">
          <h2 className='fw-bold'>{dataNameRow.name}</h2>
          <div className="d-flex flex-row" ref={ref}>
            <button className="btn btn-primary position-absolute scroll-button1 hide" onClick={() => scrollRight(500)}><FiChevronLeft /></button>
            <button className="btn btn-primary position-absolute scroll-button2" onClick={() => scrollLeft(500)}><FiChevronRight /></button>
            {data.map((dataRow, index) => (
              <div key={index} className="card-link aLink" onClick={() => { window.location.href = dataRow.media_type ? dataRow.media_type === 'movie' ? dataNameRow.to.movie + dataRow.id : dataNameRow.to.tv + dataRow.id : dataNameRow.to + dataRow.id }}>
                <div className="card frameWidth" key={index}>
                  <div className="card-img-top rounded">
                    <LazyLoadImage className="img-fluid imagePlaceholder" src={POSTER_PATH + WIDTH_500 + dataRow.poster_path} effect="opacity" alt={dataRow.title ? dataRow.title : dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <div className="text-muted">{dataRow.vote_average && <>{avg(dataRow.vote_average)} &#8212;</>} {(dataRow.release_date || dataRow.first_air_date) && dataRow.release_date ? getDateShortest(dataRow.release_date) : getDateShortest(dataRow.first_air_date)}</div>
                      <div>{dataRow.title ? dataRow.title : dataRow.name}</div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default RowList