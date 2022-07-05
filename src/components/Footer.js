import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-grey-dark text-muted pt-3 mt-5">
      <div className="container">
        <div className="d-flex flex-row justify-content-center footerLinks">
          <Link className="link mx-3" to='/movieshub/movie'>Movie</Link>
          <Link className="link mx-3" to='/movieshub/tv'>TV Shows</Link>
          <Link className="link mx-3" to='/movieshub/people'>People</Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        {new Date().getFullYear()} &copy; Hit Patel.
      </div>
    </div>
  )
}

export default Footer;
