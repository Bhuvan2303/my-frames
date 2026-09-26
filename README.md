# My Frames

A cinematic personal photo journal for sharing places, people, and passing moments with the people closest to you.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Add a new photo

1. Copy an optimized JPG or WebP into `client/public/photos/`.
2. Add a new item to the `frames` array in `client/src/pages/Home.tsx`.
3. Reference the image from the site root:

```tsx
{
  index: "04",
  category: "places",
  subtitle: "A quiet morning by the sea",
  title: "The long way home",
  image: "/photos/beach-road.jpg",
  copy: "A road I almost did not take, and a view I am glad I stopped for.",
}
```

Supported categories are `places`, `people`, and `details`. The `Everything` filter is automatic.

## Deploy with GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`:

```bash
git add .
git commit -m "Add new photo"
git push origin main
```

In the GitHub repository settings, open **Pages** and set the source to **GitHub Actions** once. Vite is configured for the `/my-frames/` repository path during GitHub Actions builds.

## Photo tips

- Keep website images around 1–3 MB when possible.
- Use JPG or WebP for photographs.
- Keep original full-resolution files backed up outside GitHub.
