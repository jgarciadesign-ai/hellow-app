# HELLOW — Complete UI Design System & Deployment Package

Everything you need to take **HELLOW** from this interactive prototype to a live production web & iOS-ready app is included in the three files generated in your workspace:

1. **`App.jsx`** — Complete React + Tailwind CSS frontend (Radar Map, 3D Fanned Cards, My Persona, 11-Tier Progression Meter, Custom Red-Glass & Social Icebreakers, Live `+5 pts/min` Conversation Timer, and Mutual Partner Rewards).
2. **`database_schema.sql`** — Production PostgreSQL + PostGIS database schema, RPC functions (`get_nearby_people`, `award_conversation_minute`), and Row-Level Security (RLS) policies for **Supabase**.
3. **`LAUNCH_GUIDE.md`** — This design token reference & 5-minute deployment guide.

---

## 1. UI Design System & Glassmorphism Tokens

### Color Themes
- **Obsidian Violet & Crimson (`violet-crimson`)**
  - Top Background Surface: `#141518`
  - Horizon Glow: `#5B5EF5` / `#6366FF`
  - Active Action / Crimson Highlight: `#EF1E5A`
- **Forest Mint (`forest-mint`)**
  - Top Background Surface: `#060D0A`
  - Horizon Glow: `#40916C` / `#B7E4C7`
  - Primary Mint Accent: `#8BBB92`

### Typography
- **Display & Body Font:** `DM Sans` & `Inter` (`-apple-system, BlinkMacSystemFont`)
- **Brand Wordmark (`HELLOW`):** `DM Sans` Medium (`500`), `0.16em` letter-spacing

### Specular Glass Surfaces
- **`.apple-glass` / `.apple-glass-strong`:** Frosted `backdrop-filter: blur(24px–30px)` with a `1px` `border-box` directional white-to-transparent corner sheen gradient.
- **`.red-glass`:** Crimson-tinted frosted glass (`rgba(239, 30, 90, 0.32)`) used for **custom icebreaker cards** and **actively connected peers**.
- **`.wood-glass-pill`:** Smoked translucent pill surface for floating map badges, inputs, and bottom navigation.

### 11-Tier Social Connection Progression (`0` to `1,000+` Connections)
| Level | Tier Title | Badge |
| :--- | :--- | :---: |
| **Lvl 1** | Wallflower | 🌱 |
| **Lvl 2** | Acquaintance | 👋 |
| **Lvl 3** | Regular | ☕ |
| **Lvl 4** | Mingler | 🥂 |
| **Lvl 5** | Conversationalist | 💬 |
| **Lvl 6** | Social Butterfly | 🦋 |
| **Lvl 7** | Networker | 🔗 |
| **Lvl 8** | Icebreaker | 🧊 |
| **Lvl 9** | Storyteller | 📖 |
| **Lvl 10** | Charmer | ✨ |
| **Lvl 11** | Life-of-the-Party | 🪩 |
| **1,000+** | Iconic Presence | 👑 |

---

## 2. Step-by-Step Deployment Setup (5 Minutes)

### Step 1: Initialize Your Vite + React Project
Run these commands in your terminal:

```bash
npm create vite@latest hellow-app -- --template react
cd hellow-app
npm install lucide-react @supabase/supabase-js
npm install -D tailwindcss @tailwindcss/vite
```

Replace `src/App.jsx` with the **`App.jsx`** file generated here.

### Step 2: Set Up Your Live Database on Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project (`hellow-prod`).
2. Open the **SQL Editor** in Supabase, paste the entire contents of **`database_schema.sql`**, and click **Run**.
3. In **Project Settings → API**, copy your `Project URL` and `anon public` key.

### Step 3: Add Environment Variables
Create a `.env` file in your `hellow-app` root folder:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_MAPBOX_OR_APPLE_MAPKIT_TOKEN=YOUR_MAP_TOKEN
```

### Step 4: Deploy Live to Vercel or Netlify
1. Push your `hellow-app` folder to a GitHub repository.
2. Import the repository at [vercel.com](https://vercel.com), add the `.env` keys above, and click **Deploy**.
3. Your live HTTPS URL is ready—and because HELLOW uses a responsive mobile-first PWA layout, users can tap **Share → Add to Home Screen** on iPhone immediately while you wrap it in **Capacitor** or **SwiftUI** for the App Store!