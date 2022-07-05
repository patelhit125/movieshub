export const API_KEY = '09035c64e21b751b82504e01f9d703fd'
export const API = 'https://api.themoviedb.org/3';
export const EMBEDLINK = 'https://www.2embed.to/embed/tmdb/';
export const API_TRENDING_ALL = API + '/trending/all/day?api_key=' + API_KEY;
export const API_DISCOVER_MOVIE = API + '/discover/movie?api_key=' + API_KEY;
export const API_NOWPLAYING_MOVIE = API + '/movie/now_playing?api_key=' + API_KEY;
export const API_TOPRATED_MOVIE = API + '/movie/top_rated?api_key=' + API_KEY;
export const API_UPCOMING_MOVIE = API + '/movie/upcoming?api_key=' + API_KEY;
export const API_ACTION_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=28';
export const API_ANIMATION_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=16';
export const API_COMEDY_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=35';
export const API_DOCUMENTARY_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=99';
export const API_HORROR_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=27';
export const API_ROMANCE_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=10749';
export const API_SCIFI_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=878';
export const API_THRILLER_MOVIE = API + '/discover/movie?api_key=' + API_KEY + '&with_genres=53';
export const API_ACTION_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=10759';
export const API_ANIMATION_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=16';
export const API_COMEDY_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=35';
export const API_DOCUMENTARY_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=99';
export const API_FAMILY_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=10751';
export const API_KIDS_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=10762';
export const API_SCIFI_TV = API + '/discover/tv?api_key=' + API_KEY + '&with_genres=10765';
export const API_AIRINGTODAY_TV = API + '/tv/airing_today?api_key=' + API_KEY;
export const API_TOPRATED_TV = API + '/tv/top_rated?api_key=' + API_KEY;
export const API_ONTHEAIR_TV = API + '/tv/on_the_air?api_key=' + API_KEY;
export const API_DISCOVER_TV = API + '/discover/tv?api_key=' + API_KEY;
export const API_PEOPLE = API + '/person/popular?api_key=' + API_KEY;
export const API_MOVIE = API + '/movie/';
export const API_TV = API + '/tv/';
export const API_PERSON = API + '/person/';
export const API_KEYWORD = API + '/keyword/';
export const API_SEARCH = API + '/search/multi?api_key='+ API_KEY + '&language=en-US&query=';
export const POSTER_PATH = 'https://image.tmdb.org/t/p/';
export const WIDTH_200 = 'w200';
export const WIDTH_300 = 'w300';
export const WIDTH_500 = 'w500';
export const WIDTH_ORIGINAL = 'original';
export const PRIMEWIRE = 'https://pw.unblockit.llc/'

