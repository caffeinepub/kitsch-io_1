import { useState } from 'react';
import { Heart, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useGetFavorites, useAddFavorite, useRemoveFavorite } from '../../hooks/useQueries';

export default function FavoritesWidget() {
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const { data: favorites = [], isLoading } = useGetFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const handleAdd = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    await addFavorite.mutateAsync({ title: newTitle.trim(), url: newUrl.trim() });
    setNewTitle('');
    setNewUrl('');
    setShowAdd(false);
  };

  return (
    <div className="glossy-card rounded-2xl p-3 min-w-[160px] max-w-[200px] shadow-kitsch">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Heart size={10} className="text-hotpink fill-hotpink" />
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Favorites</span>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="p-0.5 rounded-full hover:bg-hotpink/10 transition-colors"
        >
          <Plus size={12} className="text-hotpink" />
        </button>
      </div>

      {showAdd && (
        <div className="mb-2 space-y-1">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full text-xs px-2 py-1 rounded-lg border border-hotpink/30 bg-white/80 focus:outline-none focus:border-hotpink"
          />
          <input
            type="text"
            placeholder="URL"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            className="w-full text-xs px-2 py-1 rounded-lg border border-hotpink/30 bg-white/80 focus:outline-none focus:border-hotpink"
          />
          <button
            onClick={handleAdd}
            disabled={addFavorite.isPending}
            className="w-full text-xs py-1 rounded-lg bg-hotpink text-white font-bold hover:bg-hotpink-dark transition-colors disabled:opacity-50"
          >
            {addFavorite.isPending ? '...' : 'Add ♡'}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-xs text-muted-foreground text-center py-2">Loading...</div>
      ) : favorites.length === 0 ? (
        <div className="text-xs text-muted-foreground text-center py-2">No favorites yet!</div>
      ) : (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {favorites.map(([title, url]) => (
            <div key={title} className="flex items-center gap-1 group">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs text-foreground hover:text-hotpink truncate flex items-center gap-1"
              >
                <ExternalLink size={8} className="shrink-0" />
                {title}
              </a>
              <button
                onClick={() => removeFavorite.mutate(title)}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/10 transition-all"
              >
                <Trash2 size={10} className="text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
