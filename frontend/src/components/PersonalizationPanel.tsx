import { X, Check } from 'lucide-react';
import { BackgroundTexture } from '../hooks/usePersonalization';

interface PersonalizationSettings {
  selectedTexture: BackgroundTexture;
  overlayOpacity: number;
}

interface PersonalizationHook {
  settings: PersonalizationSettings;
  setTexture: (texture: BackgroundTexture) => void;
  setOverlayOpacity: (opacity: number) => void;
  getBackgroundUrl: (texture: BackgroundTexture) => string | null;
}

interface PersonalizationPanelProps {
  onClose: () => void;
  personalization: PersonalizationHook;
}

const TEXTURES: { id: BackgroundTexture; label: string; description: string; thumb: string }[] = [
  {
    id: 'studded-cross',
    label: 'Studded Cross',
    description: 'Metal pyramid studs forming a bold cross on black',
    thumb: '/assets/Studded cross macbook wallpaper.jpeg',
  },
  {
    id: 'wallpaper-lace',
    label: 'Lace',
    description: 'Elegant black lace pattern wallpaper',
    thumb: '/assets/generated/lace-wallpaper.dim_1920x1080.png',
  },
  {
    id: 'wallpaper-cheetah-bw',
    label: 'Cheetah B&W',
    description: 'Black and white close-up cheetah fur spot texture',
    thumb: '/assets/IMG_3023.jpeg',
  },
  {
    id: 'wallpaper-zebra-studs',
    label: 'Zebra Studs',
    description: 'Zebra print band with quilted leather studs and fleur-de-lis',
    thumb: '/assets/generated/wallpaper-zebra-studs.dim_1920x1080.jpeg',
  },
  {
    id: 'wallpaper-music-grunge',
    label: 'Music Grunge',
    description: 'Grunge pink music notes with floral halftone design',
    thumb: '/assets/generated/wallpaper-music-grunge.dim_1920x1080.jpeg',
  },
  {
    id: 'wallpaper-pink-grunge',
    label: 'Pink Grunge',
    description: 'Pink and black grunge collage with text and floral elements',
    thumb: '/assets/generated/wallpaper-pink-grunge.dim_1920x1080.jpeg',
  },
  {
    id: 'wallpaper-leopard-brush',
    label: 'Leopard Brush',
    description: 'Distressed brown and black leopard print with brushstroke texture',
    thumb: '/assets/generated/wallpaper-leopard-brush.dim_1920x1080.jpeg',
  },
  {
    id: 'leopard-union-jack',
    label: 'Leopard Union Jack',
    description: 'Black and white leopard print Union Jack flag pattern',
    thumb: '/assets/generated/leopard-union-jack.dim_1280x720.jpg',
  },
  {
    id: 'white-plaid-lace',
    label: 'White Plaid Lace',
    description: 'Light gray diagonal plaid with delicate black lace trim and music note accent',
    thumb: '/assets/generated/white-plaid-lace.dim_1280x720.jpg',
  },
  {
    id: 'dark-stussy-grunge',
    label: 'Dark Stussy Grunge',
    description: 'High-contrast black background with off-white Stussy graffiti logo and bared teeth',
    thumb: '/assets/generated/dark-stussy-grunge.dim_1280x720.jpg',
  },
];

export default function PersonalizationPanel({ onClose, personalization }: PersonalizationPanelProps) {
  const { settings, setTexture, setOverlayOpacity } = personalization;

  const activeTexture = TEXTURES.find(t => t.id === settings.selectedTexture);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-black border border-silver/40 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-silver/20 shrink-0">
          <h2 className="font-display text-xl font-black uppercase tracking-widest text-silver">
            ✦ Customize Style ✦
          </h2>
          <button
            onClick={onClose}
            className="text-silver/60 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1">
          {/* Background Texture Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-silver/70 mb-3">
              Background Wallpaper
              <span className="ml-2 text-silver/40 normal-case font-normal">
                ({TEXTURES.length} options)
              </span>
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
              {TEXTURES.map(texture => {
                const isActive = settings.selectedTexture === texture.id;
                return (
                  <button
                    key={texture.id}
                    onClick={() => setTexture(texture.id)}
                    className={`relative group rounded-none border-2 overflow-hidden transition-all ${
                      isActive
                        ? 'border-silver shadow-[0_0_12px_rgba(192,192,192,0.5)]'
                        : 'border-silver/20 hover:border-silver/60'
                    }`}
                    title={texture.description}
                  >
                    <div className="aspect-video w-full">
                      <img
                        src={texture.thumb}
                        alt={texture.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-1 right-1 bg-silver rounded-full p-0.5">
                        <Check size={10} className="text-black" />
                      </div>
                    )}
                    {/* Label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-1">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-silver truncate leading-tight">
                        {texture.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {activeTexture && (
              <p className="mt-2 text-xs text-silver/40 italic">
                {activeTexture.description}
              </p>
            )}
          </div>

          {/* Overlay Opacity */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-silver/70 mb-3">
              Overlay Darkness
              <span className="ml-2 text-silver/50 normal-case font-normal">
                ({Math.round(settings.overlayOpacity * 100)}%)
              </span>
            </h3>
            <input
              type="range"
              min={0}
              max={90}
              step={5}
              value={Math.round(settings.overlayOpacity * 100)}
              onChange={e => setOverlayOpacity(Number(e.target.value) / 100)}
              className="w-full accent-silver cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-silver/40 mt-1">
              <span>Vivid</span>
              <span>Dark</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-silver/20 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-silver text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
