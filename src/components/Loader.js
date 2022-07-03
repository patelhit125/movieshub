import React from 'react'

const Loader = () => {
  return (
    <h2 className="vh-100 d-flex justify-content-center align-items-center">
      <div>
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      </div>
      <div className='mt'>
        Movies<span className="text-primary">Hub</span>
      </div>
    </h2>
  )
}

export default Loader
