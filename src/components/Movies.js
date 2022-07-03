import React, { lazy } from 'react';
import { retry } from '../utils/CommonFunctions';
const RowList = lazy(() => retry(() => import('./RowList')));
// const TrailerList = lazy(() => retry(() => import('./TrailerList')));
const Slick = lazy(() => retry(() => import('./Slick')));

const Movies = () => {
  return (
    <>
      <Slick name='nowPlayingMovie' />
      <div className="container">
        {/* <TrailerList name='movie' /> */}
        {/* <RowList name='nowPlayingMovie' /> */}
        <RowList name='upcomingMovie' />
        <RowList name='discoverMovie' />
        <RowList name='topRatedMovie' />
        <RowList name='topActionMovie' />
        <RowList name='topAnimationMovie' />
        <RowList name='topComedyMovie' />
        <RowList name='topDocumentaryMovie' />
        <RowList name='topHorrorMovie' />
        <RowList name='topRomanceMovie' />
        <RowList name='topScifiMovie' />
        <RowList name='topThrillerMovie' />
      </div>
    </>
  )
}

export default Movies
