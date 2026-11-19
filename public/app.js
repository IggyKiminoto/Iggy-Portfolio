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
          src: "https://www.tiktok.com/player/v1/" + m[1] + "?description=0&music_info=0&rel=0",
        };
      }
      return { platform: "TikTok", error: "Short TikTok links (vt.tiktok.com) can't be embedded. Use the full link with /video/ and the number." };
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
      thumbMax: "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg",
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
    camera: [
      "............",
      "...nnnn.....",
      "..nyyyyn....",
      "nnnnnnnnnnnn",
      "nccccccccccn",
      "ncccnnnncccn",
      "nccnbbbbnccn",
      "nccnbccbnccn",
      "nccnbbbbnccn",
      "ncccnnnncccn",
      "nccccccccccn",
      "nnnnnnnnnnnn",
    ],
    mic: [
      "....nnnn....",
      "...nbbbbn...",
      "...nbccbn...",
      "...nbbbbn...",
      "...nbccbn...",
      "...nbbbbn...",
      ".n.nbbbbn.n.",
      ".n..nnnn..n.",
      "..n......n..",
      "...nnnnnn...",
      ".....nn.....",
      "...nnnnnn...",
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
    arrowR: [
      "...n...",
      "...nn..",
      "nnnnnn.",
      "nnnnnnn",
      "nnnnnn.",
      "...nn..",
      "...n...",
    ],
    arrowL: [
      "...n...",
      "..nn...",
      ".nnnnnn",
      "nnnnnnn",
      ".nnnnnn",
      "..nn...",
      "...n...",
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

  // เฟรมที่ 2 ของไอคอน — เวลาเอาเมาส์ชี้ ไอคอนจะสลับเฟรมเหมือนภาพ GIF
  const SPRITE_FRAMES = {
    camera: [
      "..y......y..",
      "...nnnn.....",
      "y.nyyyyn..y.",
      "nnnnnnnnnnnn",
      "nccccccccccn",
      "ncccnnnncccn",
      "nccnyyyynccn",
      "nccnyccynccn",
      "nccnyyyynccn",
      "ncccnnnncccn",
      "nccccccccccn",
      "nnnnnnnnnnnn",
    ],
    mic: [
      "....nnnn....",
      "...nbbbbn...",
      "y..nbccbn..y",
      ".y.nbbbbn.y.",
      "y..nbccbn..y",
      "...nbbbbn...",
      ".n.nbbbbn.n.",
      ".n..nnnn..n.",
      "..n......n..",
      "...nnnnnn...",
      ".....nn.....",
      "...nnnnnn...",
    ],
    sparkle: [
      "............",
      "............",
      ".....nn.....",
      "....nyyn....",
      "...nyyyyn...",
      "..nyyccyyn..",
      "..nyyyyyyn..",
      "...nyyyyn...",
      "....nyyn....",
      ".....nn.....",
      "............",
      "............",
    ],
    phone: [
      "..nnnnnnnn..",
      "..nbbbbbbn..",
      "..nbbbbbbn..",
      "..nbybybbn..",
      "..nbybybbn..",
      "..nbybybbn..",
      "..nbybybbn..",
      "..nbybybbn..",
      "..nbbbbbbn..",
      "..nnnnnnnn..",
      "..nnnyynnn..",
      "..nnnnnnnn..",
    ],
    heart: [
      "............",
      "............",
      "..nn....nn..",
      ".nyyn..nyyn.",
      ".nycynnyyyn.",
      ".nyyyyyyyyn.",
      "..nyyyyyyn..",
      "...nyyyyn...",
      "....nyyn....",
      ".....nn.....",
      "............",
      "............",
    ],
  };

  function spriteRects(rows) {
    const w = rows[0].length;
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
    return rects;
  }

  function sprite(name) {
    const rows = SPRITES[name] || SPRITES.sparkle;
    const h = rows.length, w = rows[0].length;
    const alt = SPRITE_FRAMES[name];
    const body = alt
      ? '<g class="fr fr-1">' + spriteRects(rows) + '</g><g class="fr fr-2">' + spriteRects(alt) + "</g>"
      : spriteRects(rows);
    return '<svg class="sprite' + (alt ? " has-frames" : "") + '" viewBox="0 0 ' + w + " " + h + '" shape-rendering="crispEdges" aria-hidden="true">' + body + "</svg>";
  }

  function spriteNode(name) {
    const span = document.createElement("span");
    span.style.display = "contents";
    span.innerHTML = sprite(name);
    return span.firstChild;
  }

  // ---------- 4) แอนิเมชัน ----------
  // เฟรมเรตต่ำ (posterize) ใช้เฉพาะตอน reveal / pop-up เท่านั้น
  // ส่วนการเลื่อนหน้า (scroll) ลื่นปกติ
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FPS = 12;

  // เลื่อนหน้าแบบลื่น — คืนค่าเป็น Promise ที่เสร็จเมื่อเลื่อนถึงที่หมาย
  function smoothScrollTo(targetY) {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (reduceMotion || Math.abs(dist) < 2) {
        window.scrollTo(0, targetY);
        return resolve();
      }
      const dur = Math.min(1000, 450 + Math.abs(dist) * 0.12);
      let t0 = null;
      function tick(now) {
        if (t0 === null) t0 = now;
        const p = Math.min(1, (now - t0) / dur);
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, startY + dist * eased);
        if (p < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });
  }

  function scrollToId(id) {
    const target = id === "top" ? null : document.getElementById(id);
    const header = document.querySelector(".topbar");
    const offset = header ? header.offsetHeight : 0;
    const y = target ? target.getBoundingClientRect().top + window.scrollY - offset + 8 : 0;
    return smoothScrollTo(Math.max(0, y));
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
              node.classList.add("pop");
            });
          },
          { rootMargin: "0px 0px -8% 0px" }
        )
      : null;

  // ของทุกชิ้นมองเห็นได้ตั้งแต่แรก แอนิเมชันแค่ "เด้ง" ตอนเลื่อนมาถึง ไม่ได้ซ่อนไว้ก่อน
  // ถ้ามีไฟล์ fx.js (ชุดลูกเล่น) ให้ fx.js เป็นคนจัดการแอนิเมชันตอนเลื่อนแทน
  const hasFx = !!document.querySelector('script[src="fx.js"]');
  function popOnScroll(node) {
    if (!popObserver || hasFx) return;
    popObserver.observe(node);
  }

  function popNow(node, delay) {
    if (popObserver) popObserver.unobserve(node);
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
          el("strong", { text: "This clip can't play here" }),
          el("span", { text: (v && v.error) || "Unknown link: " + (work.url || "(empty)") }),
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
      const btn = el("button", { class: "player-facade", type: "button", "aria-label": "Play " + (work.title || "video") }, [
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

  // ---------- 6) ข้อมูลผลงาน ----------
  function setText(sel, text) {
    document.querySelectorAll(sel).forEach((n) => (n.textContent = text || ""));
  }
  function asList(v) {
    if (!v) return [];
    return (Array.isArray(v) ? v : [v]).filter(Boolean);
  }

  // รองรับทั้ง categories: [...] และ category: "..." แบบเก่า
  function originalOf(url, info) {
    const u = String(url || "").trim();
    if (/^https?:\/\//i.test(u)) return u;
    return info && info.src && info.platform !== "Embed" ? info.src : "";
  }

  const works = WORKS.filter((w) => !w.wip).map((w, idx) => {
    const labels = asList(w.clipLabels);
    const clipMeta = asList(w.clips || w.url).map((c, i) =>
      typeof c === "string" ? { url: c, label: labels[i] || "" } : Object.assign({ label: labels[i] || "" }, c)
    );
    const clipList = clipMeta.map((c) => c.url);
    const info = parseVideo(clipList[0] || w.embed);
    const original = originalOf(clipList[0], info);
    return Object.assign({}, w, {
      id: "work-" + (idx + 1),
      url: clipList[0],
      clipList: clipList,
      clipMeta: clipMeta,
      cats: asList(w.categories || w.category),
      tagList: asList(w.tags),
      roles: asList((clipMeta[0] && clipMeta[0].role) || w.role),
      highlightText: w.highlight || w.description || "",
      info: info,
      original: original,
    });
  });
  const featured = works.filter((w) => w.featured).slice(0, 3);
  const rest = works.filter((w) => featured.indexOf(w) === -1);

  const categories = (SITE.categories || []).map((c, i) =>
    Object.assign({ sprite: ["phone", "clapper", "camera", "mic", "sparkle"][i % 5] }, c)
  );
  const catInfo = (name) => categories.find((c) => c.name === name);

  // ---------- 7) การ์ดผลงาน ----------
  function iconFor(item) {
    const wrap = el("span", { class: "chip-icon" });
    if (item && item.icon) wrap.appendChild(el("img", { src: item.icon, alt: "" }));
    else wrap.appendChild(spriteNode((item && item.sprite) || "sparkle"));
    // ไอคอนตอนเอาเมาส์ชี้ (เช่นไฟล์ .gif ที่วาดเอง)
    if (item && item.iconHover) {
      wrap.classList.add("has-hover-icon");
      wrap.appendChild(el("img", { src: item.iconHover, alt: "", class: "ic-hover", loading: "lazy" }));
    }
    return wrap;
  }

  function openLink(w) {
    if (!w.original) return null;
    const name = (w.info && w.info.platform && !/Embed|Video/.test(w.info.platform)) ? w.info.platform : "the original site";
    const a = el("a", { class: "open-link", href: w.original, target: "_blank", rel: "noopener", text: "Watch on " + name + " ↗" });
    w._open = a;
    return a;
  }

  function detailsBlock(w, label) {
    const d = w.details || {};
    const rows = [];
    const add = (term, value) => {
      if (!value) return;
      rows.push(el("dt", { text: term }));
      rows.push(typeof value === "string" ? el("dd", { text: value }) : el("dd", {}, [value]));
    };
    add("Platform", d.platform);
    add("Brief", d.brief);
    add("My role", d.responsibility);
    add("Key decisions", d.decisions);
    if (d.results) {
      const res = el("span", { text: d.results });
      if (d.resultsSource) res.appendChild(el("small", { class: "source", text: "Source: " + d.resultsSource }));
      add("Results", res);
    }
    add("Tools", asList(d.tools).join(", "));
    add("Turnaround", d.duration);
    if (d.beforeAfter) {
      add("Before / After", el("a", { href: d.beforeAfter, target: "_blank", rel: "noopener", text: "Watch the comparison ↗" }));
    }
    if (!rows.length) return null;
    return el("details", { class: "work-more" }, [el("summary", { text: label || "Behind the work" }), el("dl", {}, rows)]);
  }

  function workInfo(w, opts) {
    const count = w.clipList.length > 1 ? w.clipList.length + " clips" : "";
    const meta = [w.client, w.cats.join(" / "), w.year, count].filter(Boolean).join(" · ");
    const children = [
      el("h3", { text: w.title || "Untitled" }),
      meta ? el("p", { class: "work-meta", text: meta }) : null,
    ];
    const anyRoles = w.roles.length || w.ongoing || w.clipMeta.some((c) => c.role);
    if (anyRoles) {
      const roles = el("ul", { class: "roles", "aria-label": "My role" });
      w._fillRoles = (list) => {
        roles.replaceChildren();
        asList(list).forEach((r) => roles.appendChild(el("li", { text: r })));
        if (w.ongoing) roles.appendChild(el("li", { class: "is-ongoing", text: "Ongoing series" }));
      };
      w._fillRoles(w.roles);
      children.push(roles);
    }
    if (w.highlightText) children.push(el("p", { class: "work-highlight", text: w.highlightText }));
    if (w.tagList.length && opts && opts.showTags) {
      const tags = el("p", { class: "work-tags" });
      tags.textContent = w.tagList.map((t) => "#" + t).join("  ");
      children.push(tags);
    }
    children.push(detailsBlock(w, opts && opts.detailsLabel));
    const actions = el("div", { class: "work-actions" }, [openLink(w)]);
    if (actions.childNodes.length) children.push(actions);
    return children;
  }

  // คลิปในโปรเจกต์: ถ้ามีหลายคลิป จะมีปุ่ม 1 2 3 ให้สลับดู
  function mediaBlock(w) {
    const box = el("div", { class: "media-box" });
    let player = makePlayer(w);
    box.appendChild(player.node);
    if (w.clipList.length > 1) {
      const labels = w.clipMeta.map((c) => c.label || "");
      const caption = el("span", { class: "clip-caption", text: labels[0] || "" });
      const tabs = el("div", { class: "clip-tabs", role: "group", "aria-label": "Clips in this project" }, [
        el("span", { class: "clip-tabs-label", text: "CLIPS" }),
      ]);
      const btns = w.clipList.map((u, i) => {
        const b = el("button", {
          type: "button", class: "clip-tab", text: String(i + 1),
          "aria-pressed": i === 0 ? "true" : "false",
          "aria-label": "Clip " + (i + 1) + (labels[i] ? ": " + labels[i] : ""),
        });
        b.addEventListener("click", () => {
          if (b.getAttribute("aria-pressed") === "true") return;
          const next = makePlayer(Object.assign({}, w, { url: u, thumbnail: i === 0 ? w.thumbnail : "" }));
          box.replaceChild(next.node, player.node);
          player = next;
          btns.forEach((x, k) => x.setAttribute("aria-pressed", String(k === i)));
          caption.textContent = labels[i] || "";
          if (w._open) w._open.href = originalOf(u, next.info);
          if (w._fillRoles) w._fillRoles(w.clipMeta[i].role || w.role);
          popNow(next.node, 0);
        });
        tabs.appendChild(b);
        return b;
      });
      tabs.appendChild(caption);
      box.appendChild(tabs);
    }
    return { node: box, vertical: player.vertical };
  }

  function featuredRow(w, i) {
    const media = mediaBlock(w);
    const row = el("article", { class: "feature" + (media.vertical ? " is-vertical" : ""), id: w.id }, [
      el("div", { class: "feature-media" }, [media.node]),
      el("div", { class: "feature-info" }, [el("span", { class: "feature-num", text: String(i + 1).padStart(2, "0") })].concat(
        workInfo(w, { showTags: true, detailsLabel: "Read the story behind it" })
      )),
    ]);
    return row;
  }

  function workCard(w, i) {
    const media = mediaBlock(w);
    const card = el("article", { class: "card", id: w.id }, [
      media.node,
      el("div", { class: "card-body" }, workInfo(w, {})),
    ]);
    card.style.setProperty("--r", [-0.6, 0.5, -0.3, 0.7][i % 4] + "deg");
    card._work = w;
    return card;
  }

  // ---------- 8) ตัวกรองชุดเดียว ----------
  const ALL = "All";
  let cards = [];
  const chipButtons = [];

  function matches(w, f) {
    if (f.type === "all") return true;
    if (f.type === "cat") return w.cats.indexOf(f.name) !== -1;
    return w.tagList.indexOf(f.name) !== -1;
  }

  function setFilter(f, animate) {
    chipButtons.forEach((b) => b.setAttribute("aria-pressed", String(b._filter === f)));
    let shown = 0;
    cards.forEach((card) => {
      const show = matches(card._work, f);
      card.hidden = !show;
      if (show && animate) popNow(card, shown * 70);
      if (show) shown++;
    });
    document.getElementById("works-empty").hidden = shown > 0;
  }

  // ---------- 9) เติมหน้าเว็บ ----------
  function renderHero() {
    document.title = SITE.pageTitle || (SITE.name || "Portfolio") + " | " + (SITE.role || "Video Editor");

    // หัวข้อใหญ่บน Cover = สโลแกน (แต่ละบรรทัดเป็น 1 ข้อความใน headline)
    const h1 = document.getElementById("hero-title");
    asList(SITE.headline).forEach((line) => h1.appendChild(el("span", { class: "hero-line", text: line })));
    h1.setAttribute("aria-label", asList(SITE.headline).join(" ") || SITE.name || "");
    if (!h1.children.length) h1.appendChild(el("span", { class: "hero-line", text: SITE.name || "" }));

    const clients = document.getElementById("hero-clients");
    const names = asList(SITE.workedWith);
    if (names.length) clients.appendChild(el("span", { text: names.join(" · ") }));
    else clients.remove();
    setText("[data-site=name]", SITE.name);
    setText("[data-site=role]", SITE.role);
    setText("[data-site=tagline]", SITE.tagline);
    setText("[data-site=about]", SITE.about);
    setText("[data-site=year]", String(new Date().getFullYear()));
    document.querySelectorAll("[data-sprite]").forEach((n) => (n.innerHTML = sprite(n.dataset.sprite)));

    // รับงานอะไร: ใช้ SITE.offer ถ้ามี ไม่งั้นใช้หมวดงาน
    const offer = document.getElementById("offer-list");
    const offered = asList(SITE.offer).length ? asList(SITE.offer) : categories;
    offered.forEach((c) => {
      const li = el("li", {}, [iconFor(c), el("span", { text: c.name })]);
      offer.appendChild(li);
    });
    if (!offer.children.length) offer.parentNode.remove();

    renderReel();

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
  }

  // ทีวีบน Cover: แต่ละ "ช่อง" = งาน 1 ประเภท กดเลือกช่อง หรือกดลูกศรเลื่อนดูได้
  function renderReel() {
    const wrap = document.getElementById("reel-wrap");
    const screen = document.getElementById("reel");
    const label = document.getElementById("reel-label");
    const count = document.getElementById("reel-count");
    const chips = document.getElementById("reel-channels");
    const from = document.getElementById("reel-from");
    const prev = document.getElementById("reel-prev");
    const next = document.getElementById("reel-next");

    let channels = asList(SITE.channels).filter((c) => c && c.clip);
    if (!channels.length && SITE.showreel) channels = [{ label: SITE.reelLabel || "SHOWREEL", clip: SITE.showreel }];
    if (!channels.length && featured[0]) channels = [{ label: SITE.reelLabel || "LATEST WORK", clip: featured[0].url }];
    if (!channels.length) return wrap.remove();

    const findWork = (url) => works.find((w) => w.clipList.indexOf(url) !== -1);
    let current = -1;
    const buttons = channels.map((c, i) => {
      const b = el("button", { type: "button", class: "filter", "aria-pressed": "false" }, [
        c.sprite ? iconFor({ sprite: c.sprite }) : null,
        el("span", { text: c.label }),
      ]);
      b.addEventListener("click", () => show(i));
      chips.appendChild(b);
      return b;
    });
    if (channels.length < 2) {
      chips.remove();
      prev.hidden = true;
      next.hidden = true;
    }

    function show(i) {
      const n = channels.length;
      i = (i + n) % n;
      if (i === current) return;
      const first = current === -1;
      current = i;
      const c = channels[i];
      const work = findWork(c.clip);
      const player = makePlayer({ url: c.clip, title: c.label, format: c.format });
      screen.replaceChildren(player.node);
      if (!first && !reduceMotion) {
        screen.classList.remove("is-static");
        void screen.offsetWidth;
        screen.classList.add("is-static");
      }
      label.textContent = "▶ " + (n > 1 ? "CH " + (i + 1) + " · " : "") + c.label;
      count.textContent = n > 1 ? i + 1 + " / " + n : "";
      buttons.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
      if (work) {
        from.textContent = "From: " + work.title + " ↓";
        from.setAttribute("href", "#" + work.id);
        from.hidden = false;
      } else {
        from.hidden = true;
      }
    }
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    show(0);
  }

  function renderSelected() {
    const list = document.getElementById("selected-list");
    if (!featured.length) {
      document.getElementById("selected").remove();
      document.querySelectorAll('a[href="#selected"]').forEach((a) => a.setAttribute("href", "#works"));
      return;
    }
    featured.forEach((w, i) => {
      const row = featuredRow(w, i);
      list.appendChild(row);
      popOnScroll(row);
    });
  }

  function renderWorks() {
    const grid = document.getElementById("works-grid");
    const filters = document.getElementById("filters");
    if (!rest.length) {
      document.getElementById("works").remove();
      return;
    }
    cards = rest.map((w, i) => {
      const card = workCard(w, i);
      grid.appendChild(card);
      popOnScroll(card);
      return card;
    });

    // ตัวกรอง: หมวดที่มีงาน + tag เด่น (ซ่อนอันที่ว่าง)
    const list = [{ type: "all", name: ALL }];
    categories.forEach((c) => {
      if (rest.some((w) => w.cats.indexOf(c.name) !== -1)) list.push({ type: "cat", name: c.name, item: c });
    });
    rest.forEach((w) => w.cats.forEach((n) => {
      if (!list.some((f) => f.type === "cat" && f.name === n)) list.push({ type: "cat", name: n });
    }));
    (SITE.filterTags || []).forEach((t) => {
      const tag = typeof t === "string" ? { name: t } : t;
      if (rest.some((w) => w.tagList.indexOf(tag.name) !== -1)) list.push({ type: "tag", name: tag.name, item: tag });
    });
    // ปุ่มกรองที่กดแล้วได้ผลเหมือน "All" ไม่ต้องแสดง
    const useful = [list[0]].concat(list.slice(1).filter((f) => {
      const n = rest.filter((w) => matches(w, f)).length;
      return n > 0 && n < rest.length;
    }));
    list.length = 0;
    useful.forEach((f) => list.push(f));
    if (list.length < 3) {
      filters.remove();
      return;
    }
    list.forEach((f) => {
      const b = el("button", { type: "button", class: "filter" + (f.type === "tag" ? " filter-tag" : ""), "aria-pressed": "false" }, [
        f.type !== "all" ? iconFor(f.item || { sprite: f.type === "tag" ? "gamepad" : "sparkle" }) : null,
        el("span", { text: f.type === "tag" ? "#" + f.name : f.name }),
      ]);
      b._filter = f;
      b.addEventListener("click", () => setFilter(f, true));
      chipButtons.push(b);
      filters.appendChild(b);
    });
    setFilter(list[0], false);
  }

  function renderServices() {
    const services = document.getElementById("services-list");
    (SITE.services || []).forEach((s) => {
      const c = catInfo(s.title);
      const head = el("div", { class: "service-head" }, [c ? iconFor(c) : null, el("h3", { text: s.title })]);
      const li = el("li", { class: "service" }, [head, s.detail ? el("p", { text: s.detail }) : null]);
      if (s.includes && s.includes.length) {
        const ul = el("ul", { class: "service-includes" });
        s.includes.forEach((x) => ul.appendChild(el("li", { text: x })));
        li.appendChild(ul);
      }
      services.appendChild(li);
      popOnScroll(li);
    });
    if (!services.children.length) services.remove();

    const proc = document.getElementById("process-list");
    (SITE.process || []).forEach((p, i) => {
      proc.appendChild(el("li", { class: "step" }, [
        el("span", { class: "step-num", text: String(i + 1) }),
        el("div", {}, [el("h3", { text: p.title }), p.detail ? el("p", { text: p.detail }) : null]),
      ]));
    });
    if (!proc.children.length) proc.parentNode.remove();
  }

  function renderAbout() {
    const photo = document.getElementById("photo");
    if (SITE.photo) photo.appendChild(el("img", { src: SITE.photo, alt: SITE.name || "" }));
    else photo.appendChild(spriteNode("gamepad"));

    const exp = document.getElementById("experience");
    (SITE.experience || []).forEach((x) => {
      const points = asList(x.points);
      let list = null;
      if (points.length) {
        list = el("ul", { class: "exp-points" });
        points.forEach((p) => list.appendChild(el("li", { text: p })));
      }
      exp.appendChild(el("li", {}, [el("strong", { text: x.title }), x.detail ? el("span", { text: x.detail }) : null, list]));
    });
    if (!exp.children.length) document.getElementById("experience-wrap").remove();

    const ach = document.getElementById("achievements");
    (SITE.achievements || []).forEach((a) => {
      ach.appendChild(el("li", {}, [
        a.year ? el("span", { class: "ach-year", text: a.year }) : null,
        el("div", {}, [el("strong", { text: a.title }), a.detail ? el("span", { text: a.detail }) : null]),
      ]));
    });
    if (!ach.children.length) document.getElementById("achievements-wrap").remove();

    const tools = document.getElementById("tools");
    (SITE.tools || []).forEach((t) => tools.appendChild(el("li", { text: t })));
    const langs = document.getElementById("languages");
    (SITE.languages || []).forEach((t) => langs.appendChild(el("li", { text: t })));
    if (!langs.children.length) document.getElementById("languages-wrap").remove();

    if (SITE.resume) {
      ["resume-about", "resume-contact"].forEach((id) => {
        const a = document.getElementById(id);
        a.href = SITE.resume;
        a.hidden = false;
      });
    }
    document.querySelectorAll(".section-head, .polaroid").forEach(popOnScroll);
  }

  function renderContact() {
    const c = SITE.contact || {};
    const links = document.getElementById("contact-links");
    // ช่องทางหลัก: LINE ก่อน แล้วตามด้วยอีเมล
    [
      c.line && ["LINE", c.line, "Add me on LINE"],
      c.email && ["EMAIL", "mailto:" + c.email, c.email],
    ]
      .filter(Boolean)
      .forEach(([label, href, text], i) => {
        const a = el("a", { class: "px-btn contact-link" + (i ? " px-btn-cream" : ""), href: href }, [
          el("span", { class: "contact-label", text: label }),
          el("span", { text: text }),
        ]);
        if (!href.startsWith("mailto:")) {
          a.target = "_blank";
          a.rel = "noopener";
        }
        links.appendChild(a);
      });

    const brief = document.getElementById("brief-list");
    (SITE.briefChecklist || []).forEach((t) => brief.appendChild(el("li", { text: t })));
    if (!brief.children.length) document.getElementById("brief-card").remove();

    const socials = document.getElementById("socials");
    [["TikTok", c.tiktok], ["YouTube", c.youtube], ["Facebook", c.facebook]].forEach(([label, href]) => {
      if (href) socials.appendChild(el("a", { class: "px-chip", href: href, target: "_blank", rel: "noopener", text: label + " ↗" }));
    });
    if (!socials.children.length) document.getElementById("socials-wrap").remove();
  }

  renderHero();
  renderSelected();
  renderWorks();
  renderServices();
  renderAbout();
  renderContact();
})();
