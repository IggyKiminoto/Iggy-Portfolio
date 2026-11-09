/* ตัวแปลง "ลิงก์คลิป" ให้เป็นเครื่องเล่นวิดีโอ — ปกติไม่ต้องแก้ไฟล์นี้ */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const WORKS = window.WORKS || [];

  // ---------- 1) แปลงลิงก์เป็น embed ----------
  function parseVideo(input) {
    let raw = String(input || "").trim();

    // ถ้าวางโค้ด <iframe ...> มาทั้งก้อน ดึงเฉพาะ src ออกมา
    const iframeSrc = raw.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
    if (iframeSrc) raw = iframeSrc[1].replace(/&amp;/g, "&");

    // TikTok ใช้ blockquote เป็นโค้ดฝัง ดึงเลขคลิปจาก data-video-id
    const ttBlock = raw.match(/data-video-id=["'](\d+)["']/i);
    if (ttBlock) raw = "https://www.tiktok.com/video/" + ttBlock[1];

    let url;
    try {
      url = new URL(raw.startsWith("//") ? "https:" + raw : raw);
    } catch (e) {
      return null;
    }
    const host = url.hostname.replace(/^(www\.|m\.|mobile\.)/, "");
    const path = url.pathname;
    let m;

    // YouTube
    if (host === "youtu.be") {
      return yt(path.slice(1).split("/")[0], false);
    }
    if (host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
      if ((m = path.match(/^\/shorts\/([\w-]{6,})/))) return yt(m[1], true);
      if ((m = path.match(/^\/(?:embed|live|v)\/([\w-]{6,})/))) return yt(m[1], false);
      if (url.searchParams.get("v")) return yt(url.searchParams.get("v"), false);
    }

    // TikTok
    if (host.endsWith("tiktok.com")) {
      if ((m = path.match(/\/(?:video|v1|v2)\/(\d{8,})/)) || (m = path.match(/(\d{15,})/))) {
        return {
          platform: "TikTok",
          vertical: true,
          src: "https://www.tiktok.com/player/v1/" + m[1] + "?description=1&rel=0",
        };
      }
      return { platform: "TikTok", error: "ลิงก์ TikTok แบบสั้นใช้ไม่ได้ — เปิดคลิปในเว็บแล้วก๊อปลิงก์เต็มที่มี /video/ตัวเลข" };
    }

    // Facebook
    if (host.endsWith("facebook.com") || host === "fb.watch") {
      if (path.startsWith("/plugins/video.php")) {
        return { platform: "Facebook", vertical: /reel/.test(url.search), src: url.href };
      }
      const isReel = /\/reels?\//.test(path);
      return {
        platform: "Facebook",
        vertical: isReel,
        src:
          "https://www.facebook.com/plugins/video.php?show_text=false&href=" +
          encodeURIComponent(host === "fb.watch" ? url.href : "https://www.facebook.com" + path),
      };
    }

    // Instagram
    if (host.endsWith("instagram.com")) {
      if ((m = path.match(/^\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/))) {
        const kind = m[1] === "reels" ? "reel" : m[1];
        return {
          platform: "Instagram",
          vertical: true,
          tall: true,
          src: "https://www.instagram.com/" + kind + "/" + m[2] + "/embed",
        };
      }
    }

    // Vimeo
    if (host.endsWith("vimeo.com")) {
      if ((m = path.match(/\/(?:video\/)?(\d+)(?:\/(\w+))?/))) {
        const hash = m[2] || url.searchParams.get("h");
        return {
          platform: "Vimeo",
          vertical: false,
          src: "https://player.vimeo.com/video/" + m[1] + (hash ? "?h=" + hash : ""),
        };
      }
    }

    // Google Drive
    if (host === "drive.google.com") {
      const id = (path.match(/\/file\/d\/([\w-]+)/) || [])[1] || url.searchParams.get("id");
      if (id) {
        return { platform: "Google Drive", vertical: false, src: "https://drive.google.com/file/d/" + id + "/preview" };
      }
    }

    // ไฟล์วิดีโอตรง ๆ
    if (/\.(mp4|webm|mov|m4v)$/i.test(path)) {
      return { platform: "Video", vertical: false, file: url.href };
    }

    // ลิงก์ embed อื่น ๆ ที่ไม่รู้จัก — ลองฝังตรง ๆ
    if (iframeSrc) return { platform: "Embed", vertical: false, src: url.href };
    return null;
  }

  function yt(id, vertical) {
    return {
      platform: "YouTube",
      vertical: vertical,
      src: "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&modestbranding=1&playsinline=1",
      thumb: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
      autoplayParam: "autoplay=1",
    };
  }

  // ---------- 2) สร้างเครื่องเล่น ----------
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const k in attrs || {}) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach((c) => c && node.appendChild(c));
    return node;
  }

  function makeIframe(src, title) {
    return el("iframe", {
      src: src,
      title: title || "video",
      loading: "lazy",
      allow: "autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write; web-share",
      allowfullscreen: "",
      referrerpolicy: "strict-origin-when-cross-origin",
    });
  }

  // ---------- 3) ไอคอนพิกเซล ----------
  // n = กรมท่า, y = เหลือง, c = ครีม, b = น้ำเงิน, s = ทราย, o = ส้ม, . = ใส
  const SPRITES = {
    phone: [
      "..nnnnnnnn..",
      "..nbbbbbbn..",
      "..nbbbbbbn..",
      "..nbbybbbn..",
      "..nbbyybbn..",
      "..nbbyyybn..",
      "..nbbyybbn..",
      "..nbbybbbn..",
      "..nbbbbbbn..",
      "..nnnnnnnn..",
      "..nnnyynnn..",
      "..nnnnnnnn..",
    ],
    gamepad: [
      "............",
      "............",
      ".nnnnnnnnnn.",
      "nccccccccccn",
      "ncnccccccycn",
      "nnnnccccycyn",
      "ncnccccccycn",
      "nccccccccccn",
      "nccnnnnnnccn",
      "nnnn....nnnn",
      ".nn......nn.",
      "............",
    ],
    sparkle: [
      ".....nn.....",
      "....nyyn....",
      "....nyyn....",
      "...nyyyyn...",
      "nnnyyyyyynnn",
      "nyyyyccyyyyn",
      "nyyyyyyyyyyn",
      "nnnyyyyyynnn",
      "...nyyyyn...",
      "....nyyn....",
      "....nyyn....",
      ".....nn.....",
    ],
    clapper: [
      "............",
      "nnnnnnnnnnnn",
      "nynnynnynnyn",
      "nnnnnnnnnnnn",
      "nccccccccccn",
      "ncccbbcccccn",
      "ncccbbbccccn",
      "ncccbbbbcccn",
      "ncccbbbccccn",
      "ncccbbcccccn",
      "nccccccccccn",
      "nnnnnnnnnnnn",
    ],
    heart: [
      "............",
      ".nnn....nnn.",
      "nyyyn..nyyyn",
      "nycyynnyyyyn",
      "nyyyyyyyyyyn",
      "nyyyyyyyyyyn",
      ".nyyyyyyyyn.",
      "..nyyyyyyn..",
      "...nyyyyn...",
      "....nyyn....",
      ".....nn.....",
      "............",
    ],
    plus: [
      "..y..",
      "..y..",
      "yyyyy",
      "..y..",
      "..y..",
    ],
    star: [
      "...n...",
      "..nnn..",
      "nnnnnnn",
      ".nnnnn.",
      ".nn.nn.",
      "nn...nn",
      "n.....n",
    ],
    play: [
      "nn.....",
      "nnnn...",
      "nnnnnn.",
      "nnnnnnn",
      "nnnnnn.",
      "nnnn...",
      "nn.....",
    ],
  };

  function sprite(name) {
    const rows = SPRITES[name] || SPRITES.sparkle;
    const h = rows.length, w = rows[0].length;
    let rects = "";
    rows.forEach((r, y) => {
      let x = 0;
      while (x < w) {
        const ch = r[x];
        if (ch === ".") { x++; continue; }
        let x2 = x;
        while (x2 < w && r[x2] === ch) x2++;
        rects += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x) + '" height="1" class="px-' + ch + '"/>';
        x = x2;
      }
    });
    return '<svg class="sprite" viewBox="0 0 ' + w + " " + h + '" shape-rendering="crispEdges" aria-hidden="true">' + rects + "</svg>";
  }

  function spriteNode(name) {
    const span = document.createElement("span");
    span.style.display = "contents";
    span.innerHTML = sprite(name);
    return span.firstChild;
  }

  // ---------- 4) แอนิเมชันเฟรมเรตต่ำ ----------
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FPS = 12;

  // เลื่อนหน้าแบบกระตุกทีละเฟรม (12 เฟรม/วินาที) เหมือนการ์ตูนเก่า
  function steppedScrollTo(targetY) {
    if (reduceMotion) { window.scrollTo(0, targetY); return; }
    const startY = window.scrollY;
    const dist = targetY - startY;
    const dur = Math.min(900, 300 + Math.abs(dist) * 0.15);
    const frame = 1000 / FPS;
    let t0 = null, lastStep = -1;
    function tick(now) {
      if (t0 === null) t0 = now;
      const step = Math.floor((now - t0) / frame);
      if (step !== lastStep) {
        lastStep = step;
        const p = Math.min(1, (step * frame) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, Math.round(startY + dist * eased));
        if (p >= 1) return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function scrollToId(id) {
    const target = id === "top" ? null : document.getElementById(id);
    const header = document.querySelector(".topbar");
    const offset = header ? header.offsetHeight : 0;
    const y = target ? target.getBoundingClientRect().top + window.scrollY - offset + 8 : 0;
    steppedScrollTo(Math.max(0, y));
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    if (id !== "top" && !document.getElementById(id)) return;
    e.preventDefault();
    if (a.classList.contains("px-btn")) {
      a.classList.add("is-pressed");
      setTimeout(() => a.classList.remove("is-pressed"), 1000 / FPS * 2);
    }
    scrollToId(id);
    history.replaceState(null, "", "#" + id);
  });

  // โผล่ขึ้นมาเป็นจังหวะ เมื่อเลื่อนมาถึง
  const popObserver =
    !reduceMotion && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            let i = 0;
            entries.forEach((en) => {
              if (!en.isIntersecting) return;
              const node = en.target;
              popObserver.unobserve(node);
              node.style.animationDelay = i++ * 90 + "ms";
              node.classList.remove("will-pop");
              node.classList.add("pop");
            });
          },
          { rootMargin: "0px 0px -8% 0px" }
        )
      : null;

  function popOnScroll(node) {
    if (!popObserver) return;
    node.classList.add("will-pop");
    popObserver.observe(node);
  }

  function popNow(node, delay) {
    if (popObserver) popObserver.unobserve(node);
    node.classList.remove("will-pop");
    if (reduceMotion) return;
    node.classList.remove("pop");
    void node.offsetWidth; // รีสตาร์ทแอนิเมชัน
    node.style.animationDelay = (delay || 0) + "ms";
    node.classList.add("pop");
  }

  // ---------- 5) เครื่องเล่นวิดีโอ ----------
  function makePlayer(work) {
    const v = parseVideo(work.url || work.embed);
    let vertical = v && v.vertical;
    if (work.format === "vertical") vertical = true;
    if (work.format === "horizontal") vertical = false;

    const frame = el("div", {
      class: "player " + (vertical ? "is-vertical" : "is-horizontal") + (v && v.tall ? " is-tall" : ""),
    });

    if (!v || v.error) {
      frame.appendChild(
        el("div", { class: "player-error" }, [
          el("strong", { text: "เล่นคลิปนี้ไม่ได้" }),
          el("span", { text: (v && v.error) || "ไม่รู้จักลิงก์นี้: " + (work.url || "(ว่าง)") }),
        ])
      );
      return { node: frame, info: v, vertical: vertical };
    }

    if (v.file) {
      const video = el("video", { src: v.file, controls: "", preload: "metadata", playsinline: "" });
      if (work.thumbnail) video.setAttribute("poster", work.thumbnail);
      frame.appendChild(video);
      return { node: frame, info: v, vertical: vertical };
    }

    const thumb = work.thumbnail || v.thumb;
    if (thumb) {
      // โชว์รูปปกก่อน กดแล้วค่อยโหลดคลิป (เว็บเบาและเร็วกว่ามาก)
      const playBtn = el("span", { class: "play-btn", "aria-hidden": "true" });
      playBtn.appendChild(spriteNode("play"));
      const btn = el("button", { class: "player-facade", type: "button", "aria-label": "เล่น " + (work.title || "") }, [
        el("img", { src: thumb, alt: "", loading: "lazy" }),
        playBtn,
      ]);
      btn.addEventListener("click", function () {
        const sep = v.src.includes("?") ? "&" : "?";
        const src = v.autoplayParam ? v.src + sep + v.autoplayParam : v.src;
        const start = () => frame.replaceChildren(makeIframe(src, work.title));
        if (reduceMotion) return start();
        btn.classList.add("is-starting"); // ภาพ "ดับ" แบบทีวีเก่า 4 เฟรม แล้วค่อยขึ้นคลิป
        setTimeout(start, (1000 / FPS) * 4);
      });
      frame.appendChild(btn);
    } else {
      frame.appendChild(makeIframe(v.src, work.title));
    }
    return { node: frame, info: v, vertical: vertical };
  }

  // ---------- 6) เติมเนื้อหาลงหน้าเว็บ ----------
  function setText(sel, text) {
    document.querySelectorAll(sel).forEach((n) => (n.textContent = text || ""));
  }

  const ALL = "ทั้งหมด";
  const categories = (SITE.categories && SITE.categories.length
    ? SITE.categories
    : Array.from(new Set(WORKS.map((w) => w.category).filter(Boolean))).map((name) => ({ name: name }))
  ).map((c, i) => Object.assign({ sprite: ["phone", "gamepad", "sparkle", "clapper"][i % 4] }, c));

  let cards = [];
  const chipButtons = [];
  const tileButtons = [];

  function setFilter(cat, animate) {
    chipButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
    tileButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
    let shown = 0;
    cards.forEach((card) => {
      const show = cat === ALL || card.dataset.category === cat;
      card.hidden = !show;
      if (show && animate) popNow(card, shown * 80);
      if (show) shown++;
    });
    document.getElementById("works-empty").hidden = shown > 0;
  }

  function renderSite() {
    document.title = (SITE.name || "Portfolio") + " — " + (SITE.role || "Video Editor");
    setText("[data-site=name]", SITE.name);
    setText("[data-site=role]", SITE.role);
    setText("[data-site=tagline]", SITE.tagline);
    setText("[data-site=about]", SITE.about);
    setText("[data-site=year]", String(new Date().getFullYear()));

    document.querySelectorAll("[data-sprite]").forEach((n) => (n.innerHTML = sprite(n.dataset.sprite)));

    const reel = document.getElementById("showreel");
    if (SITE.showreel) reel.appendChild(makePlayer({ url: SITE.showreel, title: "Showreel" }).node);
    else document.getElementById("showreel-wrap").remove();

    // แถบวิ่ง (ทำ 2 ชุดเพื่อให้วนต่อกันได้เนียน)
    const ticker = document.getElementById("ticker");
    const words = SITE.marquee && SITE.marquee.length ? SITE.marquee : [SITE.role || "PORTFOLIO"];
    for (let k = 0; k < 2; k++) {
      const group = el("div", { class: "ticker-item" });
      for (let r = 0; r < 3; r++) {
        words.forEach((w) => {
          group.appendChild(el("span", { text: w }));
          group.appendChild(spriteNode("star"));
        });
      }
      ticker.appendChild(group);
    }

    // รูปในหน้า about
    const photo = document.getElementById("photo");
    if (SITE.photo) photo.appendChild(el("img", { src: SITE.photo, alt: SITE.name || "" }));
    else photo.appendChild(spriteNode("gamepad"));

    const tools = document.getElementById("tools");
    (SITE.tools || []).forEach((t) => tools.appendChild(el("li", { text: t })));

    const services = document.getElementById("services-list");
    (SITE.services || []).forEach((s, i) => {
      const li = el("li", { class: "service" }, [
        el("span", { class: "service-num", text: String(i + 1).padStart(2, "0") }),
        el("h3", { text: s.title }),
        el("p", { text: s.detail }),
      ]);
      services.appendChild(li);
      popOnScroll(li);
    });

    const c = SITE.contact || {};
    const links = document.getElementById("contact-links");
    [
      c.email && ["EMAIL", "mailto:" + c.email, c.email],
      c.line && ["LINE", c.line],
      c.facebook && ["FACEBOOK", c.facebook],
      c.tiktok && ["TIKTOK", c.tiktok],
      c.youtube && ["YOUTUBE", c.youtube],
    ]
      .filter(Boolean)
      .forEach(([label, href, text], i) => {
        const a = el("a", { class: "px-btn contact-link" + (i ? " px-btn-cream" : ""), href: href }, [
          el("span", { class: "contact-label", text: label }),
          el("span", { text: text || href.replace(/^https?:\/\/(www\.)?/, "") }),
        ]);
        if (!href.startsWith("mailto:")) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        links.appendChild(a);
      });

    document.querySelectorAll(".section-head, .polaroid").forEach(popOnScroll);
  }

  function renderMediaTiles() {
    const wrap = document.getElementById("media-tiles");
    if (!categories.length) {
      document.getElementById("media").remove();
      return;
    }
    categories.forEach((cat) => {
      const count = WORKS.filter((w) => w.category === cat.name).length;
      const icon = el("span", { class: "media-icon" });
      if (cat.icon) icon.appendChild(el("img", { src: cat.icon, alt: "" }));
      else icon.appendChild(spriteNode(cat.sprite));
      const tile = el("button", { type: "button", class: "media-tile", "aria-pressed": "false" }, [
        el("span", { class: "media-count" + (count ? "" : " is-soon"), text: count ? count + " งาน" : "เร็ว ๆ นี้" }),
        icon,
        el("span", { class: "media-label", text: cat.label || cat.name }),
        el("span", { class: "media-name", text: cat.name }),
      ]);
      tile.dataset.cat = cat.name;
      tile.addEventListener("click", () => {
        setFilter(cat.name, false);
        scrollToId("works");
        // การ์ดเด้งขึ้นหลังเลื่อนไปถึง
        setTimeout(() => setFilter(cat.name, true), 450);
      });
      tileButtons.push(tile);
      wrap.appendChild(tile);
      popOnScroll(tile);
    });
  }

  function renderWorks() {
    const grid = document.getElementById("works-grid");
    const filters = document.getElementById("filters");
    const list = WORKS.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const tilts = [-1.4, 1, -0.6, 1.6, -1, 0.5];

    cards = list.map((w, i) => {
      const player = makePlayer(w);
      const meta = [w.client, w.year].filter(Boolean).join(" · ");
      const card = el("article", { class: "card" }, [
        w.wip ? el("span", { class: "wip", text: "WIP" }) : null,
        player.node,
        el("div", { class: "card-body" }, [
          el("div", { class: "card-tags" }, [
            w.category ? el("span", { class: "tag", text: w.category }) : null,
            player.info && player.info.platform ? el("span", { class: "tag tag-blue", text: player.info.platform }) : null,
          ]),
          el("h3", { text: w.title || "ไม่มีชื่อ" }),
          w.description ? el("p", { text: w.description }) : null,
          meta || (w.tools && w.tools.length)
            ? el("p", { class: "card-meta", text: [meta, (w.tools || []).join(", ")].filter(Boolean).join("  /  ") })
            : null,
        ]),
      ]);
      card.style.setProperty("--r", tilts[i % tilts.length] + "deg");
      card.dataset.category = w.category || "";
      grid.appendChild(card);
      popOnScroll(card);
      return card;
    });

    if (!cards.length) {
      filters.remove();
      document.getElementById("works-empty").textContent = "ยังไม่มีผลงาน — เพิ่มได้ในไฟล์ content.js";
      document.getElementById("works-empty").hidden = false;
      return;
    }

    const used = new Set(list.map((w) => w.category).filter(Boolean));
    const chipCats = categories.map((c) => c.name).filter((n) => used.has(n));
    used.forEach((n) => chipCats.includes(n) || chipCats.push(n));
    if (chipCats.length < 2) {
      filters.remove();
      return;
    }
    [ALL].concat(chipCats).forEach((cat) => {
      const b = el("button", { type: "button", class: "filter", text: cat, "aria-pressed": "false" });
      b.dataset.cat = cat;
      b.addEventListener("click", () => setFilter(cat, true));
      chipButtons.push(b);
      filters.appendChild(b);
    });
    setFilter(ALL, false);
  }

  renderSite();
  renderMediaTiles();
  renderWorks();
})();
