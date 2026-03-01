# Specification

## Summary
**Goal:** Fix the "No Tracks Available" issue on the Music page by switching to a reliable Jamendo API integration and adding hardcoded fallback tracks so music is always available.

**Planned changes:**
- Rewrite the music API service to use the Jamendo public API (`https://api.jamendo.com/v3.0/tracks/`) with a valid `client_id` and proper query parameters, removing all FMA dependencies
- Map Jamendo response fields (`id`, `name`, `artist_name`, `audio`, `album_image`, genre tags) to the internal Song/ApiSong interface
- Add at least 20 hardcoded fallback tracks with verified publicly accessible streaming URLs (e.g. Internet Archive), covering at least 3 genres
- Update the music service to return fallback tracks when Jamendo fails, returns empty, or throws an error
- Update `useMusicSearch` hook and Music page to render fallback tracks instead of showing an empty state or error message
- Ensure search and genre filter work over both live API results and fallback tracks

**User-visible outcome:** The Music page always displays tracks on load — either from Jamendo or the curated fallback list — and never shows "No tracks available" again.
