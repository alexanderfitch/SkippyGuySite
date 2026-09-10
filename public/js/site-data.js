/* ==========================================================================
   SITE CONTENT — this is the only file you need to edit for normal updates.
   --------------------------------------------------------------------------
   Everything on the homepage, the films index and every film page is built
   from the data below. Add a film here and it appears everywhere
   automatically, with its own page, no other file touched.

   The films, dates, runtimes, video ids and thumbnails below are REAL —
   pulled from the Skippy Guy Productions YouTube channel.

   Still placeholder, and marked where they appear:
     - the synopsis on each film
     - the About page bio
     - the contact email address
   The stills on each film page are real frames from that film, pulled from
   YouTube. Swap them for your own photos whenever you like.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE — name, contact details, social links, footer announcement
   -------------------------------------------------------------------------- */
const SITE = {
  /* Shown in the header logo. Two lines: the name and a small line under it. */
  name: "Skippy Guy",
  logoSub: "Productions",

  /* Used in the footer and the About page. */
  blurb: "Short films, made and released on YouTube.",

  /* ⚠ PLACEHOLDER — put a real address here. It shows on the contact page
     and in the footer. */
  email: "hello@example.com",

  /* No representation listed. To add one:
       representation: { label: "Representation", name: "Agency", email: "a@b.com" } */
  representation: null,

  location: null,

  /* Where the contact form posts. Leave as null and the form shows a
     "email me instead" message rather than pretending to send.
     To make it live, paste a Formspree / Basin / Netlify Forms endpoint here,
     e.g. "https://formspree.io/f/xxxxxxx" */
  formEndpoint: null,

  /* Footer announcement strip. Set to null to hide it entirely. */
  announcement: {
    label: "Latest",
    text: "SKIPPY GUNS is out now.",
    linkText: "Watch it",
    linkHref: "film.html?f=skippy-guns",
  },

  /* Social links. Built-in icons: instagram, vimeo, youtube, letterboxd,
     imdb, x, tiktok, email. Add more entries in the same shape. */
  socials: [
    { network: "youtube", label: "YouTube", href: "https://www.youtube.com/@skippyguy" },
  ],
};

/* --------------------------------------------------------------------------
   NAV — the header menu. Order here is the order on screen.
   -------------------------------------------------------------------------- */
const NAV = [
  { label: "Home",    href: "index.html" },
  { label: "Films",   href: "films.html" },
  { label: "About",   href: "about.html" },
  { label: "Press",   href: "press.html" },
  { label: "Contact", href: "contact.html" },
];

/* --------------------------------------------------------------------------
   FILMS — every video on the channel, newest first.
   --------------------------------------------------------------------------
   Only `slug`, `title` and `thumb` are required. Leave anything else out and
   that part of the page is simply skipped — no empty headings.

   slug      URL-safe id. The film's page is film.html?f=<slug>. Don't reuse.
   featured  true  -> becomes the big homepage hero (use on one film only)
   video     { type: "youtube", id: "..." } | { type: "vimeo", id: "..." }
             { type: "file", src: "assets/video/x.mp4" } | null
   stills    frames or photos shown in the gallery. `tall: true` makes a
             portrait tile.
             Add `caption: "..."` to label one.

   To add a cast list, drop a block like this into a film:
       credits: [
         { role: "Written & Directed by", names: "Name" },
         { role: "Starring", names: "Name, Name" },
       ],
   -------------------------------------------------------------------------- */