export const dataList = {
  trending: {
    name: 'TRENDING',
    api: API_TRENDING_ALL,
    title: 'title',
    to: {
      movie: '/movieshub/movie/',
      tv: '/movieshub/tv/'
    }
  },
  discoverMovies: {
    name: 'POPULAR MOVIES',
    api: API_DISCOVER_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  discoverTv: {
    name: 'POPULAR TV SHOWS',
    api: API_DISCOVER_TV,
    title: 'name',
    to: '/movieshub/tv/'
  },
  similarMovie: {
    name: 'SIMILAR MOVIES',
    api: API_MOVIE,
    title: 'name',
    to: '/movieshub/movie/'
  },
  similarTv: {
    name: 'SIMILAR TVs',
    api: API_TV,
    title: 'name',
    to: '/movieshub/tv/'
  },
  recommendationMovie: {
    name: 'RECOMMANDED MOVIES',
    api: API_MOVIE,
    title: 'name',
    to: {
      movie: '/movieshub/movie/',
      tv: '/movieshub/tv/'
    }
  },
  recommendationTv: {
    name: 'RECOMMANDED TVs',
    api: API_TV,
    title: 'name',
    to: {
      movie: '/movieshub/movie/',
      tv: '/movieshub/tv/'
    }
  },
  movieCredits: {
    name: 'MOVIE CREDITS',
    api: API_MOVIE,
    title: 'name',
    to: '/movieshub/movie/'
  },
  tvCredits: {
    name: 'TV CREDITS',
    api: API_TV,
    title: 'name',
    to: '/movieshub/tv/'
  },
  nowPlayingMovies: {
    name: 'NOW PLAYING MOVIES',
    api: API_NOWPLAYING_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  topRatedMovies: {
    name: 'TOP RATED MOVIES',
    api: API_TOPRATED_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  upcomingMovies: {
    name: 'UPCOMING MOVIES',
    api: API_UPCOMING_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  actionMovies: {
    name: 'ACTION MOVIES',
    api: API_ACTION_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  animationMovies: {
    name: 'ANIMATION MOVIES',
    api: API_ANIMATION_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  comedyMovies: {
    name: 'COMEDY MOVIES',
    api: API_COMEDY_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  documentaryMovies: {
    name: 'DOCUMENTARY MOVIES',
    api: API_DOCUMENTARY_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  horroMovies: {
    name: 'HORROR MOVIES',
    api: API_HORROR_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  scifiMovies: {
    name: 'SCI-FI MOVIES',
    api: API_SCIFI_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  romanceMovies: {
    name: 'ROMANCE MOVIES',
    api: API_ROMANCE_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  thrillerMovies: {
    name: 'THRILLER MOVIES',
    api: API_THRILLER_MOVIE,
    title: 'title',
    to: '/movieshub/movie/'
  },
  actionTv: {
    name: 'ACTION & ADVENTURE TVs',
    api: API_ACTION_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  animationTv: {
    name: 'ANIMATION TVs',
    api: API_ANIMATION_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  comedyTv: {
    name: 'COMEDY TVs',
    api: API_COMEDY_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  documentaryTv: {
    name: 'DOCUMENTARY TVs',
    api: API_DOCUMENTARY_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  scifiTv: {
    name: 'SCI-FI TVs',
    api: API_SCIFI_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  kidsTv: {
    name: 'KIDS TVs',
    api: API_KIDS_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  familyTv: {
    name: 'FAMILY TVs',
    api: API_FAMILY_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  airingTodayTvs: {
    name: 'AIRING TODAY TVs',
    api: API_AIRINGTODAY_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  topRatedTvs: {
    name: 'TOP RATED TVs',
    api: API_TOPRATED_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  onTheAirTvs: {
    name: 'ON THE AIR TVs',
    api: API_ONTHEAIR_TV,
    title: 'title',
    to: '/movieshub/tv/'
  },
  people: {
    name: 'POPULAR PEOPLE',
    api: API_PEOPLE,
    title: 'title',
    to: '/movieshub/people/'
  }
}

export const count_runtime = (time) => {
  let runtime = 0, runtimehr, runtimemin;
  if(time > 0) {
    if(time > 60) {
      runtimehr = Math.trunc(time/60);
      runtime += runtimehr + 'hr ';
      runtimemin = time%60;
      runtime += runtimemin + 'm';
    }
    else {
      runtime = time + 'm';
    }
  }
  else {
    runtime = null;
  }
  return runtime;
}

export const getDate = (datetime) => {
  const date = new Date(datetime);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return (date.toLocaleString("en-US", options));
}

export const getDateShort = (datetime) => {
  const date = new Date(datetime);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (date.toLocaleString("en-US", options));
}

export const getDateShortest = (datetime) => {
  if (datetime === undefined || datetime === '') return null
  const date = new Date(datetime);
  const options = { year: 'numeric' };
  return (date.toLocaleString("en-US", options));
}

export const avg = (value) => {
  if (value !== 0) return value.toFixed(1)
  else return null
}

export const currency = (value) => {
  return isNaN(value) ? null :
  "$ " +  (Math.abs(Number(value)) >= 1.0e+9
    ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(value)) >= 1.0e+6
    ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(value)) >= 1.0e+3
    ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(value)));
}