import React from 'react'
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-dark text-muted pt-3 mt-5">
      <div className="container">
        <div className='row mb-5'>
          <div className='col-12 col-md-6 mt-4'>
            <div className='h2 text-light'>
              Movies<span className="text-primary">Hub</span>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4 d-flex flex-column">
            <Link className="link" to='/movieshub/movie'>Movie</Link>
            <Link className="link mt-2" to='/movieshub/tv'>TV Shows</Link>
            <Link className="link mt-2" to='/movieshub/people'>People</Link>
          </div>
        </div>
        <div className='text-center'>
          <a className="me-3 text-muted" href='https://instagram.com/patelhit125' target="_blank" rel="noreferrer"><FiInstagram /></a>
          <a className="me-3 text-muted" href='https://twitter.com/patelhit125' target="_blank" rel="noreferrer"><FiTwitter /></a>
          <a className="me-3 text-muted" href='https://facebook.com/hitpatel2509' target="_blank" rel="noreferrer"><FiFacebook /></a>
          <a className='text-muted' href='https://github.com/patelhit125' target="_blank" rel="noreferrer"><FiGithub /></a>
        </div>
      </div>
      <div className="mt-4 text-center">
        {new Date().getFullYear()} &copy; Hit Patel
      </div>
    </div>
  )
}

export default Footer;
