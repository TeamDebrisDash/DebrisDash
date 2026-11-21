# DebrisDash
# 🛰️ DebrisDash — Clean the Orbit, Save the Future

**ASTRA 2026 | VIT Bhopal University**  
**Domains:** 01 (Indian Space Missions & Space Data) & 06 (Sustainable Space & Space Environment)

### 🚀 Play Live
👉 **[Launch DebrisDash]([https://akarshika7040.github.io/debris-dash/](https://teamdebrisdash.github.io/DebrisDash/))**

### 🌍 Problem & Mission
Over 36,000 pieces of tracked space debris hurtle around Earth at 25,000+ km/h, threatening active satellites and risking **Kessler Syndrome**—an unstoppable collision chain reaction. Inspired by **ISRO's Project NETRA** and India's **Debris-Free Space Missions (DFSM) 2030** goal, **DebrisDash** lets players command a PSLV orbital cleanup stage and inspect tracked Low Earth Orbit objects.

### 🎮 Key Features
* **PSLV Cleanup Mission:** Steer via Arrow keys, `WASD`, or touch/drag to capture drifting space debris while dodging high-speed asteroids.
* **5-in-a-Row Fuel Refill:** Catch 5 debris pieces consecutively to synthesize **+35% fuel**, mirroring ISRO's end-of-life fuel-budgeting discipline.
* **NETRA Live Radar:** Interactive Low Earth Orbit monitor plotting Indian satellites (*Cartosat-3*, *RISAT-2BR1*, *Oceansat-3*) alongside tracked debris clusters.
* **Kessler Impact & Leaderboard:** Visualizes real Indian satellite services impacted when orbit fails, with a local campus leaderboard and one-click score sharing.

### 🗂️ Repository Structure
```text
debris-dash/
├── index.html          # Main UI, HUD & NETRA Radar layout
├── css/
│   └── style.css       # Responsive dark-space styling & fuel indicators
├── js/
│   ├── data.js         # ISRO mission & tracked LEO object profiles
│   ├── radar.js        # Interactive NETRA Live Radar canvas & inspector
│   └── game.js         # 60 FPS PSLV physics, 5-streak fuel boost & leaderboard
└── README.md           # Project documentation & data credits
