import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  RefreshCw,
  Download,
  Send,
  X,
  RotateCcw,
  Check,
  AlertCircle,
  Lock,
  Upload,
  ShieldCheck,
  SwitchCamera,
} from "lucide-react";
import { sound } from "../../utils/audio";
import { saveSubmission } from "./photoboothStorage";

export default function PhotoBoothModal({ isOpen, onClose, onOpenAdminVault }) {
  const [step, setStep] = useState("intro"); // "intro" | "camera" | "preview" | "submitting" | "success" | "error"
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // "user" | "environment"
  const [availableCameras, setAvailableCameras] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState("");
  const [countdownDuration, setCountdownDuration] = useState(3); // 0 | 3 | 5
  const [currentCountdown, setCurrentCountdown] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Optional visitor form
  const [visitorName, setVisitorName] = useState("");
  const [visitorContact, setVisitorContact] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera helper
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Cleanup camera stream on unmount or close
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  // Handle modal close
  const handleClose = () => {
    stopCameraStream();
    setStep("intro");
    setCapturedImage(null);
    setCurrentCountdown(null);
    setFacingMode("user"); // Always reset default to front camera
    setActiveDeviceId("");
    onClose();
  };

  // Ensure video element plays when entering camera step
  useEffect(() => {
    if (step === "camera" && videoRef.current && streamRef.current) {
      if (videoRef.current.srcObject !== streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      videoRef.current.play?.().catch(() => {});
    }
  }, [step]);

  // Helper to enumerate video devices
  const refreshDevices = async () => {
    try {
      if (navigator.mediaDevices?.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === "videoinput");
        setAvailableCameras(videoInputs);
        return videoInputs;
      }
    } catch (err) {
      console.warn("Could not enumerate media devices", err);
    }
    return [];
  };

  // Helper to request getUserMedia with multi-tier fallback
  const requestCameraStream = async (constraintsList) => {
    let lastError = null;
    for (const constraints of constraintsList) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (stream) return stream;
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error("Failed to acquire camera stream.");
  };

  // Start Camera with strict front-facing preference by default
  const startCamera = async (targetMode = "user", explicitDeviceId = null) => {
    stopCameraStream();
    setErrorMessage("");

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error("Camera API is not supported in this browser.");
      }

      // Refresh known cameras
      const devices = await refreshDevices();

      // Find best matching device if explicit or from label heuristic
      let chosenDeviceId = explicitDeviceId;
      if (!chosenDeviceId && devices.length > 1) {
        if (targetMode === "user") {
          // Look for device with front/user/selfie/facetime/integrated in label
          const frontMatch = devices.find((d) =>
            /(front|user|selfie|face|integrated|internal)/i.test(d.label)
          );
          if (frontMatch) chosenDeviceId = frontMatch.deviceId;
        } else if (targetMode === "environment") {
          // Look for device with back/rear/environment/world/main in label
          const backMatch = devices.find((d) =>
            /(back|rear|environment|world|main)/i.test(d.label)
          );
          if (backMatch) {
            chosenDeviceId = backMatch.deviceId;
          } else if (activeDeviceId) {
            // Pick other camera if no label match
            const other = devices.find((d) => d.deviceId !== activeDeviceId);
            if (other) chosenDeviceId = other.deviceId;
          }
        }
      }

      // Build fallback constraint attempts
      const attempts = [];

      // 1. If we found a specific deviceId
      if (chosenDeviceId) {
        attempts.push({
          video: {
            deviceId: { exact: chosenDeviceId },
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        });
      }

      // 2. Strict facingMode exact match (forces mobile browsers and tablets to choose front camera)
      attempts.push({
        video: {
          facingMode: { exact: targetMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      // 3. Ideal facingMode
      attempts.push({
        video: {
          facingMode: { ideal: targetMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      // 4. Standard resolution video constraint (for external USB webcams on PC/Mac)
      attempts.push({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      // 5. Permissive fallback
      attempts.push({
        video: true,
        audio: false,
      });

      let stream = await requestCameraStream(attempts);

      // Inspect acquired stream
      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack?.getSettings?.() || {};
      let acquiredDeviceId = settings.deviceId || chosenDeviceId || "";

      // Post-acquisition verification:
      // If we asked for FRONT ('user') but on a multi-camera device the browser handed back a back camera:
      const updatedDevices = await refreshDevices();
      if (targetMode === "user" && updatedDevices.length > 1) {
        const activeDev = updatedDevices.find((d) => d.deviceId === acquiredDeviceId);
        const isBackLabel = activeDev && /(back|rear|environment|world|main)/i.test(activeDev.label);
        const frontCandidate = updatedDevices.find((d) =>
          /(front|user|selfie|face|integrated|internal)/i.test(d.label)
        );

        if ((settings.facingMode === "environment" || isBackLabel) && frontCandidate && frontCandidate.deviceId !== acquiredDeviceId) {
          // Switch immediately to the front candidate
          stream.getTracks().forEach((t) => t.stop());
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: frontCandidate.deviceId },
              width: { ideal: 1280 },
              height: { ideal: 960 },
            },
            audio: false,
          });
          acquiredDeviceId = frontCandidate.deviceId;
        }
      }

      streamRef.current = stream;
      setActiveDeviceId(acquiredDeviceId);
      setFacingMode(targetMode);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play?.().catch(() => {});
      }

      setStep("camera");
      sound.playClick();
    } catch (err) {
      console.warn("Camera access denied or failed", err);
      setErrorMessage(
        "Camera access was denied or is not available. Please allow camera permissions in your browser or upload a photo."
      );
      setStep("intro");
    }
  };

  // Flip Camera between Front and Back
  const handleFlipCamera = async () => {
    sound.playClick();
    const nextMode = facingMode === "user" ? "environment" : "user";

    // Refresh devices to see if we can identify specific target device
    const devices = availableCameras.length ? availableCameras : await refreshDevices();
    let targetDeviceId = null;

    if (devices.length > 1) {
      if (nextMode === "environment") {
        const back = devices.find((d) => /(back|rear|environment|world|main)/i.test(d.label));
        if (back) {
          targetDeviceId = back.deviceId;
        } else {
          const other = devices.find((d) => d.deviceId !== activeDeviceId);
          if (other) targetDeviceId = other.deviceId;
        }
      } else {
        const front = devices.find((d) => /(front|user|selfie|face|integrated|internal)/i.test(d.label));
        if (front) {
          targetDeviceId = front.deviceId;
        } else {
          const other = devices.find((d) => d.deviceId !== activeDeviceId);
          if (other) targetDeviceId = other.deviceId;
        }
      }
    }

    await startCamera(nextMode, targetDeviceId);
  };

  // Trigger Capture with Countdown
  const triggerCapture = () => {
    if (countdownDuration === 0) {
      captureFrame();
      return;
    }

    sound.playClick();
    let count = countdownDuration;
    setCurrentCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        sound.playClick();
        setCurrentCountdown(count);
      } else {
        clearInterval(timer);
        setCurrentCountdown(null);
        captureFrame();
      }
    }, 1000);
  };

  // Capture frame from video to canvas
  const captureFrame = () => {
    if (!videoRef.current) return;

    // Trigger flash animation
    setIsFlashActive(true);
    sound.playFanfare();
    setTimeout(() => setIsFlashActive(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Flip horizontally if front camera for natural selfie look
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Subtle watermark stamp
    ctx.restore();
    ctx.font = "bold 16px monospace";
    ctx.fillStyle = "rgba(34, 211, 238, 0.85)";
    ctx.fillText("PORTFOLIO // ARYAN 2026", 20, canvas.height - 20);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCameraStream();
    setStep("preview");
  };

  // Fallback Upload
  const handleUploadPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setCapturedImage(event.target.result);
        setStep("preview");
      }
    };
    reader.readAsDataURL(file);
  };

  // Download locally
  const handleDownload = () => {
    if (!capturedImage) return;
    sound.playClick();
    const a = document.createElement("a");
    a.href = capturedImage;
    a.download = `aryan_portfolio_photobooth_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Send photo to Aryan's private collection
  const handleSendPhoto = async () => {
    if (!capturedImage) return;

    sound.playClick();
    setStep("submitting");

    try {
      await new Promise((r) => setTimeout(r, 600));
      saveSubmission({
        imageData: capturedImage,
        name: visitorName,
        contact: visitorContact,
      });

      sound.playFanfare();
      setStep("success");
    } catch (e) {
      console.error(e);
      setStep("error");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-xl rounded-3xl bg-[var(--color-bg-card)]/95 border border-[var(--color-border-accent)] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_var(--color-accent-glow)] backdrop-blur-xl overflow-hidden z-10 my-auto"
        >
          {/* Shutter Camera Flash Overlay */}
          {isFlashActive && (
            <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-out fade-out duration-200" />
          )}

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)]">
                <Camera size={18} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono-code flex items-center gap-2">
                  PHOTO BOOTH
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] font-bold border border-[var(--color-border-accent)]">
                    INTERACTIVE
                  </span>
                </h3>
                <p className="text-[11px] font-mono-code text-slate-400">
                  Take a picture while you're visiting Aryan's portfolio
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 bg-[var(--color-bg-dark)]/95">
            {/* STEP 1: INTRO */}
            {step === "intro" && (
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-[var(--color-accent-primary)]/10 border-2 border-[var(--color-border-accent)] flex items-center justify-center text-[var(--color-accent-primary)] mb-4 shadow-[0_0_25px_var(--color-accent-glow)]">
                  <Camera size={32} />
                </div>
                <h4 className="text-xl font-bold font-mono-code text-white mb-2">
                  Leave Your Mark
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md font-sans leading-relaxed mb-6">
                  Snap a quick photo with your webcam or selfie camera. You can keep it as a souvenir or send it directly to Aryan!
                </p>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono-code text-rose-300 flex items-center gap-2 text-left">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
                  <button
                    onClick={() => startCamera("user")}
                    className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-black font-mono-code font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Camera size={16} />
                    <span>Turn Camera On</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-mono-code text-xs sm:text-sm border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Upload size={15} />
                    <span>Upload Photo</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[11px] font-mono-code text-slate-500">
                  <ShieldCheck size={13} className="text-[var(--color-accent-primary)]" />
                  <span>Camera access is requested only when you click "Turn Camera On".</span>
                </div>
              </div>
            )}

            {/* STEP 2: LIVE CAMERA PREVIEW */}
            {step === "camera" && (
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden border-2 border-[var(--color-border-accent)] shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${
                      facingMode === "user" ? "-scale-x-100" : ""
                    }`}
                  />

                  {currentCountdown !== null && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-7xl font-extrabold font-mono-code text-[var(--color-accent-primary)] animate-ping">
                        {currentCountdown}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[var(--color-accent-primary)] pointer-events-none" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[var(--color-accent-primary)] pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[var(--color-accent-primary)] pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[var(--color-accent-primary)] pointer-events-none" />
                </div>

                <div className="mt-4 w-full flex items-center justify-between gap-2">
                  <button
                    onClick={handleFlipCamera}
                    title={`Switch Camera (${facingMode === "user" ? "Front → Back" : "Back → Front"})`}
                    className="p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <SwitchCamera size={18} className="text-[var(--color-accent-primary)] group-hover:rotate-180 transition-transform duration-300" />
                    <span className="text-xs font-mono-code text-slate-300 font-semibold hidden sm:inline">
                      {facingMode === "user" ? "Back Camera" : "Front Camera"}
                    </span>
                  </button>

                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setCountdownDuration(0)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code ${
                        countdownDuration === 0 ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
                      }`}
                    >
                      Instant
                    </button>
                    <button
                      onClick={() => setCountdownDuration(3)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code ${
                        countdownDuration === 3 ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
                      }`}
                    >
                      3s
                    </button>
                    <button
                      onClick={() => setCountdownDuration(5)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-code ${
                        countdownDuration === 5 ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
                      }`}
                    >
                      5s
                    </button>
                  </div>

                  <button
                    onClick={triggerCapture}
                    title="Capture Photo"
                    className="px-6 py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer"
                  >
                    <Camera size={16} />
                    <span>Capture</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PREVIEW & SEND FORM */}
            {step === "preview" && (
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden border-2 border-[var(--color-border-accent)] shadow-2xl mb-4">
                  <img
                    src={capturedImage}
                    alt="Captured preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 mb-4 space-y-3">
                  <span className="text-xs font-mono-code font-bold text-[var(--color-accent-primary)] block">
                    WANT ARYAN TO KNOW WHO TOOK THIS? (OPTIONAL)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name..."
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[var(--color-bg-surface)] border border-white/10 text-xs text-white placeholder-slate-500 font-mono-code focus:outline-none focus:border-[var(--color-accent-primary)]"
                    />
                    <input
                      type="text"
                      placeholder="Email or @Instagram..."
                      value={visitorContact}
                      onChange={(e) => setVisitorContact(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[var(--color-bg-surface)] border border-white/10 text-xs text-white placeholder-slate-500 font-mono-code focus:outline-none focus:border-[var(--color-accent-primary)]"
                    />
                  </div>

                  <p className="text-[10px] font-mono-code text-slate-400">
                    🔒 <span className="text-slate-300">Privacy Notice:</span> Your photo will be sent directly to Aryan's private collection. Other visitors cannot view your picture.
                  </p>
                </div>

                <div className="w-full flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      startCamera();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono-code text-xs border border-white/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Retake</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[var(--color-accent-primary)] font-mono-code text-xs border border-[var(--color-border-accent)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={handleSendPhoto}
                      className="px-5 py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_var(--color-accent-glow)] cursor-pointer"
                    >
                      <Send size={14} />
                      <span>Send to Aryan</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SUBMITTING */}
            {step === "submitting" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <RefreshCw size={36} className="text-[var(--color-accent-primary)] animate-spin mb-3" />
                <h4 className="text-lg font-bold font-mono-code text-white">
                  TRANSMITTING TO ARYAN...
                </h4>
                <p className="text-xs text-slate-400 font-mono-code mt-1">
                  Encrypting and delivering to private vault
                </p>
              </div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === "success" && (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-primary)]/20 border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] flex items-center justify-center mb-4 shadow-[0_0_20px_var(--color-accent-glow)]">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-bold font-mono-code text-white mb-1">
                  PHOTO SENT!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mb-6 font-sans">
                  Your photo has been delivered to Aryan's private collection. Thanks for stopping by!
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setStep("intro");
                      setCapturedImage(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono-code text-xs border border-white/10"
                  >
                    Take Another
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-5 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs"
                  >
                    Back to Playground
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: ERROR */}
            {step === "error" && (
              <div className="flex flex-col items-center text-center py-8">
                <AlertCircle size={36} className="text-rose-400 mb-2" />
                <h4 className="text-lg font-bold font-mono-code text-white">
                  TRANSMISSION FAILED
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4">
                  Something went wrong while sending the photo. Don't worry, your photo is still safe in memory!
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-white/5 text-[var(--color-accent-primary)] font-mono-code text-xs border border-white/10"
                  >
                    Download Instead
                  </button>
                  <button
                    onClick={handleSendPhoto}
                    className="px-5 py-2 rounded-xl bg-[var(--color-accent-primary)] text-black font-bold font-mono-code text-xs"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Private Admin Vault Link */}
          <div className="p-3 px-6 border-t border-white/10 bg-[var(--color-bg-surface)]/60 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
            <span>Clean session: video tracks auto-close on exit</span>

            <button
              onClick={() => {
                sound.playClick();
                handleClose();
                onOpenAdminVault();
              }}
              title="Admin access to view submitted photos"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer"
            >
              <Lock size={10} />
              <span>Admin Vault</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

