/* =====================================================================
   ไฟล์นี้คือ "ไฟล์เดียว" ที่คุณต้องแก้ เพื่อเปลี่ยนเนื้อหาในเว็บ
   เว็บเป็นภาษาอังกฤษ: ข้อความที่อยู่ใน "..." ให้เขียนเป็นภาษาอังกฤษ
   ---------------------------------------------------------------------
   กฎง่าย ๆ ตอนแก้ไฟล์นี้
   1. ข้อความต้องอยู่ในเครื่องหมายคำพูด "แบบนี้"
   2. ทุกบรรทัดที่เป็นข้อมูล ต้องปิดท้ายด้วยลูกน้ำ ,
   3. บรรทัดที่ขึ้นต้นด้วย //  คือคำอธิบาย เว็บจะไม่อ่าน แก้หรือลบได้
   4. แก้เสร็จแล้วเปิด index.html ดูก่อน ถ้าหน้าเว็บขาว แปลว่าน่าจะลืม , หรือ "
   ===================================================================== */

window.SITE = {
  name: "Iggy",
  role: "Short-form Video Editor & Creator",
  pageTitle: "Iggy | Short-form Video Editor & Creator",   // ชื่อบนแท็บเบราว์เซอร์และผลค้นหา

  // สโลแกนตัวใหญ่บน Cover (1 ข้อความ = 1 บรรทัด)
  headline: ["PLAN. SHOOT.", "EDIT. POST."],
  tagline: "I make short-form video from idea to feed: planning, on-site shooting, editing and posting for TikTok, Reels and Shorts.",

  // ป้าย "I DO" บน Cover = ขายว่าทำได้หลายอย่าง
  offer: [
    { name: "Short-form editing", sprite: "phone" },
    { name: "On-site shoots", sprite: "camera" },
    { name: "Podcast & long-form", sprite: "mic" },
    { name: "Motion graphics", sprite: "sparkle" },
  ],

  // แบรนด์ที่เคยทำงานด้วย (ขึ้นใต้ปุ่มบน Cover)
  workedWith: ["Garena RoV Thailand"],

  // คลิปในจอทีวีบน Cover — ปล่อยว่าง "" = ใช้งานเด่นชิ้นแรก
  showreel: "",
  reelLabel: "LATEST WORK",

  marquee: ["PLAN", "SHOOT", "EDIT", "POST", "SHORT-FORM", "EVENT CONTENT", "OPEN FOR WORK"],

  /* ---------- หมวดงาน (ตัวกรองผลงาน) ----------
     name       ชื่อหมวด ต้องสะกดตรงกับ categories ของผลงานด้านล่าง
     icon       ไอคอนที่วาดเอง เช่น "icons/short.png" (ปล่อยว่าง = ใช้ไอคอนพิกเซลในตัว)
     iconHover  (ไม่ใส่ก็ได้) ไอคอนตอนเอาเมาส์ชี้ เช่นไฟล์ GIF ที่ขยับได้ "icons/short.gif"
     หมวดที่ยังไม่มีงาน จะถูกซ่อนเอง                                                */
  categories: [
    { name: "Short-form & Social", icon: "", sprite: "phone" },
    { name: "Event & Creator Content", icon: "", sprite: "camera" },
    { name: "Podcast & Long-form", icon: "", sprite: "mic" },
    { name: "Motion & Animation", icon: "", sprite: "sparkle" },
  ],
  // Tag ที่กดกรองได้ด้วย (ต้องสะกดตรงกับ tags ของผลงาน)
  filterTags: [{ name: "Behind the Scenes", sprite: "clapper" }],

  services: [
    {
      title: "Short-form & Social",
      detail: "Vertical edits for TikTok, Reels and Shorts, built to stop the scroll and hold attention.",
      includes: ["Hooks and pacing", "Text overlays and subtitles", "Sound, memes and comic timing", "I can write, voice or script it too"],
    },
    {
      title: "Event & Creator Content",
      detail: "I go to your event, shoot it, edit it and post it. Good for launches, exhibitions and community nights.",
      includes: ["Concept and shot list", "On-site shooting", "Fast edit and posting", "Creator-style storytelling"],
    },
    {
      title: "Podcast & Long-form",
      detail: "Podcasts, interviews, YouTube videos and company video.",
      includes: ["Multicam editing", "Clean, easy-to-listen audio", "Green screen", "Cut-downs into short clips"],
    },
    {
      title: "Motion & Animation",
      detail: "Motion graphics that support a video, or carry it.",
      includes: ["Motion banners", "Animated typography", "Intros, outros and lower thirds"],
    },
  ],

  process: [
    { title: "Send a brief", detail: "Tell me what you need, share videos you like and any footage you have." },
    { title: "Agree on scope and price", detail: "Length, number of clips, revision rounds and deadline, settled before I start." },
    { title: "Edit and revise", detail: "You get a first cut, then revisions within the agreed rounds." },
    { title: "Delivery", detail: "Files ready to post, in the sizes each platform needs." },
  ],

  about:
    "I run the Thai gaming channel \"Iggy Will Play Games\" on TikTok and make short-form video for brands and events. " +
    "Running my own channel taught me what makes people stop scrolling, so every edit starts from the platform and the audience. " +
    "Beyond short-form, I edit podcasts and long-form video, and add motion graphics when a project needs them.",

  experience: [
    { title: "\"Iggy Will Play Games\" (TikTok @iggylengame)", detail: "My own gaming channel. I plan, shoot, edit and post everything myself." },
    { title: "Event and campaign content for RoV Thailand", detail: "On-site event coverage, campaign clips and music video behind-the-scenes, 2025 to 2026." },
  ],

  photo: "",          // รูปตัวเอง เช่น "icons/me.jpg"
  tools: ["Premiere Pro", "After Effects", "CapCut", "Photoshop"],
  languages: ["Thai (native)", "English"],
  resume: "",         // ลิงก์ Resume (ปล่อยว่าง = ไม่แสดงปุ่ม)

  contact: {
    line: "",         // เช่น "https://line.me/ti/p/~yourid"
    email: "you@example.com",
    tiktok: "https://www.tiktok.com/@iggylengame",
    youtube: "",
    facebook: "",
  },
  briefChecklist: ["What kind of video you need", "A few videos you like", "Footage you already have (length and amount)", "Your deadline"],
};

