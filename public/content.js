/* =====================================================================
   ไฟล์นี้คือ "ไฟล์เดียว" ที่คุณต้องแก้ เพื่อเปลี่ยนเนื้อหาในเว็บ
   ---------------------------------------------------------------------
   กฎง่าย ๆ ตอนแก้ไฟล์นี้
   1. ข้อความต้องอยู่ในเครื่องหมายคำพูด "แบบนี้"
   2. ทุกบรรทัดที่เป็นข้อมูล ต้องปิดท้ายด้วยลูกน้ำ ,
   3. บรรทัดที่ขึ้นต้นด้วย //  คือคำอธิบาย เว็บจะไม่อ่าน แก้หรือลบได้
   4. แก้เสร็จแล้วเปิด index.html ดูก่อน ถ้าหน้าเว็บขาว แปลว่าน่าจะลืม , หรือ "
   ===================================================================== */

window.SITE = {
  name: "Iggy",
  role: "Video Editor & Motion Designer",
  tagline: "ตัดต่อวิดีโอสั้น เกมเพลย์ และโมชันกราฟิก ให้คนดูอยู่จนจบคลิป",

  // คลิปโชว์รีล (Showreel) ที่จะโชว์ใหญ่ ๆ ด้านบนสุด
  // แนะนำ: รวมงานเด่นยาว 30-90 วินาที อัปไว้ที่ YouTube แบบ "ไม่เป็นสาธารณะ (Unlisted)"
  showreel: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",

  about:
    "สวัสดีครับ ผมอิกกี้ ทำช่องเกม \"อิกกี้จะเล่นเกม\" และรับตัดต่อวิดีโอ " +
    "ถนัดคลิปสั้นแนวตั้งสำหรับ TikTok / Reels / Shorts งานเกมเพลย์ " +
    "และโมชันกราฟิกเล็ก ๆ ที่ทำให้คลิปดูมีชีวิต",

  tools: ["Premiere Pro", "After Effects", "CapCut", "Photoshop"],

  services: [
    { title: "คลิปสั้นแนวตั้ง", detail: "TikTok, Reels, Shorts พร้อม Hook, Text overlay และซับ" },
    { title: "ตัดต่อเกมเพลย์", detail: "ไฮไลต์, มีม, รีแอคชัน, ตัดจากไลฟ์ให้เป็นคลิปสั้น" },
    { title: "โมชันกราฟิก", detail: "โลโก้เคลื่อนไหว, Intro/Outro, Lower third, Overlay ไลฟ์" },
  ],

  contact: {
    email: "you@example.com",   // อีเมลที่ให้ลูกค้าติดต่อ
    line: "",        // เช่น "https://line.me/ti/p/~yourid"  ถ้าไม่มีปล่อยว่าง "" ไว้ ปุ่มจะไม่แสดง
    facebook: "",    // เช่น "https://facebook.com/yourpage"
    tiktok: "",      // เช่น "https://www.tiktok.com/@yourname"
    youtube: "",     // เช่น "https://www.youtube.com/@yourchannel"
  },
};

