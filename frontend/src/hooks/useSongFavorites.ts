import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetSongFavorites() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, string]>>({
    queryKey: ['songFavorites'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSongFavorites();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSongFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ songId, songLabel }: { songId: string; songLabel: string }) => {
      if (!actor) throw new Error('Not authenticated');
      await actor.addSongFavorite(songId, songLabel);
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
      if (!actor) throw new Error('Not authenticated');
      await actor.removeSongFavorite(songId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songFavorites'] });
    },
  });
}
