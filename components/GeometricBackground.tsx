"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Momentum & Physics tracking
    let targetMomentum = 1.0;
    let currentMomentum = 1.0;
    let lastScrollY = window.scrollY;
    let lastMouseX = width / 2;
    let lastMouseY = height / 2;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
      // Add scroll velocity to momentum
      targetMomentum = Math.min(4.5, targetMomentum + delta * 0.025);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      // Add mouse velocity to momentum
      targetMomentum = Math.min(4.0, targetMomentum + dist * 0.008);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 3D Geometric Polyhedron (Icosahedron) Definition ---
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize vertices
    const vertices: Point3D[] = baseVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    });

    // Build edges for Icosahedron (edges between vertices at distance ~ 1.05)
    const edges: Edge[] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.15) {
          edges.push({ a: i, b: j });
        }
      }
    }

    // Floating particles / node grid
    const nodeCount = 35;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Rotation state for geometry
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // Outer concentric geometric ring rotation state
    let ringAngle = 0;

    // Render loop
    const render = () => {
      // Decay target momentum towards base speed (1.0)
      targetMomentum += (1.0 - targetMomentum) * 0.035;
      // Smooth interpolation for current momentum
      currentMomentum += (targetMomentum - currentMomentum) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // --- 1. Background Ambient Subtle Radial Glow ---
      const glowX = width * 0.5 + Math.sin(rotY * 0.5) * 100;
      const glowY = height * 0.3 + Math.cos(rotX * 0.5) * 80;
      const bgGlow = ctx.createRadialGradient(
        glowX,
        glowY,
        50,
        glowX,
        glowY,
        Math.max(width, height) * 0.6
      );
      bgGlow.addColorStop(0, "rgba(220, 38, 38, 0.07)");
      bgGlow.addColorStop(0.5, "rgba(127, 29, 29, 0.03)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // --- 2. Floating Geometric Nodes & Constellation Grid ---
      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Move nodes scaled by current momentum
        n.x += n.vx * currentMomentum;
        n.y += n.vy * currentMomentum;
        n.pulse += 0.02 * currentMomentum;

        // Wrap around screen boundaries
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Draw node
        const currentRadius = n.radius + Math.sin(n.pulse) * 0.5;
        const opacity = 0.25 + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.2, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineOpacity = (1 - dist / 140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${lineOpacity})`;
            ctx.stroke();
          }
        }
      }

      // --- 3. Interactive Rotating 3D Icosahedron Geometry ---
      // Update rotation angles with momentum
      rotX += 0.003 * currentMomentum;
      rotY += 0.005 * currentMomentum;
      rotZ += 0.002 * currentMomentum;

      const scale = Math.min(width, height) * 0.22;
      const centerX = width * 0.82; // Position subtly in upper-right / hero background
      const centerY = height * 0.38;

      // Rotate 3D vertices
      const projected: { x: number; y: number; z: number }[] = vertices.map(
        (v) => {
          // Rotate around X
          let y1 = v.y * Math.cos(rotX) - v.z * Math.sin(rotX);
          let z1 = v.y * Math.sin(rotX) + v.z * Math.cos(rotX);
          let x1 = v.x;

          // Rotate around Y
          let x2 = x1 * Math.cos(rotY) + z1 * Math.sin(rotY);
          let z2 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY);
          let y2 = y1;

          // Rotate around Z
          let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
          let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
          let z3 = z2;

          // Perspective projection
          const fov = 4;
          const perspective = fov / (fov + z3);

          return {
            x: centerX + x3 * scale * perspective,
            y: centerY + y3 * scale * perspective,
            z: z3,
          };
        }
      );

      // Draw Edges
      edges.forEach((edge) => {
        const p1 = projected[edge.a];
        const p2 = projected[edge.b];
        // Fade depth
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.05, 0.22 + avgZ * 0.12);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Vertex Dots
      projected.forEach((p) => {
        const alpha = Math.max(0.1, 0.4 + p.z * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 100, ${alpha})`;
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 8 * currentMomentum;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur
      });

      // --- 4. Concentric Minimal Geometric Ring Matrix ---
      ringAngle += 0.004 * currentMomentum;
      const ringRadius = scale * 1.55;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ringAngle);

      // Outer dashed circle
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.15)";
      ctx.setLineDash([6, 12]);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner polygon ring (Octagon)
      ctx.setLineDash([]);
      ctx.beginPath();
      const sides = 8;
      for (let i = 0; i < sides; i++) {
        const a = (i * Math.PI * 2) / sides;
        const px = Math.cos(a) * (ringRadius * 0.85);
        const py = Math.sin(a) * (ringRadius * 0.85);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.1)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();

      // Request next frame
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
