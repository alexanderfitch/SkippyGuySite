# Skippy Guy — short film site

A minimalist, black-and-white film site. Plain HTML, CSS and JavaScript — no
build step, no dependencies, no framework. Open the files, edit the text, done.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:8787>. This runs the same engine Cloudflare uses,
so local matches live exactly.

For a quick look without any setup, `python3 -m http.server 4173 --directory public` also works.

---

## What's where

```
public/                 ← everything in here is the website
  index.html            Homepage — hero, statement, film grid, closing band
  films.html            Full filmography (list + grid)
  film.html             ONE page that serves EVERY film (see below)
  about.html            Bio, approach, portrait
  press.html            Quotes, screenings, interviews, press kit
  contact.html          Contact details + message form
  404.html              Shown for any URL that doesn't exist

  js/site-data.js       ★ ALL YOUR CONTENT LIVES HERE ★
  js/site.js            The engine. You shouldn't need to touch this.
  css/style.css         All styling. Colors and type are at the very top.

  assets/stills/        Film thumbnails and wide hero frames
  assets/bts/           Behind-the-scenes photos
  assets/portrait.svg, logo.svg, favicon.svg

wrangler.toml           Cloudflare config (see "Putting it online")
package.json            npm run dev / npm run deploy
README.md               This file
```

Only the `public/` folder is ever deployed. Everything beside it is tooling.

**Images.** The film thumbnails and the frames in each film's Stills gallery are
real — pulled from YouTube (`public/assets/stills/frames/`). The portrait on the
About page is still a generated placeholder, as are the abstract SVGs in
`public/assets/bts/` (kept around in case you want stand-ins). Drop in real
photos and point the paths at them.

**Still placeholder text**, all in `public/js/site-data.js`:

| What | Where |
|---|---|
| Synopsis on every film | `synopsis` on each entry in `FILMS` |
| Contact email (`hello@example.com`) | `SITE.email` |
| About page bio and headline | `ABOUT.headline`, `ABOUT.bio` |
| Homepage statement paragraph | `public/index.html` |

Credits currently say only "Directed by Skippy Guy" on each film — worth
checking, and worth expanding with cast and crew.

---

## The one thing to understand

There is **no separate HTML file per film**. `film.html` builds itself from the
film whose `slug` matches the `?f=` value in the URL:

```
film.html?f=the-long-way-down
film.html?f=salt-flats
```

So adding a film means adding one entry to one file. Nothing else.

---

## Adding a film

Open `public/js/site-data.js`, find the `FILMS` list, and copy an existing block.
Only `slug`, `title` and `thumb` are required — leave anything else out and
that section is simply skipped on the page.

```js
{
  slug: "my-new-film",              // URL id: film.html?f=my-new-film
  title: "My New Film",
  year: 2026,
  runtime: "12 min",
  format: "Short Film",
  genre: "Drama",
  thumb: "assets/stills/my-film.jpg",       // 16:9 — grid thumbnail
  hero:  "assets/stills/my-film-wide.jpg",  // wide — player poster
  logline: "One sentence that makes someone want to watch it.",

  video: { type: "youtube", id: "dQw4w9WgXcQ" },

  synopsis: [
    "First paragraph.",
    "Second paragraph.",
  ],
  credits: [
    { role: "Written & Directed by", names: "Skippy Guy" },
    { role: "Starring", names: "Name, Name" },
  ],
  facts: [
    { k: "Runtime", v: "12 min" },
    { k: "Format", v: "35mm / 2.39:1" },
  ],
  awards: ["Official Selection — Some Festival 2026"],
  notes: ["Anything you want to say about the shoot."],
  stills: [
    { src: "assets/bts/my-1.jpg", caption: "On set." },
    { src: "assets/bts/my-2.jpg", caption: "Portrait tile.", tall: true },
  ],
},
```

New films appear automatically on the homepage grid, the films index, the
footer, and the next/previous pager. **Watch the commas** — every entry ends
with `},` and the whole list ends with `];`.

### Which film is the big homepage hero?

The one with `featured: true`. Use it on exactly one film.

---

## Adding the actual video

Four options for the `video` field:

```js
video: { type: "youtube", id: "dQw4w9WgXcQ" }        // from the YouTube URL
video: { type: "vimeo",   id: "76979871" }           // from the Vimeo URL
video: { type: "file",    src: "assets/video/f.mp4" }// self-hosted mp4
video: null                                          // "Trailer coming soon"
```

