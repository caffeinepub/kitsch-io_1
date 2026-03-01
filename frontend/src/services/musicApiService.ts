/**
 * Music API Service
 * Primary source: Jamendo (royalty-free, CORS-friendly)
 * Fallback: Curated public-domain tracks from Internet Archive
 * All tracks are royalty-free and legally streamable in-browser.
 */

import { FALLBACK_TRACKS, getFilteredFallbackTracks } from '../data/fallbackMusic';

export interface ApiSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  year: number;
  duration: number;
  audioUrl: string;   // Direct streamable audio URL (CORS-compatible)
  imageUrl?: string;
  source: 'jamendo' | 'ccmixter';
}

// Jamendo API client ID - official test/demo client_id from Jamendo docs
const JAMENDO_CLIENT_ID = '709fa152';

// Jamendo API base
const JAMENDO_BASE = 'https://api.jamendo.com/v3.0';

// Genre mapping for Jamendo tags
const JAMENDO_GENRE_TAGS: Record<string, string> = {
  'Pop': 'pop',
  'Rock': 'rock',
  'Electronic': 'electronic',
  'Jazz': 'jazz',
  'Classical': 'classical',
  'Hip-Hop': 'hiphop',
  'Folk': 'folk',
  'Ambient': 'ambient',
  'Metal': 'metal',
  'Reggae': 'reggae',
  'Blues': 'blues',
  'Country': 'country',
  'Soul': 'soul',
  'Funk': 'funk',
  'Punk': 'punk',
  'Indie': 'indie',
  'Dance': 'dance',
  'Acoustic': 'acoustic',
  'Instrumental': 'instrumental',
  'World': 'world',
};

export const AVAILABLE_GENRES = Object.keys(JAMENDO_GENRE_TAGS);

interface JamendoTrack {
  id: string;
  name: string;
  duration: number;
  artist_name: string;
  artist_id: string;
  album_name: string;
  album_id: string;
  releasedate: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
  tags: string[];
}

interface JamendoResponse {
  headers: {
    status: string;
    code: number;
    error_message: string;
    results_count: number;
  };
  results: JamendoTrack[];
}

function normalizeJamendoTrack(track: JamendoTrack): ApiSong {
  const year = track.releasedate
    ? parseInt(track.releasedate.substring(0, 4), 10) || 2020
    : 2020;

  // Detect genre from tags
  let genre = 'Indie';
  if (track.tags && track.tags.length > 0) {
    const tagLower = track.tags.map(t => t.toLowerCase());
    for (const [genreName, tag] of Object.entries(JAMENDO_GENRE_TAGS)) {
      if (tagLower.some(t => t.includes(tag) || tag.includes(t))) {
        genre = genreName;
        break;
      }
    }
  }

  // Prefer the streaming audio URL; fall back to audiodownload
  const audioUrl = track.audio || track.audiodownload || '';

  return {
    id: `jamendo-${track.id}`,
    title: track.name || 'Unknown Title',
    artist: track.artist_name || 'Unknown Artist',
    album: track.album_name || 'Unknown Album',
    genre,
    year,
    duration: track.duration || 180,
    audioUrl,
    imageUrl: track.album_image || undefined,
    source: 'jamendo',
  };
}

async function fetchJamendo(params: {
  query?: string;
  genre?: string;
  offset?: number;
  limit?: number;
}): Promise<ApiSong[]> {
  const { query, genre, offset = 0, limit = 20 } = params;

  const urlParams = new URLSearchParams({
    client_id: JAMENDO_CLIENT_ID,
    format: 'json',
    limit: String(limit),
    offset: String(offset),
    include: 'musicinfo',
    audioformat: 'mp32',
    order: 'popularity_total',
  });

  if (query) {
    urlParams.set('search', query);
  }

  if (genre && JAMENDO_GENRE_TAGS[genre]) {
    urlParams.set('tags', JAMENDO_GENRE_TAGS[genre]);
  }

  const url = `${JAMENDO_BASE}/tracks/?${urlParams.toString()}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Jamendo API error: ${response.status} ${response.statusText}`);
    }

    const data: JamendoResponse = await response.json();

    if (data.headers?.code !== 0) {
      throw new Error(`Jamendo API error: ${data.headers?.error_message || 'Unknown error'}`);
    }

    const tracks = (data.results || [])
      .filter(track => track.audio || track.audiodownload)
      .map(normalizeJamendoTrack);

    return tracks;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

function deduplicateSongs(songs: ApiSong[]): ApiSong[] {
  const seen = new Set<string>();
  return songs.filter(song => {
    const key = `${song.title.toLowerCase().trim()}|${song.artist.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export interface FetchMusicParams {
  query?: string;
  genre?: string;
  offset?: number;
  limit?: number;
}

/**
 * Unified music fetch.
 * Fetches from Jamendo (primary). On failure or empty result, returns
 * curated fallback tracks so the Music page always has content.
 */
export async function fetchMusic(params: FetchMusicParams): Promise<{
  songs: ApiSong[];
  hasMore: boolean;
  error?: string;
  usingFallback?: boolean;
}> {
  const { query, genre, offset = 0, limit = 20 } = params;

  // For pagination beyond page 1, if we're on fallback we can't paginate
  // so just return empty with hasMore=false
  let jamendoSongs: ApiSong[] = [];
  let jamendoFailed = false;

  try {
    jamendoSongs = await fetchJamendo({ query, genre, offset, limit });
  } catch (err) {
    jamendoFailed = true;
    console.warn('[MusicAPI] Jamendo fetch failed, using fallback tracks:', err instanceof Error ? err.message : err);
  }

  // If Jamendo returned results, use them
  if (!jamendoFailed && jamendoSongs.length > 0) {
    return {
      songs: deduplicateSongs(jamendoSongs),
      hasMore: jamendoSongs.length >= limit,
    };
  }

  // Fallback: use curated tracks (only on first page)
  if (offset === 0) {
    const fallbackSongs = getFilteredFallbackTracks({ query, genre });
    return {
      songs: fallbackSongs,
      hasMore: false,
      usingFallback: true,
      error: jamendoFailed
        ? undefined // Don't show error when fallback is available
        : undefined,
    };
  }

  // Pagination beyond page 1 with no Jamendo results — nothing more to load
  return {
    songs: [],
    hasMore: false,
  };
}

/**
 * Convert an ApiSong to a Song-compatible object for the music player and favorites.
 * The Song interface requires: id, index, title, artist, album, genre, year, duration.
 * We store audioUrl and imageUrl as extra fields for playback.
 */
export function apiSongToSong(apiSong: ApiSong, index: number) {
  return {
    id: apiSong.id,
    index,
    title: apiSong.title,
    artist: apiSong.artist,
    album: apiSong.album,
    genre: apiSong.genre,
    year: apiSong.year,
    duration: apiSong.duration,
    // Extended fields for API tracks
    audioUrl: apiSong.audioUrl,
    imageUrl: apiSong.imageUrl,
  };
}

// Re-export fallback tracks for use in other parts of the app
export { FALLBACK_TRACKS };
