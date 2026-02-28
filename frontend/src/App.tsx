import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Movies from './pages/Movies';
import Music from './pages/Music';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: Layout,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  gamesRoute,
  moviesRoute,
  musicRoute,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
