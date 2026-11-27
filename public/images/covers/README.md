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

## ชื่อไฟล์ของแต่ละงาน

| ผลงาน | ชื่อไฟล์ |
|---|---|
| BODY HACK: Work Pain Podcast — EP.1 | `body-hack-work-pain-podcast-ep-1.jpg` |
| HR Chatbot Launch Animation | `hr-chatbot-launch-animation.jpg` |
| AIS Club Launch: Employer Branding | `ais-club-launch-employer-branding.jpg` |
| RoV Day 2026 at Siam | `rov-day-2026-at-siam.jpg` |
| AI & VFX Edits for AIS | `ai-vfx-edits-for-ais.jpg` |
| JUMP Thailand Hackathon 2026 | `jump-thailand-hackathon-2026.jpg` |
| AIS Wellness: Hack Your Health | `ais-wellness-hack-your-health.jpg` |
| MAKE IT CONTENT Workshop | `make-it-content-workshop.jpg` |
| AIS 36th Anniversary | `ais-36th-anniversary.jpg` |
| RoV 10th Anniversary Exhibition | `rov-10th-anniversary-exhibition.jpg` |
| RoV Community Party | `rov-community-party.jpg` |
| RoV × Pasulol Songkran Campaign | `rov-pasulol-songkran-campaign.jpg` |
| Behind the Scenes: RoV Songkran Music Video | `behind-the-scenes-rov-songkran-music-video.jpg` |
| AIS × 3BB Mascot | `ais-3bb-mascot.jpg` |
| Character Design Proposals | `character-design-proposals.jpg` |
| Sticker Sheets & LINE Stickers | `sticker-sheets-line-stickers.jpg` |
| Internal Comms Infographics | `internal-comms-infographics.jpg` |
| Staff Party TikTok Challenge | `staff-party-tiktok-challenge.jpg` |
| Social Posts for AIS Club | `social-posts-for-ais-club.jpg` |
| Podcast Summary Infographics | `podcast-summary-infographics.jpg` |
| Rebranding: Visual Identity | `rebranding-visual-identity.jpg` |
| Festival E-card | `festival-e-card.jpg` |
| Instagram Filters | `instagram-filters.jpg` |
| NFT Game Characters | `nft-game-characters.jpg` |
| Competition Entries | `competition-entries.jpg` |
| Better Content with Generative AI | `better-content-with-generative-ai.jpg` |
| Internal Podcast (Video Series) | `internal-podcast-video-series.jpg` |
| SB Design Square: Mattress Expo | `sb-design-square-mattress-expo.jpg` |
| Songkran Greeting: Before / After | `songkran-greeting-before-after.jpg` |
| Project VTR | `project-vtr.jpg` |
| AIS × 3BB Mascot Animation | `ais-3bb-mascot-animation.jpg` |

> ถ้าเปลี่ยนชื่องานใน content.js ชื่อไฟล์ปกก็ต้องเปลี่ยนตาม (ตัวอักษรเล็ก เว้นวรรคเป็น -)
> หรือจะระบุไฟล์เองก็ได้: ใส่ `cover: "images/covers/ชื่อไฟล์.jpg"` ในผลงานนั้น

## ไม่ทำปกใหม่ แต่อยากเลื่อนจุดโฟกัส

ปกอัตโนมัติถูกตัดเป็นสี่เหลี่ยมจากตรงกลาง ถ้าส่วนสำคัญอยู่ด้านบนหรือล่าง ใส่ในผลงานนั้นใน `content.js`:

```js
coverFocus: "top",      // top / bottom / left / right / center
// หรือละเอียดกว่า: coverFocus: "50% 30%"  (แนวนอน แนวตั้ง)
```
