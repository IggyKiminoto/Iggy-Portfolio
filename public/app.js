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

  function makePlayer(work, opts) {
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
      return { node: frame, info: v };
    }

    if (v.file) {
      const video = el("video", { src: v.file, controls: "", preload: "metadata", playsinline: "" });
      if (work.thumbnail) video.setAttribute("poster", work.thumbnail);
      frame.appendChild(video);
      return { node: frame, info: v };
    }

    const thumb = work.thumbnail || v.thumb;

    // ถ้ามีรูปปก: โชว์รูปก่อน กดแล้วค่อยโหลดคลิป (เว็บโหลดเร็วกว่ามาก)
    if (thumb && !(opts && opts.eager)) {
      const btn = el("button", { class: "player-facade", type: "button", "aria-label": "เล่น " + (work.title || "") }, [
        el("img", { src: thumb, alt: "", loading: "lazy" }),
        el("span", { class: "play-icon", "aria-hidden": "true" }),
      ]);
      btn.addEventListener("click", function () {
        const sep = v.src.includes("?") ? "&" : "?";
        const src = v.autoplayParam ? v.src + sep + v.autoplayParam : v.src;
        frame.replaceChildren(makeIframe(src, work.title));
      });
      frame.appendChild(btn);
    } else {
      frame.appendChild(makeIframe(v.src, work.title));
    }
    return { node: frame, info: v };
  }

  // ---------- 3) เติมเนื้อหาลงหน้าเว็บ ----------
  function setText(sel, text) {
    document.querySelectorAll(sel).forEach((n) => (n.textContent = text || ""));
  }

  function renderSite() {
    document.title = (SITE.name || "Portfolio") + " — " + (SITE.role || "Video Editor");
    setText("[data-site=name]", SITE.name);
    setText("[data-site=role]", SITE.role);
    setText("[data-site=tagline]", SITE.tagline);
    setText("[data-site=about]", SITE.about);
    setText("[data-site=year]", String(new Date().getFullYear()));

    const reel = document.getElementById("showreel");
    if (SITE.showreel && reel) {
      reel.appendChild(makePlayer({ url: SITE.showreel, title: "Showreel" }).node);
    } else if (reel) {
      reel.remove();
    }

    const tools = document.getElementById("tools");
    (SITE.tools || []).forEach((t) => tools.appendChild(el("li", { text: t })));

    const services = document.getElementById("services-list");
    (SITE.services || []).forEach((s, i) =>
      services.appendChild(
        el("li", { class: "service" }, [
          el("span", { class: "service-num", text: String(i + 1).padStart(2, "0") }),
          el("h3", { text: s.title }),
          el("p", { text: s.detail }),
        ])
      )
    );

    const c = SITE.contact || {};
    const links = document.getElementById("contact-links");
    const items = [
      c.email && ["อีเมล", "mailto:" + c.email, c.email],
      c.line && ["LINE", c.line],
      c.facebook && ["Facebook", c.facebook],
      c.tiktok && ["TikTok", c.tiktok],
      c.youtube && ["YouTube", c.youtube],
    ].filter(Boolean);
    items.forEach(([label, href, text]) => {
      const a = el("a", { class: "contact-link", href: href }, [
        el("span", { class: "contact-label", text: label }),
        el("span", { text: text || href.replace(/^https?:\/\/(www\.)?/, "") }),
      ]);
      if (!href.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      links.appendChild(a);
    });
  }

  function renderWorks() {
    const grid = document.getElementById("works-grid");
    const filters = document.getElementById("filters");
    const list = WORKS.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    if (!list.length) {
      grid.appendChild(el("p", { class: "empty", text: "ยังไม่มีผลงาน — เพิ่มได้ในไฟล์ content.js" }));
      return;
    }

    const cards = list.map((w) => {
      const player = makePlayer(w);
      const meta = [w.client, w.year].filter(Boolean).join(" · ");
      const card = el("article", { class: "card" + (player.node.classList.contains("is-vertical") ? " card-vertical" : "") }, [
        player.node,
        el("div", { class: "card-body" }, [
          el("div", { class: "card-tags" }, [
            w.category ? el("span", { class: "tag", text: w.category }) : null,
            player.info && player.info.platform ? el("span", { class: "tag tag-muted", text: player.info.platform }) : null,
          ]),
          el("h3", { text: w.title || "ไม่มีชื่อ" }),
          w.description ? el("p", { text: w.description }) : null,
          meta || (w.tools && w.tools.length)
            ? el("p", { class: "card-meta", text: [meta, (w.tools || []).join(", ")].filter(Boolean).join("  /  ") })
            : null,
        ]),
      ]);
      card.dataset.category = w.category || "";
      return card;
    });
    cards.forEach((c) => grid.appendChild(c));

    const cats = Array.from(new Set(list.map((w) => w.category).filter(Boolean)));
    if (cats.length < 2) {
      filters.remove();
      return;
    }
    ["ทั้งหมด"].concat(cats).forEach((cat, i) => {
      const b = el("button", { type: "button", class: "filter", text: cat, "aria-pressed": i === 0 ? "true" : "false" });
      b.addEventListener("click", () => {
        filters.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        cards.forEach((card) => {
          card.hidden = i !== 0 && card.dataset.category !== cat;
        });
      });
      filters.appendChild(b);
    });
  }

  renderSite();
  renderWorks();
})();
