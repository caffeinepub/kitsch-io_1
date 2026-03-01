// TMDb API Service - Movie metadata and trailers
// Using TMDb API v3 with a public read-only API key

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

// Public read-only TMDb API key
const API_KEY = '2dca580c2a14b55200e784d157207b4d';

export interface TmdbMovie {
  id: number;
  title: string;
  year: number;
  genre: string;
  genres: string[];
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  trailerUrl: string | null;
  tmdbId: number;
}

const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function mapGenres(genreIds: number[]): string[] {
  return genreIds.map(id => GENRE_MAP[id] || 'Other').filter(Boolean);
}

async function fetchTmdb(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDb HTTP ${res.status}`);
  return res.json();
}

async function getTrailerUrl(movieId: number): Promise<string | null> {
  try {
    const data = await fetchTmdb(`/movie/${movieId}/videos`);
    const trailer = data.results?.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    ) || data.results?.find(
      (v: any) => v.site === 'YouTube'
    );
    if (trailer) return `https://www.youtube.com/watch?v=${trailer.key}`;
    return null;
  } catch {
    return null;
  }
}

function mapMovie(m: any): TmdbMovie {
  const genres = mapGenres(m.genre_ids || []);
  return {
    id: m.id,
    tmdbId: m.id,
    title: m.title || m.original_title || 'Unknown',
    year: m.release_date ? parseInt(m.release_date.slice(0, 4)) : 0,
    genre: genres[0] || 'Other',
    genres,
    synopsis: m.overview || '',
    posterUrl: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : '',
    backdropUrl: m.backdrop_path ? `${TMDB_BACKDROP_BASE}${m.backdrop_path}` : '',
    rating: Math.round((m.vote_average || 0) * 10) / 10,
    trailerUrl: null,
  };
}

export async function fetchPopularMovies(page = 1): Promise<TmdbMovie[]> {
  try {
    const data = await fetchTmdb('/movie/popular', { page: String(page) });
    return (data.results || []).map(mapMovie);
  } catch (e) {
    console.warn('TMDb popular movies failed:', e);
    return [];
  }
}

export async function fetchTrendingMovies(page = 1): Promise<TmdbMovie[]> {
  try {
    const data = await fetchTmdb('/trending/movie/week', { page: String(page) });
    return (data.results || []).map(mapMovie);
  } catch (e) {
    console.warn('TMDb trending movies failed:', e);
    return [];
  }
}

export async function searchMovies(query: string, page = 1): Promise<TmdbMovie[]> {
  try {
    const data = await fetchTmdb('/search/movie', { query, page: String(page) });
    return (data.results || []).map(mapMovie);
  } catch (e) {
    console.warn('TMDb search failed:', e);
    return [];
  }
}

export async function fetchMoviesByGenre(genreId: number, page = 1): Promise<TmdbMovie[]> {
  try {
    const data = await fetchTmdb('/discover/movie', {
      with_genres: String(genreId),
      sort_by: 'popularity.desc',
      page: String(page),
    });
    return (data.results || []).map(mapMovie);
  } catch (e) {
    console.warn('TMDb genre fetch failed:', e);
    return [];
  }
}

export async function getMovieTrailer(movieId: number): Promise<string | null> {
  return getTrailerUrl(movieId);
}

export const TMDB_GENRES = Object.entries(GENRE_MAP).map(([id, name]) => ({
  id: parseInt(id),
  name,
}));

export { TMDB_IMAGE_BASE, TMDB_BACKDROP_BASE };
