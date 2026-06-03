"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { Pencil, Trash, ExternalLink, Image as ImageIcon } from "lucide-react";

type ClientItem = {
  id: string;
  name: string;
  date: string;
  imageUrl: string | null;
  projectLink: string | null;
};

const DEFAULT_CLIENTS: ClientItem[] = [
  {
    id: "client-1",
    name: "Example Corp",
    date: "2024",
    imageUrl: null,
    projectLink: null,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ClientsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t } = useLanguage();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Editor State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formLink, setFormLink] = useState("");

  // Parallax Setup
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Background moves down, Images move up slightly
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        if (data.clients && Array.isArray(data.clients) && data.clients.length > 0) {
          setClients(data.clients);
        } else {
          setClients(DEFAULT_CLIENTS);
        }
      } catch (e) {
        console.error("Failed to load clients", e);
        setClients(DEFAULT_CLIENTS);
      }
      setMounted(true);
    };
    fetchClients();
  }, []);

  const saveToCloud = async (newClients: ClientItem[]) => {
    setClients(newClients);
    try {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clients: newClients }),
      });
    } catch (e) {
      console.error("Failed to save clients to cloud", e);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t("client_delete_confirm"))) {
      saveToCloud(clients.filter((c) => c.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormName("");
    setFormDate("");
    setFormImage("");
    setFormLink("");
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientItem) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormDate(client.date);
    setFormImage(client.imageUrl || "");
    setFormLink(client.projectLink || "");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (editingClient) {
        const updated = clients.map((c) =>
          c.id === editingClient.id
            ? {
              ...c,
              name: formName,
              date: formDate,
              imageUrl: formImage || null,
              projectLink: formLink || null,
            }
            : c
        );
        saveToCloud(updated);
      } else {
        const newClient: ClientItem = {
          id: `client-${Date.now()}`,
          name: formName,
          date: formDate,
          imageUrl: formImage || null,
          projectLink: formLink || null,
        };
        saveToCloud([...clients, newClient]);
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 400);
  };

  if (!mounted) {
    return <section ref={sectionRef} id="clients" className="w-full px-6 py-20 bg-[var(--bg-main)] min-h-[50vh]"></section>;
  }

  return (
    <section ref={sectionRef} id="clients" className="relative w-full px-6 py-20 bg-[var(--bg-main)] border-t border-[var(--border-main)] overflow-hidden">
      {/* Parallax Background Blob */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-20 flex justify-center items-center"
      >
        <div className="w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--color-primary-red)_0%,_transparent_70%)] blur-[100px] rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12 flex flex-col justify-start"
        >
          <h2 className="section-title text-[var(--text-strong)]">{t("clients_title")}</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{t("clients_subtitle")}</p>
        </motion.div>

        {/* Continuous Marquee "Hall of Fame" */}
        <div className="relative w-full overflow-hidden py-4 marquee-container">
          {/* Fading Edges for Scroll Indication */}
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />

          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-scroll {
              animation: marqueeScroll ${Math.max(15, clients.length * 5)}s linear infinite;
            }
            .marquee-container:hover .marquee-scroll {
              animation-play-state: paused;
            }
          `}</style>

          {/* If there's only 1 or 2 clients, duplicate them more times so the screen is filled */}
          <div className="flex gap-6 min-w-max pr-6 marquee-scroll">
            {[...clients, ...clients, ...clients, ...clients].slice(0, Math.max(8, clients.length * 2)).map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="relative shrink-0 w-[320px] md:w-[380px] h-[320px] md:h-[380px] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(200,16,46,0.15)] transition-all duration-500 border border-[var(--border-main)] bg-[var(--bg-card)] flex flex-col"
              >
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => openEditModal(client)}
                      className="btn btn-sm btn-circle btn-ghost bg-black/50 text-white hover:bg-black/80"
                      title={t("client_edit")}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="btn btn-sm btn-circle btn-ghost bg-black/50 text-[var(--color-primary-red)] hover:bg-black/80"
                      title={t("client_delete")}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                )}

                {/* Client Image / Logo */}
                <div className="relative w-full h-1/2 bg-[var(--bg-hover)] border-b border-[var(--border-main)] flex items-center justify-center overflow-hidden">
                  {client.imageUrl ? (
                    <img
                      src={client.imageUrl}
                      alt={client.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-[var(--text-muted)] flex flex-col items-center gap-2 group-hover:text-[var(--color-primary-red)] transition-colors duration-500">
                      <ImageIcon size={32} strokeWidth={1.5} />
                      <span className="text-xs uppercase tracking-widest font-semibold opacity-50">No Logo</span>
                    </div>
                  )}
                  {/* Subtle Red Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col p-6 h-1/2 justify-between relative z-10">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[var(--color-primary-red)] uppercase mb-2 block">
                      {client.date}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-strong)] tracking-tight line-clamp-2">
                      {t(client.name)}
                    </h3>
                  </div>

                  {client.projectLink && (
                    <a
                      href={client.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--color-primary-red)] transition-colors mt-4 w-max"
                    >
                      View Website <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Controls - Add Client */}
        {isAdmin && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={openAddModal}
              className="btn rounded-full px-8 font-semibold shadow-lg transition-all hover:scale-105 bg-[var(--color-primary-red)] text-white border-none"
            >
              {t("client_add_btn")}
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open" style={{ zIndex: 9999 }}>
          <div className="modal-box w-11/12 max-w-2xl bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)]">
            <h3 className="font-bold text-2xl mb-6 text-[var(--text-strong)]">
              {editingClient ? t("modal_edit_client") : t("modal_add_client")}
            </h3>

            <div className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_client_name")}</span></label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_date")}</span></label>
                <input
                  type="text"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="e.g. 2024, or June 2023"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">{t("modal_label_image")}</span></label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="https://imgur.com/your-logo.png"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold text-[var(--text-strong)]">Client Website Link (Optional)</span></label>
                <input
                  type="url"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  className="input input-bordered w-full bg-[var(--bg-main)] text-[var(--text-strong)] border-[var(--border-main)] focus:outline-none focus:border-[var(--color-primary-red)]"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="modal-action mt-8">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost text-[var(--text-main)]" disabled={isSaving}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn bg-[var(--color-primary-red)] text-white border-none hover:bg-[var(--color-secondary-red)]"
                disabled={isSaving || !formName.trim()}
              >
                {isSaving ? <span className="loading loading-spinner"></span> : "Save Client"}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </section>
  );
}
