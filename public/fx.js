/* =====================================================================
   ลูกเล่นแอนิเมชัน (FX) — ใช้เฉพาะ "ตอนแสดงผลงาน" และ "ปุ่มสำคัญ" เท่านั้น
   ไม่ขยับตัวหนังสือ เพื่อให้อ่านง่าย ไม่รกตา
   ---------------------------------------------------------------------
   1. กล่องผลงาน (grid) เด้งเข้ามาตอนเลื่อนถึง
   2. โฟลเดอร์บน Cover โผล่เข้ามาตอนเปิดเว็บ (เป็นปุ่มหลักให้กด)
   3. เมาส์พิกเซล (คอมที่ใช้เมาส์)
   ปิดทั้งหมดได้โดยลบ fx.css / fx.js ใน index.html
   ===================================================================== */
(function () {
  "use strict";

  // คนที่ตั้งเครื่องให้ "ลดการเคลื่อนไหว" จะไม่เห็นลูกเล่นเลย เว็บยังใช้งานได้ครบ
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  root.classList.add("fx");

  // ---------------------------------------------------------------
  // 1) กล่องผลงานเด้งเข้ามาตอนเลื่อนถึง (มองเห็นตลอด แค่ขยับตอนเข้าจอ)
  // ---------------------------------------------------------------
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          en.target.style.animationDelay = i++ * 60 + "ms";
          en.target.classList.add("tile-pop");
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".work .tile, .moment, .side-tab").forEach((n) => {
      if (n.getBoundingClientRect().top > window.innerHeight) io.observe(n);
    });
  }

  // ---------------------------------------------------------------
  // 2) โฟลเดอร์บน Cover โผล่ตอนเปิดเว็บ
  // ---------------------------------------------------------------
  document.querySelectorAll(".host-choice").forEach((n, i) => {
    n.style.animationDelay = 200 + i * 90 + "ms";
    n.classList.add("tile-pop");
    n.addEventListener("animationend", () => {
      n.classList.remove("tile-pop");
      n.style.animationDelay = "";
    }, { once: true });
  });

  // ---------------------------------------------------------------
  // 3) เมาส์พิกเซล (เฉพาะคอมที่ใช้เมาส์)
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
})();
