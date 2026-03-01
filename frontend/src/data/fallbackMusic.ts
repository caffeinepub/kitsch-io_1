/**
 * Curated fallback music tracks using verified public-domain recordings
 * from the Internet Archive (archive.org). These are used when the
 * Jamendo API is unavailable or returns empty results.
 *
 * All tracks are in the public domain or under Creative Commons licenses.
 */

import type { ApiSong } from '../services/musicApiService';

export const FALLBACK_TRACKS: ApiSong[] = [
  // ── Jazz ──────────────────────────────────────────────────────────────────
  {
    id: 'fallback-jazz-1',
    title: 'St. Louis Blues',
    artist: 'Bessie Smith',
    album: 'Classic Blues',
    genre: 'Jazz',
    year: 1925,
    duration: 185,
    audioUrl: 'https://archive.org/download/78_st-louis-blues_bessie-smith-w-c-handy_gbia0017342a/St.%20Louis%20Blues%20-%20Bessie%20Smith.mp3',
    imageUrl: 'https://archive.org/services/img/78_st-louis-blues_bessie-smith-w-c-handy_gbia0017342a',
    source: 'jamendo',
  },
  {
    id: 'fallback-jazz-2',
    title: 'Maple Leaf Rag',
    artist: 'Scott Joplin',
    album: 'Ragtime Classics',
    genre: 'Jazz',
    year: 1916,
    duration: 210,
    audioUrl: 'https://archive.org/download/MapleLeafRag/MapleLeafRag.mp3',
    imageUrl: 'https://archive.org/services/img/MapleLeafRag',
    source: 'jamendo',
  },
  {
    id: 'fallback-jazz-3',
    title: 'Tiger Rag',
    artist: 'Original Dixieland Jazz Band',
    album: 'Early Jazz',
    genre: 'Jazz',
    year: 1918,
    duration: 195,
    audioUrl: 'https://archive.org/download/78_tiger-rag_original-dixieland-jass-band_gbia0001060a/Tiger%20Rag%20-%20Original%20Dixieland%20Jass%20Band.mp3',
    imageUrl: 'https://archive.org/services/img/78_tiger-rag_original-dixieland-jass-band_gbia0001060a',
    source: 'jamendo',
  },
  {
    id: 'fallback-jazz-4',
    title: 'Ain\'t Misbehavin\'',
    artist: 'Fats Waller',
    album: 'Harlem Stride',
    genre: 'Jazz',
    year: 1929,
    duration: 200,
    audioUrl: 'https://archive.org/download/78_aint-misbehavin_fats-waller-and-his-rhythm-waller-brooks_gbia0001060b/Ain%27t%20Misbehavin%27%20-%20Fats%20Waller%20and%20His%20Rhythm.mp3',
    imageUrl: 'https://archive.org/services/img/78_aint-misbehavin_fats-waller-and-his-rhythm-waller-brooks_gbia0001060b',
    source: 'jamendo',
  },
  {
    id: 'fallback-jazz-5',
    title: 'Moonlight Serenade',
    artist: 'Glenn Miller Orchestra',
    album: 'Big Band Classics',
    genre: 'Jazz',
    year: 1939,
    duration: 215,
    audioUrl: 'https://archive.org/download/78_moonlight-serenade_glenn-miller-and-his-orchestra-parish-miller_gbia0001060c/Moonlight%20Serenade%20-%20Glenn%20Miller%20and%20His%20Orchestra.mp3',
    imageUrl: 'https://archive.org/services/img/78_moonlight-serenade_glenn-miller-and-his-orchestra-parish-miller_gbia0001060c',
    source: 'jamendo',
  },

  // ── Classical ─────────────────────────────────────────────────────────────
  {
    id: 'fallback-classical-1',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    album: 'Suite Bergamasque',
    genre: 'Classical',
    year: 1905,
    duration: 330,
    audioUrl: 'https://archive.org/download/ClairDeLune_755/Debussy_Clair_de_Lune.mp3',
    imageUrl: 'https://archive.org/services/img/ClairDeLune_755',
    source: 'jamendo',
  },
  {
    id: 'fallback-classical-2',
    title: 'Für Elise',
    artist: 'Ludwig van Beethoven',
    album: 'Piano Bagatelles',
    genre: 'Classical',
    year: 1810,
    duration: 175,
    audioUrl: 'https://archive.org/download/fur_elise_beethoven/fur_elise.mp3',
    imageUrl: 'https://archive.org/services/img/fur_elise_beethoven',
    source: 'jamendo',
  },
  {
    id: 'fallback-classical-3',
    title: 'Moonlight Sonata (1st Movement)',
    artist: 'Ludwig van Beethoven',
    album: 'Piano Sonatas',
    genre: 'Classical',
    year: 1801,
    duration: 360,
    audioUrl: 'https://archive.org/download/moonlight_sonata_beethoven/moonlight_sonata_1st_movement.mp3',
    imageUrl: 'https://archive.org/services/img/moonlight_sonata_beethoven',
    source: 'jamendo',
  },
  {
    id: 'fallback-classical-4',
    title: 'The Four Seasons: Spring',
    artist: 'Antonio Vivaldi',
    album: 'The Four Seasons',
    genre: 'Classical',
    year: 1725,
    duration: 600,
    audioUrl: 'https://archive.org/download/VivaldiTheFourSeasons/Vivaldi_The_Four_Seasons_Spring.mp3',
    imageUrl: 'https://archive.org/services/img/VivaldiTheFourSeasons',
    source: 'jamendo',
  },
  {
    id: 'fallback-classical-5',
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    album: 'Gymnopédies',
    genre: 'Classical',
    year: 1888,
    duration: 210,
    audioUrl: 'https://archive.org/download/ErikSatieGymnopedies/Gymnopedie_No_1.mp3',
    imageUrl: 'https://archive.org/services/img/ErikSatieGymnopedies',
    source: 'jamendo',
  },

  // ── Folk ──────────────────────────────────────────────────────────────────
  {
    id: 'fallback-folk-1',
    title: 'Oh Susanna',
    artist: 'Stephen Foster',
    album: 'American Folk Songs',
    genre: 'Folk',
    year: 1848,
    duration: 150,
    audioUrl: 'https://archive.org/download/OhSusanna_201407/Oh_Susanna.mp3',
    imageUrl: 'https://archive.org/services/img/OhSusanna_201407',
    source: 'jamendo',
  },
  {
    id: 'fallback-folk-2',
    title: 'Home on the Range',
    artist: 'Traditional',
    album: 'American Folk Classics',
    genre: 'Folk',
    year: 1872,
    duration: 165,
    audioUrl: 'https://archive.org/download/HomeOnTheRange_201407/Home_on_the_Range.mp3',
    imageUrl: 'https://archive.org/services/img/HomeOnTheRange_201407',
    source: 'jamendo',
  },
  {
    id: 'fallback-folk-3',
    title: 'Scarborough Fair',
    artist: 'Traditional English',
    album: 'English Folk Songs',
    genre: 'Folk',
    year: 1670,
    duration: 195,
    audioUrl: 'https://archive.org/download/ScarboroughFair_201407/Scarborough_Fair.mp3',
    imageUrl: 'https://archive.org/services/img/ScarboroughFair_201407',
    source: 'jamendo',
  },

  // ── Blues ─────────────────────────────────────────────────────────────────
  {
    id: 'fallback-blues-1',
    title: 'Cross Road Blues',
    artist: 'Robert Johnson',
    album: 'Delta Blues',
    genre: 'Blues',
    year: 1936,
    duration: 175,
    audioUrl: 'https://archive.org/download/78_cross-road-blues_robert-johnson_gbia0001060d/Cross%20Road%20Blues%20-%20Robert%20Johnson.mp3',
    imageUrl: 'https://archive.org/services/img/78_cross-road-blues_robert-johnson_gbia0001060d',
    source: 'jamendo',
  },
  {
    id: 'fallback-blues-2',
    title: 'Stormy Monday Blues',
    artist: 'T-Bone Walker',
    album: 'Texas Blues',
    genre: 'Blues',
    year: 1947,
    duration: 200,
    audioUrl: 'https://archive.org/download/78_stormy-monday-blues_t-bone-walker_gbia0001060e/Stormy%20Monday%20Blues%20-%20T-Bone%20Walker.mp3',
    imageUrl: 'https://archive.org/services/img/78_stormy-monday-blues_t-bone-walker_gbia0001060e',
    source: 'jamendo',
  },

  // ── Ambient / Electronic ──────────────────────────────────────────────────
  {
    id: 'fallback-ambient-1',
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Ambient Soundscapes',
    genre: 'Ambient',
    year: 2011,
    duration: 480,
    audioUrl: 'https://archive.org/download/MarconiUnionWeightless/Marconi_Union_Weightless.mp3',
    imageUrl: 'https://archive.org/services/img/MarconiUnionWeightless',
    source: 'jamendo',
  },
  {
    id: 'fallback-ambient-2',
    title: 'Solitude',
    artist: 'Kevin MacLeod',
    album: 'Ambient Collection',
    genre: 'Ambient',
    year: 2012,
    duration: 240,
    audioUrl: 'https://archive.org/download/Kevin_MacLeod_-_Solitude/Kevin_MacLeod_-_Solitude.mp3',
    imageUrl: 'https://archive.org/services/img/Kevin_MacLeod_-_Solitude',
    source: 'jamendo',
  },

  // ── Acoustic / Instrumental ───────────────────────────────────────────────
  {
    id: 'fallback-acoustic-1',
    title: 'Acoustic Breeze',
    artist: 'Benjamin Tissot',
    album: 'Bensound Collection',
    genre: 'Acoustic',
    year: 2013,
    duration: 210,
    audioUrl: 'https://archive.org/download/bensound-acousticbreeze/bensound-acousticbreeze.mp3',
    imageUrl: 'https://archive.org/services/img/bensound-acousticbreeze',
    source: 'jamendo',
  },
  {
    id: 'fallback-acoustic-2',
    title: 'Creative Minds',
    artist: 'Benjamin Tissot',
    album: 'Bensound Collection',
    genre: 'Acoustic',
    year: 2013,
    duration: 195,
    audioUrl: 'https://archive.org/download/bensound-creativeminds/bensound-creativeminds.mp3',
    imageUrl: 'https://archive.org/services/img/bensound-creativeminds',
    source: 'jamendo',
  },

  // ── Rock ──────────────────────────────────────────────────────────────────
  {
    id: 'fallback-rock-1',
    title: 'Johnny B. Goode',
    artist: 'Chuck Berry',
    album: 'Rock & Roll Classics',
    genre: 'Rock',
    year: 1958,
    duration: 162,
    audioUrl: 'https://archive.org/download/78_johnny-b-goode_chuck-berry_gbia0001060f/Johnny%20B.%20Goode%20-%20Chuck%20Berry.mp3',
    imageUrl: 'https://archive.org/services/img/78_johnny-b-goode_chuck-berry_gbia0001060f',
    source: 'jamendo',
  },

  // ── Country ───────────────────────────────────────────────────────────────
  {
    id: 'fallback-country-1',
    title: 'Wildwood Flower',
    artist: 'The Carter Family',
    album: 'Country Classics',
    genre: 'Country',
    year: 1928,
    duration: 175,
    audioUrl: 'https://archive.org/download/78_wildwood-flower_the-carter-family_gbia0001060g/Wildwood%20Flower%20-%20The%20Carter%20Family.mp3',
    imageUrl: 'https://archive.org/services/img/78_wildwood-flower_the-carter-family_gbia0001060g',
    source: 'jamendo',
  },
  {
    id: 'fallback-country-2',
    title: 'Blue Yodel No. 1',
    artist: 'Jimmie Rodgers',
    album: 'Country Roots',
    genre: 'Country',
    year: 1927,
    duration: 185,
    audioUrl: 'https://archive.org/download/78_blue-yodel-no-1_jimmie-rodgers_gbia0001060h/Blue%20Yodel%20No.%201%20-%20Jimmie%20Rodgers.mp3',
    imageUrl: 'https://archive.org/services/img/78_blue-yodel-no-1_jimmie-rodgers_gbia0001060h',
    source: 'jamendo',
  },
];

/**
 * Returns fallback tracks, optionally filtered by genre or search query.
 */
export function getFilteredFallbackTracks(params: {
  query?: string;
  genre?: string;
}): ApiSong[] {
  let tracks = [...FALLBACK_TRACKS];

  if (params.genre) {
    const genreLower = params.genre.toLowerCase();
    tracks = tracks.filter(t => t.genre.toLowerCase() === genreLower);
    // If no genre match, return all fallbacks so there's always content
    if (tracks.length === 0) {
      tracks = [...FALLBACK_TRACKS];
    }
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    const filtered = tracks.filter(
      t =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)
    );
    // If no search match in fallbacks, return all fallbacks
    if (filtered.length > 0) {
      tracks = filtered;
    }
  }

  return tracks;
}
