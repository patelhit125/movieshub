import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const Home = () => {

  return (
    <>
      <Slick name='trending' />
      <div className="container">
        <RowList name='nowPlayingMovie' />
        <RowList name='airingTodayTv' />
        <RowList name='discoverMovie' />
        <RowList name='discoverTv' />
        <RowList name='trending' />
        <RowList name='topRatedMovie' />
        <RowList name='topRatedTv' />
      </div>
    </>
  )
}

export default Home;
