import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Plus, Trash2, Edit2, Play, Music2, Heart, ListMusic, Check, X } from 'lucide-react';
import { usePlaylists } from '../hooks/usePlaylists';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

export default function Playlists() {
  const { playlists, createPlaylist, deletePlaylist, renamePlaylist } = usePlaylists();
  const { playQueue } = useMusicPlayer();
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    createPlaylist(name);
    setNewName('');
    setIsCreating(false);
  };

  const handleRename = (id: string) => {
    const name = editName.trim();
    if (!name) return;
    renamePlaylist(id, name);
    setEditingId(null);
    setEditName('');
  };

  const handlePlayAll = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && playlist.songs.length > 0) {
      playQueue(playlist.songs as any[], 0);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="relative overflow-hidden border-b-2 border-silver/30 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <ListMusic className="w-8 h-8 text-silver" />
            <h1 className="font-display text-4xl text-silver tracking-widest uppercase">
              Playlists
            </h1>
          </div>
          <p className="text-silver/60 text-sm font-body">
            Your custom playlists
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-black/80 border-b border-silver/20 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 py-2">
            <Link
              to="/music"
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <Music2 className="w-3.5 h-3.5" />
              Browse
            </Link>
            <Link
              to="/music/favorites"
              className="px-4 py-2 text-sm font-body font-medium text-silver/60 hover:text-silver hover:bg-silver/10 border border-transparent transition-colors flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5" />
              Favorites
            </Link>
            <Link
              to="/playlists"
              className="px-4 py-2 text-sm font-body font-medium text-silver bg-silver/10 border border-silver/30 flex items-center gap-1"
            >
              <ListMusic className="w-3.5 h-3.5" />
              Playlists
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Create new playlist */}
        <div className="mb-6">
          {isCreating ? (
            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Playlist name..."
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                autoFocus
                className="flex-1 px-3 py-2 bg-black/60 border border-silver/30 text-silver placeholder-silver/30 font-body text-sm focus:outline-none focus:border-silver/60"
              />
              <button
                onClick={handleCreate}
                disabled={!newName.trim()}
                className="px-3 py-2 bg-silver text-black font-body text-sm font-semibold hover:bg-silver/80 transition-colors disabled:opacity-40"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsCreating(false); setNewName(''); }}
                className="px-3 py-2 border border-silver/20 text-silver/60 hover:text-silver font-body text-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-silver/30 text-silver/60 hover:text-silver hover:border-silver/50 font-body text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Playlist
            </button>
          )}
        </div>

        {/* Playlists grid */}
        {playlists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <ListMusic className="w-12 h-12 text-silver/20" />
            <p className="text-silver/60 font-body text-sm text-center">
              No playlists yet. Create one and add songs from the music browser.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map(playlist => (
              <div
                key={playlist.id}
                className="bg-black/60 border border-silver/20 hover:border-silver/40 transition-colors p-4 flex flex-col gap-3"
              >
                {/* Playlist name */}
                {editingId === playlist.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleRename(playlist.id)}
                      autoFocus
                      className="flex-1 px-2 py-1 bg-black/60 border border-silver/30 text-silver font-body text-sm focus:outline-none focus:border-silver/60"
                    />
                    <button
                      onClick={() => handleRename(playlist.id)}
                      className="p-1 text-silver hover:text-white"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-silver/50 hover:text-silver"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg text-silver tracking-wider uppercase">
                        {playlist.name}
                      </h3>
                      <p className="text-silver/50 text-xs font-body">
                        {playlist.songs.length} track{playlist.songs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditingId(playlist.id); setEditName(playlist.name); }}
                        className="p-1.5 text-silver/40 hover:text-silver transition-colors"
                        aria-label="Rename"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deletePlaylist(playlist.id)}
                        className="p-1.5 text-silver/40 hover:text-red-400 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handlePlayAll(playlist.id)}
                    disabled={playlist.songs.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-silver/10 border border-silver/20 text-silver text-xs font-body hover:bg-silver/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Play className="w-3 h-3" />
                    Play
                  </button>
                  <Link
                    to="/playlists/$playlistId"
                    params={{ playlistId: playlist.id }}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-silver/20 text-silver/60 text-xs font-body hover:text-silver hover:border-silver/40 transition-colors"
                  >
                    <ListMusic className="w-3 h-3" />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