All nine films are already wired to their real YouTube ids, pulled from the
[Skippy Guy Productions](https://www.youtube.com/@skippyguy) channel, so the
play button works on every film page.

For YouTube, the id is the part after `v=`:
`youtube.com/watch?v=`**`dQw4w9WgXcQ`**. For Vimeo it's the number at the end
of the URL. Self-hosted files play without any third party, but a 14-minute
film is a big download — YouTube or Vimeo is usually the better choice.

---

## Editing everything else

| What | Where |
|---|---|
| Site name, footer blurb, email, socials | `SITE` in `public/js/site-data.js` |
| Menu items and their order | `NAV` in `public/js/site-data.js` |
| Films | `FILMS` in `public/js/site-data.js` |
| Press quotes, screenings, press kit | `PRESS` in `public/js/site-data.js` |
| Bio, portrait, the numbers strip | `ABOUT` in `public/js/site-data.js` |
| Homepage statement & closing text | directly in `public/index.html` (marked with comments) |
| "How I work" section | directly in `public/about.html` |
| Colors, fonts, spacing | `:root` at the top of `public/css/style.css` |

### The footer announcement

The strip above the copyright line comes from `SITE.announcement`. Set it to
`null` to hide it. It's the natural place for "now streaming", a new festival,
or a link to something new.

---

## The logo

The header currently uses a text wordmark, styled in CSS so it stays crisp at
any size. To use a real logo file instead, open `public/js/site.js`, find the comment
that says `LOGO` inside `renderHeader()`, and replace the `<a class="logo">`
block with the `<img>` version written out right there. Then drop your file in
as `public/assets/logo.svg` (or `.png`).

The browser-tab icon is `public/assets/favicon.svg`.

---

## Making the contact form actually send

The form is deliberately inert until you connect it. Right now, submitting it
tells the visitor to email you directly rather than silently swallowing the
message.

To make it live, sign up for a form service (Formspree, Basin and Netlify Forms
all have free tiers), then paste your endpoint into `public/js/site-data.js`:

```js
formEndpoint: "https://formspree.io/f/your-id-here",
```

That's the only change needed.

---

## Putting it online (Cloudflare)

This repo is set up to deploy as a **Cloudflare Worker serving static assets**.
There is no Worker script — Cloudflare serves the files straight from its edge,
which is the fastest and cheapest way to run a site like this.

### One-time setup

```bash
npm install
npx wrangler login
```

`wrangler login` opens a browser window to authorise your Cloudflare account.

### Deploy

```bash
npm run deploy
```

That's it. Wrangler prints the live URL, something like
`https://skippy-guy-site.<your-subdomain>.workers.dev`.

### Preview locally

```bash
npm run dev
```

Serves at <http://localhost:8787> using the same engine Cloudflare runs, so what
you see locally is what goes live. This is the best way to check changes.

(You can still use `python3 -m http.server 4173 --directory public` for a quick look — the site
works on any plain static server too.)

### A custom domain

In the Cloudflare dashboard: **Workers & Pages → skippy-guy-site → Settings →
Domains & Routes → Add → Custom domain**. If the domain is already on
Cloudflare, that's the whole job — DNS and the SSL certificate are automatic.

### Two behaviours worth knowing

- **URLs lose the `.html`.** Visiting `/about.html` redirects to `/about`. The
  links in the site still say `.html` and work fine — Cloudflare just tidies
  the address bar. This is `html_handling` in `wrangler.toml`. Leave it set to
  `auto-trailing-slash`; setting it to `"none"` makes the homepage 404.
- **Unknown URLs** get the styled `404.html` instead of a bare error page.

### What is not uploaded

Only what is inside `public/` is uploaded. `wrangler.toml`, `package.json`,
`README.md` and `node_modules` sit outside it, so they cannot end up on the
live site even by accident.

### Deploying automatically on every push (optional)

There's a ready-made workflow at `.github/workflows/deploy.yml`. It does
nothing until you give the repo one secret:

1. Cloudflare dashboard → My Profile → API Tokens → Create Token → use the
   **Edit Cloudflare Workers** template.
2. In GitHub: Settings → Secrets and variables → Actions → New repository
   secret, named `CLOUDFLARE_API_TOKEN`.

After that, every push to `main` deploys itself. Until then, `npm run deploy`
from your machine is all you need.

### Other hosts

Nothing here is Cloudflare-specific — `public/` is plain static files.
Dragging that folder onto <https://app.netlify.com/drop> works, as does
pointing GitHub Pages at it.

---

## Things that are already handled

- **Responsive** down to small phones; the menu becomes a full-screen overlay
  under 760px.
- **Animations** — fade-and-rise on scroll, image zoom on hover, a fade between
  pages. All of it is disabled automatically for visitors who have "reduce
  motion" turned on in their OS.
- **Keyboard and screen readers** — skip link, focus outlines, labelled
  controls, and the photo lightbox responds to arrow keys and Escape.
- **A missing film** (a bad or old `?f=` link) shows a proper "not here" page
  rather than a blank screen.
- **No JavaScript** still shows all the page text, plus a fallback menu.

---

## If something breaks

The most common cause is a typo in `public/js/site-data.js` — a missing comma, quote
or brace. Open the page, then open your browser's developer console
(<kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> in Chrome) and it will point at
the line. Undoing your last edit always gets you back to a working site.
