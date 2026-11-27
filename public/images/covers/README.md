# ปกผลงานที่ทำเอง

วางรูปปกในโฟลเดอร์นี้ **ตั้งชื่อไฟล์ตามตาราง** เว็บจะใช้ปกนี้แทนปกอัตโนมัติทันที ไม่ต้องแก้โค้ด
ถ้ายังไม่มีไฟล์ เว็บใช้ปกอัตโนมัติ (เฟรมจาก TikTok / สไลด์) ตามเดิม

## สเปก

| เรื่อง | ค่า |
|---|---|
| สัดส่วน | **1:1** (สี่เหลี่ยมจัตุรัส) |
| ขนาด | 800 × 800 px |
| นามสกุล | `.jpg` เท่านั้น |
| ขนาดไฟล์ | ไม่เกิน 150 KB |
| ตัวหนังสือบนปก | ไม่ต้องใส่ชื่องาน เพราะเว็บเขียนชื่อไว้ใต้รูปแล้ว |

## วิธีทำปก (ทยอยทำได้)

1. **Canva:** ทำทุกปกในดีไซน์เดียวชื่อ **`Iggy Portfolio Covers`** ขนาด **800 × 800 px** · 1 หน้า = 1 ปก **เรียงหน้ายังไงก็ได้** Claude ดูภาพแล้วจับคู่กับงานให้ (ถ้าไม่แน่ใจจะถาม)
2. **ไกด์มุมไอคอน:** วางไฟล์ [`design/cover-guide-800.png`](../../../design/cover-guide-800.png) ทับเต็มหน้า แล้ว**ซ่อนก่อนส่ง** (ดูข้อห้ามในหัวข้อ "กติกาปก")
3. **ส่ง:** บอก Claude ว่า "ปกหน้า 2–6 เสร็จแล้ว" ไม่ต้องดาวน์โหลดเอง · Claude จดเลขหน้าไว้ในช่อง "หน้า Canva" ด้านล่าง
4. **Claude:** ดึงหน้านั้นจาก Canva → ตั้งชื่อไฟล์ → ย่อให้ไม่เกิน 150 KB → เช็กบนจอคอมและมือถือ → ส่งภาพตัวอย่าง + ลิงก์ preview ใน PR
5. **คุณ:** ดู preview แล้วกด Merge

> ถ้า Canva เชื่อมไม่ได้: Download เป็น JPG แล้วลากไฟล์มาในแชทพร้อมบอกเลขหน้า (ไม่ต้องตั้งชื่อไฟล์เอง)
> ไม่แนะนำอัปโหลดเข้า GitHub เอง: ถ้าชื่อไฟล์ผิดแม้ตัวเดียว เว็บจะไม่เห็นปก และอัปตรงเข้า main จะขึ้นเว็บจริงทันทีโดยไม่มี preview

**ดูว่าปกไหนขึ้นเว็บแล้ว:** เปิดหน้าเช็ก `/2_chkz.html` เลือกตัวกรอง "ยังไม่มีปกทำเอง"

## กติกาปก

| เรื่อง | ทำแบบนี้ |
|---|---|
| มุมขวาบน | ไอคอน ▶ / รูปภาพ + จำนวนบังตรงนี้ · **กรอบแดง** (28% × 20%) บังทุกจอ ห้ามวางข้อความหรือหน้าคน · **กรอบส้ม** (45% × 30%) มือถือบัง เลี่ยงได้ยิ่งดี |
| ขนาดที่คนเห็นจริง | จอคอม 118–164 px · มือถือ 74 px → ข้อความไม่เกิน 2–3 คำใหญ่ ๆ |
| ชื่องาน / ป้ายประเภทงาน | ไม่ต้องใส่ เว็บเขียนชื่อไว้ใต้ภาพแล้ว |
| ขอบ | เก็บของสำคัญไว้ในเส้นประ (ห่างขอบ 5%) |
| เช็กก่อนส่ง | ไม่มีเศษเลเยอร์ค้าง · ซ่อนไกด์แล้ว |

## เช็กลิสต์ปก

Claude อัปเดตตารางนี้ทุกครั้งที่ใส่ปก · ✅ ขึ้นเว็บแล้ว · ⬜ ยังไม่มี · 🙈 งานถูกซ่อน (ไม่ต้องทำปกตอนนี้)

