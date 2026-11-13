import React, { useState } from "react";
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  Terminal,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../../utils/audio";
import { personalInfo } from "../../data/portfolioData";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";

// ─────────────────────────────────────────────────────────────────────────────
// Web3Forms access key — this is a PUBLIC routing key (safe to commit).
// It routes submissions to your verified email. It is NOT a secret.
// Get yours free at https://web3forms.com  → "Create Access Key"
// Paste the key you receive for ambbsr26@gmail.com below.
// ─────────────────────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "cb2a3c00-25b2-4eb4-9d51-24bfb387794d";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false); // spam guard

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    sound.playFanfare();

    confetti({
      particleCount: 40,
      spread: 75,
      origin: { y: 0.8 },
      colors: ["#ff6b3d", "#00f2fe", "#10b981", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  // ── Basic client-side validation ──────────────────────────────────────────
  const validate = () => {
    if (!formState.name.trim() || formState.name.trim().length < 2) {
      return "Please enter your name (at least 2 characters).";
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(formState.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      return "Please enter a message (at least 10 characters).";
    }
    return null;
  };

  // ── Form submission — real API call to Web3Forms ──────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Duplicate-submission guard
    if (isSubmitting || hasSubmitted) return;

    setSubmitError("");

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    sound.playClick();
    setIsSubmitting(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        // ── Email metadata ──────────────────────────────────────────────────
        subject: `Portfolio Contact: ${formState.name}${formState.organization ? ` from ${formState.organization}` : ""}`,
        from_name: formState.name.trim(),
        replyto: formState.email.trim(),
        // ── Message body fields (shown in the email) ────────────────────────
        "Sender Name": formState.name.trim(),
        "Sender Email": formState.email.trim(),
        "Organization / Company": formState.organization.trim() || "Not provided",
        "Message": formState.message.trim(),
        // ── Spam / bot protection ───────────────────────────────────────────
        botcheck: "", // honeypot — must be empty
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ── Real success ───────────────────────────────────────────────────
        setIsSubmitting(false);
        setIsSent(true);
        setHasSubmitted(true);
        sound.playFanfare();

        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.7 },
          colors: ["#ff6b3d", "#00f2fe", "#10b981", "#a855f7"],
        });

        setFormState({ name: "", email: "", organization: "", message: "" });
        setTimeout(() => {
          setIsSent(false);
          setHasSubmitted(false);
        }, 7000);
      } else {
        // ── API-level error ────────────────────────────────────────────────
        setIsSubmitting(false);
        const msg = data?.message || "Failed to send. Please try again.";
        setSubmitError(
          msg.toLowerCase().includes("access_key") || msg.toLowerCase().includes("key")
            ? "Contact form is not fully configured yet. Please reach out directly at " + personalInfo.email
            : msg
        );
      }
    } catch {
      // ── Network error ──────────────────────────────────────────────────
      setIsSubmitting(false);
      setSubmitError(
        "Network error — please check your connection or email me directly at " +
          personalInfo.email
      );
    }
  };

  const updateField = (field) => (e) =>
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#09090f]/70">
      <div className="max-w-5xl mx-auto">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30">
                <Mail size={13} />
                <span>TRANSMISSION TERMINAL // DIRECT CONTACT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Initiate Contact
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
              Looking for an Engineer or want to collaborate on high-impact projects? Let's talk.
            </p>
          </div>
        </Section3DTransition>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Metadata HUD with 3D Tilt */}
          <div className="lg:col-span-2 space-y-4">
            <Card3D maxTilt={6}>
              <div className="anime-panel rounded-2xl p-6 space-y-4 h-full">
                <div className="text-xs font-mono-code text-[var(--color-accent-primary)] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
                  AVAILABILITY PROTOCOL
                </div>

                <div className="space-y-3 font-mono-code text-xs">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-500 block mb-0.5">CURRENT STATUS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} /> {personalInfo.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-500 block mb-0.5">LOCATION &amp; BASE</span>
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[var(--color-accent-primary)]" />
                      {personalInfo.location}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-500 block mb-0.5">RESPONSE LATENCY</span>
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <Clock size={13} className="text-cyan-400" />
                      Under 24 Hours
                    </span>
                  </div>
                </div>

                {/* Direct Copy Email Box */}
                <div className="pt-2">
                  <button
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--color-accent-primary)] hover:bg-white text-black font-mono-code text-xs font-bold transition-all shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? "EMAIL COPIED TO CLIPBOARD!" : "COPY DIRECT EMAIL"}</span>
                    </span>
                    <span className="text-[10px] bg-black/20 text-black px-1.5 py-0.5 rounded">
                      CLICK
                    </span>
                  </button>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Right Interactive Transmission Form with 3D Tilt */}
          <div className="lg:col-span-3">
            <Card3D maxTilt={6}>
              <div className="anime-panel rounded-2xl p-6 sm:p-8 relative h-full">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10 font-mono-code text-xs text-slate-400">
                  <span className="flex items-center gap-2 text-white font-bold">
                    <Terminal size={14} className="text-[var(--color-accent-primary)]" />
                    SEND SECURE DISPATCH
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    LIVE
                  </span>
                </div>

                {isSent ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-3 font-mono-code">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Transmission Dispatched!
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Thank you! Your message has been routed to my personal inbox. I will review and reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-mono-code" noValidate>
                    {/* Name */}
                    <div>
                      <label className="text-xs text-slate-300 block mb-1.5 font-medium flex items-center gap-1.5">
                        <User size={11} className="text-[var(--color-accent-primary)]" />
                        Your Name <span className="text-[var(--color-accent-primary)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Satoshi Nakamoto"
                        value={formState.name}
                        onChange={updateField("name")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[var(--color-accent-primary)] focus:outline-none text-white text-xs transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-slate-300 block mb-1.5 font-medium flex items-center gap-1.5">
                        <Mail size={11} className="text-[var(--color-accent-primary)]" />
                        Email Address <span className="text-[var(--color-accent-primary)]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.com"
                        value={formState.email}
                        onChange={updateField("email")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[var(--color-accent-primary)] focus:outline-none text-white text-xs transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="text-xs text-slate-300 block mb-1.5 font-medium flex items-center gap-1.5">
                        <Building2 size={11} className="text-[var(--color-accent-primary)]" />
                        Organization / Company
                        <span className="text-slate-500 text-[10px] ml-1">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acquired Capital / Independent"
                        value={formState.organization}
                        onChange={updateField("organization")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[var(--color-accent-primary)] focus:outline-none text-white text-xs transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs text-slate-300 block mb-1.5 font-medium flex items-center gap-1.5">
                        <Send size={11} className="text-[var(--color-accent-primary)]" />
                        Message / Project Details <span className="text-[var(--color-accent-primary)]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me about the role, project vision, timeline, or engineering quest..."
                        value={formState.message}
                        onChange={updateField("message")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[var(--color-accent-primary)] focus:outline-none text-white text-xs transition-colors resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-mono-code">
                        <AlertCircle size={13} className="mt-0.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Honeypot — hidden from humans, traps bots */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                    <button
                      type="submit"
                      disabled={isSubmitting || hasSubmitted}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-accent-primary)] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Sparkles size={14} className="animate-spin" />
                          TRANSMITTING DISPATCH...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={14} />
                          TRANSMIT MESSAGE
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
