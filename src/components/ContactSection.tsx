"use client";

// ─────────────────────────────────────────────────────────────────
// ContactSection.tsx — mailto CTA + real social icons
// Real email: kidakorn.1@gmail.com
// Real socials: GitHub, Facebook, Fastwork
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { GitFork, Globe, Briefcase, Phone, MapPin, CheckCircle2, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Lottie from "lottie-react";

// TODO: Replace this with your own downloaded Lottie JSON file from lottiefiles.com!
const emailAnimationData = {
  v: "5.5.2", fr: 60, ip: 0, op: 60, w: 100, h: 100, nm: "Placeholder", ddd: 0, assets: [], layers: []
};

const EMAIL = "kidakorn.1@gmail.com";
const PHONE = "090-759-6314";

const SOCIAL_LINKS = [
  { id: "contact-github", href: "https://github.com/kidakorn", icon: GitFork, label: "GitHub" },
  { id: "contact-facebook", href: "https://facebook.com/devakorn", icon: Globe, label: "Facebook" },
  { id: "contact-fastwork", href: "https://fastwork.co/user/kidakorn43", icon: Briefcase, label: "Fastwork" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setErrorMsg("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative rounded-[2rem] p-10 md:p-16 flex flex-col items-center text-center border shadow-2xl"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-main)",
          }}
        >

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full relative z-10 text-left items-center">
            
            {/* Left Column: Text & Info */}
            <div className="flex flex-col items-start">
              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                id="contact-heading"
                className="text-5xl md:text-7xl font-bold font-[var(--font-display)] tracking-tighter leading-[1.1] mb-8"
                style={{ color: "var(--text-strong)" }}
              >
                Let's build something <br className="hidden md:block" />
                <span className="gradient-text text-[var(--color-primary-red)] drop-shadow-xl">extraordinary.</span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light text-[var(--text-muted)]"
              >
                {t("contact_subtitle")}
              </motion.p>

              {/* Direct Info */}
              <motion.div variants={fadeUp} className="flex flex-col gap-6 mb-12">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 text-[var(--text-strong)] hover:text-[var(--color-primary-red)] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center group-hover:border-[var(--color-primary-red)] transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="font-medium text-lg">{EMAIL}</span>
                </a>
                <a href={`tel:+66${PHONE.replace(/-/g, "").slice(1)}`} className="flex items-center gap-4 text-[var(--text-strong)] hover:text-[var(--color-primary-red)] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center group-hover:border-[var(--color-primary-red)] transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="font-medium text-lg">{PHONE}</span>
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ id, href, icon: Icon, label }) => (
                  <a
                    key={id}
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                    style={{ background: "var(--bg-main)", border: "1px solid var(--border-main)" }}
                  >
                    <Icon size={20} className="text-[var(--text-main)] group-hover:text-[var(--color-primary-red)] transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Contact Form */}
            <motion.form 
              variants={fadeUp} 
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 bg-[var(--bg-main)] p-8 md:p-12 rounded-[2rem] border border-[var(--border-main)] shadow-inner w-full relative overflow-hidden"
            >
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-red)] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

              <h3 className="text-3xl font-bold font-[var(--font-display)] text-[var(--text-strong)] mb-2">Send a Message</h3>
              
              {isSuccess && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 font-semibold flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-semibold text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="form-control">
                <label className="label px-0 pt-0"><span className="label-text font-semibold text-[var(--text-strong)]">Your Name</span></label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input w-full bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-strong)] focus:border-[var(--color-primary-red)] focus:outline-none transition-colors h-14 rounded-xl px-6" 
                  disabled={isLoading}
                />
              </div>

              <div className="form-control">
                <label className="label px-0 pt-0"><span className="label-text font-semibold text-[var(--text-strong)]">Email Address</span></label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="input w-full bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-strong)] focus:border-[var(--color-primary-red)] focus:outline-none transition-colors h-14 rounded-xl px-6" 
                  disabled={isLoading}
                />
              </div>

              <div className="form-control">
                <label className="label px-0 pt-0"><span className="label-text font-semibold text-[var(--text-strong)]">Message</span></label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="textarea w-full bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-strong)] focus:border-[var(--color-primary-red)] focus:outline-none transition-colors min-h-[160px] rounded-2xl p-6 text-base"
                  disabled={isLoading}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isLoading || isSuccess}
                className="btn mt-4 w-full h-14 rounded-xl bg-[var(--color-primary-red)] text-white hover:bg-[var(--text-strong)] disabled:bg-[var(--bg-hover)] disabled:text-[var(--text-muted)] border-none font-bold text-lg shadow-[0_4px_20px_rgba(200,16,46,0.4)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.3)] disabled:shadow-none transition-all duration-300"
              >
                {isLoading ? <span className="loading loading-spinner"></span> : "Send Message"}
              </button>
            </motion.form>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
