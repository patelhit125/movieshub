import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_SEARCH, POSTER_PATH, WIDTH_500, avg, getDateShortest } from '../constant';
import { FiSlash, FiX } from "react-icons/fi";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import frame1 from '../resources/Frame1.png'
import { FiSearch, FiArrowUp } from 'react-icons/fi';

const Navigation = () => {

  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const wrapperRef = useRef(null)
  const ref = useRef(null)

  const handleChange = event => {
    setSearchTerm(event.target.value)
    if (event.target.value) {
      const getData = async () => {
        axios.get(API_SEARCH + event.target.value)
          .then((data) => {
            setData(data.data.results);
          })
          .catch((error) => {
            console.error(error);
          })
      }
      getData();
    }
    else {
      setData([]);
    }
  };

  let lastScrollNav = 0
  window.onscroll = () => {
    const stNav = window.scrollY
    if (stNav > lastScrollNav) {
      if (!document.getElementById('navbarSupportedContent').classList.contains('show')) { 
        wrapperRef.current.classList.add("topHide")
        wrapperRef.current.classList.remove("topNav")
        ref.current.classList.add("hide")
        ref.current.classList.remove("show")
      }
    }
    else {
      if (window.pageYOffset < 400) {
        if (!document.getElementById('navbarSupportedContent').classList.contains('show')) { 
          wrapperRef.current.classList.add("topHide")
          wrapperRef.current.classList.remove("topNav")
          ref.current.classList.add("hide")
          ref.current.classList.remove("show")
        }
      }
      else {
        wrapperRef.current.classList.add("topNav")
        wrapperRef.current.classList.remove("topHide")
        ref.current.classList.add("show")
        ref.current.classList.remove("hide")
      }
    }
    lastScrollNav = stNav
  }

  const handleNav = (e) => {
    e.preventDefault();
    if (document.getElementById('navbarSupportedContent').classList.contains('open')) {
      document.getElementById('navbarSupportedContent').classList.remove('show');
      document.getElementById('navbarSupportedContent').classList.remove('open');
      document.getElementById('navbarToggler').classList.remove('open');
    }
    else {
      document.getElementById('navbarSupportedContent').classList.add('show');
      document.getElementById('navbarSupportedContent').classList.add('open');
      document.getElementById('navbarToggler').classList.add('open');
    }
  };

  const handleClick = () => {
    if (!document.getElementById('search').classList.contains('hide')) {
      document.getElementById('search').classList.add('hide');
      document.getElementsByTagName('html')[0].style.overflowY = 'auto';
    }
    if (document.getElementById('navbarSupportedContent').classList.contains('open')) {
      document.getElementById('navbarSupportedContent').classList.remove('show');
      document.getElementById('navbarSupportedContent').classList.remove('open');
      document.getElementById('navbarToggler').classList.remove('open');
    }
  }

  const handleSearchClick = () => {
    if (document.getElementById('search').classList.contains('hide')) {
      document.getElementById('search').classList.remove('hide');
      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
      document.getElementById("searchInput").focus()
    }
    if (document.getElementById('navbarSupportedContent').classList.contains('open')) {
      document.getElementById('navbarSupportedContent').classList.remove('show');
      document.getElementById('navbarSupportedContent').classList.remove('open');
      document.getElementById('navbarToggler').classList.remove('open');
    }
  }

  useEffect(() => {
    const results = data.length > 0 &&
      <div className='row container ps-0 pe-0 overflowY-scroll'>
        {data.map((dataRow, index) => (
          <Link onClick={handleClick} className='aLink col-6 col-sm-4 col-md-3 col-lg-2 mt-3' key={index} to={dataRow.media_type ? dataRow.media_type === 'movie' ? '/movieshub/movie/' + dataRow.id : dataRow.media_type === 'tv' ? '/movieshub/tv/' + dataRow.id : '/movieshub/people/' + dataRow.id : '/movieshub/movie/' + dataRow.id}>
            <div className="card" key={index}>
              <div className="card-img-top card-img-search rounded">
                <LazyLoadImage className="img-fluid" src={dataRow.poster_path ? POSTER_PATH + WIDTH_500 + dataRow.poster_path : POSTER_PATH + WIDTH_500 + dataRow.profile_path} effect="opacity" alt={dataRow.title ? dataRow.title : dataRow.name} onError={(e) => { e.target.onerror = null; e.target.src = frame1 }} />
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="text-muted">{dataRow.gender === 1 && 'Female'}{dataRow.gender === 2 && 'Male'}</div>
                  <div className="text-muted">{dataRow.vote_average > 0 ? <>{avg(dataRow.vote_average)} &#8212;</> : null} {(dataRow.release_date || dataRow.first_air_date) && dataRow.release_date ? <>{getDateShortest(dataRow.release_date)}</> : <>{getDateShortest(dataRow.first_air_date)}</>}</div>
                  <div>{dataRow.title ? dataRow.title : dataRow.name}</div>
                  <div className='text-muted'>
                    {dataRow['known_for'] && dataRow['known_for'].map((dataKnown, index) => (
                      <span className="genre" key={index}>{dataKnown.title ? dataKnown.title : dataKnown.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    setSearchResults(results);
  }, [data, searchTerm]);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark topNav" ref={wrapperRef} id="navbar">
        <div className="container mt-1 mb-1">
          <Link className="navbar-brand" to='/movieshub/'>Movies<span className="text-primary" onClick={handleClick}>Hub</span></Link>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='hw-1 me-2 d-flex justify-content-center align-items-center' onClick={handleSearchClick}><FiSearch className='hw-2 hide-md' /></div>
            <button className="navbarToggler" type="button" onClick={handleNav} aria-label="MENU">
              <div id="navbarToggler">
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-3 mt-md-0">
              <li className="nav-item ms-md-5">
                <Link className="nav-link" to='/movieshub/movie' onClick={handleClick}>Movies</Link>
              </li>
              <li className="nav-item ms-md-5">
                <Link className="nav-link" to='/movieshub/tv' onClick={handleClick}>TV Shows</Link>
              </li>
              <li className="nav-item ms-md-5">
                <Link className="nav-link" to='/movieshub/people' onClick={handleClick}>People</Link>
              </li>
              <li className="nav-item ms-md-5 d-flex justify-content-center align-items-center pointer" onClick={handleSearchClick}>
                <FiSearch className='hw-2 hide-sm' />
              </li>
            </ul>
          </div>
          <div className="searchBox hide" id='search'>
            <div className='container mt-5'>
              <div className='d-flex'><h2 className='me-auto'>Search</h2><FiX className="hw-3 pointer" onClick={handleClick} /></div>
              <input
                id="searchInput"
                className="formInput mt-3"
                type="search"
                placeholder="Search Movies, TV Shows, People..."
                value={searchTerm}
                onChange={handleChange}
                autoFocus
              />
              <div className='overflowY-scroll'>{searchResults ? searchResults : searchTerm.length > 0 && <div className='mt-5 text-center text-muted'><FiSlash className='h1' /><br />No results<br />Try something different...</div>}</div>
            </div>
          </div>
        </div>
      </nav>
      <div className="toTop btn px-3 btn-primary hide" ref={ref} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FiArrowUp /></div>
    </>
  )
}

export default Navigation