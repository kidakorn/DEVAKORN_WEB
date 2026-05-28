"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Briefcase, GraduationCap, Code2, Monitor, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function ResumePage() {
  const { t, lang } = useLanguage();

  const isThai = lang === "th";

  // Placeholder Data - the user can fill this in later
  const workExperience = [
    {
      title: isThai ? "นักพัฒนาเว็บ (Web Developer)" : "Web Developer",
      company: "Freelance / Fastwork",
      date: "2023 - Present",
      description: isThai 
        ? "พัฒนาและออกแบบเว็บไซต์, Web Application และ Landing Page โดยใช้ React, Next.js, Node.js และ TailwindCSS" 
        : "Developed and designed websites, Web Applications, and Landing Pages using React, Next.js, Node.js, and TailwindCSS.",
    },
    {
      title: isThai ? "นักออกแบบกราฟิก (Graphic Designer)" : "Graphic Designer",
      company: "Freelance",
      date: "2021 - Present",
      description: isThai 
        ? "ออกแบบโลโก้ แบนเนอร์โฆษณา และสื่อสิ่งพิมพ์สำหรับแบรนด์ต่างๆ เพื่อสร้างเอกลักษณ์ที่โดดเด่น"
        : "Designed logos, advertising banners, and print media for various brands to create distinct identities.",
    },
  ];

  const education = [
    {
      degree: isThai ? "ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์" : "Bachelor's Degree in Computer Science",
      school: isThai ? "มหาวิทยาลัย..." : "University of ...",
      date: "2019 - 2023",
      description: isThai 
        ? "มุ่งเน้นการพัฒนาซอฟต์แวร์ โครงสร้างข้อมูล และการออกแบบระบบ"
        : "Focused on software development, data structures, and system design.",
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "Angular", "TailwindCSS", "Framer Motion", "TypeScript"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"] },
    { category: "Design", items: ["Figma", "Photoshop", "Illustrator", "UI/UX Design", "Branding"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Linux", "Postman"] },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pb-24 pt-32 px-6">
      
      {/* ── Header / Navigation ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-16">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-main)] hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)] transition-colors duration-300 font-semibold"
        >
          <ArrowLeft size={18} />
          {isThai ? "กลับหน้าหลัก" : "Back to Home"}
        </Link>
        <button 
          onClick={() => alert("Please add your resume.pdf to the public folder to enable downloads.")}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--color-primary-red)] text-white font-bold hover:shadow-[0_4px_20px_rgba(200,16,46,0.5)] transition-all duration-300 hover:scale-105"
        >
          <Download size={18} />
          {isThai ? "ดาวน์โหลด PDF" : "Download PDF"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-main)] shadow-2xl overflow-hidden">
        
        {/* ── Top Header Section ───────────────────────────────── */}
        <div className="bg-[var(--bg-hover)] p-8 md:p-16 border-b border-[var(--border-main)] relative overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-red)] rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold font-[var(--font-display)] tracking-tighter text-[var(--text-strong)] mb-4"
          >
            Kidakorn Intha
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-semibold text-[var(--color-primary-red)] mb-8"
          >
            {isThai ? "นักพัฒนาเว็บ & นักออกแบบกราฟิก" : "Web Developer & Graphic Designer"}
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base font-medium text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-2"><Mail size={16} /> kidakorn.1@gmail.com</span>
            <span className="flex items-center gap-2"><Phone size={16} /> 090-759-6314</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> {isThai ? "ลำพูน, ประเทศไทย" : "Lamphun, Thailand"}</span>
          </motion.div>
        </div>

        <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* ── Left Column (Main Content) ──────────────────────── */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Experience */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-hover)] border border-[var(--border-main)] flex items-center justify-center text-[var(--color-primary-red)]">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-strong)]">
                  {isThai ? "ประสบการณ์ทำงาน" : "Work Experience"}
                </h3>
              </div>
              <div className="space-y-10 border-l-2 border-[var(--border-main)] ml-6 pl-8">
                {workExperience.map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute w-4 h-4 bg-[var(--color-primary-red)] rounded-full -left-[41px] top-1.5 shadow-[0_0_10px_rgba(200,16,46,0.6)]"></div>
                    <h4 className="text-xl font-bold text-[var(--text-strong)]">{job.title}</h4>
                    <p className="text-sm font-semibold text-[var(--color-primary-red)] mb-3">{job.company} | {job.date}</p>
                    <p className="text-[var(--text-muted)] leading-relaxed">{job.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-hover)] border border-[var(--border-main)] flex items-center justify-center text-[var(--color-primary-red)]">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-strong)]">
                  {isThai ? "การศึกษา" : "Education"}
                </h3>
              </div>
              <div className="space-y-10 border-l-2 border-[var(--border-main)] ml-6 pl-8">
                {education.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute w-4 h-4 bg-[var(--text-muted)] rounded-full -left-[41px] top-1.5"></div>
                    <h4 className="text-xl font-bold text-[var(--text-strong)]">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-[var(--color-primary-red)] mb-3">{edu.school} | {edu.date}</p>
                    <p className="text-[var(--text-muted)] leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right Column (Sidebar) ─────────────────────────── */}
          <div className="space-y-12">
            
            {/* Skills */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-hover)] border border-[var(--border-main)] flex items-center justify-center text-[var(--color-primary-red)]">
                  <Monitor size={24} />
                </div>
                <h3 className="text-2xl font-bold font-[var(--font-display)] text-[var(--text-strong)]">
                  {isThai ? "ทักษะ" : "Skills"}
                </h3>
              </div>
              
              <div className="space-y-8">
                {skills.map((skillGroup, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <h4 className="text-sm font-bold tracking-widest uppercase text-[var(--text-muted)] mb-4">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 bg-[var(--bg-hover)] border border-[var(--border-main)] text-[var(--text-strong)] rounded-lg text-sm font-medium hover:border-[var(--color-primary-red)] hover:text-[var(--color-primary-red)] transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
