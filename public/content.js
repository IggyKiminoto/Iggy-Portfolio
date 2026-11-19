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
    { name: "Key visuals & print", sprite: "star" },
  ],

  // แบรนด์ที่เคยทำงานด้วย (ขึ้นใต้ปุ่มบน Cover)
  workedWith: ["AIS", "Garena RoV Thailand"],

  /* ---------- ทีวีบน Cover: แต่ละช่อง = งาน 1 ประเภท ----------
     label = ชื่อช่อง / clip = ลิงก์คลิป / sprite = ไอคอนพิกเซล
     กรอบทีวีจะปรับตามสัดส่วนคลิปเอง (แนวตั้ง / แนวนอน)
     ถ้าไม่มีช่องเลย จะใช้ showreel หรืองานเด่นชิ้นแรกแทน                          */
  channels: [
    { label: "BRAND", sprite: "clapper", clip: "https://www.tiktok.com/@ais_club/video/7701369408421154068" },
    { label: "CREATOR", sprite: "gamepad", clip: "https://www.tiktok.com/@iggylengame/video/7658989879522626836" },
    { label: "EVENTS", sprite: "camera", clip: "https://www.tiktok.com/@ais_club/video/7683364721118039313" },
    { label: "MOTION", sprite: "sparkle", clip: "https://www.tiktok.com/@ais_club/video/7538425611467902216" },
  ],
  showreel: "",

  marquee: ["PLAN", "SHOOT", "EDIT", "POST", "SHORT-FORM", "EVENT CONTENT", "OPEN FOR WORK"],

  /* ---------- หมวดงาน (ตัวกรองผลงาน) ----------
     name       ชื่อหมวด ต้องสะกดตรงกับ categories ของผลงานด้านล่าง
     icon       ไอคอนที่วาดเอง เช่น "icons/short.png" (ปล่อยว่าง = ใช้ไอคอนพิกเซลในตัว)
     iconHover  (ไม่ใส่ก็ได้) ไอคอนตอนเอาเมาส์ชี้ เช่นไฟล์ GIF ที่ขยับได้ "icons/short.gif"
     หมวดที่ยังไม่มีงาน จะถูกซ่อนเอง                                                */
  categories: [
    { name: "Short-form & Social", icon: "", sprite: "phone" },
    { name: "Brand & Corporate", icon: "", sprite: "clapper" },
    { name: "Event & Creator Content", icon: "", sprite: "camera" },
    { name: "Podcast & Long-form", icon: "", sprite: "mic" },
    { name: "Motion & Animation", icon: "", sprite: "sparkle" },
  ],
  // Tag ที่กดกรองได้ด้วย (ต้องสะกดตรงกับ tags ของผลงาน)
  filterTags: [
    { name: "Gaming", sprite: "gamepad" },
    { name: "AI", sprite: "sparkle" },
    { name: "Behind the Scenes", sprite: "clapper" },
  ],

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
    {
      title: "Key Visuals & Graphics",
      detail: "Set the look of a campaign, then carry it across every format.",
      includes: ["Mood & tone and key visuals", "Social, email and FAQ graphics", "Posters and print artwork", "Motion and video built from the key visual"],
    },
  ],

  process: [
    { title: "Send a brief", detail: "Tell me what you need, share videos you like and any footage you have." },
    { title: "Agree on scope and price", detail: "Length, number of clips, revision rounds and deadline, settled before I start." },
    { title: "Edit and revise", detail: "You get a first cut, then revisions within the agreed rounds." },
    { title: "Delivery", detail: "Files ready to post, in the sizes each platform needs." },
  ],

  about:
    "For 4+ years I've worked in the Creative & Multimedia Design team at AIS, making short-form and podcast video, motion graphics, key visuals and print for internal comms and the employer brand. " +
    "Outside work I make content for gaming brands like RoV and run my own Thai gaming channel, \"Iggy Will Play Games\". " +
    "Running a channel taught me what makes people stop scrolling, so every edit starts from the platform and the audience. " +
    "I can take a video from idea to post: plan it, shoot it, edit it, voice it and add motion graphics or hand-drawn animation when it needs them.",

  // รางวัล / โครงการที่ได้รับคัดเลือก (ขึ้นในส่วน About)
  achievements: [
    { year: "2025", title: "iCreator Camp Gen 2, presented by SONY", detail: "Selected from 600+ applicants into the final 100 creators, and placed Top 5 in the content competition." },
    { year: "2024", title: "Thai Honda Creator Connect Club 2024", detail: "Selected as one of 80 creators for Honda Motorcycle Thailand's creator program." },
  ],

  experience: [
    {
      title: "Creative & Multimedia Design, AIS",
      detail: "Since 2022. Short-form and podcast video, motion graphics, key visuals and print for internal comms, HR and the employer brand.",
      // ไฮไลต์ปี 2026 (จาก Annual Review) — ใช้เฉพาะตัวเลขที่บันทึกไว้
      points: [
        "Turned the internal podcast into a video show and edited and published a 6-episode series, cutting edit time from 1–2 days to about half a day per episode.",
        "Shot and edited event clips to brief in about 2–3 hours each, delivered in time for every social post.",
        "Shot, edited and built a motion banner for a rush job within one week.",
        "Visual lead for an internal creator program: mood & tone, key visual, promo set and launch clip.",
        "Redesigned the employee TikTok challenge into optional missions. Participants, posts and posts per person all went up on the previous round.",
        "Designed and taught a 3-part AI workshop for non-tech employees: briefs, visual prompts and presentation design.",
      ],
    },
    { title: "\"Iggy Will Play Games\" (TikTok @iggylengame)", detail: "My own gaming channel. I plan, shoot, edit and post everything myself." },
    { title: "Event and campaign content for RoV Thailand", detail: "On-site event coverage, campaign clips and music video behind-the-scenes, 2025 to 2026." },
  ],

  photo: "",          // รูปตัวเอง เช่น "icons/me.jpg"
  tools: ["Premiere Pro", "After Effects", "CapCut", "Photoshop"],
  languages: ["Thai (native)", "English"],
  resume: "",         // ลิงก์ Resume (ปล่อยว่าง = ไม่แสดงปุ่ม)

  contact: {
    line: "",         // เช่น "https://line.me/ti/p/~yourid"
    email: "kamonpope.pro@hotmail.com",
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
  // ---------------- งานเด่น (featured) ----------------
  {
    title: "HR Chatbot Launch Animation",
    clips: ["https://www.tiktok.com/@ais_club/video/7538425611467902216"],
    categories: ["Motion & Animation", "Brand & Corporate"],
    tags: ["Hand-drawn Animation", "No AI", "Character"],
    client: "AIS",
    year: "2025",
    role: ["Illustration", "Animation", "Edit"],
    highlight: "Launch film for AIS's new HR chatbot. Every frame drawn and animated by hand, with no AI.",
    featured: true,
    details: {
      platform: "TikTok · vertical",
      responsibility: "Drew, animated and edited the film. The story came from the team and the character design was provided.",
    },
  },
  {
    title: "AIS Club Launch: Employer Branding",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7161622924850367771", label: "My first clip at AIS" },
      { url: "https://www.tiktok.com/@ais_club/video/7173988177990913306", label: "Office Q&A" },
      { url: "https://www.tiktok.com/@ais_club/video/7189203236740533530", label: "IT recruitment call" },
    ],
    categories: ["Brand & Corporate", "Short-form & Social"],
    tags: ["Employer Branding", "Recruitment", "Early Work"],
    client: "AIS Club",
    year: "2022–2023",
    role: ["Concept", "Shoot", "Edit", "Post"],
    highlight: "My first clips at AIS. The launch clip helped grow the page from 1,084 to 3,539 followers (+226%).",
    featured: true,
    details: {
      platform: "TikTok · vertical · 0:14 to 0:45 per clip",
      responsibility: "Came up with the ideas, shot, edited and posted all three clips.",
      results: "Followers grew 226%, from 1,084 to 3,539",
      resultsSource: "AIS Club TikTok follower count after the first clip (Nov 2022)",
    },
  },
  {
    title: "RoV Day 2026 at Siam",
    clips: [
      { url: "https://www.tiktok.com/@iggylengame/video/7658989879522626836", label: "Mystery Box promo: 68 angles of one box" },
      { url: "https://www.tiktok.com/@iggylengame/video/7664258469968612629", label: "RoV Day, introvert edition" },
    ],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Event", "Offline Promo"],
    client: "RoV Thailand",
    year: "2026",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Offline event promo. With only a mystery box to film, I shot it from 68 angles to make a small setup feel big.",
    featured: true,
    details: {
      platform: "TikTok · vertical · 0:39 each · Mystery Box clip is a paid partnership",
      responsibility: "Planned both clips, shot them on site, edited and posted them on my channel.",
    },
  },

  // ---------------- ผลงานเพิ่มเติม ----------------
  {
    title: "AI & VFX Edits for AIS",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7701369408421154068", label: "Apply via LINE OA, with AI effects", role: ["Edit", "AI effects"] },
      { url: "https://www.tiktok.com/@ais_club/video/7481265093930437895", label: "Staff Party 2025: AI outfit swap", role: ["Concept", "Shoot", "Edit", "AI effects", "Post"] },
      { url: "https://www.tiktok.com/@ais_club/video/7638923717929651477", label: "Staff Party 2026: green screen", role: ["Shoot", "Edit", "Green screen"] },
    ],
    categories: ["Brand & Corporate", "Short-form & Social"],
    tags: ["AI", "Green Screen", "VFX"],
    client: "AIS",
    year: "2025–2026",
    highlight: "Real people on camera first, with AI and green screen as the trick that makes people watch again.",
  },
  {
    title: "JUMP Thailand Hackathon 2026",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7676400754101423380", label: "Kick-off: a Saturday of ideas", role: ["Edit"] },
      { url: "https://www.tiktok.com/@ais_club/video/7683364721118039313", label: "What the HACK did you learn?", role: ["Shoot", "Edit", "Voiceover"] },
      { url: "https://www.tiktok.com/@ais_club/video/7685719654207311124", label: "Final pitching", role: ["Edit"] },
      { url: "https://www.tiktok.com/@ais_club/video/7689094466644282645", label: "The volunteer buddies", role: ["Edit", "Voiceover"] },
    ],
    categories: ["Event & Creator Content", "Brand & Corporate"],
    tags: ["Event", "Voiceover", "Series"],
    client: "AIS",
    year: "2026",
    highlight: "Four clips that follow a national student hackathon from kick-off to the final pitch.",
    details: {
      platform: "TikTok · vertical",
      brief: "Social clips timed to each stage of the event: a lessons-learned clip, the final round and the volunteer story.",
      responsibility: "Took the brief, shot and edited each clip ready for social. The overall direction came from the project team.",
      duration: "About 2–3 hours of production per clip, delivered on schedule",
    },
  },
  {
    title: "Life at AIS",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7694612498561207572", label: "MAKE IT CONTENT workshop", role: ["Shoot", "Edit", "Voiceover"] },
      { url: "https://www.tiktok.com/@ais_club/video/7692056564957564181", label: "AIS 36th anniversary", role: ["Edit"] },
      { url: "https://www.tiktok.com/@ais_club/video/7669755196855110919", label: "AIS Wellness: Hack Your Health", role: ["Shoot", "Edit"] },
    ],
    categories: ["Brand & Corporate", "Short-form & Social"],
    tags: ["Employer Branding", "Event"],
    client: "AIS",
    year: "2026",
    highlight: "Workshops, celebrations and wellness tips for the AIS employee channel.",
    details: {
      platform: "TikTok · vertical",
      responsibility: "Workshop and wellness clips: shot and edited, with voiceover on the workshop clip. Anniversary clip: edited, building on a key visual by a designer on the team.",
    },
  },
  {
    title: "RoV 10th Anniversary Exhibition",
    clips: ["https://www.tiktok.com/@iggylengame/video/7693598745371495700"],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Event", "Paid Partnership"],
    client: "RoV Thailand",
    year: "2026",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "A 3-minute event walkthrough, shot on site and cut so a long vertical video keeps moving.",
    details: {
      platform: "TikTok · vertical · 3:06 · paid partnership",
      responsibility: "Planned the content, shot it at the exhibition, edited it and posted it on my channel.",
    },
  },
  {
    title: "RoV Community Party",
    clips: [
      { url: "https://www.tiktok.com/@iggylengame/video/7597129496097082645", label: "Event recap" },
      { url: "https://www.tiktok.com/@iggylengame/video/7596625148455783701", label: "\"No more parties after this?\"" },
      { url: "https://www.tiktok.com/@iggylengame/video/7597141740008508693", label: "Every skin in the game vs. iPhone 17" },
      { url: "https://www.tiktok.com/@iggylengame/video/7596649416795163924", label: "Ambassador of Valor moment" },
      { url: "https://www.tiktok.com/@iggylengame/video/7597438483124276500", label: "Who gets to go?" },
    ],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Event", "Community"],
    client: "RoV Thailand",
    year: "2026",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Five clips from one community night: the recap, the funny moments and a skins vs. iPhone 17 bit.",
    details: {
      platform: "TikTok · vertical · 0:25 to 1:32 per clip",
      responsibility: "Planned the angles for each clip, shot everything at the party, edited and posted the series.",
    },
  },
  {
    title: "RoV × Pasulol Songkran Campaign",
    clips: [
      { url: "https://www.tiktok.com/@iggylengame/video/7622302000113700117", label: "What should I offer?" },
      { url: "https://www.tiktok.com/@iggylengame/video/7625189174424980757", label: "Dressing up for the event" },
      { url: "https://www.tiktok.com/@iggylengame/video/7625287795392744724", label: "The ultimate combo" },
      { url: "https://www.tiktok.com/@iggylengame/video/7622321059538144532", label: "Too much?" },
    ],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Campaign", "Comedy"],
    client: "RoV Thailand",
    year: "2026",
    role: ["Concept", "On-site shoot", "Edit", "Post"],
    highlight: "Short, joke-led clips that pushed the 4 April in-game Songkran event.",
    details: { platform: "TikTok · vertical · 0:12 to 0:36 per clip" },
  },
  {
    title: "Behind the Scenes: RoV Songkran Music Video",
    clips: [
      { url: "https://www.tiktok.com/@iggylengame/video/7629455901514124564", label: "2026 music video" },
      { url: "https://www.tiktok.com/@iggylengame/video/7489839347240275208", label: "2025: my first music video shoot" },
    ],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Behind the Scenes", "Music Video"],
    client: "Garena RoV Thailand",
    year: "2025–2026",
    role: ["On-site shoot", "Edit", "Post"],
    highlight: "Two years on set for RoV's Songkran music video, in front of the camera and behind it.",
    ongoing: true,
    details: { platform: "TikTok · vertical · 1:11 (2026)" },
  },

  // ↓ งานประเภทอื่นที่จะเพิ่มทีหลัง: ลบ // หน้าบรรทัด แล้วเปลี่ยนลิงก์
  // { title: "Company podcast", clips: ["https://www.youtube.com/watch?v=xxxx"], categories: ["Podcast & Long-form"], role: ["Edit", "Sound"], highlight: "..." },
  // คลิปหลายตัวที่หน้าที่ต่างกัน: clips: [{ url: "...", label: "ชื่อคลิป", role: ["Edit", "Voiceover"] }, ...]
];
