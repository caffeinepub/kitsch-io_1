# Specification

## Summary
**Goal:** Remove all music-related features, code, and data from both the frontend and backend of the Kitsch-io app.

**Planned changes:**
- Delete all music-related backend state, types, and methods (song favorites storage, add/remove/get song favorites) from `backend/main.mo`, keeping user profile and URL favorites intact
- Delete music-related frontend pages: `Music.tsx`, `Playlists.tsx`, `PlaylistDetail.tsx`, `Favorites.tsx` (song version), `AlbumDetail.tsx`, `ArtistDetail.tsx`
- Delete music-related components: `MusicPlayer.tsx`, `SongCard.tsx`, `TrackCard.tsx`, `AddToPlaylistModal.tsx`, `MusicTickerWidget.tsx`, `MusicPlayerContext.tsx`, and `MusicPlayerProvider`
- Delete music-related services and hooks: `musicApiService.ts`, `spotifyService.ts`, `youtubeService.ts`, `soundcloudService.ts`, `useMusicSearch.ts`, `usePlaylists.ts`, `useSongFavorites.ts`; remove song favorites logic from `useQueries.ts`
- Delete music data and type files: `music.ts`, `generatedMusic.ts`, `fallbackMusic.ts`, `frontend/src/types/music.ts`
- Update `App.tsx` to remove all music/playlist/artist/album routes and remove `MusicPlayerProvider` wrapper and persistent `MusicPlayer`
- Update `Layout.tsx` to remove navigation links to music pages
- Update `Home.tsx` to remove the Music section navigation card

**User-visible outcome:** The app no longer has any music section, music player, or music-related navigation. All other features (Games, Movies, Anime, Dramas, user profile, URL favorites, AI assistant) remain fully functional.