const FILMS = [
  {
    slug: "skippy-guns",
    title: "SKIPPY GUNS",
    year: 2026,
    runtime: "15 min",
    format: "Short Film",
    featured: true,
    thumb: "assets/stills/frames/skippy-guns.jpg",
    hero: "assets/stills/frames/skippy-guns.jpg",
    video: { type: "youtube", id: "MUNO5Oi43NY" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2026" },
      { k: "Runtime", v: "15 min" },
      { k: "Released", v: "15 Aug 2026" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/skippy-guns-1.jpg" },
      { src: "assets/stills/frames/skippy-guns-2.jpg" },
      { src: "assets/stills/frames/skippy-guns-3.jpg" },
    ],
  },
  {
    slug: "porky-2",
    title: "PORKY 2",
    year: 2025,
    runtime: "18 min",
    format: "Short Film",
    thumb: "assets/stills/frames/porky-2.jpg",
    hero: "assets/stills/frames/porky-2.jpg",
    video: { type: "youtube", id: "TwjhfJ-wbkU" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2025" },
      { k: "Runtime", v: "18 min" },
      { k: "Released", v: "7 Aug 2025" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/porky-2-1.jpg" },
      { src: "assets/stills/frames/porky-2-2.jpg" },
      { src: "assets/stills/frames/porky-2-3.jpg" },
    ],
  },
  {
    slug: "a-skippy-musical",
    title: "A Skippy Musical",
    year: 2025,
    runtime: "20 min",
    format: "Short Film",
    thumb: "assets/stills/frames/a-skippy-musical.jpg",
    hero: "assets/stills/frames/a-skippy-musical.jpg",
    video: { type: "youtube", id: "g9TuFwdFdSY" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2025" },
      { k: "Runtime", v: "20 min" },
      { k: "Released", v: "13 Jun 2025" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/a-skippy-musical-1.jpg" },
      { src: "assets/stills/frames/a-skippy-musical-2.jpg" },
      { src: "assets/stills/frames/a-skippy-musical-3.jpg" },
    ],
  },
  {
    slug: "porky-a-ufc-movie",
    title: "PORKY: A UFC MOVIE",
    year: 2024,
    runtime: "20 min",
    format: "Short Film",
    thumb: "assets/stills/frames/porky-a-ufc-movie.jpg",
    hero: "assets/stills/frames/porky-a-ufc-movie.jpg",
    video: { type: "youtube", id: "BNOTW8ldxYU" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "20 min" },
      { k: "Released", v: "18 Sep 2024" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/porky-a-ufc-movie-1.jpg" },
      { src: "assets/stills/frames/porky-a-ufc-movie-2.jpg" },
      { src: "assets/stills/frames/porky-a-ufc-movie-3.jpg" },
    ],
  },
  {
    slug: "goeser-2",
    title: "Goeser 2",
    year: 2024,
    runtime: "22 min",
    format: "Short Film",
    thumb: "assets/stills/frames/goeser-2.jpg",
    hero: "assets/stills/frames/goeser-2.jpg",
    video: { type: "youtube", id: "ctCbWFUrgZM" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "22 min" },
      { k: "Released", v: "25 May 2024" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/goeser-2-1.jpg" },
      { src: "assets/stills/frames/goeser-2-2.jpg" },
      { src: "assets/stills/frames/goeser-2-3.jpg" },
    ],
  },
  {
    slug: "the-batman",
    title: "THE BATMAN",
    year: 2024,
    runtime: "8 min",
    format: "Short Film",
    thumb: "assets/stills/frames/the-batman.jpg",
    hero: "assets/stills/frames/the-batman.jpg",
    video: { type: "youtube", id: "UL-e5pJpBng" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "8 min" },
      { k: "Released", v: "21 Jan 2024" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/the-batman-1.jpg" },
      { src: "assets/stills/frames/the-batman-2.jpg" },
      { src: "assets/stills/frames/the-batman-3.jpg" },
    ],
  },
  {
    slug: "the-bronx-a-basketball-story",
    title: "THE BRONX: A BASKETBALL STORY",
    year: 2024,
    runtime: "15 min",
    format: "Short Film",
    thumb: "assets/stills/frames/the-bronx-a-basketball-story.jpg",
    hero: "assets/stills/frames/the-bronx-a-basketball-story.jpg",
    video: { type: "youtube", id: "_azrWy7IKR4" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "15 min" },
      { k: "Released", v: "7 Jan 2024" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/the-bronx-a-basketball-story-1.jpg" },
      { src: "assets/stills/frames/the-bronx-a-basketball-story-2.jpg" },
      { src: "assets/stills/frames/the-bronx-a-basketball-story-3.jpg" },
    ],
  },
  {
    slug: "goeser-a-skippy-movie",
    title: "GOESER: A SKIPPY MOVIE",
    year: 2023,
    runtime: "26 min",
    format: "Short Film",
    thumb: "assets/stills/frames/goeser-a-skippy-movie.jpg",
    hero: "assets/stills/frames/goeser-a-skippy-movie.jpg",
    video: { type: "youtube", id: "mrMHCxU6exc" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2023" },
      { k: "Runtime", v: "26 min" },
      { k: "Released", v: "27 Dec 2023" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/goeser-a-skippy-movie-1.jpg" },
      { src: "assets/stills/frames/goeser-a-skippy-movie-2.jpg" },
      { src: "assets/stills/frames/goeser-a-skippy-movie-3.jpg" },
    ],
  },
  {
    slug: "a-skippy-announcement",
    title: "A Skippy Announcement",
    year: 2023,
    runtime: "2 min",
    format: "Short Film",
    thumb: "assets/stills/frames/a-skippy-announcement.jpg",
    hero: "assets/stills/frames/a-skippy-announcement.jpg",
    video: { type: "youtube", id: "Hn7ohsWYuKU" },
    synopsis: [
      "The full film is playing above. A written synopsis for this one is still to come — replace this paragraph when you have it.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
    ],
    facts: [
      { k: "Year", v: "2023" },
      { k: "Runtime", v: "2 min" },
      { k: "Released", v: "14 Aug 2023" },
      { k: "Watch", v: "YouTube" },
    ],
    stills: [
      { src: "assets/stills/frames/a-skippy-announcement-1.jpg" },
      { src: "assets/stills/frames/a-skippy-announcement-2.jpg" },
      { src: "assets/stills/frames/a-skippy-announcement-3.jpg" },
    ],
  },
];

/* --------------------------------------------------------------------------
   PRESS — quotes, links and press-kit downloads for press.html
   --------------------------------------------------------------------------
   All empty for now, so each section on the press page shows a short
   "nothing yet" line instead of inventing reviews. Fill them in as real
   coverage arrives — the shapes are shown in the comments.
   -------------------------------------------------------------------------- */
const PRESS = {
  /* { text, source, film, date, href } */
  quotes: [],

  /* { title, outlet, date, href } */
  features: [],

  /* { festival, city, date, status } */
  screenings: [],

  /* { name, type, href }  — href: null renders as "on request" */
  kit: [],
};

/* --------------------------------------------------------------------------
   ABOUT — bio copy and the numbers strip on about.html
   -------------------------------------------------------------------------- */
const ABOUT = {
  portrait: "assets/portrait.svg",

  /* ⚠ PLACEHOLDER — the headline and bio below are stand-in text. */
  headline: "9 short films, made and put on the internet.",
  bio: [
    "A proper bio is on the way. Until then, every film is on the films page \
and on the YouTube channel.",
  ],

  /* Set to a { text, cite } object to show a pull quote here. */
  quote: null,

  /* These three are real, counted from the films above. */
  stats: [
    { n: "9", k: "Films" },
    { n: "145", k: "Minutes of film" },
    { n: "2023", k: "First release" },
  ],

  filmographyNote: null,
};
