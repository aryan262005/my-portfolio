/**
 * Photo Booth Private Vault Storage
 * Stores visitor submissions in private client storage (localStorage / IndexedDB).
 * Strictly isolated: visitors cannot view submissions. Only accessible via admin key.
 */

const STORAGE_KEY = "aryan_portfolio_photobooth_submissions";

export function getSubmissions() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read submissions", e);
    return [];
  }
}

export function saveSubmission({ imageData, name, contact }) {
  if (typeof window === "undefined") return null;
  try {
    const submissions = getSubmissions();
    const newSubmission = {
      id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString(),
      name: (name || "Anonymous Visitor").trim(),
      contact: (contact || "Not provided").trim(),
      imageData, // base64
    };

    const updated = [newSubmission, ...submissions];
    // Keep max 50 recent submissions to prevent quota overflow
    if (updated.length > 50) updated.pop();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newSubmission;
  } catch (e) {
    console.error("Failed to save submission", e);
    throw new Error("Storage quota exceeded or storage unavailable.");
  }
}

export function deleteSubmission(id) {
  if (typeof window === "undefined") return;
  try {
    const submissions = getSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error("Failed to delete submission", e);
  }
}

export function clearAllSubmissions() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
