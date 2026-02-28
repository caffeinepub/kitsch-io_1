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

export function usePersonalization() {
  const [settings, setSettings] = useState<PersonalizationSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersonalizationSettings;
        // Validate that the stored texture is still valid
        const validTextures: BackgroundTexture[] = [
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
          'none',
        ];
        if (!validTextures.includes(parsed.selectedTexture)) {
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
