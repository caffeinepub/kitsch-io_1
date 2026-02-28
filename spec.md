# Specification

## Summary
**Goal:** Trim the wallpaper list by removing 'dark stussy grunge' and all entries after it, and set 'Cheetah B and W' as the default background for new visitors.

**Planned changes:**
- In `usePersonalization.ts` and `PersonalizationPanel.tsx`, remove the 'dark stussy grunge' wallpaper entry and every wallpaper that appears after it in the list.
- Set 'Cheetah B and W' as the default wallpaper in `usePersonalization.ts` so it is used when no localStorage preference exists.

**User-visible outcome:** New visitors see the 'Cheetah B and W' wallpaper on first load, and the PersonalizationPanel no longer shows 'dark stussy grunge' or any wallpapers that previously followed it.
