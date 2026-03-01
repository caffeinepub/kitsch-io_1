import React, { useState } from 'react';
import { Plus, Check, X, ListMusic } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { usePlaylists } from '../hooks/usePlaylists';
import type { Song } from '../types/music';

interface ExtendedSong extends Song {
  audioUrl?: string;
  imageUrl?: string;
}

interface AddToPlaylistModalProps {
  song: ExtendedSong;
  onClose: () => void;
}

export default function AddToPlaylistModal({ song, onClose }: AddToPlaylistModalProps) {
  const { playlists, createPlaylist, addSongToPlaylist } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [addedTo, setAddedTo] = useState<string | null>(null);

  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, song);
    setAddedTo(playlistId);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleCreateAndAdd = () => {
    const name = newPlaylistName.trim();
    if (!name) return;
    const id = createPlaylist(name);
    addSongToPlaylist(id, song);
    setAddedTo(id);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className="bg-black border border-silver/30 text-silver max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-silver tracking-widest uppercase">
            Add to Playlist
          </DialogTitle>
          <DialogDescription className="text-silver/50 text-xs font-body">
            {song.title} — {song.artist}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Existing playlists */}
          {playlists.length > 0 && (
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {playlists.map(playlist => {
                const alreadyAdded = playlist.songs.some(s => s.id === song.id);
                const justAdded = addedTo === playlist.id;
                return (
                  <button
                    key={playlist.id}
                    onClick={() => !alreadyAdded && handleAddToPlaylist(playlist.id)}
                    disabled={alreadyAdded}
                    className={`w-full flex items-center justify-between px-3 py-2 border text-sm font-body transition-colors ${
                      justAdded
                        ? 'border-silver/60 bg-silver/20 text-silver'
                        : alreadyAdded
                        ? 'border-silver/10 text-silver/30 cursor-not-allowed'
                        : 'border-silver/20 text-silver/70 hover:border-silver/50 hover:text-silver hover:bg-silver/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ListMusic className="w-3.5 h-3.5" />
                      {playlist.name}
                    </span>
                    {justAdded ? (
                      <Check className="w-3.5 h-3.5 text-silver" />
                    ) : alreadyAdded ? (
                      <span className="text-xs text-silver/30">Added</span>
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Create new playlist */}
          {isCreating ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Playlist name..."
                value={newPlaylistName}
                onChange={e => setNewPlaylistName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreateAndAdd()}
                autoFocus
                className="flex-1 px-3 py-2 bg-black/60 border border-silver/30 text-silver placeholder-silver/30 font-body text-sm focus:outline-none focus:border-silver/60"
              />
              <button
                onClick={handleCreateAndAdd}
                disabled={!newPlaylistName.trim()}
                className="px-3 py-2 bg-silver text-black font-body text-sm font-semibold hover:bg-silver/80 transition-colors disabled:opacity-40"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-3 py-2 border border-silver/20 text-silver/60 hover:text-silver font-body text-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center gap-2 px-3 py-2 border border-dashed border-silver/30 text-silver/60 hover:text-silver hover:border-silver/50 font-body text-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Playlist
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
