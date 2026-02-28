import { useState, useEffect } from 'react';

export type BackgroundTexture =
  | 'studded-cross'
  | 'wallpaper-cheetah-bw'
  | 'wallpaper-zebra-studs'
  | 'wallpaper-music-grunge'
  | 'wallpaper-pink-grunge'
  | 'wallpaper-leopard-brush'
  | 'wallpaper-lace'
  | 'leopard-union-jack'
  | 'white-plaid-lace'
  | 'dark-stussy-grunge'
  | 'wallpaper-white-plaid-lace'
  | 'wallpaper-pink-polka-dot-lace'
  | 'wallpaper-leopard-union-jack'
  | 'wallpaper-zebra-quilted'
  | 'wallpaper-mixed-lace-leopard'
  | 'wallpaper-domo-black'
  | 'wallpaper-silver-wings'
  | 'wallpaper-dark-stussy-grunge'
  | 'wallpaper-dark-cheetah'
  | 'wallpaper-black-floral-lace'
  | 'none';

export interface PersonalizationSettings {
  selectedTexture: BackgroundTexture;
  overlayOpacity: number;
}

const STORAGE_KEY = 'kitsch_personalization';

const defaultSettings: PersonalizationSettings = {
  selectedTexture: 'studded-cross',
  overlayOpacity: 0.55,
};

const ALL_VALID_TEXTURES: BackgroundTexture[] = [
  'studded-cross',
  'wallpaper-cheetah-bw',
  'wallpaper-zebra-studs',
  'wallpaper-music-grunge',
  'wallpaper-pink-grunge',
  'wallpaper-leopard-brush',
  'wallpaper-lace',
  'leopard-union-jack',
  'white-plaid-lace',
  'dark-stussy-grunge',
  'wallpaper-white-plaid-lace',
  'wallpaper-pink-polka-dot-lace',
  'wallpaper-leopard-union-jack',
  'wallpaper-zebra-quilted',
  'wallpaper-mixed-lace-leopard',
  'wallpaper-domo-black',
  'wallpaper-silver-wings',
  'wallpaper-dark-stussy-grunge',
  'wallpaper-dark-cheetah',
  'wallpaper-black-floral-lace',
  'none',
];

export function usePersonalization() {
  const [settings, setSettings] = useState<PersonalizationSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersonalizationSettings;
        if (!ALL_VALID_TEXTURES.includes(parsed.selectedTexture)) {
          return { ...defaultSettings, overlayOpacity: parsed.overlayOpacity ?? defaultSettings.overlayOpacity };
        }
        return { ...defaultSettings, ...parsed };
      }
    } catch {
      // ignore
    }
    return defaultSettings;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const setTexture = (texture: BackgroundTexture) => {
    setSettings(prev => ({ ...prev, selectedTexture: texture }));
  };

  const setOverlayOpacity = (opacity: number) => {
    setSettings(prev => ({ ...prev, overlayOpacity: opacity }));
  };

  const getBackgroundUrl = (texture: BackgroundTexture): string | null => {
    switch (texture) {
      case 'studded-cross':
        return '/assets/generated/studded-cross.dim_1920x1080.jpg';
      case 'wallpaper-cheetah-bw':
        return '/assets/generated/wallpaper-cheetah-fur.dim_1920x1080.jpeg';
      case 'wallpaper-zebra-studs':
        return '/assets/generated/wallpaper-zebra-studs.dim_1920x1080.jpeg';
      case 'wallpaper-music-grunge':
        return '/assets/generated/wallpaper-music-grunge.dim_1920x1080.jpeg';
      case 'wallpaper-pink-grunge':
        return '/assets/generated/wallpaper-pink-grunge.dim_1920x1080.jpeg';
      case 'wallpaper-leopard-brush':
        return '/assets/generated/wallpaper-leopard-brush.dim_1920x1080.jpeg';
      case 'wallpaper-lace':
        return '/assets/generated/lace-wallpaper.dim_1920x1080.png';
      case 'leopard-union-jack':
        return '/assets/generated/leopard-union-jack.dim_1280x720.jpg';
      case 'white-plaid-lace':
        return '/assets/generated/white-plaid-lace.dim_1280x720.jpg';
      case 'dark-stussy-grunge':
        return '/assets/generated/dark-stussy-grunge.dim_1280x720.jpg';
      // New wallpapers
      case 'wallpaper-white-plaid-lace':
        return '/assets/generated/wallpaper-white-plaid-lace.dim_1280x720.png';
      case 'wallpaper-pink-polka-dot-lace':
        return '/assets/generated/wallpaper-pink-polka-dot-lace.dim_1280x720.png';
      case 'wallpaper-leopard-union-jack':
        return '/assets/generated/wallpaper-leopard-union-jack.dim_1280x720.png';
      case 'wallpaper-zebra-quilted':
        return '/assets/generated/wallpaper-zebra-quilted.dim_1280x720.png';
      case 'wallpaper-mixed-lace-leopard':
        return '/assets/generated/wallpaper-mixed-lace-leopard.dim_1280x720.png';
      case 'wallpaper-domo-black':
        return '/assets/generated/wallpaper-domo-black.dim_1280x720.png';
      case 'wallpaper-silver-wings':
        return '/assets/generated/wallpaper-silver-wings.dim_1280x720.png';
      case 'wallpaper-dark-stussy-grunge':
        return '/assets/generated/wallpaper-dark-stussy-grunge.dim_1280x720.png';
      case 'wallpaper-dark-cheetah':
        return '/assets/generated/wallpaper-dark-cheetah.dim_1280x720.png';
      case 'wallpaper-black-floral-lace':
        return '/assets/generated/wallpaper-black-floral-lace.dim_1280x720.png';
      default:
        return null;
    }
  };

  return {
    settings,
    setTexture,
    setOverlayOpacity,
    getBackgroundUrl,
  };
}
