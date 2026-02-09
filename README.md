# Neoabita — Landing Pages Guide 2026

Landing pages pour le téléchargement du guide "Tendances Architecturales 2026" et l'offre exclusive de plans 3D.

## Pages

- `/` — Page de capture email (lead magnet)
- `/guide` — Alias de la page de capture
- `/confirmation` — Page de confirmation + upsell plans 3D

## Déploiement Vercel

1. Push ce repo sur GitHub
2. Importer le projet dans Vercel
3. Framework preset : **Other** (site statique)
4. Deploy ✅

Les routes propres (`/confirmation` au lieu de `/page2-confirmation.html`) sont gérées par `vercel.json`.

## Stack

- HTML / CSS / JS vanilla
- Fonts : Playfair Display + DM Sans (Google Fonts)
- Vidéo : Vimeo embed
- CTA : iClosed booking form
