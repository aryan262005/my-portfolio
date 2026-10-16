import React, { useRef, useEffect } from "react";
import { WORLD_BOUNDS, ZONES, WORLD_NODES, WORLD_OBSTACLES } from "./worldData";
import { sound } from "../../utils/audio";

const PLAYER_SPEED = 4.2;
const INTERACTION_DIST = 55;

export default function ExploreWorldCanvas({
  onInteract,
  onNearbyNodeChange,
  onZoneChange,
  mobileInput, // { dx, dy, isMoving }
  triggerActionSignal, // incremented when mobile interact button tapped
  teleportTarget, // { x, y } when fast-travel requested
}) {
  const canvasRef = useRef(null);

  // Game state held in refs for 60fps performance without React re-renders
  const stateRef = useRef({
    player: {
      x: 800,
      y: 640,
      vx: 0,
      vy: 0,
      direction: "up", // 'down' | 'up' | 'left' | 'right'
      walkPhase: 0,
      isMoving: false,
    },
    camera: { x: 800, y: 640 },
    keys: {},
    particles: [],
    currentZoneId: null,
    closestNodeId: null,
    time: 0,
  });

  // Find closest interactive node
  const findClosestNode = (px, py) => {
    let closest = null;
    let minDist = INTERACTION_DIST;
    for (const node of WORLD_NODES) {
      const dist = Math.hypot(node.x - px, node.y - py);
      if (dist < minDist) {
        minDist = dist;
        closest = node;
      }
    }
    return closest;
  };

  // Fast-travel teleport
  useEffect(() => {
    if (teleportTarget && typeof teleportTarget.x === "number") {
      stateRef.current.player.x = teleportTarget.x;
      stateRef.current.player.y = teleportTarget.y;
      stateRef.current.camera.x = teleportTarget.x;
      stateRef.current.camera.y = teleportTarget.y;
      sound.playFanfare();
    }
  }, [teleportTarget]);

  // Handle Mobile Action Tap
  useEffect(() => {
    if (triggerActionSignal > 0) {
      const { player } = stateRef.current;
      const nearby = findClosestNode(player.x, player.y);
      if (nearby) {
        sound.playClick();
        onInteract(nearby);
      }
    }
  }, [triggerActionSignal, onInteract]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent scrolling on arrows/space within game
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      stateRef.current.keys[e.code] = true;

      // Interaction trigger: E, Space, Enter
      if (e.code === "KeyE" || e.code === "Space" || e.code === "Enter") {
        const { player } = stateRef.current;
        const nearby = findClosestNode(player.x, player.y);
        if (nearby) {
          sound.playClick();
          onInteract(nearby);
        }
      }
    };

    const handleKeyUp = (e) => {
      stateRef.current.keys[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onInteract]);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;

    // Responsive Canvas Resizing
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.imageSmoothingEnabled = true;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Collision Helper
    const checkCollision = (nextX, nextY) => {
      const radius = 15;

      // Map bounds
      if (
        nextX - radius < 40 ||
        nextX + radius > WORLD_BOUNDS.width - 40 ||
        nextY - radius < 40 ||
        nextY + radius > WORLD_BOUNDS.height - 40
      ) {
        return true;
      }

      // Obstacles
      for (const obs of WORLD_OBSTACLES) {
        if (
          nextX + radius > obs.x &&
          nextX - radius < obs.x + obs.w &&
          nextY + radius > obs.y &&
          nextY - radius < obs.y + obs.h
        ) {
          return true;
        }
      }

      return false;
    };

    // Render loop
    const render = () => {
      const state = stateRef.current;
      state.time += 0.016;
      const { player, camera, keys } = state;

      // --- 1. MOVEMENT PHYSICS ---
      let inputX = 0;
      let inputY = 0;

      // Keyboard
      if (keys["KeyW"] || keys["ArrowUp"]) inputY -= 1;
      if (keys["KeyS"] || keys["ArrowDown"]) inputY += 1;
      if (keys["KeyA"] || keys["ArrowLeft"]) inputX -= 1;
      if (keys["KeyD"] || keys["ArrowRight"]) inputX += 1;

      // Virtual Mobile input
      if (mobileInput && mobileInput.isMoving) {
        inputX = mobileInput.dx;
        inputY = mobileInput.dy;
      }

      // Normalize diagonal
      const length = Math.hypot(inputX, inputY);
      if (length > 0) {
        inputX /= length;
        inputY /= length;
        player.isMoving = true;
        player.walkPhase += 0.22;

        // Direction
        if (Math.abs(inputX) > Math.abs(inputY)) {
          player.direction = inputX > 0 ? "right" : "left";
        } else {
          player.direction = inputY > 0 ? "down" : "up";
        }
      } else {
        player.isMoving = false;
      }

      // Apply movement with wall slide
      const stepX = inputX * PLAYER_SPEED;
      const stepY = inputY * PLAYER_SPEED;

      // Try X
      if (!checkCollision(player.x + stepX, player.y)) {
        player.x += stepX;
      }
      // Try Y
      if (!checkCollision(player.x, player.y + stepY)) {
        player.y += stepY;
      }

      // Footstep particles
      if (player.isMoving && Math.random() < 0.25) {
        state.particles.push({
          x: player.x + (Math.random() - 0.5) * 10,
          y: player.y + 14 + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.5 + 1,
          alpha: 0.6,
          color: "rgba(0, 242, 254, ",
        });
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        if (p.alpha <= 0) {
          state.particles.splice(i, 1);
        }
      }

      // --- 2. CAMERA LERP ---
      const viewW = canvas.clientWidth;
      const viewH = canvas.clientHeight;
      const targetCamX = Math.max(viewW / 2, Math.min(WORLD_BOUNDS.width - viewW / 2, player.x));
      const targetCamY = Math.max(viewH / 2, Math.min(WORLD_BOUNDS.height - viewH / 2, player.y));

      camera.x += (targetCamX - camera.x) * 0.08;
      camera.y += (targetCamY - camera.y) * 0.08;

      // --- 3. ZONE & PROXIMITY DETECTION ---
      let detectedZone = null;
      for (const zone of ZONES) {
        if (Math.hypot(zone.x - player.x, zone.y - player.y) < zone.radius) {
          detectedZone = zone;
          break;
        }
      }

      if (detectedZone?.id !== state.currentZoneId) {
        state.currentZoneId = detectedZone?.id || null;
        onZoneChange(detectedZone);
        if (detectedZone) {
          sound.playChirp();
        }
      }

      const nearbyNode = findClosestNode(player.x, player.y);
      if (nearbyNode?.id !== state.closestNodeId) {
        state.closestNodeId = nearbyNode?.id || null;
        onNearbyNodeChange(nearbyNode);
      }

      // --- 4. RENDER WORLD ---
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, viewW, viewH);

      // Camera Transform
      ctx.translate(viewW / 2 - camera.x, viewH / 2 - camera.y);

      // 4A. Background Grid & Space
      ctx.fillStyle = "#07070d";
      ctx.fillRect(0, 0, WORLD_BOUNDS.width, WORLD_BOUNDS.height);

      // Faint cyber grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x <= WORLD_BOUNDS.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WORLD_BOUNDS.height);
        ctx.stroke();
      }
      for (let y = 0; y <= WORLD_BOUNDS.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WORLD_BOUNDS.width, y);
        ctx.stroke();
      }

      // 4B. Energy Conduits Connecting Zones (pulsing neon highway)
      const conduitPaths = [
        [{ x: 800, y: 600 }, { x: 350, y: 320 }], // Home to Projects
        [{ x: 800, y: 600 }, { x: 1250, y: 320 }], // Home to Skills
        [{ x: 800, y: 600 }, { x: 350, y: 880 }], // Home to Trophies
        [{ x: 800, y: 600 }, { x: 1250, y: 880 }], // Home to Arcade
        [{ x: 800, y: 600 }, { x: 800, y: 1040 }], // Home to Contact
        [{ x: 800, y: 600 }, { x: 140, y: 600 }], // Home to Secret Coffee
        [{ x: 800, y: 600 }, { x: 1460, y: 600 }], // Home to Secret Shrine
        [{ x: 800, y: 600 }, { x: 800, y: 120 }], // Home to Secret Debug
      ];

      for (const [start, end] of conduitPaths) {
        // Base line
        ctx.strokeStyle = "rgba(0, 242, 254, 0.12)";
        ctx.lineWidth = 16;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        // Pulsing core beam
        ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
        ctx.lineWidth = 3;
        ctx.setLineDash([12, 18]);
        ctx.lineDashOffset = -state.time * 40;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4C. Zones Ambient Floors & Halos
      for (const zone of ZONES) {
        // Radial floor glow
        const grad = ctx.createRadialGradient(
          zone.x,
          zone.y,
          10,
          zone.x,
          zone.y,
          zone.radius
        );
        grad.addColorStop(0, `rgba(${zone.accentRgb}, 0.18)`);
        grad.addColorStop(0.7, `rgba(${zone.accentRgb}, 0.06)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
        ctx.fill();

        // Zone boundary circuit ring
        ctx.strokeStyle = `rgba(${zone.accentRgb}, 0.35)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, zone.radius - 10, 0, Math.PI * 2);
        ctx.stroke();

        // Zone Name holographic watermark on floor
        ctx.font = "bold 18px monospace";
        ctx.fillStyle = `rgba(${zone.accentRgb}, 0.3)`;
        ctx.textAlign = "center";
        ctx.fillText(zone.name.toUpperCase(), zone.x, zone.y - zone.radius + 35);
      }

      // 4D. Walls & Barriers
      for (const obs of WORLD_OBSTACLES) {
        // Shadow/glow
        ctx.fillStyle = "#12121f";
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        // Neon top edge
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
      }

      // 4E. Render Interactive Nodes (Terminals / Pedestals)
      for (const node of WORLD_NODES) {
        const isNearby = nearbyNode?.id === node.id;
        const bob = Math.sin(state.time * 3 + node.x * 0.05) * 3;

        // Base pedestal shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.beginPath();
        ctx.ellipse(node.x, node.y + 12, node.radius * 0.9, node.radius * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pedestal base ring
        ctx.strokeStyle = isNearby ? node.color : "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = isNearby ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y + 8, node.radius * 0.75, 0, Math.PI * 2);
        ctx.stroke();

        // Cylindrical Hologram Terminal Body
        const termGrad = ctx.createLinearGradient(node.x - 12, node.y - 15, node.x + 12, node.y + 8);
        termGrad.addColorStop(0, node.color);
        termGrad.addColorStop(1, "#10101c");

        ctx.fillStyle = termGrad;
        ctx.beginPath();
        ctx.roundRect(node.x - 12, node.y - 12, 24, 20, [4]);
        ctx.fill();

        // Terminal glowing screen
        ctx.fillStyle = isNearby ? "#ffffff" : node.color;
        ctx.fillRect(node.x - 8, node.y - 8, 16, 10);

        // Floating Holographic Glyph above terminal
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y - 24 + bob, 7, 0, Math.PI * 2);
        ctx.fill();

        // Outer beacon ring when nearby
        if (isNearby) {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          const pulseRadius = node.radius + Math.sin(state.time * 6) * 4;
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Floating prompt badge
          ctx.font = "bold 11px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText("⚡ [E] INTERACT", node.x, node.y - 38 + bob);
        } else {
          // Subtle name label
          ctx.font = "10px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.textAlign = "center";
          ctx.fillText(node.name.split("//")[0].trim(), node.x, node.y + 28);
        }
      }

      // 4F. Particles (footstep sparks)
      for (const p of state.particles) {
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4G. Render Character Avatar
      const bobWalk = player.isMoving ? Math.sin(player.walkPhase) * 2.5 : 0;
      const legOffset = player.isMoving ? Math.cos(player.walkPhase) * 4 : 0;

      // Aura ring beneath character
      ctx.fillStyle = "rgba(0, 242, 254, 0.22)";
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 14, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.ellipse(player.x, player.y + 12, 11, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dual Feet
      ctx.fillStyle = "#1e1e2f";
      // Left foot
      ctx.fillRect(player.x - 7, player.y + 8 + legOffset, 5, 6);
      // Right foot
      ctx.fillRect(player.x + 2, player.y + 8 - legOffset, 5, 6);

      // Torso / Cyber Hoodie
      ctx.fillStyle = "#0c0d17";
      ctx.beginPath();
      ctx.roundRect(player.x - 9, player.y - 6 + bobWalk, 18, 16, [4]);
      ctx.fill();

      // Neon Trim Stripe on chest
      ctx.strokeStyle = "var(--color-accent-primary, #00f2fe)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(player.x - 6, player.y + 1 + bobWalk);
      ctx.lineTo(player.x + 6, player.y + 1 + bobWalk);
      ctx.stroke();

      // Head
      ctx.fillStyle = "#ffdfba"; // skin
      ctx.beginPath();
      ctx.arc(player.x, player.y - 12 + bobWalk, 8.5, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Hair (cool anime developer silhouette)
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath();
      ctx.arc(player.x, player.y - 15 + bobWalk, 9.5, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(player.x - 9.5, player.y - 15 + bobWalk, 3, 7);
      ctx.fillRect(player.x + 6.5, player.y - 15 + bobWalk, 3, 7);

      // Glowing Cyber Visor / Eyes based on facing direction
      ctx.fillStyle = "#00f2fe";
      if (player.direction === "down") {
        ctx.fillRect(player.x - 5, player.y - 13 + bobWalk, 10, 3);
      } else if (player.direction === "up") {
        // Back of head, hair visible
      } else if (player.direction === "left") {
        ctx.fillRect(player.x - 7, player.y - 13 + bobWalk, 5, 3);
      } else if (player.direction === "right") {
        ctx.fillRect(player.x + 2, player.y - 13 + bobWalk, 5, 3);
      }

      // Overhead Player Tag
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "#00f2fe";
      ctx.textAlign = "center";
      ctx.fillText("ARYAN [DEV]", player.x, player.y - 28 + bobWalk);

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileInput, onNearbyNodeChange, onZoneChange, onInteract]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black select-none touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
}