/* =====================================================================
   ผลงาน (WORKS)
   ---------------------------------------------------------------------
   1 ชิ้น = 1 โปรเจกต์ ใส่ได้หลายคลิป (clips) จะมีปุ่ม 1 2 3 ให้สลับดู
   featured: true = ขึ้นในส่วนงานเด่น (3 ชิ้นแรกที่ติด true) · ongoing: true = ซีรีส์ที่ยังทำต่อ
   wip: true = ซ่อนไว้ไม่ขึ้นเว็บ
   clipLabels = ชื่อสั้น ๆ ของแต่ละคลิป เรียงตามลำดับ clips
   details    = เบื้องหลัง (กดกางอ่าน) ช่องที่ไม่มีข้อมูลไม่ต้องใส่
     platform, brief, responsibility, decisions, results + resultsSource, tools, duration, beforeAfter
   ===================================================================== */

window.WORKS = [
  {
    title: "RoV 10th Anniversary Exhibition",
    clips: ["https://www.tiktok.com/@iggylengame/video/7693598745371495700"],
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Gaming", "Event", "Paid Partnership"],
    client: "RoV Thailand",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "A 3-minute event walkthrough, shot on site and cut so a long vertical video keeps moving.",
    featured: true,
    details: {
      platform: "TikTok · vertical · 3:06 · paid partnership",
      responsibility: "Planned the content, shot it at the exhibition, edited it and posted it on my channel.",
    },
  },
  {
    title: "RoV Day 2026 at Siam",
    clips: [
      "https://www.tiktok.com/@iggylengame/video/7658989879522626836",
      "https://www.tiktok.com/@iggylengame/video/7664258469968612629",
    ],
    clipLabels: ["Mystery Box promo: 68 angles of one box", "RoV Day, introvert edition"],
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Gaming", "Event", "Offline Promo"],
    client: "RoV Thailand",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Offline event promo. With only a mystery box to film, I shot it from 68 angles to make a small setup feel big.",
    featured: true,
    details: {
      platform: "TikTok · vertical · 0:39 each · Mystery Box clip is a paid partnership",
      responsibility: "Planned both clips, shot them on site, edited and posted them on my channel.",
    },
  },
  {
    title: "RoV Community Party",
    clips: [
      "https://www.tiktok.com/@iggylengame/video/7597129496097082645",
      "https://www.tiktok.com/@iggylengame/video/7596625148455783701",
      "https://www.tiktok.com/@iggylengame/video/7597141740008508693",
      "https://www.tiktok.com/@iggylengame/video/7596649416795163924",
      "https://www.tiktok.com/@iggylengame/video/7597438483124276500",
    ],
    clipLabels: ["Event recap", "\"No more parties after this?\"", "Every skin in the game vs. iPhone 17", "Ambassador of Valor moment", "LIVE Incentive Program"],
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Gaming", "Event", "Community"],
    client: "RoV Thailand",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Five clips from one community night: the recap, the funny moments and a skins vs. iPhone 17 bit.",
    featured: true,
    details: {
      platform: "TikTok · vertical · 0:25 to 1:32 per clip",
      responsibility: "Planned the angles for each clip, shot everything at the party, edited and posted the series.",
    },
  },
  {
    title: "RoV × Pasulol Songkran Campaign",
    clips: [
      "https://www.tiktok.com/@iggylengame/video/7622302000113700117",
      "https://www.tiktok.com/@iggylengame/video/7625189174424980757",
      "https://www.tiktok.com/@iggylengame/video/7625287795392744724",
      "https://www.tiktok.com/@iggylengame/video/7622321059538144532",
    ],
    clipLabels: ["What should I offer?", "Dressing up for the event", "The ultimate combo", "Too much?"],
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Gaming", "Campaign", "Comedy"],
    client: "RoV Thailand",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Short, joke-led clips that pushed the 4 April in-game Songkran event.",
    details: {
      platform: "TikTok · vertical · 0:12 to 0:36 per clip",
    },
  },
  {
    title: "Behind the Scenes: RoV Songkran Music Video",
    clips: [
      "https://www.tiktok.com/@iggylengame/video/7629455901514124564",
      "https://www.tiktok.com/@iggylengame/video/7489839347240275208",
    ],
    clipLabels: ["2026 music video", "2025: my first music video shoot"],
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Gaming", "Behind the Scenes", "Music Video"],
    client: "Garena RoV Thailand",
    role: ["On-site shoot", "Edit", "Post"],
    highlight: "Two years on set for RoV's Songkran music video, in front of the camera and behind it.",
    ongoing: true,
    details: {
      platform: "TikTok · vertical · 1:11 (2026)",
    },
  },

  // ↓ งานประเภทอื่นที่จะเพิ่มทีหลัง: ลบ // หน้าบรรทัด แล้วเปลี่ยนลิงก์
  // { title: "Company podcast", clips: ["https://www.youtube.com/watch?v=xxxx"], categories: ["Podcast & Long-form"], role: ["Edit", "Sound"], highlight: "..." },
  // { title: "Motion banner", clips: ["https://www.youtube.com/watch?v=xxxx"], categories: ["Motion & Animation"], role: ["Motion"], highlight: "..." },
];
