import React from "react";
import {
  ExternalLink,
  Terminal,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  CodeIcon,
  InstagramIcon,
} from "../ui/Icons";
import { sound } from "../../utils/audio";
import { socialProfiles } from "../../data/portfolioData";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";

export default function Profiles() {
  const iconMap = {
    Github: GithubIcon,
    Linkedin: LinkedinIcon,
    Twitter: TwitterIcon,
    MessageSquare: DiscordIcon,
    Code: CodeIcon,
    Instagram: InstagramIcon,
  };

  return (
    <section id="profiles" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30">
                <Terminal size={13} />
                <span>DIGITAL NODES </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Coding Profiles & Socials
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
            </p>
          </div>
        </Section3DTransition>

        {/* Profiles Grid with 3D Card Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialProfiles.map((profile) => {
            const Icon = iconMap[profile.icon] || CodeIcon;
            return (
              <Card3D key={profile.id} maxTilt={10} className="h-full">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="anime-panel rounded-2xl p-6 flex flex-col justify-between group cursor-pointer h-full block"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent-primary)] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{profile.status}</span>
                      </span>
                    </div>

                    {/* Name & Handle */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {profile.name}
                    </h3>
                    <div className="text-xs font-mono-code text-[var(--color-accent-primary)] font-semibold mb-3">
                      {profile.handle}
                    </div>

                    {/* Description */}
                    <p className="text-xs font-mono-code text-slate-400 leading-relaxed mb-6">
                      {profile.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-400">
                    <span className="text-[10px] text-slate-500 uppercase">
                      {profile.badge}
                    </span>
                    <span className="text-[var(--color-accent-primary)] group-hover:underline flex items-center gap-1 font-bold">
                      <span>Connect</span>
                      <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}