// ─────────────────────────────────────────────────────────────────
// translations.ts — All UI strings (Thai / English)
// Add new keys here. Never hardcode text in JSX.
// ─────────────────────────────────────────────────────────────────

export type Lang = "th" | "en";

export const translations: Record<string, Record<Lang, string>> = {
  // ── Navbar ──────────────────────────────────────────────────────
  nav_about: { th: "เกี่ยวกับ", en: "About" },
  nav_projects: { th: "ผลงาน", en: "Projects" },
  nav_links: { th: "ลิงก์", en: "Links" },
  nav_contact: { th: "ติดต่อ", en: "Contact" },

  // ── Hero ────────────────────────────────────────────────────────
  hero_greeting: { th: "สวัสดีครับ ผม", en: "Hi, I'm" },
  hero_name: { th: "Devakorn", en: "Devakorn" },
  hero_role: {
    th: "นักพัฒนาเว็บ & นักออกแบบกราฟิก",
    en: "Web Developer & Graphic Designer",
  },
  hero_cta: { th: "ดูผลงาน", en: "View Portfolio" },
  hero_location: { th: "ลำพูน, ประเทศไทย", en: "Lamphun, Thailand" },

  // ── About ───────────────────────────────────────────────────────
  about_title: { th: "เกี่ยวกับผม", en: "About Me" },
  about_bio: {
    th: "Web Developer และ Graphic Designer ที่มุ่งมั่นสร้างผลงานดิจิทัลที่ใช้งานได้จริงและสวยงาม ทำงานกับ React, Next.js, Angular, Node.js และ Express เพื่อสร้างเว็บไซต์และแอปพลิเคชัน พร้อมเรียนรู้ทักษะใหม่อยู่เสมอ ตั้งแต่การดูแลระบบไปจนถึงการออกแบบ UI",
    en: "Web Developer and Graphic Designer focused on creating functional and good-looking digital projects. Works with React, Next.js, Angular, Node.js, and Express to build websites and applications. Always eager to solve problems and learn new skills, from system administration to UI design.",
  },
  about_stack_title: { th: "เทคโนโลยีที่ใช้", en: "Tech Stack" },

  // ── Projects ────────────────────────────────────────────────────
  projects_title: { th: "ผลงาน", en: "Projects" },
  projects_subtitle: { th: "สิ่งที่ผมสร้างขึ้น", en: "Some things I've built" },
  project_view_github: { th: "ดูโค้ด", en: "GitHub" },
  project_view_live: { th: "ดูสด", en: "Live Demo" },

  // Service-based project cards
  project1_name: { th: "WordPress Development", en: "WordPress Development" },
  project1_desc: {
    th: "ติดตั้ง ปรับแต่ง และดูแลรักษาเว็บไซต์ WordPress อย่างมืออาชีพสำหรับธุรกิจและบล็อก",
    en: "Professional setup, customization, and maintenance of WordPress sites for businesses and blogs.",
  },
  project2_name: { th: "Web Application Development", en: "Web Application Development" },
  project2_desc: {
    th: "พัฒนา Web App แบบ Custom โดยใช้ Node.js และ Angular เพื่อประสิทธิภาพและความยืดหยุ่น",
    en: "Custom-built web apps using Node.js and Angular for performance and scalability.",
  },
  project3_name: { th: "Graphic Design & Branding", en: "Graphic Design & Branding" },
  project3_desc: {
    th: "สร้างโลโก้, ออกแบบแบนเนอร์ และจัดเลย์เอาต์สิ่งพิมพ์ที่มีเอกลักษณ์เฉพาะตัว",
    en: "Unique logo creation, banner design, and print media layout for standout branding.",
  },

  // ── Links Hub ───────────────────────────────────────────────────
  links_title: { th: "ลิงก์ทั้งหมด", en: "Links Hub" },
  links_subtitle: { th: "ช่องทางอื่นๆ ของผม", en: "Find me elsewhere" },
  link1_title: { th: "GitHub", en: "GitHub" },
  link1_desc: { th: "โปรเจกต์และโค้ดของผม", en: "My projects and source code" },
  link2_title: { th: "Facebook", en: "Facebook" },
  link2_desc: { th: "ติดตามผลงานและอัปเดต", en: "Follow my work and updates" },
  link3_title: { th: "Fastwork", en: "Fastwork" },
  link3_desc: { th: "จ้างงานฟรีแลนซ์ผ่าน Fastwork", en: "Hire me on Fastwork for freelance work" },

  // ── Contact ─────────────────────────────────────────────────────
  contact_title: { th: "ติดต่อผม", en: "Get In Touch" },
  contact_subtitle: {
    th: "มีโปรเจกต์หรืองานที่อยากทำร่วมกัน? ส่งอีเมลหาผมได้เลย",
    en: "Have a project in mind? I'm always open to new ideas and creative work.",
  },
  contact_email_btn: { th: "ส่งอีเมล", en: "Send Email" },
  contact_email: { th: "kidakorn.1@gmail.com", en: "kidakorn.1@gmail.com" },
  contact_phone: { th: "090-759-6314", en: "090-759-6314" },
  contact_location: { th: "ลำพูน, ประเทศไทย", en: "Lamphun, Thailand" },

  // ── Footer ──────────────────────────────────────────────────────
  footer_copy: { th: "© 2025 Devakorn. สงวนลิขสิทธิ์.", en: "© 2025 Devakorn. All rights reserved." },

  // ── Misc ────────────────────────────────────────────────────────
  aria_toggle_theme: { th: "เปลี่ยนธีม", en: "Toggle theme" },
  aria_toggle_lang: { th: "เปลี่ยนภาษา", en: "Toggle language" },
  aria_open_menu: { th: "เปิดเมนู", en: "Open menu" },
  aria_close_menu: { th: "ปิดเมนู", en: "Close menu" },
};
