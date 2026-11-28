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

  // หน้าตาการ์ดผลงาน: "overlay" = ชื่องานทับบนรูป (มีแถบไล่สี) / "polaroid" = ชื่องานอยู่ใต้รูป
  cardStyle: "polaroid",
  role: "End-to-End Creator · Design | Production | Animation",
  pageTitle: "Iggy | End-to-End Creator",   // ชื่อบนแท็บเบราว์เซอร์และผลค้นหา

  // สโลแกนตัวใหญ่บน Cover (1 ข้อความ = 1 บรรทัด)
  headline: ["PLAN. SHOOT.", "EDIT. POST."],
  tagline: "I make short-form video from idea to feed: planning, on-site shooting, editing and posting for TikTok, Reels and Shorts.",

  /* ---------- ตัวละครบน Cover ----------
     greeting = คำพูดตอนเปิดเว็บ
     รูปตัวละครอยู่ในโฟลเดอร์ public/character (ดูวิธีตั้งชื่อไฟล์ใน README.md ในโฟลเดอร์นั้น)       */
  host: {
    greeting: "Hi, I'm Iggy! I plan, shoot, edit and post. What would you like to see?",
    hint: "(pick one below ↓)",   // ข้อความเล็ก ๆ ชวนกดปุ่ม
    resetLabel: "Show everything",
  },

  /* ---------- ปุ่มเลือกประเภทงาน (คลิกแล้วสี + ชุดตัวละคร + ทีวี + ผลงาน เปลี่ยนตาม) ----------
     id       ชื่อโฟลเดอร์ชุดตัวละคร เช่น "video" = public/character/video/
     label    ข้อความบนปุ่ม
     line     ตัวละครพูดอะไรหลังกด
     short    ชื่อสั้นบนปุ่มโฟลเดอร์
     desc     คำบรรยายสั้น ๆ ข้างหัวข้อประเภทงานในส่วน WORK
     colors   accent = สีเน้น (ปุ่ม หัวข้อ ไฮไลต์) — พื้นยังเป็นน้ำเงินของเว็บทุกแบบ
              (ใส่ hero: "#xxxxxx" ได้ถ้าอยากเปลี่ยนสีพื้นด้วย)
     filter   หมวดงานที่นับเป็นประเภทนี้ (ดูจากหมวดแรกของแต่ละผลงาน)
     icon     ไอคอนบนปุ่มที่วาดเอง เช่น "character/icons/video.png" (ปล่อยว่าง = ไอคอนพิกเซล)    */
  modes: [
    {
      id: "graphic", label: "Graphic Design", short: "Graphic", sprite: "sparkle", icon: "",
      desc: "Characters, key visuals, infographics, stickers and slides for brands and internal comms.",
      line: "Characters, key visuals, infographics and stickers. Pick one below!",
      colors: { accent: "#FE6D73" },   // Grapefruit
      filter: ["Graphic Design", "Character & Illustration", "Presentation & Teaching"],
    },
    {
      id: "video", label: "Video Editing & Production", short: "Video", sprite: "clapper", icon: "",
      desc: "Short-form, events, podcasts and brand video. I plan, shoot, edit and post.",
      line: "Video it is! From the shot list to the final cut. Here's one I made.",
      colors: { accent: "#FFB400" },   // Sunburst Gold
      filter: ["Short-form & Social", "Brand & Corporate", "Event & Creator Content", "Podcast & Long-form"],
    },
    {
      id: "animation", label: "Animation", short: "Animation", sprite: "play", icon: "",
      desc: "Hand-drawn 2D animation and motion for launches and mascots.",
      line: "Hand-drawn, frame by frame. This one is my favourite.",
      colors: { accent: "#DD88C1" },   // Daisy
      filter: ["Motion & Animation"],
    },
  ],

  // แบรนด์ที่เคยทำงานด้วย (ขึ้นเป็นส่วน WORKED WITH ก่อนส่วนติดต่อ)
  workedWith: ["AIS", "Garena RoV Thailand", "Sale Here", "SB Design Square"],

  /* ---------- โปรเจกต์ส่วนตัว (ส่วน SIDE PROJECTS ช่วงล่างของเว็บ) ----------
     เพิ่มโฟลเดอร์ใหม่ = ก๊อปบล็อก { id, label, ... } ไปวางต่อ แล้วตั้งสี color
     stats  ตัวเลขเด่น (ใส่ asOf = วันที่เก็บข้อมูลเสมอ)
     items  รายการ กดแล้วเปิดลิงก์ในแท็บใหม่
     รูปที่โผล่จากโฟลเดอร์: images/peek/<id>-1.jpg ถึง -3.jpg                      */
  sideProjects: [
    {
      id: "smilenoout", label: "Smilenoout", sprite: "heart", color: "#24E5D2",
      intro: "My hand-drawn quote and doodle page. I write, draw, edit and post everything myself.",
      asOf: "Nov 2026",
      stats: [
        { value: "252K", label: "Instagram followers" },
        { value: "4,249", label: "Instagram posts" },
        { value: "623.8K", label: "TikTok likes" },
        { value: "2M", label: "views on the top TikTok clip" },
      ],
      items: [
        { title: "Instagram @smilenoout", meta: "252K followers", url: "https://www.instagram.com/smilenoout" },
        { title: "TikTok @smilenoout_official", meta: "13K followers · 623.8K likes", url: "https://www.tiktok.com/@smilenoout_official" },
      ],
    },
    {
      id: "fonts", label: "Fonts", sprite: "star", color: "#FFCB77",
      intro: "Handwritten Thai + English fonts I designed, free to download.",
      items: [
        { title: "Smilenoout DEUX", meta: "Handwritten Thai + English · signature font", url: "https://smilenoout.gumroad.com/l/SmilenooutDuex" },
        { title: "Say So", meta: "Cartoon-outline handwriting, two layers · Thai + English", url: "https://smilenoout.gumroad.com/l/sjnrjd" },
        { title: "Iggy Hand", meta: "Handwritten Thai + English", url: "https://smilenoout.gumroad.com/l/cpfbpf" },
      ],
    },
    {
      id: "freebies", label: "Freebies", sprite: "sparkle", color: "#407ADD",
      intro: "Free tools and templates for other creators.",
      items: [
        { title: "Smilenoout Procreate Brush Set", meta: "Procreate brushes", url: "https://smilenoout.gumroad.com/l/smilenooutbrush" },
        { title: "Minecraft GUI Canvas Presets", meta: "Presets for Aseprite", url: "https://smilenoout.gumroad.com/l/mcgui" },
        { title: "Goals Challenge Planner", meta: "Printable / digital planner", url: "https://smilenoout.gumroad.com/l/goalsplanner" },
        { title: "Digital Memo High School Set", meta: "Digital note paper", url: "https://smilenoout.gumroad.com/l/highschoolmemo" },
      ],
    },
    {
      id: "personal", label: "Personal", sprite: "phone", color: "#DD88C1",
      intro: "My personal account, where I test formats and talk to camera.",
      asOf: "",   // TODO: ใส่ช่วงเวลาที่เก็บตัวเลข เช่น "2025" (ตัวเลขมาจากพอร์ต Canva เก่า)
      stats: [
        { value: "880K+", label: "reach" },
        { value: "1.2M", label: "views on the top clip" },
      ],
      items: [
        { title: "Instagram @ikkyoxd", meta: "Personal account", url: "https://www.instagram.com/ikkyoxd" },
      ],
    },
    // TODO: พอร์ตเก่ามีตัวเลข Smilenoout เพิ่ม (3.7M+ reach, 2.4M+ reach, 3.5M+ views) แต่ไม่มีวันที่
    //       ถ้ารู้ช่วงเวลา ค่อยเพิ่มใน stats ของโฟลเดอร์ smilenoout
  ],

  /* ---------- หมวดงานย่อย ----------
     name       ชื่อหมวด ต้องสะกดตรงกับ categories ของผลงานด้านล่าง
                หมวดแรกของผลงาน ใช้ตัดสินว่างานไปอยู่โฟลเดอร์ไหน (ดู filter ใน modes)
     icon       ไอคอนที่วาดเอง เช่น "icons/short.png" (ปล่อยว่าง = ใช้ไอคอนพิกเซลในตัว)
     iconHover  (ไม่ใส่ก็ได้) ไอคอนตอนเอาเมาส์ชี้ เช่นไฟล์ GIF ที่ขยับได้ "icons/short.gif"
     sprite     ไอคอนพิกเซลในตัว (ใช้กับหัวการ์ดบริการ)                               */
  categories: [
    { name: "Graphic Design", icon: "", sprite: "sparkle" },
    { name: "Character & Illustration", icon: "", sprite: "heart" },
    { name: "Presentation & Teaching", icon: "", sprite: "star" },
    { name: "Short-form & Social", icon: "", sprite: "phone" },
    { name: "Brand & Corporate", icon: "", sprite: "clapper" },
    { name: "Event & Creator Content", icon: "", sprite: "camera" },
    { name: "Podcast & Long-form", icon: "", sprite: "mic" },
    { name: "Motion & Animation", icon: "", sprite: "sparkle" },
  ],

  marquee: ["PLAN", "SHOOT", "EDIT", "POST", "SHORT-FORM", "EVENT CONTENT", "OPEN FOR WORK"],

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
    { title: "Event and campaign content for Garena RoV Thailand", detail: "On-site event coverage, campaign clips and music video behind-the-scenes, 2025 to 2026." },
  ],

  /* ---------- รูป (อัปโหลดเองจากมือถือได้) ----------
     รูปโปรไฟล์: อัปไฟล์ชื่อ profile.jpg ไว้ในโฟลเดอร์ public/images  เว็บจะใช้เอง
     รูปกิจกรรม: อัปไฟล์ชื่อ about-1.jpg, about-2.jpg ... (สูงสุด 12 รูป) ในโฟลเดอร์เดียวกัน
     ไม่ต้องแก้ไฟล์นี้ ถ้าไม่อยากใส่คำบรรยายรูป                                          */
  photo: "",          // ปล่อยว่าง = ใช้ images/profile.jpg อัตโนมัติ
  // คำบรรยายใต้รูปกิจกรรม (ใส่เฉพาะรูปที่อยากมีคำบรรยาย) เช่น 1: "iCreator Camp 2025"
  galleryCaptions: {
    // 1: "iCreator Camp Gen 2, 2025",
  },
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
  // ผลงานล่าสุด: อยู่บนสุด + featured = ขึ้นช่องแรกในโฟลเดอร์ Video
  {
    title: "BODY HACK: Work Pain Podcast — EP.1",
    clips: ["https://www.youtube.com/watch?v=712x-5HYMkE"],
    // ปกสำรอง = Thumbnail ของคลิปบน YouTube (ไม่มีแถบดำ) · ปกทำเอง: images/covers/body-hack-work-pain-podcast-ep-1.jpg
    thumbnail: "images/thumbs/yt-712x-5HYMkE.jpg",
    categories: ["Podcast & Long-form", "Brand & Corporate"],
    tags: ["Video Podcast", "Wellness", "Multicam", "AI Illustration"],
    client: "AIS",
    year: "2026",
    role: ["Camera setup", "2-camera edit", "Color", "Subtitles", "Dialogue cleanup", "AI illustrations", "On-screen graphics & motion", "Thumbnail & banner"],
    highlight: "I handled camera setup and post-production for the first episode of AIS's Work Pain Podcast, a wellness video series for office workers.",
    featured: true,
    details: {
      platform: "YouTube · horizontal · video podcast",
      brief: "EP.1 \"นั่งติดจอทั้งวัน ไม่อยากปวดคอ บ่า ไหล่ ทำไงดี\" (in Thai)",   // ชื่อตอนตามคลิปบน YouTube
      responsibility: "I edited the two-camera footage, cleaned up dialogue, created AI-assisted illustrations and on-screen graphics, and designed the YouTube thumbnail and accompanying banner.",
      tools: ["Adobe Podcast"],
    },
  },
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
      { url: "https://www.tiktok.com/@iggylengame/video/7657973131671293204", label: "Teaser: an AI shot drops the box from the sky", role: ["AI image-to-video"] },
    ],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Event", "Offline Promo"],
    client: "Garena RoV Thailand",
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
    title: "AIS Wellness: Hack Your Health",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7669755196855110919", label: "Program teaser", role: ["Shot list", "Shoot", "Edit", "Sound", "Text & effects"] },
    ],
    categories: ["Brand & Corporate", "Short-form & Social"],
    tags: ["Key Visual", "Teaser", "Wellness"],
    client: "AIS",
    year: "2026",
    role: ["Key visual"],
    highlight: "I designed the key visual used across the whole wellness program, then shot and edited its teaser.",
    details: {
      platform: "TikTok · vertical",
      brief: "An employee wellness program run by the engagement team.",
      responsibility: "Designed the main key visual the team used throughout the program. For the teaser, the story came from the team; I planned the shot list, shot it and edited it, including sound, text and effects.",
    },
  },
  {
    title: "MAKE IT CONTENT Workshop",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7694612498561207572", label: "Workshop recap", role: ["Shoot", "Edit", "Voiceover"] },
    ],
    categories: ["Brand & Corporate", "Short-form & Social"],
    tags: ["Key Visual", "Recap", "Event"],
    client: "AIS",
    year: "2026",
    role: ["Key visual"],
    highlight: "Key visual for the employee comms, then a recap clip of the workshop day.",
    details: {
      platform: "TikTok · vertical",
      responsibility: "Designed the main key visual for the workshop's employee comms; its look was carried into the rest of the campaign. Shot, edited and voiced the recap clip. I was not the workshop owner.",
    },
  },
  {
    title: "AIS 36th Anniversary",
    clips: [
      { url: "https://www.tiktok.com/@ais_club/video/7692056564957564181", label: "Anniversary recap", role: ["Edit"] },
    ],
    categories: ["Brand & Corporate", "Event & Creator Content"],
    tags: ["Event", "Recap"],
    client: "AIS",
    year: "2026",
    highlight: "Anniversary recap edited to match the event's key visual.",
    details: {
      platform: "TikTok · vertical",
      responsibility: "Edited the recap, building on a key visual by a designer on the team.",
    },
  },
  {
    title: "RoV 10th Anniversary Exhibition",
    clips: ["https://www.tiktok.com/@iggylengame/video/7693598745371495700"],
    categories: ["Event & Creator Content", "Short-form & Social"],
    tags: ["Gaming", "Event", "Paid Partnership"],
    client: "Garena RoV Thailand",
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
    client: "Garena RoV Thailand",
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
    client: "Garena RoV Thailand",
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

  {
    title: "SB Design Square: Mattress Expo",
    // คลิปจากเพจ Mattress World (เพจที่นอนของ SB Design Square) · format = รูปทรงคลิป (เว็บเดาจากลิงก์ไม่ได้)
    clips: [
      { url: "https://www.facebook.com/reel/1368411784467787", label: "Mattress Expo: more deals than ever", format: "horizontal", role: ["Concept", "Shoot", "Voiceover", "Edit"] },
      { url: "https://www.instagram.com/reel/DF47eIpPx4c/", label: "The first job: a good mattress is self-care (my Instagram)", role: [] },   // TODO: หน้าที่ในงานแรก
      { url: "https://www.facebook.com/SBMattressWorld/videos/3974091859510343/", label: "Home and mattress deals in one trip", format: "vertical", role: ["Concept", "Shoot", "Voiceover", "Edit"] },
      { url: "https://www.facebook.com/SBMattressWorld/videos/1226994228963363/", label: "Everything in one place (bonus clip)", format: "vertical", role: ["Concept", "Shoot", "Voiceover", "Edit"] },
    ],
    images: [{ src: "images/work/video-sb-design-square.jpg" }],   // ใช้เป็นปกสำรองจนกว่าจะมีปกทำเอง
    categories: ["Short-form & Social"],
    tags: ["UGC", "Review", "Product", "Voiceover"],
    client: "SB Design Square",
    year: "2025",
    highlight: "UGC-style promo clips for SB Design Square's Mattress Expo sale. My first clip for them led to three more jobs.",
    details: {
      platform: "Instagram and Facebook (Mattress World page) · 0:25 to 0:47 per clip",
      responsibility: "Came up with the ideas, shot, voiced and edited the three Mattress World clips myself.",
      results: "Repeat client: three more jobs followed the first clip",
      resultsSource: "My project history with SB Design Square, 2025",
    },
  },
  {
    title: "AIS Sports Day 2024: Team Captains",
    clips: ["https://www.facebook.com/reel/870470888570657"],
    thumbnail: "images/thumbs/fb-870470888570657.jpg",   // ปกจาก Facebook (Facebook ไม่มีปกอัตโนมัติ)
    categories: ["Brand & Corporate", "Event & Creator Content", "Short-form & Social"],
    tags: ["Event", "Teaser", "Facebook Reels"],
    client: "AIS Club",
    year: "2024",
    role: ["Edit", "Story structure", "Sound design", "VFX", "Mood & tone"],
    highlight: "Pre-event teaser for AIS Sports Day 2024: how ready each colour team's captain is before the big day.",
    details: {
      platform: "Facebook Reels · vertical · 1:07",
      responsibility: "Edit only: I structured the story, built the sound, added the VFX and set the mood and tone.",
    },
  },

  {
    title: "iCreator Camp Gen 2: SONY Briefs",
    clips: [
      { url: "https://www.instagram.com/reel/DJIZD18zAYo/", label: "No More Burnout: One-room cut-on-action edit" },
      { url: "https://www.instagram.com/reel/DJu9Cd9z8Fm/", label: "SONY ZV-E10 II review" },
    ],
    thumbnail: "images/thumbs/ig-DJu9Cd9z8Fm.jpg",
    categories: ["Short-form & Social", "Event & Creator Content"],
    tags: ["Creator Program", "Product Review", "Cut on Action"],
    client: "iCreator Camp Gen 2 × SONY",
    year: "2025",
    role: [],   // TODO: หน้าที่ (คิด / ถ่าย / ตัด / พากย์?)
    highlight: "Two creator assignments: a one-room short that builds momentum with cut-on-action editing, and a story-led SONY ZV-E10 II review.",
    details: {
      platform: "Instagram Reels · vertical",
      results: "Placed 5th overall at iCreator Camp Gen 2, based on both assignments.",
      resultsSource: "iCreator Camp Gen 2, presented by SONY, 2025",
    },
  },
  {
    title: "UGC Reviews: Food & Shopping",
    clips: [
      { url: "https://www.instagram.com/reel/DFE5inbvAk_/", label: "Index Living Mall haul (barter via Sale Here)" },
      { url: "https://www.instagram.com/reel/DHSbKQOPv_5/", label: "Jungle Juice flower smoothies (barter via Sale Here)" },
      { url: "https://www.instagram.com/reel/DEh_RnLygUq/", label: "Gyoza review (barter)" },
      { url: "https://www.instagram.com/reel/CySKFP3yZSY/", label: "Steak spot in Ari (self-initiated)" },
    ],
    thumbnail: "images/thumbs/ig-DFE5inbvAk_.jpg",
    categories: ["Short-form & Social"],
    tags: ["UGC", "Review", "Barter", "Food"],
    client: "Barter collabs and my own reviews",
    year: "2023–2025",
    role: [],   // TODO: หน้าที่ (คิด / ถ่าย / ตัด / พากย์?)
    highlight: "Review reels on my Instagram: barter collabs with brands and places I wanted to share myself.",
    details: { platform: "Instagram Reels (@ikkyoxd) · vertical" },
  },
  {
    title: "Green Screen: Zero-Budget Movie Scene",
    clips: ["https://www.tiktok.com/@ikkyoxd/video/7616574995463982357"],
    categories: ["Short-form & Social", "Motion & Animation"],
    tags: ["Green Screen", "VFX", "Cinematic", "Personal"],
    client: "Personal project",
    year: "2026",
    role: [],   // TODO: หน้าที่ (คิด / ถ่าย / ตัด?)
    highlight: "A film-style scene shot against a green screen for zero budget, with the before and after side by side.",
    details: { platform: "TikTok (@ikkyoxd) · vertical" },
  },

  // ================= งานจากพอร์ต Canva เก่า (รูปอยู่ใน public/images/work) =================
  // ช่องที่เขียน TODO = ยังไม่มีข้อมูล เติมทีหลังได้ / ถ้าได้ลิงก์คลิป ใส่ใน clips: ["..."] แล้วรูปจะถูกแทนด้วยคลิป

  // ---------- Graphic ----------
  {
    title: "AIS × 3BB Mascot",
    images: [
      { src: "images/work/char-ais3bb-1.jpg", caption: "From sketch to final character" },
      { src: "images/work/char-ais3bb-2.jpg", caption: "Standee and bag tag at the Mini Town Hall" },
    ],
    categories: ["Character & Illustration", "Brand & Corporate"],
    tags: ["Character", "Mascot", "Merchandise"],
    client: "AIS",
    year: "",   // TODO
    role: ["Concept", "Character design", "Illustration"],
    highlight: "A mascot for the AIS and 3BB merger, taken from first idea to animation, decorations and merchandise.",
    details: { tools: ["Procreate", "Adobe Illustrator"] },
  },
  {
    title: "Character Design Proposals",
    images: [
      { src: "images/work/char-proposal-1.jpg", caption: "Proposal sketches" },
      { src: "images/work/char-proposal-2.jpg", caption: "Three directions, each tied to a brand value" },
      { src: "images/work/char-proposal-3.jpg", caption: "From proposal to final" },
      { src: "images/work/char-proposal-4.jpg", caption: "More sketch ideas" },
    ],
    categories: ["Character & Illustration"],
    tags: ["Character", "Proposal"],
    client: "OAZisCare",
    role: ["Concept", "Character design"],
    highlight: "Characters designed to match a brand's core concept and goals, from sketch to final.",
    details: { tools: ["Procreate", "Adobe Photoshop", "Adobe Illustrator"] },
  },
  {
    title: "Sticker Sheets & LINE Stickers",
    images: [
      { src: "images/work/illus-stickers-1.jpg" },
      { src: "images/work/illus-stickers-2.jpg" },
      { src: "images/work/illus-stickers-3.jpg" },
      { src: "images/work/illus-stickers-4.jpg" },
      { src: "images/work/illus-stickers-5.jpg" },
      { src: "images/work/illus-line-sticker.jpg", caption: "LINE sticker set" },
      { src: "images/work/illus-brand-collab.jpg", caption: "Brand collaboration" },
    ],
    categories: ["Character & Illustration"],
    tags: ["Illustration", "Stickers", "LINE"],
    client: "",   // TODO: ชื่อแบรนด์ (ในรูปมี IG: Bliszart)
    role: ["Illustration", "Design"],
    highlight: "Die-cut PVC sticker sheets, a LINE sticker set and a brand collaboration.",
    details: { tools: ["Procreate", "Adobe Photoshop"] },
  },
  {
    title: "Internal Comms Infographics",
    images: [
      { src: "images/work/gfx-infographic-1.jpg", caption: "Internal communication" },
      { src: "images/work/gfx-infographic-2.jpg", caption: "Internal event" },
      { src: "images/work/gfx-infographic-3.jpg", caption: "Internal activity" },
      { src: "images/work/gfx-infographic-4.jpg", caption: "Internal activity" },
      { src: "images/work/gfx-infographic-5.jpg", caption: "Internal activity" },
    ],
    categories: ["Graphic Design", "Brand & Corporate"],
    tags: ["Infographic", "Internal Comms"],
    client: "AIS",
    role: ["Design"],
    highlight: "Infographics that make safety tips, benefits and staff events easy to read at a glance.",
    details: { tools: ["Canva", "Adobe Photoshop"] },
  },
  {
    title: "Staff Party TikTok Challenge",
    images: [{ src: "images/work/gfx-tiktok-challenge.jpg" }],
    categories: ["Graphic Design", "Brand & Corporate"],
    tags: ["Campaign", "TikTok", "Engagement"],
    client: "AIS",
    year: "2026",
    role: ["Concept", "Design"],
    highlight: "Turned the staff TikTok contest into optional missions so more people joined in.",
    details: {
      results: "697 videos under #aisstaffparty2026 and 594 under #ม่วนฟันมันส์แฟร์",
      resultsSource: "TikTok hashtag counts shown in my portfolio deck",   // TODO: วันที่เก็บข้อมูล
    },
  },
  {
    title: "Social Posts for AIS Club",
    images: [
      { src: "images/work/gfx-social-posts-1.jpg", caption: "Activity recap and executive quotes" },
      { src: "images/work/gfx-social-posts-2.jpg", caption: "Staff party recap and Songkran event" },
    ],
    links: [
      { label: "Activity recap", url: "https://www.facebook.com/share/p/1DseW6jCqz/" },
      { label: "Executive's quotes", url: "https://www.facebook.com/share/p/1BJoRyqCSD/" },
      { label: "Staff party recap", url: "https://www.facebook.com/share/p/1R8phXSvxq/" },
      { label: "Songkran event", url: "https://www.facebook.com/share/p/17a1dhpMTq/" },
    ],
    categories: ["Graphic Design", "Brand & Corporate"],
    tags: ["Social Media", "Facebook"],
    client: "AIS Club",
    role: ["Design"],
    highlight: "Facebook post sets for event recaps, executive quotes and staff activities.",
  },
  {
    title: "Podcast Summary Infographics",
    images: [
      { src: "images/work/gfx-podcast-summary-1.jpg" },
      { src: "images/work/gfx-podcast-summary-2.jpg" },
    ],
    categories: ["Graphic Design"],
    tags: ["Infographic", "Podcast"],
    client: "AIS",
    role: ["Design"],
    highlight: "Episode takeaways turned into shareable infographics.",
    details: { tools: ["Canva", "Adobe Photoshop"] },
  },
  {
    title: "Rebranding: Visual Identity",
    images: [{ src: "images/work/gfx-rebranding.jpg", caption: "Before and after" }],
    categories: ["Graphic Design"],
    tags: ["Branding"],
    client: "Chem by Jaejo",
    links: [{ label: "Instagram @chem.by.jaejo", url: "https://www.instagram.com/chem.by.jaejo/" }],
    role: ["Design"],
    highlight: "A rebrand for a more consistent visual identity and brand presence.",
    details: { tools: ["Canva", "Adobe Photoshop", "Procreate"] },
  },
  {
    title: "Festival E-card",
    images: [{ src: "images/work/gfx-ecard-songkran.jpg" }],
    categories: ["Graphic Design", "Brand & Corporate"],
    tags: ["E-card", "Songkran"],
    client: "AIS",
    role: ["Design"],
    highlight: "Songkran e-card from the executives, sent by internal email.",
    details: { tools: ["Adobe Photoshop", "Canva"] },
  },
  {
    title: "Instagram Filters",
    wip: true,   // ซ่อน: Instagram ปิดระบบฟิลเตอร์ของครีเอเตอร์แล้ว ลองใช้ไม่ได้ · มีคลิปอัดหน้าจอตอนใช้ฟิลเตอร์ค่อยเปิดใหม่
    images: [{ src: "images/work/gfx-ig-filters.jpg" }],
    categories: ["Graphic Design"],
    tags: ["AR", "Instagram"],
    client: "",   // TODO
    role: ["Design"],
    highlight: "A set of Instagram face filters.",
    // links: [{ label: "Try the filters", url: "TODO" }],
  },
  {
    title: "NFT Game Characters",
    wip: true,   // ซ่อน: เจ้าของบอกให้เอาออก (งานไม่ได้ไปต่อ)
    images: [{ src: "images/work/char-nft.jpg" }],
    categories: ["Character & Illustration"],
    tags: ["Character", "Game"],
    client: "",   // TODO
    role: ["Character design", "Illustration"],
    highlight: "Character art for an NFT game.",
  },
  {
    title: "Competition Entries",
    images: [
      { src: "images/work/gfx-comp-fastwork.jpg", caption: "#FastChallenge by Fastwork" },
      { src: "images/work/gfx-comp-australian-embassy.jpg", caption: "Australian Embassy's 2023 Rabbit Card Competition" },
    ],
    categories: ["Character & Illustration"],
    tags: ["Competition"],
    role: ["Illustration"],
    highlight: "Entries for Fastwork's #FastChallenge and the Australian Embassy's 2023 Rabbit Card Competition.",
    details: { tools: ["Procreate", "Adobe Photoshop"] },
  },
  {
    title: "Better Content with Generative AI",
    images: [
      { src: "images/work/ld-ai-class-1.jpg", caption: "Don't tell AI everything" },
      { src: "images/work/ld-ai-class-2.jpg", caption: "Class 1: AI as a thinking partner" },
      { src: "images/work/ld-ai-class-3.jpg", caption: "Class 2: AI as a reflection tool" },
      { src: "images/work/ld-ai-class-4.jpg", caption: "Writing an action plan with AI" },
    ],
    categories: ["Presentation & Teaching", "Brand & Corporate"],
    tags: ["AI", "Workshop"],
    client: "AIS",
    year: "2026",
    role: ["Concept", "Slide design", "Teaching"],
    highlight: "Workshops that teach non-tech staff to use AI as a thinking partner, not a replacement.",
  },

  // ---------- Video (มีแต่รูปก่อน รอลิงก์คลิป) ----------
  {
    title: "Internal Podcast (Video Series)",
    clips: [],   // TODO: ลิงก์ตอนที่เปิดเผยได้
    images: [
      { src: "images/work/video-podcast-1.jpg" },
      { src: "images/work/video-podcast-2.jpg" },
    ],
    categories: ["Podcast & Long-form", "Brand & Corporate"],
    tags: ["Podcast", "Multicam", "Green Screen"],
    client: "AIS",
    year: "2026",
    role: ["Content writing", "Design", "Shoot", "Edit", "Publish"],
    highlight: "Turned an internal podcast into a video show and published a 6-episode series.",
    details: {
      responsibility: "Edited and published all 6 episodes, shot some of them, and designed the graphics.",
      duration: "Edit time went from about 1–2 days to about half a day per episode",
    },
  },
  {
    title: "Songkran Greeting: Before / After",
    clips: [
      { url: "https://www.facebook.com/reel/1726035329111426", label: "2026: retouched executives, opened with an AI shot", format: "horizontal", role: ["Photo retouch (Photoshop + AI)", "AI opening shot", "Motion graphics", "Edit"] },
      { url: "https://www.facebook.com/reel/1379832099821431", label: "2025: simple motion graphics made in Canva", format: "vertical", role: ["Motion graphics (Canva)"] },
    ],
    images: [{ src: "images/work/video-songkran-ecard-before-after.jpg" }],
    categories: ["Short-form & Social", "Brand & Corporate"],
    tags: ["Before / After", "Songkran"],
    client: "AIS",
    year: "2025–2026",
    highlight: "Songkran greetings from the executives to all staff: their photos retouched into Songkran shirts, then animated with a greeting.",
    details: { platform: "Facebook Reels · AIS Club page" },
  },
  {
    title: "Project VTR",
    wip: true,   // ซ่อน: เป็นงานอีเวนต์ภายใน ยังไม่แน่ใจว่าแชร์คลิปได้
    clips: [],   // TODO
    images: [{ src: "images/work/video-project-vtr.jpg" }],
    categories: ["Brand & Corporate"],
    tags: ["VTR"],
    client: "",   // TODO
    role: [],   // TODO
    highlight: "",   // TODO
  },

  // ---------- Animation ----------
  {
    title: "AIS × 3BB Mascot Animation",
    clips: [],   // วิดีโออยู่ใน Microsoft Sway (ฝังตรง ๆ ไม่สวย) ถ้าอัปขึ้น YouTube แบบไม่เป็นสาธารณะ ใส่ลิงก์ตรงนี้ได้เลย
    links: [{ label: "Watch on Microsoft Sway", url: "https://sway.cloud.microsoft/jgscij4XgmxJVDFh?ref=Link" }],
    images: [
      { src: "images/work/anim-ais3bb-1.jpg" },
      { src: "images/work/anim-ais3bb-2.jpg" },
    ],
    categories: ["Motion & Animation", "Brand & Corporate"],
    tags: ["2D Animation", "Character"],
    client: "AIS",
    role: ["Character design", "Animation"],
    highlight: "2D animation starring the AIS × 3BB mascots.",
  },

  // ↓ งานประเภทอื่นที่จะเพิ่มทีหลัง: ลบ // หน้าบรรทัด แล้วเปลี่ยนลิงก์
  // { title: "Company podcast", clips: ["https://www.youtube.com/watch?v=xxxx"], categories: ["Podcast & Long-form"], role: ["Edit", "Sound"], highlight: "..." },
  // คลิปหลายตัวที่หน้าที่ต่างกัน: clips: [{ url: "...", label: "ชื่อคลิป", role: ["Edit", "Voiceover"] }, ...]
];
