import { Link } from '@tanstack/react-router';
import { ArrowLeft, Check } from 'lucide-react';
import { usePersonalization, type BackgroundTexture } from '../hooks/usePersonalization';

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
  // New wallpapers
  {
    id: 'wallpaper-white-plaid-lace',
    label: 'White Plaid with Lace Trim',
    description: 'White diagonal plaid pattern with black lace trim and treble clef accent',
    thumb: '/assets/generated/wallpaper-white-plaid-lace.dim_1280x720.png',
  },
  {
    id: 'wallpaper-pink-polka-dot-lace',
    label: 'Pink Polka Dot with Black Lace',
    description: 'Pale pink background with black polka dots and wide black floral lace bands',
    thumb: '/assets/generated/wallpaper-pink-polka-dot-lace.dim_1280x720.png',
  },
  {
    id: 'wallpaper-leopard-union-jack',
    label: 'Leopard Union Jack',
    description: 'Black background with Union Jack shape filled with snow leopard fur print',
    thumb: '/assets/generated/wallpaper-leopard-union-jack.dim_1280x720.png',
  },
  {
    id: 'wallpaper-zebra-quilted',
    label: 'Zebra Print with Quilted Leather & Fleur-de-lis',
    description: 'Dark quilted leather texture with zebra print centre band and silver fleur-de-lis',
    thumb: '/assets/generated/wallpaper-zebra-quilted.dim_1280x720.png',
  },
  {
    id: 'wallpaper-mixed-lace-leopard',
    label: 'Mixed Lace Leopard Scrollwork',
    description: 'White background blending black floral lace, snow leopard fur, and baroque scrollwork',
    thumb: '/assets/generated/wallpaper-mixed-lace-leopard.dim_1280x720.png',
  },
  {
    id: 'wallpaper-domo-black',
    label: 'Domo Black',
    description: 'Pure black background with white-outlined cartoon Domo-kun character waving',
    thumb: '/assets/generated/wallpaper-domo-black.dim_1280x720.png',
  },
  {
    id: 'wallpaper-silver-wings',
    label: 'Silver Angel Wings',
    description: 'Black background with large symmetrical metallic silver feathered angel wings',
    thumb: '/assets/generated/wallpaper-silver-wings.dim_1280x720.png',
  },
  {
    id: 'wallpaper-dark-stussy-grunge',
    label: 'Dark Stussy Grunge Leopard',
    description: 'Distressed grunge texture with paint-smear streaks and overlapping leopard spot prints',
    thumb: '/assets/generated/wallpaper-dark-stussy-grunge.dim_1280x720.png',
  },
  {
    id: 'wallpaper-dark-cheetah',
    label: 'Dark Cheetah Fur',
    description: 'Close-up macro of dark charcoal and black cheetah fur with large irregular spots',
    thumb: '/assets/generated/wallpaper-dark-cheetah.dim_1280x720.png',
  },
  {
    id: 'wallpaper-black-floral-lace',
    label: 'Black Floral Lace',
    description: 'Dense all-over black floral lace pattern with large roses and leaf motifs on cream',
    thumb: '/assets/generated/wallpaper-black-floral-lace.dim_1280x720.png',
  },
];

export default function Personalization() {
  const { settings, setTexture, setOverlayOpacity } = usePersonalization();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="p-2 border border-silver/30 text-silver hover:border-silver hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white">
            ✦ Customize Style
          </h1>
          <p className="text-silver/50 text-sm mt-1 tracking-wide">
            Settings are saved automatically in your browser
          </p>
        </div>
      </div>

      {/* Background Texture Section */}
      <section className="border border-silver/20 bg-black/50 p-6 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-silver/70 mb-4">
          Background Wallpaper
          <span className="ml-2 text-silver/40 normal-case font-normal">
            ({TEXTURES.length} options)
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TEXTURES.map(texture => {
            const isActive = settings.selectedTexture === texture.id;
            return (
              <button
                key={texture.id}
                onClick={() => setTexture(texture.id)}
                className={`relative group overflow-hidden border-2 transition-all ${
                  isActive
                    ? 'border-silver shadow-[0_0_16px_rgba(192,192,192,0.4)]'
                    : 'border-silver/20 hover:border-silver/60'
                }`}
              >
                <div className="aspect-video w-full">
                  <img
                    src={texture.thumb}
                    alt={texture.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 bg-silver rounded-full p-0.5">
                    <Check size={12} className="text-black" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-silver text-left">
                    {texture.label}
                  </p>
                  <p className="text-[10px] text-silver/50 text-left mt-0.5 leading-tight">
                    {texture.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Overlay Darkness Section */}
      <section className="border border-silver/20 bg-black/50 p-6 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-silver/70 mb-4">
          Overlay Darkness
          <span className="ml-2 text-silver/40 normal-case font-normal">
            ({Math.round(settings.overlayOpacity * 100)}%)
          </span>
        </h2>
        <input
          type="range"
          min={0}
          max={90}
          step={5}
          value={Math.round(settings.overlayOpacity * 100)}
          onChange={e => setOverlayOpacity(Number(e.target.value) / 100)}
          className="w-full accent-silver cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-silver/40 mt-2 uppercase tracking-widest">
          <span>Vivid</span>
          <span>Dark</span>
        </div>
      </section>

      {/* Info */}
      <div className="border border-silver/10 bg-black/30 p-5 text-center">
        <p className="text-silver/40 text-xs uppercase tracking-widest">
          ✦ Changes apply instantly across all pages ✦
        </p>
      </div>
    </div>
  );
}
