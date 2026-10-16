import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  X,
  Trash2,
  Download,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import { getSubmissions, deleteSubmission, clearAllSubmissions } from "./photoboothStorage";
import { sound } from "../../utils/audio";

const ADMIN_PASSKEY = "aryan2077";

export default function PhotoVaultModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPasskey, setInputPasskey] = useState("");
  const [error, setError] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setSubmissions(getSubmissions());
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPasskey.trim().toLowerCase() === ADMIN_PASSKEY.toLowerCase()) {
      sound.playFanfare();
      setIsAuthenticated(true);
      setError(false);
      setSubmissions(getSubmissions());
    } else {
      sound.playWoosh();
      setError(true);
    }
  };

  const handleDelete = (id) => {
    sound.playClick();
    deleteSubmission(id);
    setSubmissions(getSubmissions());
  };

  const handleDownload = (photo) => {
    sound.playClick();
    const a = document.createElement("a");
    a.href = photo.imageData;
    a.download = `visitor_${photo.name.replace(/\s+/g, "_")}_${photo.id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[var(--color-bg-card)]/95 border border-[var(--color-border-accent)] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_var(--color-accent-glow)] backdrop-blur-xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)]">
                {isAuthenticated ? <Unlock size={18} /> : <Lock size={18} />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono-code flex items-center gap-2">
                  ARYAN'S PHOTO VAULT
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] font-bold border border-[var(--color-border-accent)]">
                    ADMIN ONLY
                  </span>
                </h3>
                <p className="text-[11px] font-mono-code text-slate-400">
                  Private visitor submissions dashboard
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-7 bg-[var(--color-bg-dark)]/95">
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="flex flex-col items-center py-6 text-center max-w-sm mx-auto">
                <Lock size={36} className="text-[var(--color-accent-primary)] mb-3" />
                <h4 className="text-lg font-bold font-mono-code text-white mb-1">
                  AUTHENTICATION REQUIRED
                </h4>
                <p className="text-xs text-slate-400 font-mono-code mb-4">
                  Enter your master admin key to view submitted photos. (Default: aryan2077)
                </p>

                <input
                  type="password"
                  placeholder="Enter passkey..."
                  value={inputPasskey}
                  onChange={(e) => setInputPasskey(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-accent)] text-white font-mono-code text-sm focus:outline-none focus:border-[var(--color-accent-primary)] mb-3 text-center"
                />

                {error && (
                  <p className="text-xs font-mono-code text-rose-400 mb-3">
                    Invalid passkey. Access denied.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs cursor-pointer shadow-[0_0_15px_var(--color-accent-glow)]"
                >
                  Unlock Vault
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono-code text-[var(--color-accent-primary)] font-bold">
                    TOTAL SUBMISSIONS: {submissions.length}
                  </span>

                  {submissions.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to clear all submissions?")) {
                          clearAllSubmissions();
                          setSubmissions([]);
                        }
                      }}
                      className="text-xs font-mono-code text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={12} />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm font-mono-code text-slate-400">
                      No photos submitted yet!
                    </p>
                    <p className="text-xs text-slate-500 font-mono-code mt-1">
                      When visitors take photos and click "Send to Aryan", they will show up here.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
                    {submissions.map((photo) => (
                      <div
                        key={photo.id}
                        className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                      >
                        <div className="relative aspect-video rounded-xl bg-black overflow-hidden mb-2.5">
                          <img
                            src={photo.imageData}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1 mb-3 text-xs font-mono-code">
                          <div className="flex items-center gap-1.5 text-white font-bold truncate">
                            <User size={12} className="text-[var(--color-accent-primary)] shrink-0" />
                            <span className="truncate">{photo.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 truncate text-[11px]">
                            <Mail size={11} className="shrink-0" />
                            <span className="truncate">{photo.contact}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                            <Calendar size={10} className="shrink-0" />
                            <span>{photo.formattedDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button
                            onClick={() => handleDownload(photo)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/20 text-xs font-mono-code cursor-pointer"
                          >
                            <Download size={11} />
                            <span>Download</span>
                          </button>

                          <button
                            onClick={() => handleDelete(photo.id)}
                            className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

