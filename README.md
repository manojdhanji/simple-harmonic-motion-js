# Simple Harmonic Motion Visualizer (Accessible, WCAG‑Compliant)

A modern, accessible, browser‑based visualization of **Simple Harmonic Motion (SHM)** — rebuilt from an original QBASIC program and redesigned with **WCAG** and **ARIA** standards in mind.  
This tool helps students explore the relationship between circular motion, sinusoidal projection, and the time‑domain graphs of **displacement**, **velocity**, and **acceleration**.

---

## 🎯 Features

###  Interactive SHM Simulation
- Adjustable radius and mode (displacement, velocity, acceleration)
- Real‑time animation using HTML Canvas
- Clear coordinate axes with consistent scaling
- Smooth rendering using `requestAnimationFrame`

###  Time‑Domain Graphs
The app visualizes the classic SHM relationships:

Displacement:  x(t) = r cos(ωt)
Velocity:      v(t) = -rω sin(ωt)
Acceleration:  a(t) = -rω² cos(ωt)

Each graph is phase‑shifted by 90°, showing how derivatives of sinusoidal motion behave over time.

###  Accessibility (WCAG + ARIA)
This project was rebuilt with accessibility as a first‑class requirement:

- Semantic HTML structure (`<main>`, `<section>`, `<form>`)
- Properly labeled inputs and controls
- Keyboard‑friendly interaction
- ARIA attributes for validation and announcements
- High‑contrast visuals and predictable focus order
- No reliance on color alone for meaning

###  Modernized Architecture
- Clean separation between UI and drawing logic
- No external frameworks required
- Dockerized deployment using nginx
- Works consistently across Chromium‑based browsers

---

## 📂 Project Structure
\\\
simple-harmonic-motion-js/
├── Dockerfile
├── README.md
├── css
│   └── styles.css
├── docker-compose.yaml
├── nginx.conf
├── scripts
│   ├── app.js
|   └── drawing.js
└── shm.html
\\\
---


## 🐳 Running with Docker

Build the image:

```bash
docker compose build --no-cache
```

Run the container:
```bash
docker compose up -d
```

Visit:
http://localhost/shm.html

---

## 🔍 Architecture Diagram
\\\
┌──────────────────────────────────────────────┐
│                  UI Layer                    │
│  - Accessible form controls                  │
│  - WCAG/ARIA semantics                       │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│               Application Logic              │
│  app.js                                      │
│  - Reads parameters                          │
│  - Handles reset + animation state           │
│  - Bridges UI → drawing engine               │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│               Drawing Engine                 │
│  drawing.js                                  │
│  - Canvas rendering                          │
│  - SHM math (cos, sin, derivatives)          │
│  - Time graph plotting                       │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│                 Deployment                   │
│  Docker → nginx → static hosting             │
└──────────────────────────────────────────────┘
\\\

