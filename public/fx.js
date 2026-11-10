/* =====================================================================
   ลูกเล่นแอนิเมชัน (FX) — แยกจากโครงเว็บ ปิดทั้งหมดได้โดยลบ fx.css / fx.js ใน index.html
   ---------------------------------------------------------------------
   1. ของเลื่อนเข้ามาตอนเลื่อนถึง (เฟรมต่ำ)       5. ไอคอนสลับเฟรมแบบ GIF ตอนเอาเมาส์ชี้ (อยู่ใน fx.css)
   2. ตัวอักษรหัวข้อเด้งทีละตัว + ปากกาไฮไลต์       6. เมาส์พิกเซล
   3. กระดาษฉีกเปิดงานเด่น                        7. พิกเซลแตกกระจายตอนคลิก
   4. ติ๊กเช็กลิสต์ในส่วนติดต่อ                     8. สติกเกอร์บน Cover ขยับช้ากว่าการเลื่อน (parallax)
   ปกติไม่ต้องแก้ไฟล์นี้
   ===================================================================== */
(function () {
  "use strict";

  // คนที่ตั้งเครื่องให้ "ลดการเคลื่อนไหว" จะไม่เห็นลูกเล่นเลย เว็บยังใช้งานได้ครบ
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("fx");

  const once = (node, fn) =>
    node.addEventListener("animationend", function handler(e) {
      if (e.target !== node) return;
      node.removeEventListener("animationend", handler);
      fn();
    });

  // ---------------------------------------------------------------
  // 1) เลื่อนเข้ามา: ของจะขยับจากทิศที่กำหนดแบบ 4 เฟรม
  //    (มองเห็นตลอด แค่เยื้องตำแหน่งไว้ก่อน ไม่ได้ซ่อน)
  // ---------------------------------------------------------------
  const io = "IntersectionObserver" in window;
  const belowFold = (node) => node.getBoundingClientRect().top > window.innerHeight * 0.92;

  const queue = [];
  let flushTimer = 0;
  function play(node) {
    queue.push(node);
    clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
      queue.splice(0).forEach((n, i) => {
        n.style.animationDelay = (n._fxNow ? 0 : i * 90) + (n._fxDelay || 0) + "ms";
        n.classList.remove("fx-pending");
        n.classList.add("fx-in");
        once(n, () => {
          n.classList.remove("fx-in");
          n.style.animationDelay = "";
        });
        if (n._fxAfter) n._fxAfter();
      });
    }, 16);
  }

  const revealIO = io
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            revealIO.unobserve(en.target);
            play(en.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      )
    : null;

  function reveal(node, dir, opts) {
    if (!node || !revealIO) return;
    opts = opts || {};
    node.classList.add("fx-" + dir);
    node._fxDelay = opts.delay || 0;
    node._fxAfter = opts.after || null;
    node._fxNow = !!opts.now;
    if (opts.now || !belowFold(node)) {
      if (opts.now) {
        // เล่นทันที (ใช้กับ Cover ตอนเปิดหน้า)
        node.classList.add("fx-pending");
        requestAnimationFrame(() => play(node));
      } else if (opts.after) {
        opts.after();
      }
      return;
    }
    node.classList.add("fx-pending");
    revealIO.observe(node);
  }

  // ---------------------------------------------------------------
  // 2) หัวข้อพิกเซล: แยกเป็นตัวอักษร ให้เด้งทีละตัว
  // ---------------------------------------------------------------
  function splitLetters(target) {
    const text = target.textContent;
    if (!text.trim()) return [];
    const holder = target.closest("h1, h2") || target;
    holder.setAttribute("aria-label", holder.textContent.trim());
    const wrap = document.createElement("span");
    wrap.setAttribute("aria-hidden", "true");
    const letters = [];
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        wrap.appendChild(document.createTextNode(" "));
        return;
      }
      const word = document.createElement("span");
      word.className = "fx-word";
      Array.from(part).forEach((ch) => {
        const s = document.createElement("span");
        s.className = "fx-ch";
        s.textContent = ch;
        word.appendChild(s);
        letters.push(s);
      });
      wrap.appendChild(word);
    });
    target.textContent = "";
    target.appendChild(wrap);
    return letters;
  }

  function bounceLetters(letters, startDelay) {
    letters.forEach((s, i) => {
      s.style.animationDelay = (startDelay || 0) + i * 55 + "ms";
      s.classList.add("fx-ch-in");
      once(s, () => s.classList.remove("fx-ch-in"));
    });
  }

  function swipeMark(mark, delay) {
    if (!mark) return;
    mark.style.animationDelay = (delay || 0) + "ms";
    mark.classList.remove("fx-mark-wait");
    mark.classList.add("fx-mark-in");
  }

  document.querySelectorAll(".section-head").forEach((head) => {
    const title = head.querySelector(".px-title");
    const mark = head.querySelector("mark");
    const letters = title ? splitLetters(title) : [];
    if (!belowFold(head) || !io) return;
    letters.forEach((s) => s.classList.add("fx-ch-wait"));
    if (mark) mark.classList.add("fx-mark-wait");
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        letters.forEach((s) => s.classList.remove("fx-ch-wait"));
        bounceLetters(letters, 0);
        swipeMark(mark, letters.length * 55 + 80);
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(head);
  });

  // ---------------------------------------------------------------
  // Cover: เล่นลำดับตอนเปิดหน้าเว็บ
  // ---------------------------------------------------------------
  const heroTitle = document.querySelector(".hero-title span");
  if (heroTitle) bounceLetters(splitLetters(heroTitle), 160);
  reveal(document.querySelector(".hero .label-sticker"), "drop", { now: true });
  reveal(document.querySelector(".hero .speech"), "pop", { now: true, delay: 420 });
  document.querySelectorAll(".offer-list li").forEach((li, i) => reveal(li, "up", { now: true, delay: 520 + i * 60 }));
  document.querySelectorAll(".hero-actions .px-btn").forEach((b, i) => reveal(b, "up", { now: true, delay: 640 + i * 60 }));
  reveal(document.querySelector(".hero .tv"), "right", { now: true, delay: 260 });

  // ---------------------------------------------------------------
  // 3) กระดาษฉีก: งานเด่นถูกปิดด้วยกระดาษ แล้วฉีกออกตอนเลื่อนมาถึง
  // ---------------------------------------------------------------
  function zigzag() {
    const pts = [];
    let y = 0;
    while (y < 100) {
      pts.push([50 + (Math.random() * 10 - 5), y]);
      y += 6 + Math.random() * 7;
    }
    pts.push([50 + (Math.random() * 10 - 5), 100]);
    const edge = pts.map((p) => p[0].toFixed(1) + "% " + p[1].toFixed(1) + "%");
    return {
      left: "polygon(0 0, " + edge.join(", ") + ", 0 100%)",
      right: "polygon(100% 0, " + edge.join(", ") + ", 100% 100%)",
    };
  }

  function addTear(media, label) {
    const shape = zigzag();
    const cover = document.createElement("div");
    cover.className = "fx-tear";
    cover.setAttribute("aria-hidden", "true");
    ["l", "r"].forEach((side) => {
      const half = document.createElement("i");
      half.className = "fx-tear-" + side;
      half.style.clipPath = side === "l" ? shape.left : shape.right;
      const tag = document.createElement("b");
      tag.textContent = label;
      half.appendChild(tag);
      cover.appendChild(half);
    });
    media.appendChild(cover);

    let done = false;
    const tear = () => {
      if (done) return;
      done = true;
      cover.classList.add("is-tearing");
      once(cover.lastChild, () => cover.remove());
      setTimeout(() => cover.remove(), 1200); // กันพลาด
    };
    cover.addEventListener("click", tear);
    return tear;
  }

  document.querySelectorAll(".feature").forEach((row, i) => {
    const media = row.querySelector(".feature-media");
    const info = row.querySelector(".feature-info");
    const even = i % 2 === 1;
    if (media && io && belowFold(media)) {
      const tear = addTear(media, "SELECTED " + String(i + 1).padStart(2, "0"));
      const obs = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();
          setTimeout(tear, 120);
        },
        { threshold: 0.35 }
      );
      obs.observe(media);
    }
    reveal(info, even ? "left" : "right");
  });

  // ---------------------------------------------------------------
  // ของอื่น ๆ ที่เลื่อนเข้ามา
  // ---------------------------------------------------------------
  document.querySelectorAll(".card").forEach((n) => reveal(n, "up"));
  document.querySelectorAll(".filters .filter").forEach((n, i) => reveal(n, "pop", { delay: i * 40 }));
  document.querySelectorAll(".service").forEach((n) => reveal(n, "up"));
  document.querySelectorAll(".step").forEach((n) => reveal(n, "left"));
  reveal(document.querySelector(".polaroid"), "drop");
  document.querySelectorAll(".about-body > *").forEach((n) => reveal(n, "right"));
  document.querySelectorAll(".contact-links .contact-link").forEach((n) => reveal(n, "left"));

  // 4) เช็กลิสต์ติ๊กทีละข้อ
  const brief = document.querySelector(".brief-card");
  if (brief) {
    const tick = () =>
      brief.querySelectorAll(".brief-list li").forEach((li, i) => setTimeout(() => li.classList.add("is-ticked"), 450 + i * 220));
    reveal(brief, "right", { after: tick });
  }

  // ---------------------------------------------------------------
  // 6) เมาส์พิกเซล (เฉพาะคอมที่ใช้เมาส์)
  // ---------------------------------------------------------------
  const ARROW = [
    "n...........",
    "nn..........",
    "ncn.........",
    "nccn........",
    "ncccn.......",
    "nccccn......",
    "ncccccn.....",
    "nccccccn....",
    "ncccccccn...",
    "nccccnnnnn..",
    "nccnccn.....",
    "ncn.nccn....",
    "nn..nccn....",
    "n....nccn...",
    ".....nccn...",
    "......nn....",
  ];
  function cursorURL(fill) {
    const colors = { n: "#113F59", c: fill };
    let rects = "";
    ARROW.forEach((row, y) =>
      Array.from(row).forEach((ch, x) => {
        if (colors[ch]) rects += "<rect x='" + x + "' y='" + y + "' width='1' height='1' fill='" + colors[ch] + "'/>";
      })
    );
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='32' viewBox='0 0 12 16' shape-rendering='crispEdges'>" + rects + "</svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 1 1';
  }
  if (finePointer) {
    root.style.setProperty("--fx-cursor", cursorURL("#FFFBE0"));
    root.style.setProperty("--fx-cursor-hot", cursorURL("#FFB400"));
    root.classList.add("fx-cursor");
  }

  // ---------------------------------------------------------------
  // 7) พิกเซลแตกกระจายตอนคลิกปุ่ม / ลิงก์ / ผลงาน
  // ---------------------------------------------------------------
  const BURST_COLORS = ["var(--yellow)", "var(--blue)", "var(--ink)", "var(--orange)"];
  document.addEventListener("pointerdown", (e) => {
    if (!e.target.closest("a, button, summary, .card, .feature-media, .service")) return;
    const burst = document.createElement("div");
    burst.className = "fx-burst";
    burst.style.left = e.clientX + "px";
    burst.style.top = e.clientY + "px";
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
      const d = 26 + Math.random() * 18;
      const p = document.createElement("i");
      p.style.setProperty("--dx", Math.round(Math.cos(a) * d) + "px");
      p.style.setProperty("--dy", Math.round(Math.sin(a) * d) + "px");
      p.style.background = BURST_COLORS[i % BURST_COLORS.length];
      burst.appendChild(p);
    }
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 500);
  });

  // ---------------------------------------------------------------
  // 8) สติกเกอร์บน Cover ขยับช้า/เร็วกว่าการเลื่อน (ลื่น ไม่กระตุก)
  // ---------------------------------------------------------------
  const hero = document.querySelector(".hero");
  const stickers = Array.from(document.querySelectorAll(".hero .sticker"));
  if (hero && stickers.length) {
    const speeds = stickers.map((_, i) => [0.35, -0.2, 0.25, -0.3][i % 4]);
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const y = window.scrollY;
          if (y > hero.offsetHeight) return;
          stickers.forEach((s, i) => (s.style.translate = "0 " + Math.round(y * speeds[i]) + "px"));
        });
      },
      { passive: true }
    );
  }
})();
