import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Movies from './pages/Movies';
import Music from './pages/Music';
import Favorites from './pages/Favorites';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import ArtistDetail from './pages/ArtistDetail';
import AlbumDetail from './pages/AlbumDetail';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import MusicPlayer from './components/MusicPlayer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Root layout with music player
function RootLayout() {
  return (
    <>
      <Layout />
      <MusicPlayer />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Games,
});

const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movies',
  component: Movies,
});

const musicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music',
  component: Music,
});

const musicFavoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music/favorites',
  component: Favorites,
});

const musicArtistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music/artist/$artistName',
  component: ArtistDetail,
});

const musicAlbumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music/album/$artistName/$albumName',
  component: AlbumDetail,
});

const playlistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playlists',
  component: Playlists,
});

const playlistDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playlists/$playlistId',
  component: PlaylistDetail,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  gamesRoute,
  moviesRoute,
  musicRoute,
  musicFavoritesRoute,
  musicArtistRoute,
  musicAlbumRoute,
  playlistsRoute,
  playlistDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicPlayerProvider>
        <RouterProvider router={router} />
      </MusicPlayerProvider>
    </QueryClientProvider>
  );
}
