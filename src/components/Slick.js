import React, { useState, useEffect } from 'react'
import { dataList, POSTER_PATH, WIDTH_ORIGINAL, avg } from '../constant';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import axios from 'axios';
import frame2 from '../resources/Frame2.png'

const Slick = (props) => {
  const { name } = props;
  const [data, setData] = useState([]);

  let dataNameRow, obj = 'results';
  switch (name) {
    case 'trending':
      dataNameRow = dataList.trending;
      break;

    case 'nowPlayingMovie':
      dataNameRow = dataList.nowPlayingMovies;
      break;

    case 'onTheAirTv':
      dataNameRow = dataList.onTheAirTvs;
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <Slider {...settings}>
      {data.length > 0 &&
        data.map((dataRow, index) => (
          <Link className='banner' key={index} to={dataRow.media_type ? dataRow.media_type === 'movie' ? dataNameRow.to.movie + dataRow.id : dataNameRow.to.tv + dataRow.id : dataNameRow.to + dataRow.id}>
            <LazyLoadImage className="img-backdrop" src={POSTER_PATH + WIDTH_ORIGINAL + dataRow.backdrop_path} effect="opacity" alt={dataRow.title ? dataRow.title : dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame2 }} />
            <div className='backdrop'></div>
            <div className="text-center slider-title w-100 position-absolute text-center p-md-3 p-sm-2 p-1">
              <h2>{dataRow.title ? dataRow.title : dataRow.name}</h2>
              <div>
                <span className="stars" style={{ '--rating': dataRow.vote_average && avg(dataRow.vote_average) }}></span>
              </div>
            </div>
          </Link>
        ))}
    </Slider>
  )
}

export default Slick
