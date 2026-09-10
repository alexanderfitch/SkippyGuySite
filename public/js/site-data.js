/* ==========================================================================
   SITE CONTENT — this is the only file you need to edit for normal updates.
   --------------------------------------------------------------------------
   Everything on the homepage, the films index and every film page is built
   from the data below. Add a film here and it appears everywhere
   automatically, with its own page, no other file touched.

   All the text is placeholder copy — replace it with the real thing.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE — name, contact details, social links, footer announcement
   -------------------------------------------------------------------------- */
const SITE = {
  /* Shown in the header logo. Two lines: the name and a small line under it. */
  name: "Skippy Guy",
  logoSub: "Films",

  /* Used in the footer and the About page. */
  blurb:
    "Short films about small rooms and long silences. Written, directed and " +
    "shot between Los Angeles and everywhere else.",

  /* Contact */
  email: "hello@skippyguy.com",
  representation: {
    label: "Representation",
    name: "Placeholder Agency",
    email: "agents@placeholder.com",
  },
  location: "Los Angeles, CA",

  /* Where the contact form posts. Leave as null and the form shows a
     "copy the email address" fallback instead of pretending to send.
     To make it live, paste a Formspree / Basin / Netlify Forms endpoint here,
     e.g. "https://formspree.io/f/xxxxxxx" */
  formEndpoint: null,

  /* Footer announcement strip. Set to null to hide it entirely. */
  announcement: {
    label: "Now",
    text: "THE LONG WAY DOWN is on the festival circuit through spring.",
    linkText: "Screening dates",
    linkHref: "press.html#screenings",
  },

  /* Social links. Delete any you don't use — the icons are built in for
     instagram, vimeo, youtube, letterboxd, imdb, x, tiktok, letterbox, email. */
  socials: [
    { network: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { network: "vimeo",     label: "Vimeo",     href: "https://vimeo.com/" },
    { network: "youtube",   label: "YouTube",   href: "https://youtube.com/" },
    { network: "letterboxd",label: "Letterboxd",href: "https://letterboxd.com/" },
    { network: "imdb",      label: "IMDb",      href: "https://imdb.com/" },
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
   FILMS
   --------------------------------------------------------------------------
   One object per film. Only `slug`, `title` and `thumb` are required —
   leave anything else out and that part of the page is simply skipped.

   slug      URL-safe id. The film's page is film.html?f=<slug>. Don't reuse.
   featured  true  -> becomes the big homepage hero (use on one film only)
   video     how the film plays on its page. Four options:
               { type: "youtube", id: "dQw4w9WgXcQ" }
               { type: "vimeo",   id: "76979871" }
               { type: "file",    src: "assets/video/my-film.mp4" }
               null  -> shows the poster frame with a "coming soon" note
   stills    behind-the-scenes photos. `tall: true` makes a portrait tile.
   -------------------------------------------------------------------------- */
const FILMS = [
  {
    slug: "the-long-way-down",
    title: "The Long Way Down",
    year: 2025,
    runtime: "14 min",
    format: "Short Film",
    genre: "Drama",
    featured: true,
    thumb: "assets/stills/film-1.svg",
    hero: "assets/stills/film-1-wide.svg",
    logline:
      "A night-shift elevator mechanic gets stuck between floors with the only person who still remembers him.",
    video: null,
    synopsis: [
      "Marcus has worked the night shift for eleven years. He knows the building " +
        "by sound — which cables complain, which doors stick, which floors nobody " +
        "ever calls. It is a job that asks him to be invisible and he has become " +
        "very good at it.",
      "On a Tuesday in February the car stops between nine and ten with a passenger " +
        "still inside. She recognises him before he recognises her. What follows is " +
        "forty minutes of held breath: two people in a lit box, working out how much " +
        "of the past they are willing to say out loud.",
      "Shot over four nights in a decommissioned office tower on a single 35mm " +
        "camera package, THE LONG WAY DOWN is a film about the arithmetic of regret — " +
        "and about how rarely we get the second conversation we rehearse for years.",
    ],
    notes: [
      "We had access to the building for four nights and no more, so the elevator " +
        "car was pre-lit and left untouched for the entire shoot. Every setup had to " +
        "work with the same three sources.",
      "The score was recorded before principal photography and played back on set, " +
        "which is why the performances drift in and out of tempo with it.",
    ],
    quote: {
      text: "A short film that trusts silence more than most features trust dialogue.",
      cite: "Placeholder Review",
    },
    awards: [
      "Official Selection — Placeholder Film Festival 2025",
      "Best Cinematography — Shorts Program",
      "Jury Mention — Nightlight Fest",
    ],
    credits: [
      { role: "Written & Directed by", names: "Skippy Guy" },
      { role: "Produced by", names: "Placeholder Name, Placeholder Name" },
      { role: "Director of Photography", names: "Placeholder Name" },
      { role: "Editor", names: "Placeholder Name" },
      { role: "Production Design", names: "Placeholder Name" },
      { role: "Original Score", names: "Placeholder Name" },
      { role: "Sound Design", names: "Placeholder Name" },
      { role: "Starring", names: "Placeholder Name, Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2025" },
      { k: "Runtime", v: "14 min" },
      { k: "Format", v: "35mm / 2.39:1" },
      { k: "Language", v: "English" },
      { k: "Country", v: "United States" },
    ],
    stills: [
      { src: "assets/bts/bts-1.svg", caption: "Night one — pre-lighting the car before the building lost power." },
      { src: "assets/bts/bts-2.svg", caption: "Rehearsal on the ninth floor landing." },
      { src: "assets/bts/bts-3.svg", caption: "Camera team reloading between takes.", tall: true },
      { src: "assets/bts/bts-4.svg", caption: "The final setup, 4:40am." },
      { src: "assets/bts/bts-5.svg", caption: "Sound check in the shaft." },
      { src: "assets/bts/bts-6.svg", caption: "Wrap." },
    ],
  },

  {
    slug: "salt-flats",
    title: "Salt Flats",
    year: 2024,
    runtime: "11 min",
    format: "Short Film",
    genre: "Drama",
    thumb: "assets/stills/film-2.svg",
    hero: "assets/stills/film-2-wide.svg",
    logline:
      "Two sisters drive a borrowed car to the edge of the state to scatter ashes they can't agree on.",
    video: null,
    synopsis: [
      "The car is not theirs. The urn is in the back seat under a jacket. Neither " +
        "sister has said the word funeral out loud in six days.",
      "SALT FLATS unfolds across a single afternoon of driving, in which the argument " +
        "they are actually having never quite surfaces. Shot in natural light on a " +
        "dry lake bed over three days, mostly in wide.",
    ],
    notes: [
      "Almost the entire film is covered in two lenses. The intention was that the " +
        "landscape should never look beautiful — only large.",
    ],
    awards: ["Official Selection — Placeholder Shorts 2024"],
    credits: [
      { role: "Written & Directed by", names: "Skippy Guy" },
      { role: "Produced by", names: "Placeholder Name" },
      { role: "Director of Photography", names: "Placeholder Name" },
      { role: "Editor", names: "Placeholder Name" },
      { role: "Starring", names: "Placeholder Name, Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "11 min" },
      { k: "Format", v: "Digital / 1.85:1" },
      { k: "Language", v: "English" },
    ],
    stills: [
      { src: "assets/bts/bts-7.svg", caption: "Scouting the lake bed at golden hour." },
      { src: "assets/bts/bts-8.svg", caption: "Blocking the second act.", tall: true },
      { src: "assets/bts/bts-9.svg", caption: "Day two, waiting out the wind." },
      { src: "assets/bts/bts-10.svg", caption: "The last shot of the film." },
    ],
  },

  {
    slug: "housekeeping",
    title: "Housekeeping",
    year: 2024,
    runtime: "8 min",
    format: "Short Film",
    genre: "Drama",
    thumb: "assets/stills/film-3.svg",
    hero: "assets/stills/film-3-wide.svg",
    logline:
      "A hotel cleaner finds something in room 412 that she decides, over the course of a shift, not to report.",
    video: null,
    synopsis: [
      "A film in eleven rooms. HOUSEKEEPING follows one worker through one shift, " +
        "watching a decision get made in the gaps between tasks.",
      "There are fewer than forty words of dialogue in the finished cut.",
    ],
    credits: [
      { role: "Written & Directed by", names: "Skippy Guy" },
      { role: "Director of Photography", names: "Placeholder Name" },
      { role: "Editor", names: "Placeholder Name" },
      { role: "Starring", names: "Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2024" },
      { k: "Runtime", v: "8 min" },
      { k: "Format", v: "Digital / 4:3" },
    ],
    stills: [
      { src: "assets/bts/bts-11.svg", caption: "Room 412, dressed." },
      { src: "assets/bts/bts-12.svg", caption: "Corridor dolly.", tall: true },
      { src: "assets/bts/bts-13.svg", caption: "Between rooms." },
    ],
  },

  {
    slug: "the-quiet-part",
    title: "The Quiet Part",
    year: 2023,
    runtime: "17 min",
    format: "Short Film",
    genre: "Drama / Comedy",
    thumb: "assets/stills/film-4.svg",
    hero: "assets/stills/film-4-wide.svg",
    logline:
      "At a wedding rehearsal dinner, the best man realises he has prepared the wrong speech.",
    video: null,
    synopsis: [
      "A comedy that stops being one somewhere around the ninth minute. THE QUIET " +
        "PART takes place at one long table, in more or less real time.",
      "Twenty-two speaking parts, one location, four days.",
    ],
    notes: [
      "The dinner was real and served hot for every take, which is the only reason " +
        "the background performances hold up in the wides.",
    ],
    awards: [
      "Official Selection — Placeholder Comedy Shorts",
      "Audience Award — Placeholder Fest 2023",
    ],
    credits: [
      { role: "Written & Directed by", names: "Skippy Guy" },
      { role: "Produced by", names: "Placeholder Name, Placeholder Name" },
      { role: "Director of Photography", names: "Placeholder Name" },
      { role: "Editor", names: "Placeholder Name" },
      { role: "Casting", names: "Placeholder Name" },
      { role: "Starring", names: "Placeholder Name, Placeholder Name, Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2023" },
      { k: "Runtime", v: "17 min" },
      { k: "Format", v: "Digital / 2.39:1" },
    ],
    stills: [
      { src: "assets/bts/bts-14.svg", caption: "The table, day one." },
      { src: "assets/bts/bts-15.svg", caption: "Twenty-two actors, one plate of food each.", tall: true },
      { src: "assets/bts/bts-16.svg", caption: "Coverage on the speech." },
      { src: "assets/bts/bts-17.svg", caption: "Wrap gift." },
    ],
  },

  {
    slug: "second-unit",
    title: "Second Unit",
    year: 2022,
    runtime: "6 min",
    format: "Short Film",
    genre: "Documentary",
    thumb: "assets/stills/film-5.svg",
    hero: "assets/stills/film-5-wide.svg",
    logline:
      "A six-minute portrait of the people who shoot the parts of the film nobody remembers.",
    video: null,
    synopsis: [
      "Filmed across three productions over eighteen months, SECOND UNIT is about " +
        "craft as labour: hands, cables, waiting.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
      { role: "Cinematography", names: "Skippy Guy" },
      { role: "Editor", names: "Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2022" },
      { k: "Runtime", v: "6 min" },
      { k: "Format", v: "16mm / Digital" },
    ],
    stills: [
      { src: "assets/bts/bts-18.svg", caption: "Rig check." },
      { src: "assets/bts/bts-19.svg", caption: "Between units.", tall: true },
    ],
  },

  {
    slug: "postcard-from-a-flood",
    title: "Postcard From a Flood",
    year: 2021,
    runtime: "4 min",
    format: "Short Film",
    genre: "Experimental",
    thumb: "assets/stills/film-6.svg",
    hero: "assets/stills/film-6-wide.svg",
    logline:
      "Four minutes of a street becoming a river, cut to a voicemail nobody returned.",
    video: null,
    synopsis: [
      "Made entirely from footage shot on a phone in the week after a storm, then " +
        "re-photographed off a projection screen on 16mm.",
    ],
    credits: [
      { role: "Directed by", names: "Skippy Guy" },
      { role: "Sound", names: "Placeholder Name" },
    ],
    facts: [
      { k: "Year", v: "2021" },
      { k: "Runtime", v: "4 min" },
      { k: "Format", v: "Phone / 16mm transfer" },
    ],
    stills: [
      { src: "assets/bts/bts-20.svg", caption: "Re-photography setup." },
      { src: "assets/bts/bts-21.svg", caption: "Projection test.", tall: true },
    ],
  },
];

/* --------------------------------------------------------------------------
   PRESS — quotes, links and press-kit downloads for press.html
   -------------------------------------------------------------------------- */
const PRESS = {
  quotes: [
    {
      text: "A short film that trusts silence more than most features trust dialogue.",
      source: "Placeholder Review",
      film: "The Long Way Down",
      date: "March 2025",
      href: null,
    },
    {
      text: "Guy shoots working people the way other directors shoot weather — patiently, and without asking them to explain themselves.",
      source: "Placeholder Magazine",
      film: "Salt Flats",
      date: "November 2024",
      href: null,
    },
    {
      text: "Forty words of dialogue and not one of them wasted.",
      source: "Placeholder Quarterly",
      film: "Housekeeping",
      date: "July 2024",
      href: null,
    },
  ],

  /* Interviews, festival features, anything with a link. */
  features: [
    { title: "On shooting four nights in an empty tower", outlet: "Placeholder Interview Series", date: "2025", href: null },
    { title: "Ten shorts to watch this year", outlet: "Placeholder List", date: "2025", href: null },
    { title: "First-time directors on their first budgets", outlet: "Placeholder Podcast", date: "2024", href: null },
  ],

  /* Upcoming or past screenings. */
  screenings: [
    { festival: "Placeholder Film Festival", city: "Austin, TX", date: "Mar 2025", status: "Official Selection" },
    { festival: "Nightlight Fest", city: "Portland, OR", date: "Apr 2025", status: "Jury Mention" },
    { festival: "Placeholder Shorts", city: "Brooklyn, NY", date: "May 2025", status: "In competition" },
  ],

  /* Press kit files. Put the real files in assets/press/ and update href. */
  kit: [
    { name: "Press kit — The Long Way Down", type: "PDF", href: null },
    { name: "Production stills (high res)", type: "ZIP", href: null },
    { name: "Director bio & headshot", type: "PDF", href: null },
    { name: "Poster artwork", type: "PDF", href: null },
  ],
};

/* --------------------------------------------------------------------------
   ABOUT — bio copy and the numbers strip on about.html
   -------------------------------------------------------------------------- */
const ABOUT = {
  portrait: "assets/portrait.svg",
  headline: "I make short films about people at the end of a long shift.",
  bio: [
    "Skippy Guy is a writer and director based in Los Angeles. His work is mostly " +
      "concerned with work: the hours that don't make it into anyone's story, and " +
      "the conversations people have when they are too tired to perform.",
    "He started shooting on a borrowed camera in 2019 and has since made six short " +
      "films, screening at festivals across the United States and Europe. He shoots " +
      "small crews, long takes, and as much on film as a budget will allow.",
    "He is currently developing his first feature.",
  ],
  quote: {
    text: "I'm not interested in what people say when they're ready. I'm interested in what they say at 4am when the coffee has run out.",
    cite: "Skippy Guy",
  },
  stats: [
    { n: "6", k: "Short films" },
    { n: "14", k: "Festival selections" },
    { n: "3", k: "Awards" },
    { n: "2019", k: "First film" },
  ],
  /* Optional CV-style list. Set to null to hide. */
  filmographyNote: "Full filmography and technical specs available on request.",
};
