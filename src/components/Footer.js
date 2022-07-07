import React from 'react'
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-dark text-muted pt-3 mt-5">
      <div className="container">
        <div className='row mb-5'>
          <div className='col'>
            <div className='h3 text-light'>
              Movies<span className="text-primary">Hub</span>
            </div>
          </div>
          <div className="col d-flex flex-column small">
            <Link className="link" to='/movieshub/movie'>Movie</Link>
            <Link className="link" to='/movieshub/tv'>TV Shows</Link>
            <Link className="link" to='/movieshub/people'>People</Link>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        {new Date().getFullYear()} &copy; Hit Patel
        <span className='ms-5'>
          <a className="text-muted me-3"  href='https://instagram.com/patelhit125' target="_blank" rel="noreferrer"><FiInstagram /></a>
          <a className="text-muted me-3"  href='https://twitter.com/patelhit125' target="_blank" rel="noreferrer"><FiTwitter /></a>
          <a className="text-muted me-3"  href='https://facebook.com/hitpatel2509' target="_blank" rel="noreferrer"><FiFacebook /></a>
          <a className="text-muted me-3"  href='https://github.com/patelhit125' target="_blank" rel="noreferrer"><FiGithub /></a>
        </span>
      </div>
    </div>
  )
}

export default Footer;
