// ─────────────────────────────────────────────────────────────────
// translations.ts — All UI strings (Thai / English)
// Add new keys here. Never hardcode text in JSX.
// ─────────────────────────────────────────────────────────────────

export type Lang = "th" | "en";

export const translations: Record<string, Record<Lang, string>> = {
  // ── Navbar ──────────────────────────────────────────────────────
  nav_about: { th: "เกี่ยวกับ", en: "About" },
  nav_projects: { th: "ผลงาน", en: "Projects" },
  nav_clients: { th: "พาร์ทเนอร์", en: "Partners" },
  nav_process: { th: "วิธีทำงาน", en: "Process" },
  nav_resume: { th: "เรซูเม่", en: "Resume" },
  nav_links: { th: "ลิงก์", en: "Links" },
  nav_contact: { th: "ติดต่อ", en: "Contact" },
  nav_login: { th: "แอดมิน", en: "Admin Login" },

  // ── Hero ────────────────────────────────────────────────────────
  hero_greeting: { th: "สวัสดีครับ ผม", en: "Hi, I'm" },
  hero_name: { th: "Devakorn", en: "Devakorn" },
  hero_role: {
    th: "Staff (Developer)",
    en: "Staff (Developer)",
  },
  hero_cta: { th: "ดูผลงาน", en: "View Portfolio" },
  hero_location: { th: "ลำพูน, ประเทศไทย", en: "Lamphun, Thailand" },

  // ── About ───────────────────────────────────────────────────────
  about_title: { th: "เกี่ยวกับผม", en: "About Me" },
  about_bio: {
    th: "ปัจจุบันทำงานในตำแหน่ง Staff (Developer) มีความเชี่ยวชาญและประสบการณ์ในการพัฒนาระบบด้วย RPG, RMDL และ LANSA นอกจากนี้ก็ยังคงพัฒนาเว็บไซต์และระบบต่างๆ อย่างต่อเนื่อง มุ่งเน้นการสร้างและดูแลรักษาระบบให้มีประสิทธิภาพและเสถียรภาพสูงสุด พร้อมที่จะเรียนรู้เทคโนโลยีใหม่ๆ เสมอ",
    en: "Currently working as a Staff (Developer) with expertise in enterprise system development using RPG, RMDL, and LANSA. I also continuously develop websites and various systems. Focused on building and maintaining highly efficient and stable systems, while always being eager to learn new technologies.",
  },
  about_stack_title: { th: "เทคโนโลยีที่ใช้", en: "Tech Stack" },
  about_value1_title: { th: "คุณภาพ", en: "Quality" },
  about_value1_desc: { th: "เขียนโค้ดที่สะอาดและบำรุงรักษาง่าย", en: "Clean and maintainable code." },
  about_value2_title: { th: "ตรงเวลา", en: "On Time" },
  about_value2_desc: { th: "ส่งมอบงานตามกำหนดเสมอ", en: "Always deliver on schedule." },
  about_value3_title: { th: "ประสบการณ์", en: "Experience" },
  about_value3_desc: { th: "ประสบการณ์สร้างโปรเจกต์จริง", en: "Real-world project experience." },

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

  // ── Clients Timeline ────────────────────────────────────────────
  clients_title: { th: "ลูกค้าและความร่วมมือ", en: "Our Clients & Partners" },
  clients_subtitle: { th: "พันธมิตรที่ผมเคยร่วมงานด้วย", en: "Partners & Brands I've worked with" },
  client_add_btn: { th: "+ เพิ่มลูกค้า", en: "+ Add Client" },
  client_edit: { th: "แก้ไข", en: "Edit" },
  client_delete: { th: "ลบ", en: "Delete" },
  client_delete_confirm: { th: "คุณแน่ใจหรือไม่ว่าต้องการลบลูกค้ารายนี้?", en: "Are you sure you want to delete this client?" },
  modal_add_client: { th: "เพิ่มลูกค้าใหม่", en: "Add New Client" },
  modal_edit_client: { th: "แก้ไขลูกค้า", en: "Edit Client" },
  modal_label_client_name: { th: "ชื่อลูกค้า", en: "Client Name" },
  modal_label_date: { th: "ปี / วันที่", en: "Date / Year" },
  modal_label_image: { th: "ลิงก์รูปภาพ (โลโก้)", en: "Image URL (Logo)" },

  // ── Work Process ────────────────────────────────────────────────
  process_title: { th: "วิธีการทำงานของผม", en: "How I Work" },
  process_step1_title: { th: "1. พูดคุยและวางแผน", en: "1. Discuss & Plan" },
  process_step1_desc: { th: "ทำความเข้าใจความต้องการและเป้าหมายของโปรเจกต์", en: "Understand requirements and project goals." },
  process_step2_title: { th: "2. ออกแบบ", en: "2. Design" },
  process_step2_desc: { th: "ออกแบบ UI/UX ให้ใช้งานง่ายและสวยงาม", en: "Create intuitive and beautiful UI/UX." },
  process_step3_title: { th: "3. พัฒนา", en: "3. Build" },
  process_step3_desc: { th: "เขียนโค้ดด้วยเทคโนโลยีที่เหมาะสม", en: "Write clean code with the right technologies." },
  process_step4_title: { th: "4. ส่งมอบ", en: "4. Deliver" },
  process_step4_desc: { th: "ทดสอบและส่งมอบงานที่มีคุณภาพ", en: "Test and deliver high-quality results." },

  // ── Links Hub ───────────────────────────────────────────────────
  links_title: { th: "ช่องทางการติดต่อ", en: "Contact Hub" },
  links_subtitle: { th: "ช่องทางอื่นๆ ของผม", en: "Find me elsewhere" },
  link1_title: { th: "Facebook", en: "Facebook Profile" },
  link1_desc: { th: "พูดคุยและติดต่อส่วนตัว", en: "Personal contact and casual talk" },
  link2_title: { th: "Facebook Page", en: "Facebook Page" },
  link2_desc: { th: "ติดตามผลงานและอัปเดต", en: "Follow my work and updates" },
  link3_title: { th: "LINE", en: "LINE" },
  link3_desc: { th: "ติดต่องานและพูดคุยผ่าน LINE", en: "Contact and chat via LINE" },
  link4_title: { th: "Fastwork", en: "Fastwork" },
  link4_desc: { th: "จ้างงานฟรีแลนซ์ผ่าน Fastwork", en: "Hire me on Fastwork for freelance work" },
  link5_title: { th: "Email", en: "Email" },
  link5_desc: { th: "kidakorn.1@gmail.com", en: "kidakorn.1@gmail.com" },
  link6_title: { th: "GitHub", en: "GitHub" },
  link6_desc: { th: "โปรเจกต์และโค้ดของผม", en: "My projects and source code" },

  // ── Contact ─────────────────────────────────────────────────────
  contact_title: { th: "พร้อมทำงานร่วมกัน?", en: "Ready to work together?" },
  contact_subtitle: {
    th: "มีโปรเจกต์หรืองานที่อยากทำร่วมกัน? ติดต่อผมได้ทุกช่องทาง!",
    en: "Have a project in mind? Let's connect and make it happen!",
  },
  contact_email_btn: { th: "ส่งอีเมลหาฉัน", en: "Send me an Email" },
  contact_email_copied: { th: "คัดลอกอีเมลแล้ว!", en: "Email Copied!" },
  contact_email: { th: "kidakorn.1@gmail.com", en: "kidakorn.1@gmail.com" },
  contact_phone: { th: "090-759-6314", en: "090-759-6314" },
  contact_location: { th: "ลำพูน, ประเทศไทย", en: "Lamphun, Thailand" },
  contact_reply_time: { th: "ตอบกลับภายใน 24 ชั่วโมง", en: "Replies within 24 hours" },

  // ── Footer ──────────────────────────────────────────────────────
  footer_copy: { th: "© 2025 Devakorn. สงวนลิขสิทธิ์.", en: "© 2025 Devakorn. All rights reserved." },

  // ── Projects Editor ─────────────────────────────────────────────
  project_edit: { th: "แก้ไข", en: "Edit" },
  project_delete: { th: "ลบ", en: "Delete" },
  project_delete_confirm: { th: "คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?", en: "Are you sure you want to delete this project?" },
  project_add_btn: { th: "+ เพิ่มโปรเจกต์", en: "+ Add Project" },
  modal_add_project: { th: "เพิ่มโปรเจกต์ใหม่", en: "Add New Project" },
  modal_edit_project: { th: "แก้ไขโปรเจกต์", en: "Edit Project" },
  modal_label_name: { th: "ชื่อโปรเจกต์", en: "Project Name" },
  modal_label_desc: { th: "คำอธิบายสั้นๆ", en: "Short Description" },
  modal_label_tags: { th: "เทคโนโลยี (คั่นด้วยคอมมา)", en: "Tech Tags (comma separated)" },
  modal_label_github: { th: "ลิงก์ GitHub (ไม่บังคับ)", en: "GitHub URL (optional)" },
  modal_label_live: { th: "ลิงก์เว็บไซต์ (ไม่บังคับ)", en: "Live URL (optional)" },
  btn_save: { th: "บันทึก", en: "Save" },
  btn_cancel: { th: "ยกเลิก", en: "Cancel" },

  // ── Misc ────────────────────────────────────────────────────────
  aria_toggle_theme: { th: "เปลี่ยนธีม", en: "Toggle theme" },
  aria_toggle_lang: { th: "เปลี่ยนภาษา", en: "Toggle language" },
  aria_open_menu: { th: "เปิดเมนู", en: "Open menu" },
  aria_close_menu: { th: "ปิดเมนู", en: "Close menu" },

  // ── Breadcrumb & Project Sub-pages ──────────────────────────────
  breadcrumb_home: { th: "หน้าหลัก", en: "Home" },
  breadcrumb_projects: { th: "ผลงาน", en: "Projects" },

  // Projects listing page (/projects)
  projects_page_title: { th: "ผลงานทั้งหมด", en: "All Projects" },
  projects_page_subtitle: { th: "เลือกโปรเจกต์เพื่อดูเอกสารและรายละเอียด", en: "Select a project to view documents and details" },
  projects_view_details: { th: "ดูรายละเอียด", en: "View Details" },

  // Project detail page (/projects/[slug])
  project_docs_title: { th: "เอกสารอ้างอิง", en: "Reference Documents" },
  project_docs_empty: { th: "ยังไม่มีเอกสาร", en: "No documents yet" },
  project_docs_empty_sub: { th: "เพิ่มเอกสาร HTML แรกของโปรเจกต์นี้", en: "Upload the first HTML document for this project" },
  project_back: { th: "← กลับไปยังผลงาน", en: "← Back to Projects" },

  // Document upload modal
  doc_add_btn: { th: "+ เพิ่มเอกสาร", en: "+ Add Document" },
  doc_modal_add_title: { th: "อัปโหลดเอกสาร HTML", en: "Upload HTML Document" },
  doc_modal_edit_title: { th: "แก้ไขเอกสาร", en: "Edit Document" },
  doc_label_title: { th: "ชื่อเอกสาร", en: "Document Title" },
  doc_label_desc: { th: "คำอธิบายสั้นๆ", en: "Short Description" },
  doc_label_file: { th: "เลือกไฟล์ .html", en: "Choose .html file" },
  doc_uploading: { th: "กำลังอัปโหลด...", en: "Uploading..." },
  doc_upload_success: { th: "อัปโหลดสำเร็จ!", en: "Upload successful!" },
  doc_delete_confirm: { th: "คุณแน่ใจหรือไม่ว่าต้องการลบเอกสารนี้?", en: "Are you sure you want to delete this document?" },
  doc_view_btn: { th: "เปิดดู", en: "Open" },
  doc_edit_btn: { th: "แก้ไข", en: "Edit" },
  doc_delete_btn: { th: "ลบ", en: "Delete" },

  // HTML viewer page (/projects/[slug]/[docId])
  viewer_open_new_tab: { th: "เปิดในแท็บใหม่", en: "Open in new tab" },
  viewer_back: { th: "← กลับ", en: "← Back" },
};