/* =====================================================================
   ผลงาน (WORKS)
   ---------------------------------------------------------------------
   เพิ่มงาน 1 ชิ้น = ก๊อปบล็อก { ... }, ไปวางต่อแล้วแก้ข้อมูล

   url        ลิงก์คลิป ก๊อปจากแถบที่อยู่เว็บ หรือปุ่ม "แชร์ > คัดลอกลิงก์" ได้เลย
              หรือจะวางโค้ดฝัง <iframe ...> ทั้งก้อนก็ได้ เว็บจะดึงลิงก์ออกมาเอง
   category   หมวดงาน ใช้ทำปุ่มกรอง (ตั้งชื่อเองได้ เช่น "เกม", "โมชัน", "ลูกค้า")
   format     "vertical" = แนวตั้ง 9:16 / "horizontal" = แนวนอน 16:9
              ไม่ใส่ก็ได้ เว็บเดาให้จากลิงก์ (TikTok, Shorts, Reels = แนวตั้ง)
   thumbnail  รูปปกเอง (ไม่ใส่ก็ได้ YouTube จะดึงปกให้อัตโนมัติ)
   featured   true = ขึ้นก่อนงานอื่น

   แพลตฟอร์มที่รองรับ:
   - YouTube   https://www.youtube.com/watch?v=xxxx  หรือ  https://youtube.com/shorts/xxxx
   - TikTok    https://www.tiktok.com/@ชื่อ/video/1234567890123456789
               (ห้ามใช้ลิงก์สั้น vt.tiktok.com ให้เปิดคลิปในเว็บแล้วก๊อปลิงก์เต็มแทน)
   - Facebook  https://www.facebook.com/ชื่อเพจ/videos/123...  หรือ  https://www.facebook.com/reel/123...
   - Instagram https://www.instagram.com/reel/xxxx/
   - Vimeo     https://vimeo.com/123456789
   - Google Drive  https://drive.google.com/file/d/xxxx/view  (ต้องตั้งแชร์ "ทุกคนที่มีลิงก์")
   - ไฟล์ .mp4 ตรง ๆ (เช่น ฝากไว้ใน Cloudflare R2 ภายหลัง)

   ข้อสำคัญ: คลิปต้องเป็น "สาธารณะ" หรือ "ไม่เป็นสาธารณะ (Unlisted)" เท่านั้น
   ถ้าตั้งเป็นส่วนตัว (Private) คนอื่นจะกดเล่นไม่ได้
   ===================================================================== */

window.WORKS = [
  // ↓↓↓ 4 ชิ้นนี้เป็น "ตัวอย่าง" (หนังสั้นสาธารณะของ Blender) ลบแล้วใส่งานจริงของคุณแทน ↓↓↓
  {
    title: "ตัวอย่าง: Showreel แนวนอน",
    url: "https://www.youtube.com/watch?v=eRsGyueVLvQ",
    category: "โมชัน",
    description: "ใส่คำอธิบายสั้น ๆ ว่าทำอะไรในงานนี้ เช่น ตัดต่อ + ทำกราฟิก + ใส่ซับ",
    tools: ["After Effects"],
    client: "ชื่อลูกค้า / ช่อง",
    year: "2026",
    featured: true,
  },
  {
    title: "ตัวอย่าง: คลิปลูกค้า",
    url: "https://www.youtube.com/watch?v=R6MlUcmOul8",
    category: "ลูกค้า",
    description: "ตัดต่อ ปรับสี และทำ title",
    tools: ["Premiere Pro"],
    year: "2026",
  },
  {
    title: "ตัวอย่าง: แอนิเมชันสั้น",
    url: "https://www.youtube.com/watch?v=WhWc3b3KhnY",
    category: "โมชัน",
    description: "งานแอนิเมชัน / Motion graphic",
    tools: ["After Effects"],
    year: "2025",
  },
  {
    title: "ตัวอย่าง: ไฮไลต์เกม",
    url: "https://www.youtube.com/watch?v=PVGeM40dABA",
    category: "เกม",
    description: "ตัดไฮไลต์ + มีม + Text overlay",
    tools: ["CapCut"],
    year: "2025",
  },

  // ↓ ตัวอย่างการใส่คลิปจากแพลตฟอร์มอื่น ลบ // หน้าบรรทัดออกแล้วเปลี่ยนลิงก์เป็นของคุณ
  // { title: "คลิป TikTok", url: "https://www.tiktok.com/@ชื่อ/video/1234567890123456789", category: "เกม" },
  // { title: "Reels Facebook", url: "https://www.facebook.com/reel/1234567890", category: "เกม" },
  // { title: "Reels IG", url: "https://www.instagram.com/reel/ABCdef123/", category: "ลูกค้า" },
];
