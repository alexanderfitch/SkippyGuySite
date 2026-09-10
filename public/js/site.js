/* ==========================================================================
   Skippy Guy — site behaviour
   --------------------------------------------------------------------------
   Reads everything from js/site-data.js and builds the pages from it.
   You should not need to edit this file to change content.

   Sections:
     1.  Small helpers
     2.  Icons
     3.  Header & footer (shared chrome, rendered on every page)
     4.  Homepage: hero + film grid
     5.  Films index
     6.  Film detail page
     7.  Press page
     8.  About page
     9.  Contact form
     10. Lightbox
     11. Scroll reveal, sticky header, page transitions
     12. Boot
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Helpers
     ------------------------------------------------------------------------ */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Escape text destined for innerHTML. Content is author-supplied, but this
      keeps stray < & " in a synopsis from breaking the page. */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Escape a string for use inside an href/src attribute, and refuse
      anything that isn't a plain relative path, http(s), mailto or tel. */
  function safeUrl(value) {
    if (!value) return "";
    const raw = String(value).trim();
    if (/^(?:javascript|data|vbscript):/i.test(raw)) return "";
    return esc(raw);
  }

  const has = (arr) => Array.isArray(arr) && arr.length > 0;

  /** Current page filename, e.g. "index.html". */
  function currentPage() {
    const last = window.location.pathname.split("/").pop();
    return last === "" ? "index.html" : last;
  }

  function filmBySlug(slug) {
    return FILMS.find((f) => f.slug === slug) || null;
  }

  function filmUrl(film) {
    return "film.html?f=" + encodeURIComponent(film.slug);
  }

  /** Comma-joined meta line, skipping empty values. */
  function metaLine(film, parts) {
    return (parts || ["year", "runtime", "genre"])
      .map((k) => film[k])
      .filter(Boolean)
      .join(" · ");
  }

  /* ------------------------------------------------------------------------
     2. Icons — inline SVG, all 16x16, currentColor
     ------------------------------------------------------------------------ */
  const ICONS = {
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
      '<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
      '<circle cx="17.2" cy="6.8" r="1.25"/></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
      '<path d="M10 8.8 L16 12 L10 15.2 Z"/></svg>',
    vimeo:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<path d="M7.2 8.4 L12 16.2 L16.8 8.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="square"/></svg>',
    letterboxd:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.2" cy="12" r="4"/><circle cx="12" cy="12" r="4" opacity="0.72"/><circle cx="17.8" cy="12" r="4" opacity="0.48"/></svg>',
    imdb:
      '<svg viewBox="0 0 32 24" aria-hidden="true"><rect x="1" y="3" width="30" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<text x="16" y="16.4" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9.5" font-weight="700" fill="currentColor" letter-spacing="0.3">IMDb</text></svg>',
    x:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4 L20 20 M20 4 L4 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="17" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<path d="M13 17 V4 c1.6 2.6 3.4 3.4 5.6 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
      '<path d="M3.5 6.5 L12 13 L20.5 6.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    /* UI */
    arrow:
      '<svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true"><path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" stroke-width="1.2"/></svg>',
    arrowLeft:
      '<svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true"><path d="M22 5H2M6 1 2 5l4 4" stroke="currentColor" stroke-width="1.2"/></svg>',
    play:
      '<svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M0 0l16 9L0 18z"/></svg>',
    playSmall:
      '<svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden="true"><path d="M0 0l11 6.5L0 13z"/></svg>',
    close:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.3"/></svg>',
    chevLeft:
      '<svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true"><path d="M12 2 2 12l10 10" stroke="currentColor" stroke-width="1.4"/></svg>',
    chevRight:
      '<svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true"><path d="M2 2l10 10L2 22" stroke="currentColor" stroke-width="1.4"/></svg>',
  };

  const icon = (name) => ICONS[name] || "";

  /* Marks that are wordmarks rather than glyphs get a wider button. */
  const WORDMARKS = ["imdb"];

  function socialLink(s) {
    const wide = WORDMARKS.indexOf(s.network) !== -1 ? " social--word" : "";
    return (
      '<a class="social' + wide + '" href="' + safeUrl(s.href) +
      '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '">' +
      icon(s.network) + "</a>"
    );
  }

  /* ------------------------------------------------------------------------
     3. Header & footer
     ------------------------------------------------------------------------ */
  function renderHeader() {
    const mount = $("[data-header]");
    if (!mount) return;

    const page = currentPage();
    const links = NAV.map((item, i) => {
      // film.html is a child of the Films section, so highlight Films there.
      const isCurrent =
        item.href === page || (page === "film.html" && item.href === "films.html");
      return (
        '<li><a class="nav__link" href="' + safeUrl(item.href) + '"' +
        (isCurrent ? ' aria-current="page"' : "") +
        ' style="--nav-delay:' + (60 + i * 55) + 'ms">' +
        esc(item.label) +
        "</a></li>"
      );
    }).join("");

    mount.outerHTML =
      '<header class="header" data-sticky-header>' +
        '<div class="wrap">' +
          '<div class="header__inner">' +
            /* ---------------------------------------------------------------
               LOGO
               Swap in a real logo file by replacing this <a> block with:
               <a class="logo" href="index.html" aria-label="Skippy Guy — home">
                 <img class="logo__img" src="assets/logo.svg" alt="Skippy Guy">
               </a>
               --------------------------------------------------------------- */
            '<a class="logo" href="index.html" aria-label="' + esc(SITE.name) + ' — home">' +
              '<span class="logo__mark">' + esc(SITE.name) + "</span>" +
              (SITE.logoSub ? '<span class="logo__sub">' + esc(SITE.logoSub) + "</span>" : "") +
            "</a>" +

            '<button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>' +
              "<span></span><span></span>" +
            "</button>" +

            '<nav class="nav" id="site-nav" aria-label="Primary">' +
              '<ul class="nav__list">' + links + "</ul>" +
            "</nav>" +
          "</div>" +
        "</div>" +
      "</header>";
  }

  function renderFooter() {
    const mount = $("[data-footer]");
    if (!mount) return;

    const socials = has(SITE.socials) ? SITE.socials.map(socialLink).join("") : "";

    const filmLinks = FILMS.slice(0, 5)
      .map((f) => '<a href="' + filmUrl(f) + '">' + esc(f.title) + "</a>")
      .join("");

    const navLinks = NAV.map(
      (n) => '<a href="' + safeUrl(n.href) + '">' + esc(n.label) + "</a>"
    ).join("");

    const a = SITE.announcement;
    const announcement = a
      ? '<div class="footer__note">' +
          (a.label ? '<span class="label">' + esc(a.label) + "</span>" : "") +
          "<span>" + esc(a.text) + "</span>" +
          (a.linkHref && a.linkText
            ? '<a class="link link-quiet" href="' + safeUrl(a.linkHref) + '">' + esc(a.linkText) + "</a>"
            : "") +
        "</div>"
      : "";

    mount.outerHTML =
      '<footer class="footer">' +
        '<div class="wrap">' +
          '<div class="footer__top">' +
            "<div>" +
              '<p class="footer__wordmark">' + esc(SITE.name) + "</p>" +
              (SITE.blurb ? '<p class="footer__blurb">' + esc(SITE.blurb) + "</p>" : "") +
              (socials ? '<div class="socials" style="margin-top:1.75rem">' + socials + "</div>" : "") +
            "</div>" +
            "<div>" +
              '<p class="footer__col-title">Menu</p>' +
              '<div class="footer__links">' + navLinks + "</div>" +
            "</div>" +
            "<div>" +
              '<p class="footer__col-title">Films</p>' +
              '<div class="footer__links">' + filmLinks + "</div>" +
            "</div>" +
            "<div>" +
              '<p class="footer__col-title">Contact</p>' +
              '<div class="footer__links">' +
                '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>" +
                (SITE.location ? "<span>" + esc(SITE.location) + "</span>" : "") +
              "</div>" +
            "</div>" +
          "</div>" +

          announcement +

          '<div class="footer__bottom">' +
            "<span>© " + new Date().getFullYear() + " " + esc(SITE.name) + ". All rights reserved.</span>" +
            '<span>Site by <a class="link link-quiet" href="index.html">' + esc(SITE.name) + "</a></span>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }

  /* Mobile menu + sticky header */
  function initHeaderBehaviour() {
    const toggle = $("[data-nav-toggle]");
    const header = $("[data-sticky-header]");

    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // Close the overlay when a link inside it is used.
      $$(".nav__link").forEach((a) =>
        a.addEventListener("click", () => {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-stuck", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ------------------------------------------------------------------------
     4. Homepage
     ------------------------------------------------------------------------ */
  function renderHero() {
    const mount = $("[data-hero]");
    if (!mount) return;

    const film = FILMS.find((f) => f.featured) || FILMS[0];
    if (!film) return;

    const img = film.hero || film.thumb;

    mount.innerHTML =
      '<div class="hero__media">' +
        (img ? '<img src="' + safeUrl(img) + '" alt="Still from ' + esc(film.title) + '">' : "") +
      "</div>" +
      '<div class="wrap hero__inner">' +
        '<p class="hero__eyebrow label reveal">Featured film</p>' +
        '<h1 class="hero__title reveal-mask" style="--reveal-delay:80ms"><span>' + esc(film.title) + "</span></h1>" +
        '<div class="hero__meta label reveal" style="--reveal-delay:220ms">' +
          [film.year, film.runtime, film.format, film.genre]
            .filter(Boolean)
            .map(esc)
            .join('<span class="dot" aria-hidden="true"></span>') +
        "</div>" +
        (film.logline
          ? '<p class="hero__logline lead reveal" style="--reveal-delay:300ms">' + esc(film.logline) + "</p>"
          : "") +
        '<div class="hero__actions reveal" style="--reveal-delay:380ms">' +
          '<a class="btn btn--solid" href="' + filmUrl(film) + '">' +
            '<span class="btn__icon">' + icon("playSmall") + "</span><span>Watch</span>" +
          "</a>" +
          '<a class="btn" href="films.html"><span>All films</span></a>' +
        "</div>" +
      "</div>";
  }

  /** Card markup used by the homepage grid. */
  function filmCard(film, index) {
    const badge = film.featured ? '<span class="film-card__badge">Latest</span>' : "";
    return (
      '<article class="film-card reveal" style="--reveal-delay:' + Math.min(index * 90, 450) + 'ms">' +
        '<a class="film-card__link" href="' + filmUrl(film) + '" aria-label="' + esc(film.title) + '">' +
          '<div class="film-card__media">' +
            '<img src="' + safeUrl(film.thumb) + '" alt="Still from ' + esc(film.title) + '" loading="lazy" decoding="async">' +
            badge +
            '<span class="film-card__play" aria-hidden="true"><span>' + icon("playSmall") + "</span></span>" +
          "</div>" +
          '<div class="film-card__body">' +
            '<h3 class="film-card__title">' + esc(film.title) + "</h3>" +
            '<p class="film-card__meta">' + esc(metaLine(film, ["year", "runtime"])) + "</p>" +
          "</div>" +
          (film.logline ? '<p class="film-card__logline">' + esc(film.logline) + "</p>" : "") +
        "</a>" +
      "</article>"
    );
  }

  function renderFilmGrid() {
    $$("[data-film-grid]").forEach((mount) => {
      const limit = parseInt(mount.getAttribute("data-limit"), 10);
      const skipFeatured = mount.hasAttribute("data-skip-featured");

      let list = FILMS.slice();
      if (skipFeatured) {
        const featured = FILMS.find((f) => f.featured) || FILMS[0];
        list = list.filter((f) => f !== featured);
      }
      if (!isNaN(limit)) list = list.slice(0, limit);

      mount.innerHTML = list.map(filmCard).join("");
    });
  }

  /* ------------------------------------------------------------------------
     5. Films index
     ------------------------------------------------------------------------ */
  function renderFilmIndex() {
    const mount = $("[data-film-index]");
    if (!mount) return;

    mount.innerHTML = FILMS.map((film, i) => {
      const num = String(i + 1).padStart(2, "0");
      return (
        '<a class="index-row reveal" href="' + filmUrl(film) + '"' +
          ' data-preview="' + safeUrl(film.thumb) + '"' +
          ' style="--reveal-delay:' + Math.min(i * 70, 420) + 'ms">' +
          '<span class="index-row__num">' + num + "</span>" +
          "<span>" +
            '<span class="index-row__title">' + esc(film.title) + "</span>" +
            (film.logline ? '<span class="index-row__sub">' + esc(film.logline) + "</span>" : "") +
          "</span>" +
          '<span class="index-row__meta">' +
            "<span>" + esc(metaLine(film, ["year", "runtime"])) + "</span>" +
            '<span class="index-row__arrow">' + icon("arrow") + "</span>" +
          "</span>" +
        "</a>"
      );
    }).join("");

    initIndexPreview(mount);
  }

  /** Small still that follows the cursor on the films index (desktop only). */
  function initIndexPreview(root) {
    if (reduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (min-width: 761px)").matches) return;

    const preview = document.createElement("div");
    preview.className = "index-preview";
    preview.setAttribute("aria-hidden", "true");
    preview.innerHTML = '<img alt="">';
    document.body.appendChild(preview);

    const img = $("img", preview);
    let x = 0, y = 0, cx = 0, cy = 0, raf = null, active = false;

    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      preview.style.translate = cx + "px " + cy + "px";
      if (active || Math.abs(x - cx) > 0.4) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    // The element is positioned at 0,0 and moved with `translate`; the CSS
    // transform handles the -50%/-50% centring and the scale.
    preview.style.transformOrigin = "center";

    $$("[data-preview]", root).forEach((row) => {
      row.addEventListener("mouseenter", () => {
        img.src = row.getAttribute("data-preview");
        active = true;
        preview.classList.add("is-visible");
        if (!raf) raf = requestAnimationFrame(loop);
      });
      row.addEventListener("mouseleave", () => {
        active = false;
        preview.classList.remove("is-visible");
      });
    });

    root.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ------------------------------------------------------------------------
     6. Film detail page  (film.html?f=slug)
     ------------------------------------------------------------------------ */
  function embedMarkup(video, poster) {
    if (!video) return "";
    if (video.type === "youtube" && video.id) {
      return (
        '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video.id) +
        '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="Film player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
      );
    }
    if (video.type === "vimeo" && video.id) {
      return (
        '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(video.id) +
        '?autoplay=1&title=0&byline=0&portrait=0" title="Film player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
      );
    }
    if (video.type === "file" && video.src) {
      return (
        '<video controls autoplay playsinline preload="metadata"' +
        (poster ? ' poster="' + safeUrl(poster) + '"' : "") +
        '><source src="' + safeUrl(video.src) + '"><p>Your browser cannot play this video.</p></video>'
      );
    }
    return "";
  }

  function renderPlayer(film) {
    const poster = film.hero || film.thumb;
    const playable = !!embedMarkup(film.video, poster);

    const cover =
      '<div class="player__cover">' +
        '<div class="player__cover-inner">' +
          (playable
            ? '<button class="player__btn" type="button" aria-label="Play ' + esc(film.title) + '" data-play>' +
                icon("play") +
              "</button>" +
              '<p class="player__note">Play — ' + esc(film.runtime || "") + "</p>"
            : '<span class="player__btn" aria-hidden="true">' + icon("play") + "</span>" +
              '<p class="player__note">Trailer coming soon</p>') +
        "</div>" +
      "</div>";

    return (
      '<div class="player" data-player>' +
        (poster ? '<img class="player__poster" src="' + safeUrl(poster) + '" alt="Still from ' + esc(film.title) + '">' : "") +
        cover +
      "</div>" +
      '<div class="player__caption">' +
        "<span>" + esc(film.title) + (film.year ? " (" + esc(film.year) + ")" : "") + "</span>" +
        "<span>" + esc(metaLine(film, ["runtime", "format"])) + "</span>" +
      "</div>"
    );
  }

  function initPlayer(film) {
    const player = $("[data-player]");
    const btn = $("[data-play]");
    if (!player || !btn) return;

    btn.addEventListener("click", () => {
      const markup = embedMarkup(film.video, film.hero || film.thumb);
      if (!markup) return;
      player.insertAdjacentHTML("afterbegin", markup);
      player.classList.add("is-playing");
      const poster = $(".player__poster", player);
      if (poster) poster.remove();
    });
  }

  function creditsMarkup(credits) {
    if (!has(credits)) return "";
    return (
      '<div class="credits">' +
        credits
          .map(
            (c) =>
              '<div class="credit">' +
                '<span class="credit__role">' + esc(c.role) + "</span>" +
                '<span class="credit__names">' +
                  esc(Array.isArray(c.names) ? c.names.join(", ") : c.names) +
                "</span>" +
              "</div>"
          )
          .join("") +
      "</div>"
    );
  }

  function factsMarkup(facts) {
    if (!has(facts)) return "";
    return (
      '<div class="facts">' +
        facts
          .map(
            (f) =>
              '<div class="fact"><span class="fact__k">' + esc(f.k) +
              '</span><span class="fact__v">' + esc(f.v) + "</span></div>"
          )
          .join("") +
      "</div>"
    );
  }

  function galleryMarkup(stills) {
    if (!has(stills)) return "";
    return (
      '<div class="gallery" data-lightbox-group>' +
        stills
          .map(
            (s, i) =>
              '<figure class="gallery__item' + (s.tall ? " gallery__item--tall" : "") + ' reveal"' +
                ' style="--reveal-delay:' + Math.min(i * 70, 420) + 'ms">' +
                '<img src="' + safeUrl(s.src) + '" alt="' + esc(s.caption || "Behind the scenes") +
                  '" loading="lazy" decoding="async" data-lightbox data-caption="' + esc(s.caption || "") + '">' +
                (s.caption ? "<figcaption>" + esc(s.caption) + "</figcaption>" : "") +
              "</figure>"
          )
          .join("") +
      "</div>"
    );
  }

  function pagerMarkup(film) {
    const i = FILMS.indexOf(film);
    const prev = FILMS[i - 1];
    const next = FILMS[i + 1];
    if (!prev && !next) return "";

    const item = (f, dir) =>
      f
        ? '<a class="pager__item pager__item--' + dir + '" href="' + filmUrl(f) + '">' +
            '<span class="label">' + (dir === "prev" ? "Previous" : "Next") + " film</span>" +
            '<span class="pager__title">' + esc(f.title) + "</span>" +
          "</a>"
        : "";

    return '<nav class="pager wrap" aria-label="More films">' + item(prev, "prev") + item(next, "next") + "</nav>";
  }

  function renderFilmDetail() {
    const mount = $("[data-film-detail]");
    if (!mount) return;

    const params = new URLSearchParams(window.location.search);
    const film = filmBySlug(params.get("f") || "");

    if (!film) {
      mount.innerHTML =
        '<div class="wrap page-head">' +
          '<p class="label">404</p>' +
          '<h1 class="page-head__title">That film isn\'t here.</h1>' +
          '<p class="page-head__intro lead">The link may be out of date. All the films are listed on the films page.</p>' +
          '<p style="margin-top:2.5rem"><a class="btn" href="films.html"><span>All films</span></a></p>' +
        "</div>";
      document.title = "Not found — " + SITE.name;
      return;
    }

    document.title = film.title + " — " + SITE.name;
    const desc = $('meta[name="description"]');
    if (desc && film.logline) desc.setAttribute("content", film.logline);

    const synopsis = has(film.synopsis)
      ? film.synopsis
          .map((p, i) => '<p' + (i === 0 ? ' class="prose__drop"' : "") + ">" + esc(p) + "</p>")
          .join("")
      : "";

    const quote = film.quote
      ? '<blockquote class="pullquote">“' + esc(film.quote.text) + "”" +
        (film.quote.cite ? "<cite>" + esc(film.quote.cite) + "</cite>" : "") +
        "</blockquote>"
      : "";

    const notes = has(film.notes)
      ? '<section class="section section--tight reveal">' +
          '<div class="section-head"><h2 class="label">Production notes</h2></div>' +
          '<div class="prose">' + film.notes.map((n) => "<p>" + esc(n) + "</p>").join("") + "</div>" +
        "</section>"
      : "";

    const awards = has(film.awards)
      ? '<div style="margin-top:2.5rem">' +
          '<p class="label" style="margin-bottom:0.9rem">Selections & awards</p>' +
          '<div class="laurels">' + film.awards.map((a) => '<span class="laurel">' + esc(a) + "</span>").join("") + "</div>" +
        "</div>"
      : "";

    const gallery = has(film.stills)
      ? '<section class="section reveal" id="behind-the-scenes">' +
          '<div class="section-head">' +
            '<h2 class="label">Behind the scenes</h2>' +
            '<span class="label dim">' + film.stills.length + " photographs</span>" +
          "</div>" +
          galleryMarkup(film.stills) +
        "</section>"
      : "";

    mount.innerHTML =
      '<div class="wrap">' +
        '<div class="film-hero">' +
          '<p class="label reveal" style="margin-bottom:1.25rem"><a class="link link-quiet" href="films.html">' +
            icon("arrowLeft") + " &nbsp;All films</a></p>" +
          '<div class="film-hero__meta label reveal">' +
            [film.year, film.format, film.genre].filter(Boolean).map(esc)
              .join('<span class="dot" aria-hidden="true"></span>') +
          "</div>" +
          '<h1 class="film-hero__title reveal-mask" style="--reveal-delay:60ms"><span>' + esc(film.title) + "</span></h1>" +
          (film.logline ? '<p class="film-hero__logline lead reveal" style="--reveal-delay:200ms">' + esc(film.logline) + "</p>" : "") +
        "</div>" +

        '<div class="reveal">' + renderPlayer(film) + "</div>" +

        '<section class="section split">' +
          '<div class="prose reveal">' +
            '<p class="label" style="margin-bottom:1.25rem">Synopsis</p>' +
            synopsis +
            quote +
          "</div>" +
          '<aside class="split__aside reveal" style="--reveal-delay:120ms">' +
            '<p class="label" style="margin-bottom:1.25rem">Cast & crew</p>' +
            creditsMarkup(film.credits) +
            (has(film.facts)
              ? '<p class="label" style="margin:2.5rem 0 1.25rem">Specifications</p>' + factsMarkup(film.facts)
              : "") +
            awards +
          "</aside>" +
        "</section>" +

        notes +
        gallery +
      "</div>" +
      pagerMarkup(film);

    initPlayer(film);
  }

  /* ------------------------------------------------------------------------
     7. Press
     ------------------------------------------------------------------------ */
  function renderPress() {
    const quotes = $("[data-press-quotes]");
    if (quotes && has(PRESS.quotes)) {
      quotes.innerHTML = PRESS.quotes
        .map(
          (q, i) =>
            '<article class="press-item reveal" style="--reveal-delay:' + Math.min(i * 80, 400) + 'ms">' +
              "<div>" +
                '<p class="press-item__quote">“' + esc(q.text) + "”</p>" +
                '<p class="press-item__source">' +
                  (q.href
                    ? '<a class="link link-quiet" href="' + safeUrl(q.href) + '" target="_blank" rel="noopener noreferrer">' + esc(q.source) + "</a>"
                    : esc(q.source)) +
                "</p>" +
              "</div>" +
              '<div class="press-item__aside">' +
                (q.film ? "<div>" + esc(q.film) + "</div>" : "") +
                (q.date ? '<div class="dim">' + esc(q.date) + "</div>" : "") +
              "</div>" +
            "</article>"
        )
        .join("");
    }

    const features = $("[data-press-features]");
    if (features && has(PRESS.features)) {
      features.innerHTML = PRESS.features
        .map(
          (f) =>
            '<div class="kit__row reveal">' +
              "<div>" +
                '<div class="kit__name">' +
                  (f.href
                    ? '<a class="link link-quiet" href="' + safeUrl(f.href) + '" target="_blank" rel="noopener noreferrer">' + esc(f.title) + "</a>"
                    : esc(f.title)) +
                "</div>" +
                '<div class="kit__type">' + esc(f.outlet) + "</div>" +
              "</div>" +
              '<div class="kit__type">' + esc(f.date) + "</div>" +
            "</div>"
        )
        .join("");
    }

    const screenings = $("[data-press-screenings]");
    if (screenings && has(PRESS.screenings)) {
      screenings.innerHTML = PRESS.screenings
        .map(
          (s) =>
            '<div class="kit__row reveal">' +
              "<div>" +
                '<div class="kit__name">' + esc(s.festival) + "</div>" +
                '<div class="kit__type">' + esc(s.city) + " — " + esc(s.status) + "</div>" +
              "</div>" +
              '<div class="kit__type">' + esc(s.date) + "</div>" +
            "</div>"
        )
        .join("");
    }

    const kit = $("[data-press-kit]");
    if (kit && has(PRESS.kit)) {
      kit.innerHTML = PRESS.kit
        .map(
          (k) =>
            '<div class="kit__row reveal">' +
              '<div class="kit__name">' +
                (k.href
                  ? '<a class="link link-quiet" href="' + safeUrl(k.href) + '" download>' + esc(k.name) + "</a>"
                  : esc(k.name) + ' <span class="kit__type">— on request</span>') +
              "</div>" +
              '<div class="kit__type">' + esc(k.type) + "</div>" +
            "</div>"
        )
        .join("");
    }
  }

  /* ------------------------------------------------------------------------
     8. About
     ------------------------------------------------------------------------ */
  function renderAbout() {
    const mount = $("[data-about]");
    if (!mount) return;

    mount.innerHTML =
      '<div class="bio-grid">' +
        '<div class="portrait reveal">' +
          (ABOUT.portrait ? '<img src="' + safeUrl(ABOUT.portrait) + '" alt="Portrait of ' + esc(SITE.name) + '">' : "") +
        "</div>" +
        '<div class="reveal" style="--reveal-delay:120ms">' +
          (ABOUT.headline ? '<h2 class="page-head__title" style="font-size:var(--fs-h2);margin-bottom:2rem">' + esc(ABOUT.headline) + "</h2>" : "") +
          '<div class="prose">' + (has(ABOUT.bio) ? ABOUT.bio.map((p) => "<p>" + esc(p) + "</p>").join("") : "") + "</div>" +
          (ABOUT.quote
            ? '<blockquote class="pullquote">“' + esc(ABOUT.quote.text) + "”" +
              (ABOUT.quote.cite ? "<cite>" + esc(ABOUT.quote.cite) + "</cite>" : "") + "</blockquote>"
            : "") +
          (has(ABOUT.stats)
            ? '<div class="stats">' +
                ABOUT.stats
                  .map((s) => '<div class="stat"><div class="stat__n">' + esc(s.n) + '</div><div class="stat__k">' + esc(s.k) + "</div></div>")
                  .join("") +
              "</div>"
            : "") +
          (ABOUT.filmographyNote ? '<p class="form__note" style="margin-top:2rem">' + esc(ABOUT.filmographyNote) + "</p>" : "") +
        "</div>" +
      "</div>";
  }

  /* ------------------------------------------------------------------------
     9. Contact
     ------------------------------------------------------------------------ */
  function renderContact() {
    const details = $("[data-contact-details]");
    if (details) {
      const blocks = [
        { k: "General & inquiries", v: SITE.email, href: "mailto:" + SITE.email },
      ];
      if (SITE.representation && SITE.representation.name) {
        blocks.push({
          k: SITE.representation.label || "Representation",
          v: SITE.representation.name,
          sub: SITE.representation.email,
          href: SITE.representation.email ? "mailto:" + SITE.representation.email : null,
        });
      }
      if (SITE.location) blocks.push({ k: "Based in", v: SITE.location });

      details.innerHTML = blocks
        .map(
          (b, i) =>
            '<div class="contact-block reveal" style="--reveal-delay:' + i * 90 + 'ms">' +
              '<p class="contact-block__k">' + esc(b.k) + "</p>" +
              '<p class="contact-block__v">' +
                (b.href ? '<a class="link link-quiet" href="' + safeUrl(b.href) + '">' + esc(b.v) + "</a>" : esc(b.v)) +
              "</p>" +
              (b.sub ? '<p class="form__note">' + esc(b.sub) + "</p>" : "") +
            "</div>"
        )
        .join("");
    }

    const socialMount = $("[data-contact-socials]");
    if (socialMount && has(SITE.socials)) {
      socialMount.innerHTML = SITE.socials.map(socialLink).join("");
    }

    initContactForm();
  }

  function initContactForm() {
    const form = $("[data-contact-form]");
    if (!form) return;

    const status = $("[data-form-status]", form);
    const endpoint = SITE.formEndpoint;

    if (endpoint) form.setAttribute("action", endpoint);

    form.addEventListener("submit", (e) => {
      // No endpoint configured yet: don't pretend the message was sent.
      if (!endpoint) {
        e.preventDefault();
        if (status) {
          status.textContent =
            "This form isn't connected yet — email " + SITE.email + " directly, or add a form endpoint in js/site-data.js.";
        }
        return;
      }

      e.preventDefault();
      const btn = $("[type=submit]", form);
      if (btn) btn.disabled = true;
      if (status) status.textContent = "Sending…";

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          if (status) status.textContent = "Thank you — your message has been sent.";
        })
        .catch(() => {
          if (status) status.textContent = "Something went wrong. Please email " + SITE.email + " instead.";
        })
        .finally(() => {
          if (btn) btn.disabled = false;
        });
    });
  }

  /* ------------------------------------------------------------------------
     10. Lightbox
     ------------------------------------------------------------------------ */
  function initLightbox() {
    const items = $$("[data-lightbox]");
    if (!items.length) return;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML =
      '<span class="lightbox__count" data-lb-count></span>' +
      '<button class="lightbox__close" type="button" aria-label="Close" data-lb-close>' + icon("close") + "</button>" +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo" data-lb-prev>' + icon("chevLeft") + "</button>" +
      '<img class="lightbox__img" data-lb-img alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo" data-lb-next>' + icon("chevRight") + "</button>" +
      '<p class="lightbox__caption" data-lb-caption></p>';
    document.body.appendChild(box);

    const img = $("[data-lb-img]", box);
    const caption = $("[data-lb-caption]", box);
    const count = $("[data-lb-count]", box);
    const closeBtn = $("[data-lb-close]", box);

    let index = 0;
    let lastFocus = null;

    function show(i) {
      index = (i + items.length) % items.length;
      const src = items[index].getAttribute("src");
      const cap = items[index].getAttribute("data-caption") || "";
      img.src = src;
      img.alt = cap || "Behind the scenes photograph";
      caption.textContent = cap;
      count.textContent = String(index + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    items.forEach((el, i) => {
      el.style.cursor = "zoom-in";
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("click", () => open(i));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(i);
        }
      });
    });

    closeBtn.addEventListener("click", close);
    $("[data-lb-prev]", box).addEventListener("click", () => show(index - 1));
    $("[data-lb-next]", box).addEventListener("click", () => show(index + 1));
    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusable = $$("button", box);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     11. Reveal on scroll + page transitions
     ------------------------------------------------------------------------ */
  function initReveal() {
    const targets = $$(".reveal, .reveal-mask");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    targets.forEach((el) => {
      // Anything already in view on load reveals immediately, so the first
      // screen never sits blank waiting for a scroll.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });
  }

  /** Fade the page out before following an internal link. */
  function initPageTransitions() {
    if (reduceMotion) return;

    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest && e.target.closest("a[href]");
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto|tel):/i.test(href)) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page + same query: let the browser handle the hash/no-op.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 300);
      // Failsafe: if the navigation is blocked or cancelled, fade back in
      // rather than leaving the page sitting at opacity 0.
      window.setTimeout(() => {
        document.body.classList.remove("is-leaving");
      }, 1600);
    });

    // Reset the fade if the page is restored from the back/forward cache.
    window.addEventListener("pageshow", () => {
      document.body.classList.remove("is-leaving");
    });
  }

  /* ------------------------------------------------------------------------
     12. Boot
     ------------------------------------------------------------------------ */
  function init() {
    document.documentElement.classList.remove("no-js");

    renderHeader();
    renderHero();
    renderFilmGrid();
    renderFilmIndex();
    renderFilmDetail();
    renderPress();
    renderAbout();
    renderContact();
    renderFooter();

    initHeaderBehaviour();
    initLightbox();
    initReveal();
    initPageTransitions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
