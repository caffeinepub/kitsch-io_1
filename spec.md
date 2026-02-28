# Specification

## Summary
**Goal:** Add two new wallpaper options — "White Plaid Lace" and "Dark Stussy Grunge" — to the KitschHub personalization system.

**Planned changes:**
- Add `whitePlaidLace` and `darkStussyGrunge` keys to the `usePersonalization` hook's texture options map, pointing to their asset paths in `frontend/public/assets/generated`
- Add thumbnail options for both new wallpapers in the `PersonalizationPanel` component, maintaining the existing 4-column grid layout
- Add both new wallpaper thumbnails to the Personalization page so selecting them persists the background preference
- Place the two new wallpaper image assets (`white-plaid-lace.dim_1280x720.jpg` and `dark-stussy-grunge.dim_1280x720.jpg`) in `frontend/public/assets/generated`

**User-visible outcome:** Users can select "White Plaid Lace" or "Dark Stussy Grunge" as their app background from the Personalization panel and page, alongside all existing wallpaper options.
