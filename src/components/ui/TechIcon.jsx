import React from "react";
import {
  Code2,
  Layout,
  Cpu,
  Cloud,
  Database,
  Sparkles,
  GitBranch,
  Server,
  Layers,
  Bot,
  Brain,
  Network,
  Boxes,
} from "lucide-react";

/**
 * Premium SVG Technology Icons
 * Handcrafted vector marks tailored for high-contrast dark theme & cyan/teal glow.
 */
export default function TechIcon({ id, className = "w-6 h-6" }) {
  const iconId = (id || "").toLowerCase().replace(/\s+/g, "-");

  switch (iconId) {
    case "java":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M8.5 18.5c2.5.8 6.5.8 8.5 0M9 21c2 .5 5 .5 7 0"
            stroke="#ea580c"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6 13c0 3.5 3 4.5 6 4.5s6-1 6-4.5H6z"
            fill="#f97316"
            fillOpacity="0.2"
            stroke="#f97316"
            strokeWidth="1.8"
          />
          <path
            d="M18 13.5c1.5 0 2.5 1 2.5 2.2 0 1.5-1.2 2.3-2.5 2.3"
            stroke="#ea580c"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 6c1 1.5-1 2.5 0 4M14 4c1.2 1.5-1.2 3 0 5"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "python":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M11.5 3c-4 0-4 1.8-4 1.8v2.2h4.2v.6H5.4S3 7.4 3 11.5s2.2 3.9 2.2 3.9h1.3V13.8s0-2.3 2.3-2.3h4.4s2.2 0 2.2-2.2V5.2S15.4 3 11.5 3zm-2.2 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
            fill="#38bdf8"
          />
          <path
            d="M12.5 21c4 0 4-1.8 4-1.8v-2.2h-4.2v-.6h6.3s2.4.2 2.4-3.9-2.2-3.9-2.2-3.9h-1.3v1.6s0 2.3-2.3 2.3H10.8s-2.2 0-2.2 2.2v4.1s-.1 2.2 3.9 2.2zm2.2-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
            fill="#fbbf24"
          />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="20" height="20" x="2" y="2" rx="4" fill="#facc15" />
          <path
            d="M8.5 12v4.5c0 1.2-.8 1.5-1.8 1.5-.7 0-1.4-.3-1.7-.6l.4-1.2c.3.2.7.4 1.1.4.5 0 .7-.2.7-.8V12h1.3zm4.5 3.3c.5.3 1.1.6 1.8.6.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.4-1.2-1.1-.4-1.8-.9-1.8-1.9 0-1 .8-1.8 2.2-1.8.7 0 1.3.2 1.8.5l-.4 1.2c-.4-.2-.8-.4-1.4-.4-.6 0-.9.3-.9.7 0 .5.4.7 1.3 1.1 1.2.5 1.9 1 1.9 2 0 1.1-.9 2-2.3 2-.8 0-1.6-.3-2.1-.6l.4-1.2z"
            fill="#09090f"
          />
        </svg>
      );

    case "html":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z"
            fill="#ea580c"
            fillOpacity="0.25"
            stroke="#ea580c"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5v12.2l4.8-1.8L17.8 6.5H12z"
            fill="#f97316"
            fillOpacity="0.4"
          />
          <path
            d="M8 8.5h8m-7.5 3.5h7m-6 3.5h5.5l-.5 2-2.5 1-2.5-1-.2-1.5"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "css":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4z"
            fill="#0284c7"
            fillOpacity="0.25"
            stroke="#0284c7"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5v12.2l4.8-1.8L17.8 6.5H12z"
            fill="#0ea5e9"
            fillOpacity="0.4"
          />
          <path
            d="M8 8.5h8m-7.5 3.5h7m-6.5 3.5h6l-.6 2-2.4 1-2.4-1-.2-1.5"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            transform="rotate(60 12 12)"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.8"
            transform="rotate(120 12 12)"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="2" fill="#38bdf8" />
        </svg>
      );

    case "nextjs":
    case "next-js":
    case "next.js":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="#090d16"
            stroke="#e2e8f0"
            strokeWidth="1.6"
          />
          <path
            d="M9 8v8m0 0l7.2-9.4"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 11v5"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "tailwind":
    case "tailwind-css":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2 4.5-1.5 1 .3 1.8 1.1 2.6 1.9C15 12.2 16.5 13.5 19.5 13.5c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2-4.5 1.5-1-.3-1.8-1.1-2.6-1.9C16.5 7.3 15 6 12 6zM4.5 13.5c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2 4.5-1.5 1 .3 1.8 1.1 2.6 1.9C7.5 19.7 9 21 12 21c3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2-4.5 1.5-1-.3-1.8-1.1-2.6-1.9C9 14.8 7.5 13.5 4.5 13.5z"
            fill="#38bdf8"
          />
        </svg>
      );

    case "machine-learning":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="6" cy="6" r="2.5" fill="#14b8a6" />
          <circle cx="6" cy="18" r="2.5" fill="#14b8a6" />
          <circle cx="12" cy="12" r="3" fill="#2dd4bf" />
          <circle cx="18" cy="6" r="2.5" fill="#14b8a6" />
          <circle cx="18" cy="18" r="2.5" fill="#14b8a6" />
          <path
            d="M6 6l6 6m0 0l6-6M6 18l6-6m0 0l6 6M6 6v12M18 6v12"
            stroke="#2dd4bf"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
        </svg>
      );

    case "generative-ai":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
            fill="#c084fc"
            fillOpacity="0.3"
            stroke="#c084fc"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="2" fill="#22d3ee" />
          <circle cx="6" cy="19" r="1.5" fill="#22d3ee" />
        </svg>
      );

    case "rag":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect
            x="3"
            y="4"
            width="7"
            height="9"
            rx="1.5"
            stroke="#34d399"
            strokeWidth="1.6"
            fill="#34d399"
            fillOpacity="0.15"
          />
          <path
            d="M5 7h3m-3 3h2"
            stroke="#34d399"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="16" cy="15" r="4.5" stroke="#22d3ee" strokeWidth="1.6" />
          <path
            d="M19.5 18.5L22 21"
            stroke="#22d3ee"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 8.5h4.5a2 2 0 012 2V11"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeDasharray="2 2"
          />
        </svg>
      );

    case "llms":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect
            x="3"
            y="4"
            width="18"
            height="14"
            rx="3"
            stroke="#38bdf8"
            strokeWidth="1.8"
            fill="#0ea5e9"
            fillOpacity="0.15"
          />
          <path
            d="M7 9h10M7 13h6"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="17" cy="13" r="1.5" fill="#22d3ee" />
          <path
            d="M9 18l-3 3v-3"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "langchain":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M9 7a4 4 0 015.6 0l1.4 1.4a4 4 0 010 5.6M15 17a4 4 0 01-5.6 0l-1.4-1.4a4 4 0 010-5.6"
            stroke="#14b8a6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.2" fill="#2dd4bf" />
        </svg>
      );

    case "langgraph":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="6" cy="12" r="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.8" />
          <circle cx="18" cy="7" r="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.8" />
          <circle cx="18" cy="17" r="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.8" />
          <path
            d="M8.8 10.8l6.4-2.8m-6.4 5l6.4 2.8M18 10v4"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "llamaindex":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M5 20h14M7 16h10M9 12h6M11 8h2M12 4v16"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="4" r="2" fill="#fb7185" />
        </svg>
      );

    case "autogen":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="8" cy="9" r="3.5" stroke="#818cf8" strokeWidth="1.8" fill="#6366f1" fillOpacity="0.2" />
          <circle cx="16" cy="15" r="3.5" stroke="#a78bfa" strokeWidth="1.8" fill="#8b5cf6" fillOpacity="0.2" />
          <path
            d="M10.8 11.2l2.4 2.6M14 6l4 2-2 3"
            stroke="#c084fc"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "embeddings":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M4 19h16M4 19V5"
            stroke="#94a3b8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="9" cy="14" r="2" fill="#c084fc" />
          <circle cx="14" cy="10" r="2.5" fill="#38bdf8" />
          <circle cx="18" cy="7" r="1.8" fill="#2dd4bf" />
          <path
            d="M9 14l5-4 4-3"
            stroke="#c084fc"
            strokeWidth="1.4"
            strokeDasharray="2 2"
          />
        </svg>
      );

    case "vector-databases":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <ellipse cx="12" cy="6" rx="7" ry="2.8" stroke="#06b6d4" strokeWidth="1.8" fill="#0891b2" fillOpacity="0.2" />
          <path
            d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6"
            stroke="#06b6d4"
            strokeWidth="1.8"
          />
          <path
            d="M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6"
            stroke="#06b6d4"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="1.5" fill="#22d3ee" />
        </svg>
      );

    case "aws":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M6 9a4 4 0 017.5-1.5A3.5 3.5 0 0118 11a3 3 0 01-1 5.8H7a3.5 3.5 0 01-1-6.8z"
            stroke="#f59e0b"
            strokeWidth="1.6"
            fill="#d97706"
            fillOpacity="0.15"
          />
          <path
            d="M6 18c4 2 8 2 12-1m-1.5.2l1.5.8.5-1.6"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "docker":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="5" y="9" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
          <rect x="9" y="9" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
          <rect x="9" y="6" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
          <rect x="13" y="9" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
          <path
            d="M3 13.5c1.5.5 3 0 4.5 0s3 1.5 5 1.5 4-1 6-1 3.5 1.5 4.5 1.5c.3-1.5-.5-3.5-2.5-4.5H4c-1 1-1.5 2-1 2.5z"
            fill="#0284c7"
            fillOpacity="0.4"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <circle cx="18" cy="12" r="0.8" fill="#ffffff" />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="6" cy="18" r="2.5" stroke="#f97316" strokeWidth="1.8" fill="#ea580c" fillOpacity="0.3" />
          <circle cx="6" cy="6" r="2.5" stroke="#f97316" strokeWidth="1.8" fill="#ea580c" fillOpacity="0.3" />
          <circle cx="18" cy="10" r="2.5" stroke="#f97316" strokeWidth="1.8" fill="#ea580c" fillOpacity="0.3" />
          <path
            d="M6 8.5v7m0-4.5c2 0 5-1 7.5-2.5l2-1.5"
            stroke="#f97316"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fill="#f1f5f9"
          />
        </svg>
      );

    case "streamlit":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 4l-4 7h8l-4-7zm-4 7l-4 7h6l2-4-4-3zm8 0l-2 4 2 3h6l-6-7z"
            fill="#ff4b4b"
          />
          <path
            d="M12 4l4 7H8l4-7z"
            fill="#ff6b6b"
            fillOpacity="0.8"
          />
        </svg>
      );

    case "pinecone":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 3l3 4.5h-6L12 3zm-4.5 6l2.5 4h-5l2.5-4zm9 0l2.5 4h-5l2.5-4zM12 11l3 4.5h-6l3-4.5zm-3 6.5h6v3.5h-6v-3.5z"
            fill="#00d26a"
          />
        </svg>
      );

    default:
      return <Cpu className={`${className} text-[var(--color-accent-primary)]`} />;
  }
}
