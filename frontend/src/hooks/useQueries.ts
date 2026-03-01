import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetFavorites() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, string]>>({
    queryKey: ['favorites'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addFavorite(title, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export function useRemoveFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.removeFavorite(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

export function useGetSongFavorites() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[string, string]>>({
    queryKey: ['songFavorites'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSongFavorites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSongFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ songId, songLabel }: { songId: string; songLabel: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addSongFavorite(songId, songLabel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songFavorites'] });
    },
  });
}

export function useRemoveSongFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (songId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.removeSongFavorite(songId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songFavorites'] });
    },
  });
}