| # | ผลงาน | ชื่อไฟล์ | หน้า Canva | ขึ้นเว็บ |
|---|---|---|---|---|
| 1 | BODY HACK: Work Pain Podcast — EP.1 | `body-hack-work-pain-podcast-ep-1.jpg` | 6 | ✅ |
| 2 | HR Chatbot Launch Animation | `hr-chatbot-launch-animation.jpg` |  | ⬜ |
| 3 | AIS Club Launch: Employer Branding | `ais-club-launch-employer-branding.jpg` |  | ⬜ |
| 4 | RoV Day 2026 at Siam | `rov-day-2026-at-siam.jpg` |  | ⬜ |
| 5 | AI & VFX Edits for AIS | `ai-vfx-edits-for-ais.jpg` |  | ⬜ |
| 6 | JUMP Thailand Hackathon 2026 | `jump-thailand-hackathon-2026.jpg` |  | ⬜ |
| 7 | AIS Wellness: Hack Your Health | `ais-wellness-hack-your-health.jpg` |  | ⬜ |
| 8 | MAKE IT CONTENT Workshop | `make-it-content-workshop.jpg` |  | ⬜ |
| 9 | AIS 36th Anniversary | `ais-36th-anniversary.jpg` |  | ⬜ |
| 10 | RoV 10th Anniversary Exhibition | `rov-10th-anniversary-exhibition.jpg` |  | ⬜ |
| 11 | RoV Community Party | `rov-community-party.jpg` |  | ⬜ |
| 12 | RoV × Pasulol Songkran Campaign | `rov-pasulol-songkran-campaign.jpg` |  | ⬜ |
| 13 | Behind the Scenes: RoV Songkran Music Video | `behind-the-scenes-rov-songkran-music-video.jpg` |  | ⬜ |
| 14 | AIS × 3BB Mascot | `ais-3bb-mascot.jpg` |  | ⬜ |
| 15 | Character Design Proposals | `character-design-proposals.jpg` |  | ⬜ |
| 16 | Sticker Sheets & LINE Stickers | `sticker-sheets-line-stickers.jpg` |  | ⬜ |
| 17 | Internal Comms Infographics | `internal-comms-infographics.jpg` |  | ⬜ |
| 18 | Staff Party TikTok Challenge | `staff-party-tiktok-challenge.jpg` |  | ⬜ |
| 19 | Social Posts for AIS Club | `social-posts-for-ais-club.jpg` |  | ⬜ |
| 20 | Podcast Summary Infographics | `podcast-summary-infographics.jpg` |  | ⬜ |
| 21 | Rebranding: Visual Identity | `rebranding-visual-identity.jpg` |  | ⬜ |
| 22 | Festival E-card | `festival-e-card.jpg` |  | ⬜ |
| 23 | Instagram Filters | `instagram-filters.jpg` |  | 🙈 |
| 24 | NFT Game Characters | `nft-game-characters.jpg` |  | 🙈 |
| 25 | Competition Entries | `competition-entries.jpg` |  | ⬜ |
| 26 | Better Content with Generative AI | `better-content-with-generative-ai.jpg` |  | ⬜ |
| 27 | Internal Podcast (Video Series) | `internal-podcast-video-series.jpg` |  | ⬜ |
| 28 | SB Design Square: Mattress Expo | `sb-design-square-mattress-expo.jpg` |  | ⬜ |
| 29 | Songkran Greeting: Before / After | `songkran-greeting-before-after.jpg` |  | ⬜ |
| 30 | Project VTR | `project-vtr.jpg` |  | 🙈 |
| 31 | AIS × 3BB Mascot Animation | `ais-3bb-mascot-animation.jpg` |  | ⬜ |
| 32 | AIS Sports Day 2024: Team Captains | `ais-sports-day-2024-team-captains.jpg` |  | ⬜ |
| 33 | iCreator Camp Gen 2: SONY Briefs | `icreator-camp-gen-2-sony-briefs.jpg` |  | ⬜ |
| 34 | UGC Reviews: Food & Shopping | `ugc-reviews-food-shopping.jpg` |  | ⬜ |
| 35 | Green Screen: Zero-Budget Movie Scene | `green-screen-zero-budget-movie-scene.jpg` |  | ⬜ |

> ถ้าเปลี่ยนชื่องานใน content.js ชื่อไฟล์ปกก็ต้องเปลี่ยนตาม (ตัวอักษรเล็ก เว้นวรรคเป็น -)
> หรือจะระบุไฟล์เองก็ได้: ใส่ `cover: "images/covers/ชื่อไฟล์.jpg"` ในผลงานนั้น

## ไม่ทำปกใหม่ แต่อยากเลื่อนจุดโฟกัส

ปกอัตโนมัติถูกตัดเป็นสี่เหลี่ยมจากตรงกลาง ถ้าส่วนสำคัญอยู่ด้านบนหรือล่าง ใส่ในผลงานนั้นใน `content.js`:

```js
coverFocus: "top",      // top / bottom / left / right / center
// หรือละเอียดกว่า: coverFocus: "50% 30%"  (แนวนอน แนวตั้ง)
```
