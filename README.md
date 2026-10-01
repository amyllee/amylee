# Amy Lee — Portfolio

React + TypeScript + Vite. Four pages (Home, Projects, Design, About Me) sharing one header and footer.

## Run it locally

```bash
npm install        # first time only
npm run dev        # open the link it prints (http://localhost:5173)
```

## Where to edit things

| What | File |
|---|---|
| Projects (add/remove/reorder) | `src/data/projects.ts` |
| "Currently" blurb on Projects page | `FEATURED_PROJECT` in `src/data/projects.ts` |
| Education × Experience (home page) | `src/data/resume.ts` — replace anything in `[brackets]` |
| Email / LinkedIn / GitHub / résumé link | `src/data/contact.ts` |
| Hand-drawn frames on the Design page | `src/data/frames.ts` |
| About Me text + photo | `src/pages/AboutPage.tsx` |
| Colors & fonts | top of `src/index.css` |

## Adding design work (no code needed)

Each folder in `src/assets/design/` is one section on the Design page:

```
src/assets/design/
  01-zeta-pi/
    01-tshirt-front.png
    02-tshirt-back.png
    info.json          ← optional titles/descriptions
  02-okemos-woof-pack/
  03-selected-work/
  04-mhacks/           ← new folder = new section
    01-logo.png
    02-banner.png
```

1. Create a folder (the number in front sets the section order).
2. Drop in your images (numbers in front set their order in the grid).
3. Optional: copy an `info.json` from another folder and edit it:

```json
{
  "title": "MHacks",
  "subtitle": "Hackathon · Fall 2025",
  "description": "Branding and graphics for our MHacks project.",
  "tools": ["Figma", "Illustrator"],
  "items": {
    "01-logo.png": {
      "title": "FeedMe logo",
      "description": "Shown when you hover and in the pop-up.",
      "fit": "contain",
      "background": "#ffffff"
    }
  }
}
```

Without an `info.json`, titles come from the names (`04-mhacks` → "Mhacks", `02-banner.png` → "Banner").
`"fit": "contain"` shows the whole image (good for logos/wide posters); the default crops to fill the square.

4. Big images? Run `npm run optimize-images` — it shrinks anything over 1800px in place so the site stays fast.

## Deploy to GitHub Pages

```bash
npm run deploy
```

Then in the repo on GitHub: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.
The site uses `#/` links (e.g. `/#/projects`), so it works under any repo name with no extra setup.
