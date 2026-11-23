import React, { useState, useRef } from 'react';
import {
  Radar,
  Sparkles,
  Gift,
  User,
  MapPin,
  Check,
  X,
  EyeOff,
  Radio,
  Award,
  Instagram,
  Twitter,
  Linkedin,
  BookOpen,
  Film,
  Share2,
  Send,
  ShieldCheck,
  QrCode,
  ChevronRight,
  Sliders,
  Smartphone,
  Monitor,
  Download,
  RefreshCw,
  ArrowUpRight,
  Compass,
  Play,
  Image as ImageIcon,
  Navigation,
  Camera,
  Pencil,
  AtSign,
  Lock,
  Crop,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Layers,
  Settings,
  Youtube,
  Music,
  Globe,
  Clapperboard
} from 'lucide-react';

// Initial nearby peers around 11 Salem St, Medford, MA 02155
const INITIAL_PEERS = [
  {
    id: 'elena',
    username: 'elena.writes',
    name: 'Elena',
    connectionsCount: 248, // Mingler Lvl 5
    distanceFt: 12,
    distanceLabel: '12 ft away',
    walkMinutes: 1,
    venueSpot: 'Ground-floor espresso bar • 11 Salem St',
    walkDirection: 'Right inside the lobby cafe counter',
    mapCoord: { x: 52.5, y: 47.5 },
    matchScore: 96,
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Indie Publishing', 'Specialty Coffee', 'Analog Synths'],
    icebreakers: [
      {
        platform: 'Substack',
        topic: 'Indie Publishing',
        prompt: 'Just sent my debut sci-fi novella to final print proofs this morning!',
        opener: 'Congrats on finishing your novella—what is the premise about?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
          caption: 'Final galley proofs & cover typography test before sending to the press.',
          timestamp: 'Posted 2h ago on Substack'
        }
      },
      {
        platform: 'Instagram',
        topic: 'Specialty Coffee',
        prompt: 'Testing single-origin Ethiopian pour-overs around Medford Square.',
        opener: 'Have you found the best pour-over in Medford Square yet?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
          caption: 'Morning washed Yirgacheffe dial-in by the window.',
          timestamp: 'Posted yesterday on Instagram'
        }
      }
    ]
  },
  {
    id: 'marcus',
    username: 'marcus.reels',
    name: 'Marcus',
    connectionsCount: 682, // Icebreaker Lvl 9
    distanceFt: 95,
    distanceLabel: '95 ft away',
    walkMinutes: 1,
    venueSpot: 'Medford Square Plaza • Outside 11 Salem St',
    walkDirection: 'Step out onto Salem St & head west toward Main St',
    mapCoord: { x: 42, y: 53 },
    matchScore: 91,
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Documentary Film', 'A24 Cinema', 'Street Photography'],
    icebreakers: [
      {
        platform: 'IMDb / X',
        topic: 'Documentary Film',
        prompt: 'Sound-mixing an independent documentary short before festival deadlines.',
        opener: 'Saw you are finishing a doc short—what story are you telling?',
        media: {
          type: 'video',
          poster:
            'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-sound-engineer-working-on-a-mixing-console-43554-large.mp4',
          duration: '0:14',
          caption: 'Late-night 5.1 surround mix pass on the final festival cut.',
          timestamp: 'Clip shared 4h ago on X'
        }
      },
      {
        platform: 'Pinterest',
        topic: 'Visual Moodboards',
        prompt: 'Collecting 1970s architectural brutalism & neon rain aesthetics.',
        opener: 'Are you scouting locations in Boston for your next shoot?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
          caption: 'Concrete geometry & overcast light study board.',
          timestamp: 'Pinned 1d ago on Pinterest'
        }
      }
    ]
  },
  {
    id: 'sora',
    username: 'sora.spatial',
    name: 'Sora',
    connectionsCount: 412, // Social Butterfly Lvl 2
    distanceFt: 380,
    distanceLabel: '380 ft away',
    walkMinutes: 2,
    venueSpot: 'Chevalier Theatre • 30 Forest St',
    walkDirection: 'Head north across Salem St onto Forest St (2 min walk)',
    mapCoord: { x: 47, y: 24 },
    matchScore: 88,
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Product Design', 'Ceramics', 'Trail Running'],
    icebreakers: [
      {
        platform: 'Instagram',
        topic: 'Ceramics',
        prompt: 'Pulled my first speckled stoneware matcha bowls out of the kiln.',
        opener: 'Your stoneware bowls look awesome—how long have you been throwing?',
        media: {
          type: 'video',
          poster:
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-potter-shaping-clay-on-a-pottery-wheel-42874-large.mp4',
          duration: '0:11',
          caption: 'Trimming foot rings on a fresh batch of speckled stoneware.',
          timestamp: 'Reel posted 5h ago on Instagram'
        }
      },
      {
        platform: 'LinkedIn',
        topic: 'Spatial UI',
        prompt: 'Prototyping tactile glass interfaces for ambient computing.',
        opener: 'What spatial design tools are you enjoying most right now?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
          caption: 'Refractive frosted glass depth experiments for spatial HUDs.',
          timestamp: 'Shared 3d ago on LinkedIn'
        }
      }
    ]
  },
  {
    id: 'devon',
    username: 'devon.records',
    name: 'Devon',
    connectionsCount: 1085, // Iconic Presence (1,000+ Ultra Tier)
    distanceFt: 1450,
    distanceLabel: '0.3 mi away',
    walkMinutes: 6,
    venueSpot: 'Mystic Riverfront Park • Riverside Ave',
    walkDirection: 'Follow Riverside Ave east toward the Mystic River boardwalk',
    mapCoord: { x: 79, y: 69 },
    matchScore: 84,
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Vinyl Collecting', 'Jazz Fusion', 'Architecture'],
    icebreakers: [
      {
        platform: 'X / Twitter',
        topic: 'Vinyl Digging',
        prompt: 'Found an original 1974 Japanese pressing of Head Hunters in Harvard Sq.',
        opener: 'No way you found a 74 Japanese pressing—how does it sound?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80',
          caption: 'Mint obi strip intact—straight onto the turntable tonight.',
          timestamp: 'Posted 6h ago on X'
        }
      }
    ]
  },
  {
    id: 'nina',
    username: 'nina.botanica',
    name: 'Nina',
    connectionsCount: 156, // Regular Lvl 6
    distanceFt: 2400,
    distanceLabel: '0.45 mi away',
    walkMinutes: 9,
    venueSpot: 'High Street Artisans • West Medford Border',
    walkDirection: 'Head west along High St past Winthrop Square (9 min walk)',
    mapCoord: { x: 14, y: 38 },
    matchScore: 86,
    photo:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Botanical Design', 'Film Photography', 'Matcha'],
    icebreakers: [
      {
        platform: 'Instagram',
        topic: 'Botanical Design',
        prompt: 'Curating sculptural indoor olive trees & moss terrariums for studios.',
        opener: 'Your studio terrariums look incredible—where do you source your moss?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80',
          caption: 'Morning misting in the High St plant studio.',
          timestamp: 'Posted 3h ago on Instagram'
        }
      }
    ]
  },
  {
    id: 'theo',
    username: 'theo.roasts',
    name: 'Theo',
    connectionsCount: 530, // Networker Lvl 4
    distanceFt: 3400,
    distanceLabel: '0.65 mi away',
    walkMinutes: 13,
    venueSpot: 'Fells Way Roastery • North Medford',
    walkDirection: 'Head north up Governors Ave toward Middlesex Fells (13 min walk)',
    mapCoord: { x: 64, y: 12 },
    matchScore: 83,
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Small-Batch Roasting', 'Bouldering', 'Industrial Design'],
    icebreakers: [
      {
        platform: 'Substack',
        topic: 'Small-Batch Roasting',
        prompt: 'Profiling a honey-processed Costa Rican micro-lot on a 5kg drum roaster.',
        opener: 'Have you dialed in the Costa Rican honey roast yet?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
          caption: 'First crack temperature curve looking super clean today.',
          timestamp: 'Posted 1d ago on Substack'
        }
      }
    ]
  },
  {
    id: 'claire',
    username: 'claire.arch',
    name: 'Claire',
    connectionsCount: 845, // Charmer Lvl 5
    distanceFt: 4600,
    distanceLabel: '0.85 mi away',
    walkMinutes: 17,
    venueSpot: 'Cradock Bridge Lock • South Mystic Trail',
    walkDirection: 'Cross Main St bridge south onto Mystic Valley Pkwy (17 min walk)',
    mapCoord: { x: 28, y: 84 },
    matchScore: 89,
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85',
    sharedTags: ['Urban Architecture', 'Cycling', 'Architectural Sketching'],
    icebreakers: [
      {
        platform: 'Pinterest',
        topic: 'Urban Architecture',
        prompt: 'Sketching historic brick mill conversions along the Mystic River.',
        opener: 'Which bridge along the Mystic has your favorite sightline?',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
          caption: 'Ink & watercolor elevation study by Cradock Lock.',
          timestamp: 'Pinned 5h ago on Pinterest'
        }
      }
    ]
  }
];

const REWARD_PARTNERS = [
  {
    id: 'dunkin-medford',
    partner: "Dunkin'",
    tagline: 'America Runs on Dunkin’ • Medford Sq',
    offer: '2-for-1 Iced Signature Lattes + 2 Donuts',
    description: 'Valid when two HELLOW connections redeem together at the Salem St counter.',
    pointsCost: 120,
    distance: '140 ft away',
    category: 'Coffee & Bakery',
    badge: 'Most Popular',
    brandType: 'dunkin',
    textTone: 'light'
  },
  {
    id: 'grubhub-credit',
    partner: 'Grubhub',
    tagline: 'Shared Table Delivery & Pickup Perk',
    offer: '$15 Shared Table Dining Credit',
    description: 'Instant promo voucher for split lunch or dinner orders after a verified Hello.',
    pointsCost: 220,
    distance: 'Instant Digital Code',
    category: 'Dining & Delivery',
    badge: 'Partner Perk',
    brandType: 'grubhub',
    textTone: 'light'
  },
  {
    id: 'cafe-luna',
    partner: 'Cafe Luna',
    tagline: 'Artisan Espresso & Pour-Over Bar',
    offer: '2-for-1 Pour-Over Flight & Croissants',
    description: 'Sit down together and redeem your mutual handshake code at the bar.',
    pointsCost: 150,
    distance: '110 ft away',
    category: 'Coffee & Bakery',
    badge: 'Local Partner',
    brandType: 'cafeluna',
    textTone: 'light'
  },
  {
    id: 'chevalier-lounge',
    partner: 'Chevalier Theatre Lounge',
    tagline: 'Historic Medford Square Stage & Lobby',
    offer: '25% Off Pre-Show Drinks & Tapas',
    description: 'Unlocked automatically for festival & event attendees within 0.5 mi.',
    pointsCost: 280,
    distance: '380 ft away',
    category: 'Festivals & Events',
    badge: 'Event Exclusive',
    brandType: 'chevalier',
    textTone: 'light'
  }
];

const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', connected: true, handle: '@jordan.creates' },
  { id: 'twitter', name: 'X / Twitter', connected: true, handle: '@jordan_builds' },
  { id: 'substack', name: 'Substack', connected: true, handle: 'Notes on Craft' },
  { id: 'pinterest', name: 'Pinterest', connected: true, handle: 'jordanboards' },
  { id: 'linkedin', name: 'LinkedIn', connected: false, handle: '' },
  { id: 'facebook', name: 'Facebook', connected: false, handle: '' },
  { id: 'threads', name: 'Threads', connected: false, handle: '' },
  { id: 'tiktok', name: 'TikTok', connected: false, handle: '' },
  { id: 'youtube', name: 'YouTube', connected: false, handle: '' },
  { id: 'spotify', name: 'Spotify', connected: false, handle: '' },
  { id: 'imdb', name: 'IMDb', connected: false, handle: '' },
  { id: 'letterboxd', name: 'Letterboxd', connected: false, handle: '' },
  { id: 'reddit', name: 'Reddit', connected: false, handle: '' },
  { id: 'discord', name: 'Discord', connected: false, handle: '' },
  { id: 'twitch', name: 'Twitch', connected: false, handle: '' },
  { id: 'goodreads', name: 'Goodreads', connected: false, handle: '' },
  { id: 'medium', name: 'Medium', connected: false, handle: '' },
  { id: 'github', name: 'GitHub', connected: false, handle: '' }
];

const SOCIAL_ICEBREAKER_POOL = [
  {
    source: 'Instagram',
    title: '35mm Street & Golden Hour Frames',
    prompt: 'Ask me about: Shooting Portra 400 around downtown Medford and Boston bridges.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
      caption: 'Fresh roll back from the lab — golden hour light over the river.',
      timestamp: 'Synced from Instagram'
    }
  },
  {
    source: 'X / Twitter',
    title: 'Ambient Synth & Film Score Notes',
    prompt: 'Ask me about: Layering analog tape loops with modern spatial sound design.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80',
      caption: 'Late-night studio patch exploration for an upcoming short.',
      timestamp: 'Synced from X / Twitter'
    }
  },
  {
    source: 'Substack',
    title: 'Notes on Tactile Design & Cinema',
    prompt: 'Ask me about: Why physical cinema and thoughtful software share the same pacing.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
      caption: 'Drafting this week’s essay on slow technology and real-world spaces.',
      timestamp: 'Synced from Substack'
    }
  },
  {
    source: 'Pinterest',
    title: 'Brutalist & Mid-Century Spaces',
    prompt: 'Ask me about: Collecting warm wood-and-glass interior references for studio sets.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      caption: 'Pinned architectural lighting and concrete textures.',
      timestamp: 'Synced from Pinterest'
    }
  },
  {
    source: 'Spotify + Letterboxd',
    title: 'Late-Night Soundtrack & Neo-Noir Picks',
    prompt: 'Ask me about: My current heavy-rotation film scores and favorite 70s thrillers.',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80',
      caption: 'Weekend vinyl spin & double-feature watchlist.',
      timestamp: 'Synced from Spotify & Letterboxd'
    }
  }
];

// Recognizable Brand Vector Logos for Each Social Platform
function PlatformLogo({ id, className = 'w-4 h-4' }) {
  switch (id) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'substack':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <rect x="4" y="3" width="16" height="2.4" rx="0.5" />
          <rect x="4" y="7.4" width="16" height="2.4" rx="0.5" />
          <path d="M4 11.8h16V21l-8-4.5L4 21v-9.2z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
        </svg>
      );
    case 'threads':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className={className}>
          <path d="M19 12a7 7 0 1 0-2.2 5.1M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm0 0v1.8a2.2 2.2 0 0 0 4.4 0V12" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M23 7.5a3 3 0 0 0-2.12-2.12C19 4.88 12 4.88 12 4.88s-7 0-8.88.5A3 3 0 0 0 1 7.5 31.4 31.4 0 0 0 .5 12a31.4 31.4 0 0 0 .5 4.5 3 3 0 0 0 2.12 2.12c1.88.5 8.88.5 8.88.5s7 0 8.88-.5A3 3 0 0 0 23 16.5a31.4 31.4 0 0 0 .5-4.5 31.4 31.4 0 0 0-.5-4.5zM9.75 15.02V8.98L15 12l-5.25 3.02z" />
        </svg>
      );
    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className}>
          <circle cx="12" cy="12" r="9.5" strokeWidth="1.8" />
          <path d="M7.5 9.8c3.2-1 6.8-.7 9.4.8" />
          <path d="M8.3 13c2.5-.8 5.4-.5 7.5.7" />
          <path d="M9.1 16c1.9-.5 4-.3 5.6.6" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12.017 2C6.486 2 2 6.486 2 12.017c0 4.242 2.636 7.868 6.357 9.328-.088-.792-.167-2.008.035-2.873.182-.781 1.174-4.977 1.174-4.977s-.3-.599-.3-1.485c0-1.391.806-2.43 1.81-2.43.853 0 1.265.641 1.265 1.409 0 .858-.546 2.141-.828 3.33-.236.996.499 1.808 1.481 1.808 1.778 0 3.145-1.875 3.145-4.581 0-2.395-1.721-4.07-4.179-4.07-2.847 0-4.518 2.135-4.518 4.342 0 .86.331 1.782.745 2.283a.3.3 0 0 1 .069.288c-.076.316-.245.996-.278 1.135-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.531 0 10.017-4.486 10.017-10.017C22.034 6.486 17.548 2 12.017 2z" />
        </svg>
      );
    case 'imdb':
      return (
        <svg viewBox="0 0 28 24" fill="currentColor" className="w-5 h-4">
          <rect x="1" y="4" width="26" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <text x="14" y="15" fontSize="8.2" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            IMDb
          </text>
        </svg>
      );
    case 'letterboxd':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <circle cx="6.5" cy="12" r="3.6" fillOpacity="0.95" />
          <circle cx="12" cy="12" r="3.6" fillOpacity="0.72" />
          <circle cx="17.5" cy="12" r="3.6" fillOpacity="0.95" />
        </svg>
      );
    case 'reddit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
          <circle cx="12" cy="13.5" r="7" />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" />
          <path d="M9.5 16c1.5 1.1 3.5 1.1 5 0" strokeLinecap="round" />
          <path d="M12 6.5l1.8-3.5 3.2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="18.2" cy="4" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'discord':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z" />
        </svg>
      );
    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M4.265 3 3 6.236v13.223h4.502V21l2.531.85 2.392-2.391h3.658l4.923-4.924V3H4.265zm15.052 10.691-2.813 2.814h-4.502l-2.391 2.391v-2.391H5.813V4.688h13.504v9.003zm-2.812-5.767v4.923h-1.688V7.924h1.688zm-4.502 0v4.923h-1.688V7.924h1.688z" />
        </svg>
      );
    case 'goodreads':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" className={className}>
          <circle cx="11.5" cy="10" r="4.8" />
          <path d="M16.3 5.2v9.3a4.8 4.8 0 0 1-9.1 2.1" />
        </svg>
      );
    case 'medium':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <circle cx="6.5" cy="12" r="4.8" />
          <ellipse cx="14.5" cy="12" rx="2.4" ry="4.5" />
          <ellipse cx="19.3" cy="12" rx="1" ry="4.1" />
        </svg>
      );
    case 'github':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
  }
}

// 11-Tier Social Connection Progression System (Levels 1–11 up to 1,000 connections, then Iconic Presence)
const SOCIAL_LEVEL_TIERS = [
  { level: 1, name: 'Wallflower', emoji: '🌱' },
  { level: 2, name: 'Acquaintance', emoji: '👋' },
  { level: 3, name: 'Regular', emoji: '☕' },
  { level: 4, name: 'Mingler', emoji: '🥂' },
  { level: 5, name: 'Conversationalist', emoji: '💬' },
  { level: 6, name: 'Social Butterfly', emoji: '🦋' },
  { level: 7, name: 'Networker', emoji: '🔗' },
  { level: 8, name: 'Icebreaker', emoji: '🧊' },
  { level: 9, name: 'Storyteller', emoji: '📖' },
  { level: 10, name: 'Charmer', emoji: '✨' },
  { level: 11, name: 'Life-of-the-Party', emoji: '🪩' }
];

function getSocialLevelInfo(totalConnections) {
  const safeCount = Math.max(0, totalConnections);
  if (safeCount >= 1000) {
    return {
      title: 'Iconic Presence',
      emoji: '👑',
      degree: 12,
      isIconic: true,
      count: safeCount
    };
  }

  // Map 0..999 connections cleanly across Levels 1 through 11
  const tierIndex = Math.min(
    SOCIAL_LEVEL_TIERS.length - 1,
    Math.floor((safeCount / 1000) * SOCIAL_LEVEL_TIERS.length)
  );
  const tier = SOCIAL_LEVEL_TIERS[tierIndex] || SOCIAL_LEVEL_TIERS[0];

  return {
    title: tier.name,
    emoji: tier.emoji,
    degree: tier.level,
    isIconic: false,
    count: safeCount
  };
}

// Parse real YouTube, Vimeo, or direct video links into playable embed/video sources & thumbnails
function parseVideoAttachment(rawUrl) {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return null;
  const normalizedUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  // YouTube (watch?v=, youtu.be/, shorts/, embed/)
  const ytMatch = normalizedUrl.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: 'video',
      provider: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`,
      videoUrl: normalizedUrl,
      poster: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  }

  // Vimeo (vimeo.com/123456789)
  const vimeoMatch = normalizedUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    const vimeoId = vimeoMatch[1];
    return {
      type: 'video',
      provider: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      videoUrl: normalizedUrl,
      poster:
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80'
    };
  }

  // Direct HTML5 video file (.mp4, .webm, .mov, .m4v, .ogg) or fallback URL
  return {
    type: 'video',
    provider: 'direct',
    videoUrl: normalizedUrl,
    poster:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80'
  };
}

export default function App() {
  // Viewport frame toggle for Desktop Companion vs iPhone App preview
  const [previewMode, setPreviewMode] = useState('mobile'); // 'mobile' | 'desktop'
  const [showIosModal, setShowIosModal] = useState(false);

  // App Color Theme State: 'forest-mint' | 'violet-crimson'
  const [appTheme, setAppTheme] = useState('violet-crimson');
  const [draftAppTheme, setDraftAppTheme] = useState('violet-crimson');

  // Core Navigation: 'radar' | 'persona' | 'rewards'
  const [activeTab, setActiveTab] = useState('radar');
  const [personaHeaderVisible, setPersonaHeaderVisible] = useState(true);

  // Radar & Proximity State
  const [radarActive, setRadarActive] = useState(true);
  const [radarDisplayMode, setRadarDisplayMode] = useState('map'); // 'map' | 'cards'
  const [isFullScreenMap, setIsFullScreenMap] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselTouchStartX, setCarouselTouchStartX] = useState(null);
  const [mapZoom, setMapZoom] = useState(1.25); // Higher zoom = closer in; lower zoom = wider area
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [isPanningMap, setIsPanningMap] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const pinchStartDistRef = useRef(null);
  const pinchStartZoomRef = useRef(1.25);

  const [peers] = useState(INITIAL_PEERS);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [focusedMapPeerId, setFocusedMapPeerId] = useState('elena');
  const [hoveredMapPeerId, setHoveredMapPeerId] = useState(null);
  const [waveStates, setWaveStates] = useState({ elena: 'confirmed' }); // { [peerId]: 'idle' | 'waved' | 'confirmed' }

  // Lightbox pop-up for icebreaker post image / video
  const [activeMediaLightbox, setActiveMediaLightbox] = useState(null);

  // User Persona, Account Identity & AI Icebreakers
  const [username, setUsername] = useState('NIHTE');
  const [displayName, setDisplayName] = useState('Jordan');
  const [profession, setProfession] = useState('Film Producer & Director');
  const [userConnectionsCount, setUserConnectionsCount] = useState(142); // Regular Lvl 6
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [draftDisplayName, setDraftDisplayName] = useState('Jordan');
  const [draftProfession, setDraftProfession] = useState('Film Producer & Director');
  const [showAddIcebreakerModal, setShowAddIcebreakerModal] = useState(false);

  // Profile Portrait & 1:1 Crop Framing State
  const [profilePhoto, setProfilePhoto] = useState(
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85'
  );
  const [photoCrop, setPhotoCrop] = useState({ zoom: 1.05, x: 50, y: 18 });
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropTarget, setCropTarget] = useState('profile'); // 'profile' | 'customIcebreaker'
  const [customImageCrop, setCustomImageCrop] = useState({ zoom: 1.0, x: 50, y: 50 });
  const [draftCrop, setDraftCrop] = useState({ zoom: 1.05, x: 50, y: 18 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [cropDragStart, setCropDragStart] = useState({ x: 0, y: 0 });
  const photoInputRef = useRef(null);

  const [platforms, setPlatforms] = useState(SOCIAL_PLATFORMS);
  const [platformPrompt, setPlatformPrompt] = useState(null); // { mode: 'connect' | 'disconnect', platform }
  const [platformHandleInput, setPlatformHandleInput] = useState('');
  const [platformPasswordInput, setPlatformPasswordInput] = useState('');
  const [customMilestone, setCustomMilestone] = useState(
    'Launching a new minimalist design studio & scouting indie film soundtracks'
  );
  const [customMediaType, setCustomMediaType] = useState('none'); // 'none' | 'image' | 'video'
  const [customImagePreview, setCustomImagePreview] = useState('');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const customMediaInputRef = useRef(null);
  const [socialPoolCursor, setSocialPoolCursor] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [myCards, setMyCards] = useState([
    {
      id: 'c1',
      source: 'Instagram + Pinterest',
      title: 'Minimalist Glass UI & Product Craft',
      prompt: 'Ask me about: Designing calm, tactile interfaces that bring people together IRL.',
      active: true,
      isCustom: false,
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        caption: 'Latest refractive glass exploration from my studio board.',
        timestamp: 'Synced from Pinterest'
      }
    },
    {
      id: 'c2',
      source: 'Substack',
      title: 'Neighborhood Coffee & Film Walks',
      prompt: 'Always down to swap book recommendations or discover a great espresso spot.',
      active: true,
      isCustom: false,
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
        caption: 'Sunday morning espresso & notebook notes.',
        timestamp: 'Synced from Instagram'
      }
    }
  ]);

  // Dual-Sided Rewards & Points Wallet
  const [points, setPoints] = useState(340);
  const [rewardFilter, setRewardFilter] = useState('All');
  const [redeemedIds, setRedeemedIds] = useState([]);
  const [activeRedemption, setActiveRedemption] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3400);
  };

  // All discoverable peers sorted from closest to furthest
  const visiblePeers = [...peers].sort((a, b) => a.distanceFt - b.distanceFt);

  const focusedMapPeer =
    visiblePeers.find((p) => p.id === focusedMapPeerId) || visiblePeers[0] || null;
  const hoveredPeer =
    visiblePeers.find((p) => p.id === hoveredMapPeerId) || null;

  // Map Pinch-to-Zoom, Wheel-Zoom & Drag-to-Pan Handlers
  const clampZoom = (val) => Math.min(2.1, Math.max(0.68, Number(val.toFixed(2))));

  const adjustMapZoom = (delta) => {
    setMapZoom((prev) => {
      const next = clampZoom(prev + delta);
      if (next <= 0.85) setMapPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMapWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.14 : -0.14;
    adjustMapZoom(delta);
  };

  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleMapTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchStartDistRef.current = getTouchDistance(e.touches);
      pinchStartZoomRef.current = mapZoom;
      setIsPanningMap(false);
    } else if (e.touches.length === 1) {
      setIsPanningMap(true);
      panStartRef.current = {
        x: e.touches[0].clientX - mapPan.x,
        y: e.touches[0].clientY - mapPan.y
      };
    }
  };

  const handleMapTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      const currentDist = getTouchDistance(e.touches);
      const scaleFactor = currentDist / pinchStartDistRef.current;
      setMapZoom(clampZoom(pinchStartZoomRef.current * scaleFactor));
    } else if (e.touches.length === 1 && isPanningMap) {
      const nextX = Math.max(-95, Math.min(95, e.touches[0].clientX - panStartRef.current.x));
      const nextY = Math.max(-75, Math.min(75, e.touches[0].clientY - panStartRef.current.y));
      setMapPan({ x: nextX, y: nextY });
    }
  };

  const handleMapTouchEnd = () => {
    pinchStartDistRef.current = null;
    setIsPanningMap(false);
  };

  const handleMapMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsPanningMap(true);
    panStartRef.current = {
      x: e.clientX - mapPan.x,
      y: e.clientY - mapPan.y
    };
  };

  const handleMapMouseMove = (e) => {
    if (!isPanningMap) return;
    const nextX = Math.max(-95, Math.min(95, e.clientX - panStartRef.current.x));
    const nextY = Math.max(-75, Math.min(75, e.clientY - panStartRef.current.y));
    setMapPan({ x: nextX, y: nextY });
  };

  const handleMapMouseUp = () => {
    setIsPanningMap(false);
  };

  // Carousel Swipe & Navigation Helpers
  const stepCarousel = (dir) => {
    if (!visiblePeers.length) return;
    setCarouselIndex((prev) => (prev + dir + visiblePeers.length) % visiblePeers.length);
  };

  const handleCarouselTouchStart = (e) => {
    setCarouselTouchStartX(e.touches[0].clientX);
  };

  const handleCarouselTouchEnd = (e) => {
    if (carouselTouchStartX === null) return;
    const diff = e.changedTouches[0].clientX - carouselTouchStartX;
    if (Math.abs(diff) > 36) {
      stepCarousel(diff < 0 ? 1 : -1);
    }
    setCarouselTouchStartX(null);
  };

  const handlePersonaScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    // Fade header out once scrolled past the upper portrait into the identity block
    setPersonaHeaderVisible(scrollTop < 210);
  };

  // Handle Wave & Mutual Handshake
  const handleSendWave = (peer) => {
    setWaveStates((prev) => ({ ...prev, [peer.id]: 'waved' }));
    triggerToast(`Warm ping sent to ${peer.name}! Waiting for mutual Hello...`);
  };

  const handleConfirmHello = (peer) => {
    if (waveStates[peer.id] === 'confirmed') return;
    setWaveStates((prev) => ({ ...prev, [peer.id]: 'confirmed' }));
    setPoints((p) => p + 50);
    setUserConnectionsCount((c) => c + 1);
    triggerToast(`Mutual Hello confirmed with ${peer.name}! +50 pts & Shared Perk unlocked.`);
  };

  // Handle AI Icebreaker Synthesis
  const handleSynthesizeIcebreakers = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let attachedMedia = null;
      if (customMediaType === 'image' && customImagePreview) {
        attachedMedia = {
          type: 'image',
          url: customImagePreview,
          crop: { ...customImageCrop },
          caption: customMilestone.trim() || 'Custom Persona visual highlight.',
          timestamp: 'Added just now'
        };
      } else if (customMediaType === 'video' && customVideoUrl.trim()) {
        const parsedVideo = parseVideoAttachment(customVideoUrl);
        if (parsedVideo) {
          attachedMedia = {
            ...parsedVideo,
            caption: customMilestone.trim() || 'Custom Persona video clip.',
            timestamp: 'Added just now'
          };
        }
      }

      const newCard = {
        id: `c-${Date.now()}`,
        source: 'Custom Icebreaker',
        title: 'Personal Prompt',
        prompt: customMilestone.trim()
          ? `Ask me about: ${customMilestone.trim()}`
          : 'Ask me about: Exploring creative tech, independent cinema, and great coffee.',
        active: true,
        isCustom: true,
        ...(attachedMedia ? { media: attachedMedia } : {})
      };

      setMyCards((prev) => [newCard, ...prev]);
      setIsGenerating(false);
      setShowAddIcebreakerModal(false);
      setCustomMilestone('');
      setCustomMediaType('none');
      setCustomImagePreview('');
      setCustomImageCrop({ zoom: 1.0, x: 50, y: 50 });
      setCustomVideoUrl('');
      triggerToast('Custom red-glass Icebreaker card added to your Persona!');
    }, 300);
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomImagePreview(reader.result);
        setCustomImageCrop({ zoom: 1.0, x: 50, y: 50 });
        setCustomMediaType('image');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveIcebreakerCard = (targetCard) => {
    if (targetCard.isCustom) {
      setMyCards((prev) => prev.filter((c) => c.id !== targetCard.id));
      triggerToast('Custom icebreaker card removed.');
      return;
    }

    // Cycle through connected platforms to replace with a newly aggregated social card
    const connectedNames = platforms.filter((p) => p.connected).map((p) => p.name);
    const candidate = SOCIAL_ICEBREAKER_POOL[socialPoolCursor % SOCIAL_ICEBREAKER_POOL.length];
    const nextCursor = socialPoolCursor + 1;
    setSocialPoolCursor(nextCursor);

    const activeSource =
      connectedNames.length > 0
        ? connectedNames[nextCursor % connectedNames.length]
        : candidate.source;

    const refreshedCard = {
      id: `social-${Date.now()}`,
      source: activeSource,
      title: candidate.title,
      prompt: candidate.prompt,
      active: true,
      isCustom: false,
      media: {
        ...candidate.media,
        timestamp: `Synced from ${activeSource}`
      }
    };

    setMyCards((prev) =>
      prev.map((c) => (c.id === targetCard.id ? refreshedCard : c))
    );
    triggerToast(`Refreshed with a new ${activeSource} icebreaker!`);
  };

  const toggleCardVisibility = (id) => {
    setMyCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, active: !card.active } : card))
    );
  };

  const handlePlatformIconClick = (plat) => {
    if (plat.connected) {
      setPlatformPrompt({ mode: 'disconnect', platform: plat });
    } else {
      setPlatformHandleInput(`@${username.toLowerCase()}`);
      setPlatformPasswordInput('');
      setPlatformPrompt({ mode: 'connect', platform: plat });
    }
  };

  const handleConfirmConnectPlatform = (e) => {
    e.preventDefault();
    if (!platformPrompt?.platform) return;
    const target = platformPrompt.platform;
    const handleVal = platformHandleInput.trim() || `@${username.toLowerCase()}`;
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === target.id ? { ...p, connected: true, handle: handleVal } : p
      )
    );
    setPlatformPasswordInput('');
    setPlatformPrompt(null);
    triggerToast(`Logged into ${target.name} (${handleVal}) — aggregating feed for AI icebreakers!`);
  };

  const handleConfirmDisconnectPlatform = () => {
    if (!platformPrompt?.platform) return;
    const target = platformPrompt.platform;
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === target.id ? { ...p, connected: false, handle: '' } : p
      )
    );
    setPlatformPrompt(null);
    triggerToast(`Disconnected ${target.name} from your Persona.`);
  };

  // Handle Portrait Upload & Open 1:1 Crop Studio
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfilePhoto(reader.result);
        const initialCrop = { zoom: 1.05, x: 50, y: 20 };
        setCropTarget('profile');
        setPhotoCrop(initialCrop);
        setDraftCrop(initialCrop);
        setShowCropModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // Open 1:1 Crop Modal
  const openCropStudio = (target = 'profile') => {
    setCropTarget(target);
    setDraftCrop(target === 'customIcebreaker' ? { ...customImageCrop } : { ...photoCrop });
    setShowCropModal(true);
  };

  // Interactive Drag inside 1:1 Crop Square
  const handleCropPointerDown = (e) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDraggingCrop(true);
    setCropDragStart({ x: clientX, y: clientY });
  };

  const handleCropPointerMove = (e) => {
    if (!isDraggingCrop) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - cropDragStart.x;
    const dy = clientY - cropDragStart.y;
    setCropDragStart({ x: clientX, y: clientY });

    setDraftCrop((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(100, Number((prev.x - dx * 0.28).toFixed(1)))),
      y: Math.max(0, Math.min(100, Number((prev.y - dy * 0.28).toFixed(1))))
    }));
  };

  const handleCropPointerUp = () => {
    setIsDraggingCrop(false);
  };

  const handleSaveCrop = () => {
    if (cropTarget === 'customIcebreaker') {
      setCustomImageCrop({ ...draftCrop });
      setShowCropModal(false);
      triggerToast('Icebreaker image framing updated!');
      return;
    }
    setPhotoCrop({ ...draftCrop });
    setShowCropModal(false);
    triggerToast('1:1 profile framing updated!');
  };

  // Open Edit Profile Settings Modal
  const openEditProfile = () => {
    setDraftDisplayName(displayName);
    setDraftProfession(profession);
    setDraftAppTheme(appTheme);
    setShowEditProfileModal(true);
  };

  const handleSaveProfileIdentity = (e) => {
    e.preventDefault();
    const cleanedDisplay = draftDisplayName.trim() || 'Jordan';
    const cleanedProfession = draftProfession.trim() || 'Film Producer & Director';
    setDisplayName(cleanedDisplay);
    setProfession(cleanedProfession);
    setAppTheme(draftAppTheme);
    setShowEditProfileModal(false);
    triggerToast(`Profile & ${draftAppTheme === 'violet-crimson' ? 'Obsidian Violet' : 'Forest Mint'} theme saved!`);
  };

  // Handle Dual-Reward Redemption
  const handleRedeemReward = (reward) => {
    if (points < reward.pointsCost) {
      triggerToast(`Need ${reward.pointsCost - points} more pts — say Hellow nearby!`);
      return;
    }
    setPoints((p) => p - reward.pointsCost);
    setRedeemedIds((prev) => [...prev, reward.id]);
    setActiveRedemption(reward);
  };

  const filteredRewards =
    rewardFilter === 'All'
      ? REWARD_PARTNERS
      : REWARD_PARTNERS.filter((r) => r.category === rewardFilter);

  const userLevel = getSocialLevelInfo(userConnectionsCount);

  return (
    <div
      data-theme={appTheme}
      className="min-h-screen w-full bg-[var(--app-outer-bg)] text-[#F1F8F4] font-sans antialiased selection:bg-[var(--accent-primary)]/40 flex flex-col transition-colors duration-500"
    >
      {/* Dynamic Theme Tokens & Specular Glass Edge Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Inter:wght@300;400;500;600;700&display=swap');

        :root, [data-theme="forest-mint"] {
          --app-outer-bg: #040907;
          --surface-top: #060D0A;
          --surface-mid: #08120E;
          --surface-deep: #05161A;
          --accent-primary: #8BBB92;
          --accent-secondary: #95D5B2;
          --accent-hover: #2A835F;
          --accent-cta-text: #05161A;
          --accent-cta-hover-text: #FFFFFF;
          --accent-glow-rgba: rgba(139, 187, 146, 0.45);
          --accent-border-rgba: rgba(149, 213, 178, 0.24);
          --phone-gradient:
            radial-gradient(120% 42% at 50% 103%, #B7E4C7 0%, #74C69D 18%, #2D6A4F 38%, rgba(14, 38, 30, 0.35) 62%, transparent 80%),
            linear-gradient(180deg, #060D0A 0%, #08120E 48%, #0C1F18 76%, #133529 100%);
          --map-land: #050B08;
          --map-water-1: #071510;
          --map-water-2: #030806;
          --map-park-1: #0C1F17;
          --map-park-2: #08150F;
          --map-building: #08120E;
          --map-street: #0F261D;
          --map-highway: #1B4332;
          --map-label: #5D8A73;
          --map-park-label: #52B788;
          --map-water-label: #3A6352;
        }

        [data-theme="violet-crimson"] {
          --app-outer-bg: #0B0B0E;
          --surface-top: #141518;
          --surface-mid: #16171C;
          --surface-deep: #111216;
          --accent-primary: #6366FF;
          --accent-secondary: #8385FF;
          --accent-hover: #EF1E5A;
          --accent-cta-text: #FFFFFF;
          --accent-cta-hover-text: #FFFFFF;
          --accent-glow-rgba: rgba(99, 102, 255, 0.48);
          --accent-border-rgba: rgba(131, 133, 255, 0.28);
          --phone-gradient:
            radial-gradient(125% 46% at 50% 103%, #6B6EFF 0%, #585BF2 22%, #34369E 45%, rgba(28, 29, 72, 0.38) 68%, transparent 85%),
            linear-gradient(180deg, #141518 0%, #16171C 46%, #1E2038 74%, #37398F 100%);
          --map-land: #111216;
          --map-water-1: #17182B;
          --map-water-2: #0D0E14;
          --map-park-1: #1B1C30;
          --map-park-2: #141522;
          --map-building: #17181E;
          --map-street: #242638;
          --map-highway: #3B3E7A;
          --map-label: #8E90B8;
          --map-park-label: #7A7DFF;
          --map-water-label: #5E6099;
        }

        .font-editorial {
          font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        body, .font-sans {
          font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.012em;
        }
        .hellow-phone-gradient {
          background: var(--phone-gradient);
        }
        .apple-glass {
          position: relative;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(16, 17, 22, 0.72) 100%);
          backdrop-filter: blur(24px) saturate(145%);
          -webkit-backdrop-filter: blur(24px) saturate(145%);
          box-shadow: 0 12px 30px -10px rgba(2, 4, 8, 0.78);
        }
        .apple-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.04) 36%, rgba(255, 255, 255, 0) 64%, rgba(255, 255, 255, 0.24) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .apple-glass-strong {
          position: relative;
          background: linear-gradient(155deg, rgba(28, 30, 44, 0.62) 0%, rgba(15, 16, 21, 0.90) 100%);
          backdrop-filter: blur(30px) saturate(160%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          box-shadow: 0 18px 40px -12px rgba(2, 4, 8, 0.84);
        }
        .apple-glass-strong::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.06) 38%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0.30) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .red-glass {
          position: relative;
          background: linear-gradient(145deg, rgba(239, 30, 90, 0.32) 0%, rgba(92, 12, 36, 0.72) 100%);
          backdrop-filter: blur(24px) saturate(150%);
          -webkit-backdrop-filter: blur(24px) saturate(150%);
          box-shadow: 0 12px 30px -10px rgba(239, 30, 90, 0.32);
        }
        .red-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 175, 198, 0.58) 0%, rgba(239, 30, 90, 0.14) 38%, rgba(239, 30, 90, 0) 64%, rgba(255, 120, 158, 0.36) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .wood-glass-pill {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.11) 0%, rgba(16, 17, 22, 0.58) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .wood-glass-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0.28) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .wood-glass-pill-inner {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
        }
        .wood-glass-pill-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.18) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .theme-cta-btn {
          background-color: var(--accent-primary);
          color: var(--accent-cta-text);
          transition: background-color 0.22s ease, color 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease;
        }
        .theme-cta-btn:hover {
          background-color: var(--accent-hover);
          color: var(--accent-cta-hover-text);
          box-shadow: 0 8px 22px -6px rgba(239, 30, 90, 0.55);
        }
        .theme-crimson-pill {
          background-color: #EF1E5A;
          color: #FFFFFF;
        }
        .theme-crimson-pill:hover {
          background-color: #D4154C;
        }
        @keyframes radarPulse {
          0% { transform: scale(0.88); opacity: 0.55; }
          70% { transform: scale(1.38); opacity: 0; }
          100% { transform: scale(1.38); opacity: 0; }
        }
        @keyframes chatStreamFlow {
          0% { stroke-dashoffset: 32; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-chat-stream {
          animation: chatStreamFlow 1.1s linear infinite;
        }
        .animate-radar-ring {
          animation: radarPulse 3.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        .animate-radar-ring-delay {
          animation: radarPulse 3.4s cubic-bezier(0.22, 1, 0.36, 1) 1.7s infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Top Desktop Companion / iOS App Bridge Bar */}
      <header className="w-full px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[var(--surface-top)]/92 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] flex items-center justify-center text-[var(--accent-cta-text)] font-bold text-sm shadow-sm">
            H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-[0.22em] text-xs uppercase text-white">
                HELLOW
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-[var(--accent-secondary)] border border-white/15">
                iOS + Web Companion
              </span>
            </div>
            <p className="text-[11px] text-white/60 hidden sm:block">
              Proximity Icebreakers & Shared Local Rewards
            </p>
          </div>
        </div>

        {/* Interactive Preview Switcher + Get iOS App CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center p-1 rounded-full wood-glass-pill">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                previewMode === 'mobile'
                  ? 'bg-white text-[#060D0A] font-semibold shadow-xs'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone View</span>
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                previewMode === 'desktop'
                  ? 'bg-white text-[#060D0A] font-semibold shadow-xs'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Expanded Web</span>
            </button>
          </div>

          <button
            onClick={() => setShowIosModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full theme-cta-btn text-xs font-semibold shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get iOS App</span>
          </button>
        </div>
      </header>

      {/* Main Stage with Theme-Aware Ambient Glow */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center py-4 sm:py-6 px-3 sm:px-6">
        <div
          className="pointer-events-none absolute -top-28 left-1/4 w-[460px] h-[460px] rounded-full opacity-35 blur-3xl"
          style={{
            background:
              appTheme === 'violet-crimson'
                ? 'radial-gradient(circle, #EF1E5A 0%, transparent 70%)'
                : 'radial-gradient(circle, #133529 0%, transparent 70%)'
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/5 w-[460px] h-[460px] rounded-full opacity-35 blur-3xl"
          style={{
            background:
              appTheme === 'violet-crimson'
                ? 'radial-gradient(circle, #6366FF 0%, transparent 70%)'
                : 'radial-gradient(circle, #52B788 0%, transparent 70%)'
          }}
        />

        {/* Responsive Device Frame Container */}
        <div
          className={`relative z-10 w-full transition-all duration-500 flex flex-col overflow-hidden hellow-phone-gradient border border-white/15 shadow-[0_32px_80px_-15px_rgba(2,4,8,0.94)] ${
            previewMode === 'mobile'
              ? 'max-w-[412px] h-[810px] rounded-[46px]'
              : 'max-w-[540px] h-[830px] rounded-[36px]'
          }`}
        >
          {/* Floating Live Feedback Toast */}
          {toastMessage && (
            <div className="absolute top-16 left-4 right-4 z-50 animate-bounce">
              <div className="wood-glass-pill px-3.5 py-2 rounded-full text-xs text-white flex items-center gap-2.5 shadow-xl">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shrink-0 ${
                    appTheme === 'violet-crimson'
                      ? 'theme-crimson-pill'
                      : 'wood-glass-pill-inner text-[var(--accent-secondary)]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  HELLOW
                </span>
                <span className="leading-snug text-white/85 font-normal truncate">
                  {toastMessage}
                </span>
              </div>
            </div>
          )}

          {/* App Status & Points Bar */}
          <div
            className={`px-6 pt-5 pb-3 flex items-center justify-between relative z-30 transition-all duration-300 ${
              activeTab === 'radar'
                ? 'bg-transparent pointer-events-none'
                : activeTab === 'persona'
                ? `bg-transparent pointer-events-none ${
                    personaHeaderVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2'
                  }`
                : 'border-b border-white/10 bg-[var(--surface-top)]/78 backdrop-blur-md'
            }`}
          >
            <div
              className={
                activeTab === 'persona' && !personaHeaderVisible
                  ? 'pointer-events-none'
                  : 'pointer-events-auto'
              }
            >
              <h1 className="font-editorial text-2xl tracking-[0.16em] text-white leading-none drop-shadow-[0_2px_12px_rgba(2,4,8,0.95)]">
                HELLOW
              </h1>
              {activeTab !== 'radar' && activeTab !== 'persona' && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      radarActive
                        ? 'bg-[var(--accent-secondary)] shadow-[0_0_8px_var(--accent-secondary)] animate-pulse'
                        : 'bg-white/40'
                    }`}
                  />
                  <span className="text-[11px] font-medium text-white/85 drop-shadow-[0_1px_8px_rgba(2,4,8,0.95)]">
                    {radarActive ? '11 Salem St • Medford' : 'Ghost Mode (Paused)'}
                  </span>
                </div>
              )}
            </div>

            <div
              className={`flex items-center gap-2 ${
                activeTab === 'persona' && !personaHeaderVisible
                  ? 'pointer-events-none'
                  : 'pointer-events-auto'
              }`}
            >
              {/* Points Pill */}
              <button
                onClick={() => setActiveTab('rewards')}
                className="flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-full wood-glass-pill hover:bg-white/10 transition-all cursor-pointer group"
                title="View Hellow Rewards"
              >
                <span className="wood-glass-pill-inner px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-semibold text-white">
                  <Award
                    className={`w-3 h-3 ${
                      appTheme === 'violet-crimson'
                        ? 'text-[#EF1E5A]'
                        : 'text-[var(--accent-secondary)]'
                    }`}
                  />
                  {points}
                </span>
                <span className="text-[11px] font-normal text-white/75 group-hover:text-white">
                  pts
                </span>
              </button>

              {/* Edit Profile Gear Button (Shown on My Persona Tab) */}
              {activeTab === 'persona' && (
                <button
                  type="button"
                  onClick={openEditProfile}
                  className="p-2 rounded-full wood-glass-pill hover:bg-[#EF1E5A]/80 text-white transition-all cursor-pointer"
                  title="Edit Profile & Theme"
                >
                  <Settings className="w-4 h-4 text-white" />
                </button>
              )}

              {/* Quick Radar / Ghost Mode Switch */}
              <button
                onClick={() => {
                  setRadarActive(!radarActive);
                  triggerToast(
                    !radarActive
                      ? 'Radar Active — You are discoverable within your chosen range.'
                      : 'Ghost Mode On — You are completely invisible.'
                  );
                }}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  radarActive
                    ? appTheme === 'violet-crimson'
                      ? 'bg-[#EF1E5A] text-white shadow-[0_0_16px_rgba(239,30,90,0.55)]'
                      : 'bg-white text-[#060D0A] shadow-[0_0_16px_rgba(183,228,199,0.45)]'
                    : 'wood-glass-pill text-white/65'
                }`}
                title={radarActive ? 'Radar Active' : 'Ghost Mode Paused'}
              >
                {radarActive ? <Radio className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div
            onScroll={activeTab === 'persona' ? handlePersonaScroll : undefined}
            className={`flex-1 ${
              activeTab === 'radar'
                ? 'overflow-hidden px-5 -mt-[72px] pt-0 pb-2 flex flex-col'
                : activeTab === 'persona'
                ? 'overflow-y-auto overscroll-none px-5 -mt-[72px] pt-0 pb-28'
                : 'overflow-y-auto px-5 pt-3.5 pb-28 space-y-5'
            }`}
          >
            {/* ==================== TAB 1: FULL-BLEED PINCH-ZOOM MAP OR FANNED PERSONA CARDS ==================== */}
            {activeTab === 'radar' && (
              <>
                {/* Floating Map / Cards Mode Switcher Pill Below Header */}
                <div className="relative z-30 pt-[76px] pb-2 flex items-center justify-between pointer-events-none">
                  <div className="wood-glass-pill rounded-full p-1 inline-flex items-center gap-1 pointer-events-auto shadow-md">
                    <button
                      type="button"
                      onClick={() => setRadarDisplayMode('map')}
                      className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                        radarDisplayMode === 'map'
                          ? 'bg-white text-[#060D0A] font-semibold shadow-xs'
                          : 'text-white/80 font-normal hover:text-white'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRadarDisplayMode('cards')}
                      className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                        radarDisplayMode === 'cards'
                          ? 'bg-white text-[#060D0A] font-semibold shadow-xs'
                          : 'text-white/80 font-normal hover:text-white'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Cards</span>
                    </button>
                  </div>

                  {radarActive && radarDisplayMode === 'cards' && (
                    <span className="px-3 py-1 rounded-full wood-glass-pill text-[11px] text-white/85 pointer-events-auto">
                      <strong className="font-semibold text-white">{carouselIndex + 1}</strong> of{' '}
                      {visiblePeers.length} nearby
                    </span>
                  )}
                </div>

                {radarDisplayMode === 'cards' ? (
                  /* ==================== FULL-SCREEN FANNED 3D CAROUSEL CARDS VIEW ==================== */
                  <div className="flex-1 flex flex-col justify-between pt-1 pb-2 select-none">
                    {!radarActive ? (
                      <div className="my-auto apple-glass rounded-3xl p-6 text-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl wood-glass-pill-inner mx-auto flex items-center justify-center text-[var(--accent-primary)]">
                          <EyeOff className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-sm text-white">
                          You are in Ghost Mode
                        </h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                          Turn on Radar to browse nearby people in full-card carousel mode.
                        </p>
                        <button
                          onClick={() => setRadarActive(true)}
                          className="px-5 py-2 rounded-full theme-cta-btn text-xs font-semibold cursor-pointer"
                        >
                          Go Live on Radar
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Fanned Coverflow Card Stage */}
                        <div
                          onTouchStart={handleCarouselTouchStart}
                          onTouchEnd={handleCarouselTouchEnd}
                          className="relative flex-1 min-h-[470px] -mx-5 flex items-center justify-center overflow-hidden touch-pan-y"
                        >
                          {visiblePeers.map((peer, idx) => {
                            const total = visiblePeers.length;
                            let offset = idx - carouselIndex;
                            if (offset > Math.floor(total / 2)) offset -= total;
                            if (offset < -Math.floor(total / 2)) offset += total;

                            const absOffset = Math.abs(offset);
                            if (absOffset > 2) return null;

                            const isCenter = offset === 0;
                            const translateX = offset * 118;
                            const translateY = absOffset * 12;
                            const scale = isCenter ? 1 : absOffset === 1 ? 0.86 : 0.74;
                            const rotateZ = offset * 4.5;
                            const zIndex = 30 - absOffset * 10;
                            const peerLevel = getSocialLevelInfo(
                              peer.connectionsCount +
                                (waveStates[peer.id] === 'confirmed' ? 1 : 0)
                            );

                            return (
                              <div
                                key={peer.id}
                                onClick={() => {
                                  if (isCenter) {
                                    setFocusedMapPeerId(peer.id);
                                    setSelectedPeer(peer);
                                  } else {
                                    setCarouselIndex(idx);
                                  }
                                }}
                                style={{
                                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotateZ}deg)`,
                                  zIndex,
                                  opacity: isCenter ? 1 : absOffset === 1 ? 0.85 : 0.55
                                }}
                                className={`absolute w-[78%] max-w-[305px] h-[445px] rounded-[34px] overflow-hidden transition-all duration-500 ease-out cursor-pointer border ${
                                  isCenter
                                    ? 'border-[var(--accent-primary)]/70 shadow-[0_28px_60px_-14px_rgba(2,4,10,0.88)]'
                                    : 'border-white/20 shadow-xl'
                                } bg-[var(--surface-top)]`}
                              >
                                {/* Full-Bleed Portrait Photo */}
                                <img
                                  src={peer.photo}
                                  alt={peer.name}
                                  draggable={false}
                                  className="w-full h-full object-cover object-top"
                                />

                                {/* Atmospheric Top & Bottom Vignette */}
                                <div
                                  className="absolute inset-0 pointer-events-none"
                                  style={{
                                    background:
                                      appTheme === 'violet-crimson'
                                        ? 'linear-gradient(to bottom, rgba(20,21,24,0.38) 0%, rgba(20,21,24,0) 28%, rgba(20,21,24,0.34) 52%, rgba(20,21,24,0.92) 78%, rgba(20,21,24,0.99) 100%)'
                                        : 'linear-gradient(to bottom, rgba(5,22,26,0.38) 0%, rgba(5,22,26,0) 28%, rgba(5,22,26,0.34) 52%, rgba(5,22,26,0.92) 78%, rgba(5,22,26,0.99) 100%)'
                                  }}
                                />

                                {/* Top Row: Distance Pill & Social Level Badge */}
                                <div className="absolute top-3.5 inset-x-3.5 flex items-start justify-between gap-2">
                                  <span className="px-2.5 py-1 rounded-full wood-glass-pill text-white text-[10px] font-semibold">
                                    {peer.distanceLabel}
                                  </span>

                                  <div
                                    className={`px-2.5 py-1 rounded-2xl backdrop-blur-md border flex items-center gap-1.5 ${
                                      peerLevel.isIconic
                                        ? 'bg-[var(--surface-top)]/90 text-[var(--accent-primary)] border-[var(--accent-primary)]/50'
                                        : 'wood-glass-pill text-white'
                                    }`}
                                  >
                                    <span className="text-xs leading-none">{peerLevel.emoji}</span>
                                    <div className="leading-tight">
                                      <div className="text-[9px] font-semibold">{peerLevel.title}</div>
                                      <div className="text-[8px] font-medium text-[var(--accent-secondary)]">
                                        Lvl {peerLevel.degree}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom Persona Info & Top Icebreaker */}
                                <div className="absolute bottom-4 inset-x-4 space-y-2.5 text-white">
                                  <div className="flex items-end justify-between gap-2">
                                    <div className="min-w-0">
                                      <div className="inline-block px-2.5 py-0.5 rounded-full wood-glass-pill-inner text-[10px] font-semibold text-[var(--accent-secondary)] mb-1">
                                        @{peer.username}
                                      </div>
                                      <h3 className="font-editorial text-3xl text-white leading-none truncate">
                                        {peer.name}
                                      </h3>
                                      <p className="text-[11px] text-white/70 mt-1 truncate">
                                        {peer.venueSpot}
                                      </p>
                                    </div>

                                    <span className="w-10 h-10 rounded-full theme-cta-btn flex items-center justify-center shrink-0 shadow-md">
                                      <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                  </div>

                                  {/* Top Icebreaker Frosted Strip */}
                                  {peer.icebreakers[0] && (
                                    <div className="p-2.5 rounded-2xl wood-glass-pill">
                                      <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                                        Top Icebreaker • {peer.sharedTags[0]}
                                      </div>
                                      <p className="text-[11px] text-white/90 leading-snug line-clamp-2 mt-0.5">
                                        “{peer.icebreakers[0].prompt}”
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Carousel Pagination Dots & Swipe Controls */}
                        <div className="flex items-center justify-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => stepCarousel(-1)}
                            className="px-3.5 py-1 rounded-full wood-glass-pill text-[11px] font-semibold text-white hover:bg-[#EF1E5A] cursor-pointer transition-colors"
                          >
                            Prev
                          </button>

                          <div className="flex items-center gap-1.5">
                            {visiblePeers.map((p, i) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => setCarouselIndex(i)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  i === carouselIndex
                                    ? appTheme === 'violet-crimson'
                                      ? 'w-5 bg-[#EF1E5A]'
                                      : 'w-5 bg-[#8BBB92]'
                                    : 'w-1.5 bg-white/30'
                                }`}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => stepCarousel(1)}
                            className="px-3.5 py-1 rounded-full wood-glass-pill text-[11px] font-semibold text-white hover:bg-[#EF1E5A] cursor-pointer transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Upper Apple MapKit Stage (Expands to Full Display when isFullScreenMap is active) */}
                    <div
                      onWheel={handleMapWheel}
                      onMouseDown={handleMapMouseDown}
                      onMouseMove={handleMapMouseMove}
                      onMouseUp={handleMapMouseUp}
                      onMouseLeave={handleMapMouseUp}
                      onTouchStart={handleMapTouchStart}
                      onTouchMove={handleMapTouchMove}
                      onTouchEnd={handleMapTouchEnd}
                      className={`relative -mx-5 -mt-[124px] shrink-0 overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing bg-[var(--map-land)] transition-all duration-500 ${
                        isFullScreenMap ? 'flex-1 h-full' : 'h-[345px]'
                      }`}
                    >
                      {/* Zoomable & Pannable Theme-Synced Apple MapKit Cartography */}
                      <div
                        style={{
                          transform: `translate(${mapPan.x}px, ${mapPan.y}px) scale(${mapZoom})`,
                          transformOrigin: '50% 48%'
                        }}
                        className="absolute inset-0 transition-transform duration-150 ease-out"
                      >
                        <svg
                          viewBox="0 0 400 320"
                          className="w-full h-full object-cover"
                          preserveAspectRatio="xMidYMid slice"
                        >
                          <defs>
                            <linearGradient id="appleMapWater" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="var(--map-water-1)" />
                              <stop offset="100%" stopColor="var(--map-water-2)" />
                            </linearGradient>
                            <linearGradient id="appleParkGreen" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--map-park-1)" />
                              <stop offset="100%" stopColor="var(--map-park-2)" />
                            </linearGradient>
                          </defs>

                          {/* Dark Land Base */}
                          <rect width="400" height="320" fill="var(--map-land)" />

                          {/* Subtle Parks */}
                          <polygon
                            points="212,24 338,18 346,118 220,126"
                            fill="url(#appleParkGreen)"
                          />
                          <polygon
                            points="12,182 148,170 156,246 18,256"
                            fill="url(#appleParkGreen)"
                            opacity="0.85"
                          />
                          <polygon
                            points="296,142 388,136 392,188 302,196"
                            fill="url(#appleParkGreen)"
                            opacity="0.75"
                          />

                          {/* Building Footprints */}
                          <g fill="var(--map-building)" stroke="var(--map-street)" strokeWidth="0.6">
                            <rect x="155" y="118" width="22" height="16" rx="2" />
                            <rect x="195" y="132" width="26" height="14" rx="2" />
                            <rect x="232" y="136" width="18" height="15" rx="2" />
                            <rect x="148" y="160" width="24" height="18" rx="2" />
                            <rect x="196" y="162" width="28" height="20" rx="2" />
                            <rect x="92" y="128" width="32" height="18" rx="2" />
                            <rect x="52" y="96" width="26" height="22" rx="2" />
                          </g>

                          {/* Mystic River */}
                          <path
                            d="M 105 320 Q 198 266, 272 232 T 405 186 L 405 320 L 105 320 Z"
                            fill="url(#appleMapWater)"
                          />
                          <path
                            d="M 105 320 Q 198 266, 272 232 T 405 186"
                            stroke="var(--map-street)"
                            strokeWidth="1.5"
                            fill="none"
                          />

                          {/* Road Casings */}
                          <g stroke="#060609" strokeLinecap="round" fill="none">
                            <path d="M 10 172 L 185 152 L 390 128" strokeWidth="10.5" />
                            <path d="M 185 152 L 172 10" strokeWidth="9.5" />
                            <path d="M 185 152 L 158 310" strokeWidth="10" />
                            <path d="M 185 152 L 368 216" strokeWidth="8.5" />
                            <path d="M 60 85 L 335 70" strokeWidth="6.5" />
                            <path d="M 332 10 L 356 312" strokeWidth="11.5" stroke="var(--surface-top)" />
                          </g>

                          {/* Road Fills */}
                          <g stroke="var(--map-street)" strokeLinecap="round" fill="none">
                            <path d="M 10 172 L 185 152 L 390 128" strokeWidth="8.5" />
                            <path d="M 185 152 L 172 10" strokeWidth="7.5" />
                            <path d="M 185 152 L 158 310" strokeWidth="8" />
                            <path d="M 185 152 L 368 216" strokeWidth="6.5" />
                            <path d="M 60 85 L 335 70" strokeWidth="4.8" />
                            <path d="M 332 10 L 356 312" strokeWidth="8.5" stroke="var(--map-highway)" />
                          </g>

                          {/* Dotted Walking Route Polyline from 11 Salem St */}
                          {radarActive && focusedMapPeer && (
                            <>
                              <path
                                d={`M 200 150 Q ${(200 + focusedMapPeer.mapCoord.x * 4) / 2} ${
                                  (150 + focusedMapPeer.mapCoord.y * 3.2) / 2 - 16
                                }, ${focusedMapPeer.mapCoord.x * 4} ${
                                  focusedMapPeer.mapCoord.y * 3.2
                                }`}
                                stroke="var(--map-land)"
                                strokeWidth="6.5"
                                strokeLinecap="round"
                                fill="none"
                              />
                              <path
                                d={`M 200 150 Q ${(200 + focusedMapPeer.mapCoord.x * 4) / 2} ${
                                  (150 + focusedMapPeer.mapCoord.y * 3.2) / 2 - 16
                                }, ${focusedMapPeer.mapCoord.x * 4} ${
                                  focusedMapPeer.mapCoord.y * 3.2
                                }`}
                                stroke="var(--accent-secondary)"
                                strokeWidth="3.8"
                                strokeDasharray="1 7"
                                strokeLinecap="round"
                                fill="none"
                              />
                            </>
                          )}

                          {/* Animated Live Chat & Connection Data-Stream Links */}
                          {radarActive &&
                            visiblePeers
                              .filter(
                                (p) =>
                                  waveStates[p.id] === 'confirmed' ||
                                  waveStates[p.id] === 'waved'
                              )
                              .map((chatPeer) => {
                                const targetX = chatPeer.mapCoord.x * 4;
                                const targetY = chatPeer.mapCoord.y * 3.2;
                                const ctrlX = (200 + targetX) / 2;
                                const ctrlY = (150 + targetY) / 2 - 22;
                                const pathD = `M 200 150 Q ${ctrlX} ${ctrlY}, ${targetX} ${targetY}`;
                                const isConfirmed = waveStates[chatPeer.id] === 'confirmed';

                                return (
                                  <g key={`chat-link-${chatPeer.id}`}>
                                    {/* Ambient Glowing Conduit Base */}
                                    <path
                                      d={pathD}
                                      stroke={
                                        isConfirmed
                                          ? appTheme === 'violet-crimson'
                                            ? '#EF1E5A'
                                            : '#95D5B2'
                                          : 'var(--accent-primary)'
                                      }
                                      strokeWidth="5"
                                      strokeOpacity="0.25"
                                      strokeLinecap="round"
                                      fill="none"
                                    />
                                    {/* Continuous Flowing Data Packets (Download-Style Stream) */}
                                    <path
                                      d={pathD}
                                      stroke={
                                        isConfirmed
                                          ? appTheme === 'violet-crimson'
                                            ? '#FF477E'
                                            : '#B7E4C7'
                                          : 'var(--accent-secondary)'
                                      }
                                      strokeWidth="3"
                                      strokeDasharray="6 6 2 6"
                                      strokeLinecap="round"
                                      fill="none"
                                      className="animate-chat-stream"
                                    />
                                  </g>
                                );
                              })}

                          {/* Apple Maps Typography & Highway Shield */}
                          <g fontFamily="'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif">
                            <text
                              x="246"
                              y="141"
                              fontSize="8"
                              fontWeight="600"
                              fill="var(--map-label)"
                              letterSpacing="0.04em"
                            >
                              Salem St
                            </text>
                            <text
                              x="66"
                              y="163"
                              fontSize="8"
                              fontWeight="600"
                              fill="var(--map-label)"
                              letterSpacing="0.04em"
                            >
                              High St
                            </text>
                            <text
                              x="122"
                              y="238"
                              fontSize="8"
                              fontWeight="600"
                              fill="var(--map-label)"
                              letterSpacing="0.04em"
                            >
                              Main St
                            </text>
                            <text
                              x="252"
                              y="62"
                              fontSize="8"
                              fontWeight="600"
                              fill="var(--map-park-label)"
                            >
                              Medford Common
                            </text>
                            <text
                              x="254"
                              y="272"
                              fontSize="8.5"
                              fontWeight="600"
                              fill="var(--map-water-label)"
                              fontStyle="italic"
                            >
                              Mystic River
                            </text>

                            {/* I-93 Interstate Shield */}
                            <rect
                              x="333"
                              y="104"
                              width="22"
                              height="15"
                              rx="4"
                              fill="var(--surface-top)"
                              stroke="var(--accent-primary)"
                              strokeWidth="1"
                            />
                            <text
                              x="344"
                              y="114.5"
                              fontSize="7.5"
                              fontWeight="700"
                              fill="var(--accent-secondary)"
                              textAnchor="middle"
                            >
                              I-93
                            </text>
                          </g>
                        </svg>

                        {/* User Anchor Pin: Foreground Location Icon at 11 Salem St */}
                        <div
                          style={{ left: '50%', top: '47%' }}
                          className="absolute -translate-x-1/2 -translate-y-full z-40 flex flex-col items-center pointer-events-none"
                        >
                          <div className="relative flex items-center justify-center">
                            {radarActive && (
                              <span
                                className={`absolute w-8 h-8 rounded-full animate-ping ${
                                  appTheme === 'violet-crimson'
                                    ? 'bg-[#EF1E5A]/45'
                                    : 'bg-[#95D5B2]/40'
                                }`}
                              />
                            )}
                            <svg
                              viewBox="0 0 24 24"
                              className={`relative w-5 h-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${
                                appTheme === 'violet-crimson'
                                  ? 'text-[#EF1E5A]'
                                  : 'text-[#95D5B2]'
                              }`}
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Nearby People Pins on the Map */}
                        {radarActive &&
                          visiblePeers.map((peer) => {
                            const isFocused = focusedMapPeer?.id === peer.id;
                            const isHovered = hoveredMapPeerId === peer.id;
                            return (
                              <button
                                key={peer.id}
                                type="button"
                                onMouseEnter={() => setHoveredMapPeerId(peer.id)}
                                onMouseLeave={() => setHoveredMapPeerId(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFocusedMapPeerId(peer.id);
                                  setSelectedPeer(peer);
                                }}
                                style={{
                                  left: `${peer.mapCoord.x}%`,
                                  top: `${peer.mapCoord.y}%`
                                }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer ${
                                  isFocused || isHovered ? 'z-30' : 'z-20'
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
                                    isFocused || isHovered
                                      ? appTheme === 'violet-crimson'
                                        ? 'border-[#EF1E5A] ring-4 ring-[#6366FF]/45 shadow-lg'
                                        : 'border-[#95D5B2] ring-4 ring-[#52B788]/40 shadow-lg'
                                      : 'border-white/55 shadow-md'
                                  }`}
                                >
                                  <img
                                    src={peer.photo}
                                    alt={peer.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span
                                  className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-xs whitespace-nowrap transition-colors flex items-center gap-1 ${
                                    isFocused || isHovered
                                      ? appTheme === 'violet-crimson'
                                        ? 'bg-[#EF1E5A] text-white'
                                        : 'bg-white text-[#060D0A]'
                                      : 'bg-[var(--surface-top)]/90 text-white border border-white/20'
                                  }`}
                                >
                                  {(waveStates[peer.id] === 'confirmed' ||
                                    waveStates[peer.id] === 'waved') && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                                  )}
                                  {peer.name}
                                </span>
                              </button>
                            );
                          })}
                      </div>

                      {/* Fixed Top-Left Hover HUD Card */}
                      {radarActive && hoveredPeer && (
                        <div className="absolute top-[118px] left-5 z-30 pointer-events-none">
                          <div className="apple-glass-strong rounded-2xl px-3 py-2 shadow-md max-w-[240px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-semibold text-white">
                                {hoveredPeer.name}
                              </span>
                              <span
                                className={`text-[10px] font-semibold ${
                                  appTheme === 'violet-crimson'
                                    ? 'text-[#EF1E5A]'
                                    : 'text-[#8BBB92]'
                                }`}
                              >
                                • {hoveredPeer.distanceLabel}
                              </span>
                            </div>
                            <p className="text-[10px] text-white/70 truncate mt-0.5">
                              {hoveredPeer.venueSpot}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Subtle Top Atmospheric Fade Over Full-Bleed Map Behind HELLOW Header */}
                      <div
                        className="absolute inset-x-0 top-0 h-28 pointer-events-none z-20"
                        style={{
                          background:
                            appTheme === 'violet-crimson'
                              ? 'linear-gradient(to bottom, rgba(20, 21, 24, 0.86) 0%, rgba(20, 21, 24, 0.42) 55%, rgba(20, 21, 24, 0) 100%)'
                              : 'linear-gradient(to bottom, rgba(6, 13, 10, 0.86) 0%, rgba(6, 13, 10, 0.42) 55%, rgba(6, 13, 10, 0) 100%)'
                        }}
                      />

                      {/* Bottom Overlay Row Inside Map: 11 Salem St Pill (Left) + Zoom & Full-Screen Map Controls (Right) */}
                      <div
                        className={`absolute inset-x-5 z-30 flex items-center justify-between gap-2 transition-all duration-300 ${
                          isFullScreenMap ? 'bottom-20' : 'bottom-5'
                        }`}
                      >
                        {/* Exact Origin Location Tag */}
                        <div className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full wood-glass-pill shadow-sm">
                          <span className="wood-glass-pill-inner px-2 py-0.5 rounded-full inline-flex items-center gap-1 text-[11px] font-semibold text-white">
                            <svg
                              viewBox="0 0 24 24"
                              className={`w-3 h-3 shrink-0 ${
                                appTheme === 'violet-crimson'
                                  ? 'text-[#EF1E5A]'
                                  : 'text-[#8BBB92]'
                              }`}
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z"
                              />
                            </svg>
                            11 Salem St
                          </span>
                          <span className="text-[11px] font-normal text-white/75">
                            Medford
                          </span>
                        </div>

                        {/* Zoom Out (-), Zoom In (+), and Full-Screen Map Scale Toggle */}
                        {radarActive && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                adjustMapZoom(-0.25);
                              }}
                              title="Zoom Out (See Wider Area)"
                              className="w-8 h-8 rounded-full wood-glass-pill text-white font-semibold text-sm flex items-center justify-center hover:bg-[#EF1E5A] shadow-sm cursor-pointer transition-colors"
                            >
                              −
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                adjustMapZoom(0.25);
                              }}
                              title="Zoom In (Closer Vicinity)"
                              className="w-8 h-8 rounded-full wood-glass-pill text-white font-semibold text-sm flex items-center justify-center hover:bg-[#EF1E5A] shadow-sm cursor-pointer transition-colors"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFullScreenMap((prev) => !prev);
                              }}
                              title={
                                isFullScreenMap
                                  ? 'Show Compatible People List'
                                  : 'Expand Full-Screen Map'
                              }
                              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors ${
                                isFullScreenMap
                                  ? 'bg-white text-[#141518]'
                                  : 'wood-glass-pill text-white hover:bg-[#EF1E5A]'
                              }`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-3.5 h-3.5"
                              >
                                {isFullScreenMap ? (
                                  <>
                                    <polyline points="4 14 10 14 10 20" />
                                    <polyline points="20 10 14 10 14 4" />
                                    <line x1="14" y1="10" x2="21" y2="3" />
                                    <line x1="3" y1="21" x2="10" y2="14" />
                                  </>
                                ) : (
                                  <>
                                    <polyline points="15 3 21 3 21 9" />
                                    <polyline points="9 21 3 21 3 15" />
                                    <line x1="21" y1="3" x2="14" y2="10" />
                                    <line x1="3" y1="21" x2="10" y2="14" />
                                  </>
                                )}
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Gradual Atmospheric Bottom Dissolve */}
                      {!isFullScreenMap && (
                        <div
                          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
                          style={{
                            background:
                              appTheme === 'violet-crimson'
                                ? 'linear-gradient(to bottom, rgba(22, 23, 28, 0) 0%, rgba(22, 23, 28, 0.72) 48%, rgba(22, 23, 28, 0.96) 82%, #16171C 100%)'
                                : 'linear-gradient(to bottom, rgba(8, 18, 14, 0) 0%, rgba(8, 18, 14, 0.72) 48%, rgba(8, 18, 14, 0.96) 82%, #08120E 100%)'
                          }}
                        />
                      )}
                    </div>

                    {/* Dedicated Scrollable Compatible People Nearby Section (Hidden in Full-Screen Map Mode) */}
                    {!isFullScreenMap && (
                      <div className="relative z-30 flex-1 min-h-0 flex flex-col pt-1">
                        <div className="flex items-center justify-between px-1 pb-2 shrink-0">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                            Compatible People Nearby
                          </span>
                          <span className="text-[11px] font-medium text-[var(--accent-secondary)]">
                            {radarActive ? `${visiblePeers.length} in area` : 'Paused'}
                          </span>
                        </div>

                        {!radarActive ? (
                          <div className="apple-glass rounded-3xl p-6 text-center space-y-3 my-auto">
                            <div className="w-12 h-12 rounded-2xl wood-glass-pill-inner mx-auto flex items-center justify-center text-[var(--accent-primary)]">
                              <EyeOff className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-sm text-white">
                              You are in Ghost Mode
                            </h3>
                            <p className="text-xs text-white/70 leading-relaxed">
                              Your profile is invisible and nearby discovery is paused. Switch back
                              on whenever you are ready to connect.
                            </p>
                            <button
                              onClick={() => setRadarActive(true)}
                              className="px-5 py-2 rounded-full theme-cta-btn text-xs font-semibold cursor-pointer"
                            >
                              Go Live on Radar
                            </button>
                          </div>
                        ) : (
                          /* Independent Scrollable List with Bottom Atmospheric Horizon Fade */
                          <div className="relative flex-1 min-h-0 flex flex-col">
                            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pb-24 pr-0.5">
                              {visiblePeers.map((peer) => {
                                const status = waveStates[peer.id] || 'idle';
                                const isSelectedOnMap = focusedMapPeer?.id === peer.id;
                                return (
                                  <div
                                    key={peer.id}
                                    onClick={() => {
                                      setFocusedMapPeerId(peer.id);
                                      setSelectedPeer(peer);
                                    }}
                                    onMouseEnter={() => setHoveredMapPeerId(peer.id)}
                                    onMouseLeave={() => setHoveredMapPeerId(null)}
                                    className={`apple-glass rounded-[22px] px-3.5 py-2.5 transition-all hover:bg-white/10 cursor-pointer group ${
                                      isSelectedOnMap
                                        ? 'ring-1 ring-[var(--accent-primary)]/80'
                                        : ''
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-2.5">
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <img
                                          src={peer.photo}
                                          alt={peer.name}
                                          className="w-10 h-10 rounded-2xl object-cover border border-white/25 shadow-xs shrink-0"
                                        />
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-1.5">
                                            <h3 className="font-semibold text-sm text-white group-hover:text-[var(--accent-secondary)] transition-colors truncate">
                                              {peer.name}
                                            </h3>
                                            <span className="text-[11px] font-normal text-white/75 shrink-0">
                                              • {peer.distanceLabel}
                                            </span>
                                          </div>

                                          {/* Brief Icebreaker Title Tags */}
                                          <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
                                            {peer.sharedTags.slice(0, 2).map((tag) => (
                                              <span
                                                key={tag}
                                                className="px-2.5 py-0.5 rounded-full wood-glass-pill-inner text-[var(--accent-secondary)] text-[10px] font-medium truncate"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1.5 shrink-0">
                                        {status === 'confirmed' && (
                                          <span className="px-2 py-0.5 rounded-full theme-crimson-pill text-[10px] font-semibold flex items-center gap-1">
                                            <Check className="w-2.5 h-2.5" /> Met
                                          </span>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-[#EF1E5A] transition-colors" />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Bottom Atmospheric Horizon Fade Dissolving List Into Menu */}
                            <div
                              className="pointer-events-none absolute -inset-x-5 -bottom-2 h-24 z-20"
                              style={{
                                background:
                                  appTheme === 'violet-crimson'
                                    ? 'linear-gradient(to bottom, rgba(55, 57, 143, 0) 0%, rgba(58, 60, 158, 0.58) 42%, rgba(78, 81, 212, 0.90) 76%, #5B5EF5 100%)'
                                    : 'linear-gradient(to bottom, rgba(19, 53, 41, 0) 0%, rgba(28, 79, 60, 0.58) 42%, rgba(45, 106, 79, 0.90) 76%, #40916C 100%)'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ==================== TAB 2: MY PERSONA & AI SYNC ==================== */}
            {activeTab === 'persona' && (
              <div className="space-y-4">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Full-Bleed 1:1 Square Editorial Portrait Hero Flush to Top, Left & Right Edges */}
                <div className="relative -mx-5 mt-0 aspect-square w-[calc(100%+2.5rem)] overflow-hidden select-none bg-[var(--surface-top)]">
                  <img
                    src={profilePhoto}
                    alt={displayName}
                    style={{
                      objectPosition: `${photoCrop.x}% ${photoCrop.y}%`,
                      transform: `scale(${Math.max(1.02, photoCrop.zoom)})`,
                      transformOrigin: 'center top',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, #000000 0%, #000000 76%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0) 100%)',
                      maskImage:
                        'linear-gradient(to bottom, #000000 0%, #000000 76%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0) 100%)'
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 block"
                  />

                  {/* Subtle Veil Behind Floating Header Text */}
                  <div
                    className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
                    style={{
                      background:
                        appTheme === 'violet-crimson'
                          ? 'linear-gradient(to bottom, rgba(20, 21, 24, 0.78) 0%, rgba(20, 21, 24, 0.28) 55%, rgba(20, 21, 24, 0) 100%)'
                          : 'linear-gradient(to bottom, rgba(5, 22, 26, 0.78) 0%, rgba(5, 22, 26, 0.28) 55%, rgba(5, 22, 26, 0) 100%)'
                    }}
                  />

                  {/* Lowered Subpixel-Safe Bottom Atmospheric Dissolve */}
                  <div
                    className="absolute inset-x-0 -bottom-2 h-28 pointer-events-none z-10"
                    style={{
                      background:
                        appTheme === 'violet-crimson'
                          ? 'linear-gradient(to bottom, rgba(22, 23, 28, 0) 0%, rgba(22, 23, 28, 0.45) 35%, rgba(22, 23, 28, 0.90) 72%, #16171C 100%)'
                          : 'linear-gradient(to bottom, rgba(8, 18, 14, 0) 0%, rgba(8, 18, 14, 0.45) 35%, rgba(8, 18, 14, 0.90) 72%, #08120E 100%)'
                    }}
                  />
                </div>

                {/* Locked Sign-In Identity & First-Name Privacy Card */}
                <div className="relative z-20 -mt-16 space-y-2">
                  {/* Current Location Pill Above Identity Block */}
                  <div className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full wood-glass-pill shadow-sm">
                    <span className="wood-glass-pill-inner px-2 py-0.5 rounded-full inline-flex items-center gap-1 text-[11px] font-semibold text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-3 h-3 shrink-0 ${
                          appTheme === 'violet-crimson'
                            ? 'text-[#EF1E5A]'
                            : 'text-[#8BBB92]'
                        }`}
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z"
                        />
                      </svg>
                      {radarActive ? '11 Salem St' : 'Ghost Mode'}
                    </span>
                    <span className="text-[11px] font-normal text-white/75">
                      {radarActive ? 'Medford' : 'Paused'}
                    </span>
                  </div>

                  <div className="apple-glass-strong rounded-[26px] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full wood-glass-pill-inner text-[10px] font-semibold text-[var(--accent-secondary)] mb-1.5">
                          <AtSign className="w-2.5 h-2.5 text-[var(--accent-secondary)]" />
                          <span>{username}</span>
                        </div>
                        <h2 className="font-editorial text-3xl text-white leading-tight truncate">
                          {displayName}
                        </h2>
                      </div>

                      {/* Top-Right Social Connection Level Badge + Profession Underneath */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0 max-w-[55%]">
                        <div
                          className={`px-2.5 py-1.5 rounded-2xl border shadow-2xs flex items-center gap-1.5 ${
                            userLevel.isIconic
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-cta-text)] border-white'
                              : 'wood-glass-pill text-white'
                          }`}
                        >
                          <span className="text-base leading-none">{userLevel.emoji}</span>
                          <div className="leading-tight">
                            <div className="text-[10px] font-semibold">{userLevel.title}</div>
                            <div
                              className={`text-[9px] font-medium ${
                                userLevel.isIconic
                                  ? 'text-white/90'
                                  : 'text-[var(--accent-secondary)]'
                              }`}
                            >
                              Lvl {userLevel.degree} • {userLevel.count}
                            </div>
                          </div>
                        </div>

                        {profession && (
                          <span className="text-[11px] font-medium text-white/80 text-right leading-snug">
                            {profession}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Social Platforms (Single-Row Swipeable Carousel with Brand Logos) */}
                <div className="apple-glass rounded-[26px] p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                      Connected Platforms
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--accent-secondary)]">
                      {platforms.filter((p) => p.connected).length} of {platforms.length} Synced • Swipe
                    </span>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1.5 px-0.5 snap-x snap-mandatory">
                    {platforms.map((plat) => (
                      <button
                        key={plat.id}
                        type="button"
                        onClick={() => handlePlatformIconClick(plat)}
                        title={
                          plat.connected
                            ? `${plat.name} (${plat.handle}) — Tap to disconnect`
                            : `Connect ${plat.name}`
                        }
                        className="group shrink-0 snap-start flex flex-col items-center gap-1.5 cursor-pointer"
                      >
                        <div
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            plat.connected
                              ? 'bg-[var(--accent-primary)] text-[var(--accent-cta-text)] shadow-[0_0_16px_var(--accent-glow-rgba)] scale-[1.03]'
                              : 'wood-glass-pill-inner text-white/75 group-hover:text-white group-hover:bg-[#EF1E5A]/85'
                          }`}
                        >
                          <PlatformLogo id={plat.id} className="w-5 h-5" />
                          {plat.connected && (
                            <span
                              className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                                appTheme === 'violet-crimson'
                                  ? 'bg-[#EF1E5A] text-white border-white'
                                  : 'bg-[#05161A] text-[#8BBB92] border-[#8BBB92]'
                              }`}
                            >
                              <Check className="w-2 h-2" />
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[9px] font-medium tracking-tight max-w-[54px] truncate ${
                            plat.connected
                              ? 'text-[var(--accent-secondary)] font-semibold'
                              : 'text-white/60 group-hover:text-white'
                          }`}
                        >
                          {plat.name.split(' / ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Opt-In Icebreaker Cards List with Right-Aligned Circular Glass + Icebreaker Trigger */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
                      Active Icebreaker Cards ({myCards.filter((c) => c.active).length})
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomMilestone('');
                        setCustomMediaType('none');
                        setCustomImagePreview('');
                        setCustomImageCrop({ zoom: 1.0, x: 50, y: 50 });
                        setCustomVideoUrl('');
                        setShowAddIcebreakerModal(true);
                      }}
                      className="flex items-center gap-1.5 group cursor-pointer"
                      title="Add Custom Icebreaker"
                    >
                      <span className="w-7 h-7 rounded-full wood-glass-pill group-hover:bg-[#EF1E5A] flex items-center justify-center text-white transition-all shadow-xs">
                        <span className="text-sm font-semibold leading-none">+</span>
                      </span>
                      <span className="text-[11px] font-semibold text-white/85 group-hover:text-white transition-colors">
                        Icebreaker
                      </span>
                    </button>
                  </div>

                  {myCards.map((card) => (
                    <div
                      key={card.id}
                      className={`${
                        card.isCustom ? 'red-glass' : 'apple-glass'
                      } rounded-2xl p-3.5 transition-opacity ${
                        card.active ? 'opacity-100' : 'opacity-55'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                              card.isCustom
                                ? 'text-[#FF9EBA]'
                                : 'text-[var(--accent-secondary)]'
                            }`}
                          >
                            {card.source}
                          </span>
                          <h4 className="font-semibold text-xs text-white mt-0.5">
                            {card.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleRemoveIcebreakerCard(card)}
                            title={
                              card.isCustom
                                ? 'Delete custom icebreaker'
                                : 'Remove & cycle new icebreaker from connected platforms'
                            }
                            className="w-6 h-6 rounded-full wood-glass-pill hover:bg-[#EF1E5A] flex items-center justify-center text-white/85 hover:text-white transition-all cursor-pointer"
                          >
                            <span className="text-xs font-bold leading-none">−</span>
                          </button>
                          <button
                            onClick={() => toggleCardVisibility(card.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-colors ${
                              card.active
                                ? card.isCustom || appTheme === 'violet-crimson'
                                  ? 'theme-crimson-pill'
                                  : 'bg-[#8BBB92] text-[#05161A]'
                                : 'wood-glass-pill-inner text-white/70 hover:text-white'
                            }`}
                          >
                            {card.active ? 'Visible' : 'Hidden'}
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-xs text-white/85 font-normal leading-relaxed flex-1">
                          {card.prompt}
                        </p>

                        {card.media && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMediaLightbox({
                                ...card.media,
                                peerName: displayName,
                                topic: card.title,
                                platform: card.source
                              })
                            }
                            className="shrink-0 group relative w-11 h-11 rounded-xl overflow-hidden border border-white/25 shadow-xs cursor-pointer"
                            title="Preview attached post"
                          >
                            <img
                              src={
                                card.media.type === 'video'
                                  ? card.media.poster
                                  : card.media.url
                              }
                              alt={card.title}
                              style={
                                card.media.crop
                                  ? {
                                      objectPosition: `${card.media.crop.x}% ${card.media.crop.y}%`,
                                      transform: `scale(${card.media.crop.zoom})`
                                    }
                                  : undefined
                              }
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                              {card.media.type === 'video' ? (
                                <Play className="w-3.5 h-3.5 fill-white" />
                              ) : (
                                <ImageIcon className="w-3.5 h-3.5" />
                              )}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 3: DUAL-SIDED REWARDS & PARTNER PERKS ==================== */}
            {activeTab === 'rewards' && (
              <div className="space-y-4">
                {/* Points Balance Wallet Card */}
                <div className="apple-glass-strong rounded-[28px] p-5 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-secondary)]">
                        Hellow Social Wallet
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="font-editorial text-4xl text-white">
                          {points}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            appTheme === 'violet-crimson'
                              ? 'text-[#EF1E5A]'
                              : 'text-[#8BBB92]'
                          }`}
                        >
                          HELLOW PTS
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 font-normal mt-1">
                        Earn +50 pts every time you & a neighbor confirm an in-person Hello.
                      </p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${
                        appTheme === 'violet-crimson'
                          ? 'bg-[#EF1E5A] text-white'
                          : 'bg-[#8BBB92] text-[#05161A]'
                      }`}
                    >
                      <Gift className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Partner Category Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {['All', 'Coffee & Bakery', 'Dining & Delivery', 'Festivals & Events'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setRewardFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                          rewardFilter === cat
                            ? 'theme-cta-btn font-semibold shadow-xs'
                            : 'wood-glass-pill text-white/80 font-normal hover:bg-[#EF1E5A]/80 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                {/* Brand-Themed Partner Rewards List */}
                <div className="space-y-3">
                  {filteredRewards.map((item) => {
                    const isRedeemed = redeemedIds.includes(item.id);
                    const canAfford = points >= item.pointsCost;

                    const brandThemeMap = {
                      dunkin: {
                        bg: 'linear-gradient(135deg, #FF671F 0%, #E11383 100%)',
                        border: 'rgba(255, 255, 255, 0.35)',
                        pillBg: 'rgba(255, 255, 255, 0.22)',
                        ctaBg: '#FFFFFF',
                        ctaText: '#D91A7A'
                      },
                      grubhub: {
                        bg: 'linear-gradient(135deg, #F63440 0%, #B81422 100%)',
                        border: 'rgba(255, 255, 255, 0.35)',
                        pillBg: 'rgba(255, 255, 255, 0.2)',
                        ctaBg: '#FFFFFF',
                        ctaText: '#D92330'
                      },
                      cafeluna: {
                        bg: 'linear-gradient(135deg, #2D221E 0%, #6A4938 100%)',
                        border: 'rgba(255, 255, 255, 0.30)',
                        pillBg: 'rgba(255, 255, 255, 0.16)',
                        ctaBg: '#8BBB92',
                        ctaText: '#05161A'
                      },
                      chevalier: {
                        bg: 'linear-gradient(135deg, #092328 0%, #12544F 100%)',
                        border: 'rgba(139, 187, 146, 0.42)',
                        pillBg: 'rgba(255, 255, 255, 0.16)',
                        ctaBg: '#8BBB92',
                        ctaText: '#05161A'
                      }
                    };
                    const theme = brandThemeMap[item.brandType] || brandThemeMap.chevalier;

                    return (
                      <div
                        key={item.id}
                        style={{
                          background: theme.bg,
                          borderColor: theme.border
                        }}
                        className="relative overflow-hidden rounded-[26px] p-4 border shadow-md text-white transition-all"
                      >
                        {/* Brand Watermark Graphics in Background */}
                        {item.brandType === 'dunkin' && (
                          <svg
                            viewBox="0 0 220 140"
                            className="absolute -right-4 -bottom-4 w-44 h-32 opacity-20 pointer-events-none"
                          >
                            <circle
                              cx="155"
                              cy="72"
                              r="46"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="18"
                            />
                            <circle
                              cx="155"
                              cy="72"
                              r="36"
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth="3"
                              strokeDasharray="6 6"
                            />
                            <text
                              x="18"
                              y="112"
                              fontSize="54"
                              fontWeight="900"
                              fill="#FFFFFF"
                              fontFamily="sans-serif"
                            >
                              DD’
                            </text>
                          </svg>
                        )}

                        {item.brandType === 'grubhub' && (
                          <svg
                            viewBox="0 0 220 140"
                            className="absolute -right-3 -bottom-3 w-44 h-32 opacity-18 pointer-events-none"
                          >
                            <path
                              d="M 110 85 C 110 52, 185 52, 185 85 Z"
                              fill="#FFFFFF"
                            />
                            <circle cx="147.5" cy="54" r="7" fill="#FFFFFF" />
                            <rect x="102" y="90" width="91" height="8" rx="4" fill="#FFFFFF" />
                            <text
                              x="16"
                              y="116"
                              fontSize="44"
                              fontWeight="900"
                              fill="#FFFFFF"
                              fontFamily="sans-serif"
                            >
                              GH
                            </text>
                          </svg>
                        )}

                        {item.brandType === 'cafeluna' && (
                          <svg
                            viewBox="0 0 220 140"
                            className="absolute -right-3 -bottom-3 w-44 h-32 opacity-18 pointer-events-none"
                          >
                            <path d="M 162 28 A 34 34 0 1 0 192 78 A 27 27 0 1 1 162 28 Z" fill="#FFFFFF" />
                            <circle cx="130" cy="95" r="24" fill="none" stroke="#FFFFFF" strokeWidth="7" />
                          </svg>
                        )}

                        {item.brandType === 'chevalier' && (
                          <svg
                            viewBox="0 0 220 140"
                            className="absolute -right-3 -bottom-3 w-44 h-32 opacity-18 pointer-events-none"
                          >
                            <polygon
                              points="155,22 166,52 198,52 172,70 182,100 155,82 128,100 138,70 112,52 144,52"
                              fill="#8BBB92"
                            />
                          </svg>
                        )}

                        {/* Frosted Legibility Veil */}
                        <div className="relative z-10 space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  style={{ backgroundColor: theme.pillBg }}
                                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
                                >
                                  {item.badge}
                                </span>
                                <span className="text-[11px] font-medium text-white/85">
                                  • {item.distance}
                                </span>
                              </div>
                              <h3 className="font-bold text-lg text-white mt-1 leading-tight drop-shadow-2xs">
                                {item.partner}
                              </h3>
                              <p className="text-[10px] font-medium text-white/80">
                                {item.tagline}
                              </p>
                            </div>

                            <div
                              style={{ backgroundColor: theme.pillBg }}
                              className="px-3 py-1 rounded-full text-xs font-extrabold text-white backdrop-blur-md shrink-0"
                            >
                              {item.pointsCost} pts
                            </div>
                          </div>

                          <div className="p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20">
                            <div className="font-bold text-xs text-white">{item.offer}</div>
                            <p className="text-[11px] text-white/85 leading-relaxed mt-0.5">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-[10px] font-semibold text-white/90">
                              Valid for 2 people together
                            </span>
                            <button
                              onClick={() => handleRedeemReward(item)}
                              style={{
                                backgroundColor: isRedeemed
                                  ? 'rgba(255,255,255,0.28)'
                                  : theme.ctaBg,
                                color: isRedeemed ? '#FFFFFF' : theme.ctaText
                              }}
                              className="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
                            >
                              {isRedeemed
                                ? 'View Pass'
                                : canAfford
                                ? 'Redeem Together'
                                : `Need ${item.pointsCost - points} pts`}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Floating Smoked-Glass Navigation Bar */}
          <div className="absolute bottom-4 inset-x-0 z-30 px-4 flex justify-center pointer-events-none">
            <nav className="w-full max-w-[356px] wood-glass-pill rounded-full p-1.5 flex items-center justify-between gap-1 shadow-xl pointer-events-auto">
              {[
                { id: 'radar', label: 'Radar', icon: Radar },
                { id: 'persona', label: 'My Persona', icon: User },
                { id: 'rewards', label: 'Rewards', icon: Gift }
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 py-2 px-2.5 rounded-full flex items-center justify-center gap-1.5 text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#141518] font-semibold shadow-sm'
                        : 'text-white/85 font-normal hover:text-white'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ==================== FULL PERSONA-STYLE PEER PROFILE DRAWER ==================== */}
          {selectedPeer && (
            <div className="absolute inset-0 z-40 bg-black/75 backdrop-blur-md flex items-end animate-fade-in">
              <div className="w-full h-[94%] hellow-phone-gradient rounded-t-[36px] border-t border-white/20 shadow-2xl flex flex-col overflow-hidden">
                {/* Scrollable Persona Hero & Icebreakers */}
                <div className="flex-1 overflow-y-auto pb-6">
                  {/* Edge-to-Edge 1:1 Square Hero Portrait with Close Button */}
                  <div className="relative aspect-square w-full overflow-hidden select-none">
                    <img
                      src={selectedPeer.photo}
                      alt={selectedPeer.name}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Top Floating Bar: Match Badge & Close Button */}
                    <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full wood-glass-pill text-[11px] font-semibold text-white shadow-xs">
                        {selectedPeer.matchScore}% Shared Vibe • {selectedPeer.distanceLabel}
                      </span>

                      <button
                        onClick={() => setSelectedPeer(null)}
                        className="w-9 h-9 rounded-full wood-glass-pill hover:bg-[#EF1E5A] flex items-center justify-center text-white shadow-xs cursor-pointer transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Full-Opacity Bottom Atmospheric Dissolve */}
                    <div
                      className="absolute inset-x-0 -bottom-2 h-48 pointer-events-none z-10"
                      style={{
                        background:
                          appTheme === 'violet-crimson'
                            ? 'linear-gradient(to bottom, rgba(22, 23, 28, 0) 0%, rgba(22, 23, 28, 0.35) 26%, rgba(22, 23, 28, 0.82) 58%, rgba(22, 23, 28, 0.98) 84%, #16171C 100%)'
                            : 'linear-gradient(to bottom, rgba(8, 18, 14, 0) 0%, rgba(8, 18, 14, 0.35) 26%, rgba(8, 18, 14, 0.82) 58%, rgba(8, 18, 14, 0.98) 84%, #08120E 100%)'
                      }}
                    />
                  </div>

                  {/* Overlapping Identity & Location Card */}
                  <div className="px-5 relative z-20 -mt-16 space-y-4">
                    <div className="apple-glass-strong rounded-[26px] p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full wood-glass-pill-inner text-[10px] font-semibold text-[var(--accent-secondary)] mb-1">
                            <AtSign className="w-2.5 h-2.5 text-[var(--accent-secondary)]" />
                            <span>{selectedPeer.username}</span>
                          </div>
                          <h2 className="font-editorial text-3xl text-white leading-tight">
                            {selectedPeer.name}
                          </h2>
                        </div>

                        {/* Top-Right Social Level Badge */}
                        {(() => {
                          const peerConnections =
                            selectedPeer.connectionsCount +
                            (waveStates[selectedPeer.id] === 'confirmed' ? 1 : 0);
                          const peerLevel = getSocialLevelInfo(peerConnections);
                          return (
                            <div
                              className={`px-2.5 py-1 rounded-2xl border shadow-2xs flex items-center gap-1.5 shrink-0 ${
                                peerLevel.isIconic
                                  ? 'bg-[var(--accent-primary)] text-[var(--accent-cta-text)] border-white'
                                  : 'wood-glass-pill text-white'
                              }`}
                            >
                              <span className="text-sm leading-none">{peerLevel.emoji}</span>
                              <div className="leading-tight">
                                <div className="text-[10px] font-semibold">{peerLevel.title}</div>
                                <div
                                  className={`text-[9px] font-medium ${
                                    peerLevel.isIconic
                                      ? 'text-white/90'
                                      : 'text-[var(--accent-secondary)]'
                                  }`}
                                >
                                  Lvl {peerLevel.degree} • {peerLevel.count}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Exact Venue & Walking Direction */}
                      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/15">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-xl wood-glass-pill-inner flex items-center justify-center text-[var(--accent-secondary)] shrink-0">
                            <Navigation className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-white truncate">
                              {selectedPeer.venueSpot}
                            </div>
                            <div className="text-[10px] text-white/70 truncate">
                              {selectedPeer.walkDirection}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFocusedMapPeerId(selectedPeer.id);
                            setRadarDisplayMode('map');
                            setSelectedPeer(null);
                            triggerToast(`Showing walking path to ${selectedPeer.name} on map`);
                          }}
                          className="px-2.5 py-1 rounded-full wood-glass-pill-inner hover:bg-[#EF1E5A] text-[var(--accent-secondary)] hover:text-white text-[10px] font-semibold shrink-0 cursor-pointer transition-colors"
                        >
                          Map
                        </button>
                      </div>
                    </div>

                    {/* Full List of AI-Curated Icebreakers */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75 px-1">
                        {selectedPeer.name}’s Icebreakers & Recent Posts
                      </span>

                      {selectedPeer.icebreakers.map((item, idx) => (
                        <div
                          key={idx}
                          className="apple-glass-strong rounded-2xl p-3.5 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-semibold text-[var(--accent-secondary)] uppercase tracking-wider">
                              {item.platform} • {item.topic}
                            </span>

                            {item.media && (
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveMediaLightbox({
                                    ...item.media,
                                    peerName: selectedPeer.name,
                                    topic: item.topic,
                                    platform: item.platform
                                  })
                                }
                                className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full wood-glass-pill hover:bg-[#EF1E5A] transition-all cursor-pointer group"
                              >
                                <span className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                                  <img
                                    src={
                                      item.media.type === 'video'
                                        ? item.media.poster
                                        : item.media.url
                                    }
                                    alt={item.topic}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                                    {item.media.type === 'video' ? (
                                      <Play className="w-2.5 h-2.5 fill-white" />
                                    ) : (
                                      <ImageIcon className="w-2.5 h-2.5" />
                                    )}
                                  </span>
                                </span>
                                <span className="text-[10px] font-semibold text-white">
                                  {item.media.type === 'video' ? 'Watch Clip' : 'View Post'}
                                </span>
                              </button>
                            )}
                          </div>

                          <p className="text-xs font-medium text-white leading-relaxed">
                            “{item.prompt}”
                          </p>
                          <div className="p-2.5 rounded-xl wood-glass-pill-inner text-[11px] text-white/85">
                            <span className="font-semibold text-[var(--accent-secondary)]">
                              Say in person:{' '}
                            </span>
                            “{item.opener}”
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky Bottom Action Bar: Wave -> Mutual Handshake -> Shared Reward */}
                <div className="p-4 border-t border-white/15 bg-[var(--surface-top)]/85 backdrop-blur-xl space-y-2">
                  {(!waveStates[selectedPeer.id] ||
                    waveStates[selectedPeer.id] === 'idle') && (
                    <button
                      onClick={() => handleSendWave(selectedPeer)}
                      className="w-full py-3 rounded-full theme-cta-btn text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Warm Wave to {selectedPeer.name}</span>
                    </button>
                  )}

                  {waveStates[selectedPeer.id] === 'waved' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-2xl wood-glass-pill text-center text-[11px] text-[var(--accent-secondary)] font-medium">
                        {selectedPeer.name} waved back! Tap below when you say Hellow in person.
                      </div>
                      <button
                        onClick={() => handleConfirmHello(selectedPeer)}
                        className="w-full py-3 rounded-full theme-cta-btn text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Confirm In-Person Hello (+50 pts Both)</span>
                      </button>
                    </div>
                  )}

                  {waveStates[selectedPeer.id] === 'confirmed' && (
                    <div className="p-3 rounded-2xl wood-glass-pill text-center space-y-1.5">
                      <div className="text-xs font-semibold text-white flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 text-[#EF1E5A]" />
                        <span>Connected with {selectedPeer.name}! +50 pts Earned</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPeer(null);
                          setActiveTab('rewards');
                        }}
                        className="text-[11px] font-semibold text-[var(--accent-secondary)] hover:text-[#EF1E5A] underline cursor-pointer transition-colors"
                      >
                        Redeem your 2-for-1 Cafe Luna perk together →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== MUTUAL REDEMPTION QR PASS MODAL ==================== */}
          {activeRedemption && (
            <div
              onClick={() => setActiveRedemption(null)}
              className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full apple-glass-strong rounded-[32px] p-5 space-y-4 shadow-2xl text-center"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full theme-crimson-pill text-[10px] font-semibold uppercase tracking-wider">
                    2-Person Mutual Pass
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveRedemption(null)}
                    className="p-1.5 rounded-full wood-glass-pill hover:bg-[#EF1E5A] cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl text-white">
                    {activeRedemption.partner}
                  </h3>
                  <p className="text-xs text-[var(--accent-secondary)] font-medium mt-0.5">
                    {activeRedemption.offer}
                  </p>
                </div>

                <div className="w-40 h-40 mx-auto rounded-3xl bg-white text-[#141518] flex flex-col items-center justify-center p-3 shadow-lg">
                  <QrCode className="w-24 h-24" />
                  <span className="text-[10px] font-bold tracking-widest mt-1">
                    HLW-{activeRedemption.pointsCost}-IRL
                  </span>
                </div>

                <p className="text-[11px] text-white/75 leading-relaxed">
                  Show this pass together at the counter to redeem your shared reward.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveRedemption(null)}
                  className="w-full py-2.5 rounded-full theme-cta-btn text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* ==================== ICEBREAKER MEDIA LIGHTBOX MODAL ==================== */}
          {activeMediaLightbox && (
            <div
              onClick={() => setActiveMediaLightbox(null)}
              className="absolute inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-5"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full apple-glass-strong rounded-[30px] overflow-hidden shadow-2xl"
              >
                <div className="p-4 flex items-center justify-between border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                      {activeMediaLightbox.platform} • {activeMediaLightbox.peerName}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {activeMediaLightbox.topic}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMediaLightbox(null)}
                    className="p-1.5 rounded-full wood-glass-pill hover:bg-[#EF1E5A] cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="relative aspect-square w-full bg-black">
                  {activeMediaLightbox.type === 'video' ? (
                    activeMediaLightbox.embedUrl ? (
                      <iframe
                        src={activeMediaLightbox.embedUrl}
                        title={activeMediaLightbox.topic || 'Embedded video'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <video
                        key={activeMediaLightbox.videoUrl}
                        src={activeMediaLightbox.videoUrl}
                        poster={activeMediaLightbox.poster}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain bg-black"
                      />
                    )
                  ) : (
                    <img
                      src={activeMediaLightbox.url}
                      alt={activeMediaLightbox.topic}
                      style={
                        activeMediaLightbox.crop
                          ? {
                              objectPosition: `${activeMediaLightbox.crop.x}% ${activeMediaLightbox.crop.y}%`,
                              transform: `scale(${activeMediaLightbox.crop.zoom})`
                            }
                          : undefined
                      }
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-xs text-white/90">{activeMediaLightbox.caption}</p>
                  <p className="text-[10px] text-white/55">{activeMediaLightbox.timestamp}</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== EDIT PROFILE & THEME SETTINGS MODAL ==================== */}
          {showEditProfileModal && (
            <div
              onClick={() => setShowEditProfileModal(false)}
              className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSaveProfileIdentity}
                className="w-full apple-glass-strong rounded-[30px] p-5 space-y-4 shadow-2xl max-h-[88%] overflow-y-auto no-scrollbar"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                      Persona Settings
                    </span>
                    <h3 className="font-editorial text-xl text-white">
                      Edit Profile & Theme
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(false)}
                    className="p-1.5 rounded-full wood-glass-pill hover:bg-[#EF1E5A] cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Portrait Upload & 1:1 Framing Controls */}
                <div className="flex items-center gap-3 p-3 rounded-2xl wood-glass-pill">
                  <img
                    src={profilePhoto}
                    alt={displayName}
                    style={{
                      objectPosition: `${photoCrop.x}% ${photoCrop.y}%`,
                      transform: `scale(${photoCrop.zoom})`
                    }}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/25 shrink-0"
                  />
                  <div className="flex-1 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-full wood-glass-pill-inner hover:bg-[#EF1E5A] text-[11px] font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditProfileModal(false);
                        openCropStudio('profile');
                      }}
                      className="px-3 py-1.5 rounded-full wood-glass-pill-inner hover:bg-[#EF1E5A] text-[11px] font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      <span>Frame 1:1</span>
                    </button>
                  </div>
                </div>

                {/* Locked Account Handle */}
                <div className="space-y-2.5">
                  <div>
                    <label className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-white/65 mb-1">
                      <span>Account Handle (Permanent)</span>
                      <span className="inline-flex items-center gap-1 text-white/50">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-2xl wood-glass-pill text-xs font-semibold text-white/55 flex items-center gap-1.5 select-none">
                      <AtSign className="w-3.5 h-3.5 text-white/45" />
                      <span>{username}</span>
                    </div>
                  </div>

                  {/* Editable Smoked-Glass First Name Input */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/75 mb-1">
                      First Name Shown Nearby
                    </label>
                    <input
                      type="text"
                      value={draftDisplayName}
                      onChange={(e) => setDraftDisplayName(e.target.value)}
                      placeholder="Jordan"
                      style={{ backgroundColor: 'transparent' }}
                      className="w-full px-3.5 py-2.5 rounded-2xl wood-glass-pill text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50"
                    />
                  </div>

                  {/* Editable Smoked-Glass Profession Input */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/75 mb-1">
                      Profession / Role
                    </label>
                    <input
                      type="text"
                      value={draftProfession}
                      onChange={(e) => setDraftProfession(e.target.value)}
                      placeholder="Film Producer & Director"
                      style={{ backgroundColor: 'transparent' }}
                      className="w-full px-3.5 py-2.5 rounded-2xl wood-glass-pill text-xs font-semibold text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50"
                    />
                  </div>
                </div>

                {/* App Color Theme Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/75">
                    App Color Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDraftAppTheme('violet-crimson')}
                      className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        draftAppTheme === 'violet-crimson'
                          ? 'red-glass ring-1 ring-white/60'
                          : 'wood-glass-pill opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 border border-white/40"
                        style={{
                          background:
                            'linear-gradient(135deg, #141518 0%, #6366FF 55%, #EF1E5A 100%)'
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-white truncate">
                          Obsidian Violet
                        </div>
                        <div className="text-[9px] text-white/65 truncate">
                          Purple & Crimson
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDraftAppTheme('forest-mint')}
                      className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        draftAppTheme === 'forest-mint'
                          ? 'apple-glass-strong ring-1 ring-[#8BBB92]'
                          : 'wood-glass-pill opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full shrink-0 border border-white/40"
                        style={{
                          background:
                            'linear-gradient(135deg, #060D0A 0%, #2D6A4F 55%, #B7E4C7 100%)'
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-white truncate">
                          Forest Mint
                        </div>
                        <div className="text-[9px] text-white/65 truncate">
                          Pine & Emerald
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(false)}
                    className="flex-1 py-2.5 rounded-full wood-glass-pill hover:bg-white/15 text-white/80 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full theme-cta-btn text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== ADD CUSTOM ICEBREAKER MODAL ==================== */}
          {showAddIcebreakerModal && (
            <div
              onClick={() => setShowAddIcebreakerModal(false)}
              className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full red-glass rounded-[30px] p-5 space-y-4 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF9EBA]">
                      Custom Persona Prompt
                    </span>
                    <h3 className="font-editorial text-xl text-white">
                      New Icebreaker
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddIcebreakerModal(false)}
                    className="p-1.5 rounded-full wood-glass-pill hover:bg-[#EF1E5A] cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/75 mb-1">
                    What should people ask you about?
                  </label>
                  <textarea
                    rows={3}
                    value={customMilestone}
                    onChange={(e) => setCustomMilestone(e.target.value)}
                    placeholder="e.g., Scouting indie film soundtracks or grabbing espresso in Medford Sq..."
                    style={{ backgroundColor: 'transparent' }}
                    className="w-full px-3.5 py-2.5 rounded-2xl wood-glass-pill text-xs text-white placeholder:text-white/45 focus:outline-none focus:ring-1 focus:ring-white/50 resize-none"
                  />
                </div>

                {/* Optional Media Attachment: Crop + Camera Image Upload & Video Link Player */}
                <div className="space-y-2.5">
                  <input
                    ref={customMediaInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75">
                      Attach Media
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Crop Icon to the Left of Camera Upload */}
                      <button
                        type="button"
                        disabled={!customImagePreview}
                        onClick={() => openCropStudio('customIcebreaker')}
                        title={
                          customImagePreview
                            ? 'Crop uploaded image'
                            : 'Upload an image first to crop'
                        }
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          customImagePreview
                            ? 'wood-glass-pill text-white hover:bg-[#EF1E5A] cursor-pointer'
                            : 'wood-glass-pill text-white/30 cursor-not-allowed'
                        }`}
                      >
                        <Crop className="w-4 h-4" />
                      </button>

                      {/* Camera Icon Button for Image Upload */}
                      <button
                        type="button"
                        onClick={() => customMediaInputRef.current?.click()}
                        title="Upload Image"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          customMediaType === 'image' && customImagePreview
                            ? 'theme-crimson-pill shadow-sm'
                            : 'wood-glass-pill text-white hover:bg-[#EF1E5A]'
                        }`}
                      >
                        <Camera className="w-4 h-4" />
                      </button>

                      {/* Player Icon Button Right Up Against Camera for Video Link Dropdown */}
                      <button
                        type="button"
                        onClick={() =>
                          setCustomMediaType((prev) => (prev === 'video' ? 'none' : 'video'))
                        }
                        title="Add Video Link"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          customMediaType === 'video'
                            ? 'theme-crimson-pill shadow-sm'
                            : 'wood-glass-pill text-white hover:bg-[#EF1E5A]'
                        }`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {customMediaType === 'image' && customImagePreview && (
                    <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-white/25 bg-black/40">
                      <img
                        src={customImagePreview}
                        alt="Custom preview"
                        style={{
                          objectPosition: `${customImageCrop.x}% ${customImageCrop.y}%`,
                          transform: `scale(${customImageCrop.zoom})`
                        }}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCustomImagePreview('');
                          setCustomImageCrop({ zoom: 1.0, x: 50, y: 50 });
                          setCustomMediaType('none');
                        }}
                        title="Remove image"
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {customMediaType === 'video' && (
                    <div className="space-y-1.5">
                      <div className="wood-glass-pill rounded-2xl px-3 py-2 flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 text-[#FF9EBA] shrink-0 fill-current" />
                        <input
                          type="url"
                          autoFocus
                          value={customVideoUrl}
                          onChange={(e) => setCustomVideoUrl(e.target.value)}
                          placeholder="Paste YouTube, Vimeo, or .mp4 video link..."
                          style={{ backgroundColor: 'transparent' }}
                          className="w-full bg-transparent text-xs text-white placeholder:text-white/45 focus:outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-white/60 px-1">
                        Supports YouTube, Vimeo, and direct .mp4 / .mov links.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddIcebreakerModal(false)}
                    className="flex-1 py-2.5 rounded-full wood-glass-pill hover:bg-white/15 text-white/80 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={handleSynthesizeIcebreakers}
                    className="flex-1 py-2.5 rounded-full theme-crimson-pill text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-60"
                  >
                    {isGenerating ? 'Posting...' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 1:1 IMAGE CROP STUDIO MODAL ==================== */}
          {showCropModal && (
            <div
              onClick={() => setShowCropModal(false)}
              className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full apple-glass-strong rounded-[30px] p-5 space-y-4 shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-secondary)]">
                      1:1 Square Framing
                    </span>
                    <h3 className="font-editorial text-xl text-white">
                      {cropTarget === 'customIcebreaker'
                        ? 'Crop Icebreaker Image'
                        : 'Crop Portrait'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCropModal(false)}
                    className="p-1.5 rounded-full wood-glass-pill hover:bg-[#EF1E5A] cursor-pointer"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div
                  onMouseDown={handleCropPointerDown}
                  onMouseMove={handleCropPointerMove}
                  onMouseUp={handleCropPointerUp}
                  onMouseLeave={handleCropPointerUp}
                  onTouchStart={handleCropPointerDown}
                  onTouchMove={handleCropPointerMove}
                  onTouchEnd={handleCropPointerUp}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/25 bg-black/60 cursor-move select-none touch-none"
                >
                  <img
                    src={
                      cropTarget === 'customIcebreaker' && customImagePreview
                        ? customImagePreview
                        : profilePhoto
                    }
                    alt="Crop frame"
                    draggable={false}
                    style={{
                      objectPosition: `${draftCrop.x}% ${draftCrop.y}%`,
                      transform: `scale(${draftCrop.zoom})`
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 border border-white/20">
                    <div className="border-r border-b border-white/15" />
                    <div className="border-r border-b border-white/15" />
                    <div className="border-b border-white/15" />
                    <div className="border-r border-b border-white/15" />
                    <div className="border-r border-b border-white/15" />
                    <div className="border-b border-white/15" />
                    <div className="border-r border-white/15" />
                    <div className="border-r border-white/15" />
                    <div />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-1">
                  <ZoomOut className="w-4 h-4 text-white/70 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="2.2"
                    step="0.05"
                    value={draftCrop.zoom}
                    onChange={(e) =>
                      setDraftCrop((prev) => ({
                        ...prev,
                        zoom: parseFloat(e.target.value)
                      }))
                    }
                    className="flex-1 accent-[#EF1E5A] cursor-pointer"
                  />
                  <ZoomIn className="w-4 h-4 text-white/70 shrink-0" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCropModal(false)}
                    className="flex-1 py-2.5 rounded-full wood-glass-pill hover:bg-white/15 text-white/80 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCrop}
                    className="flex-1 py-2.5 rounded-full theme-crimson-pill text-xs font-semibold shadow-sm cursor-pointer"
                  >
                    Save Frame
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== SOCIAL PLATFORM CONNECT / DISCONNECT PROMPT ==================== */}
          {platformPrompt && (
            <div
              onClick={() => setPlatformPrompt(null)}
              className="absolute inset-0 z-50 bg-[#030D10]/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              {platformPrompt.mode === 'connect' ? (
                <form
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleConfirmConnectPlatform}
                  className="w-full apple-glass-strong rounded-[30px] p-5 space-y-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#8BBB92] text-[#05161A] flex items-center justify-center">
                        <PlatformLogo id={platformPrompt.platform.id} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8BBB92]">
                          Aggregate Feed
                        </span>
                        <h3 className="font-editorial text-xl text-white leading-tight">
                          Log in to {platformPrompt.platform.name}
                        </h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlatformPrompt(null)}
                      className="p-1.5 rounded-full wood-glass-pill hover:bg-white/15 cursor-pointer"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <p className="text-xs text-white/75 leading-relaxed">
                    Sign in to <strong className="text-white">{platformPrompt.platform.name}</strong> so HELLOW AI can aggregate your posts, saved items, and activity to craft opt-in icebreakers.
                  </p>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/70 mb-1">
                        Username or Email
                      </label>
                      <input
                        type="text"
                        required
                        value={platformHandleInput}
                        onChange={(e) => setPlatformHandleInput(e.target.value)}
                        placeholder={`@${username.toLowerCase()}`}
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[#05161A]/85 border border-[#8BBB92]/30 text-xs font-semibold text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#8BBB92]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/70 mb-1">
                        Password / Login
                      </label>
                      <input
                        type="password"
                        required
                        value={platformPasswordInput}
                        onChange={(e) => setPlatformPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-2xl bg-[#05161A]/85 border border-[#8BBB92]/30 text-xs font-semibold text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#8BBB92]/40"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setPlatformPrompt(null)}
                      className="flex-1 py-2.5 rounded-full wood-glass-pill hover:bg-white/15 text-white/80 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-full bg-[#8BBB92] hover:bg-[#2A835F] text-[#05161A] hover:text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      Log In & Aggregate
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="w-full apple-glass-strong rounded-[30px] p-5 space-y-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#8BBB92] text-[#05161A] flex items-center justify-center">
                        <PlatformLogo id={platformPrompt.platform.id} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8BBB92]">
                          Connected ({platformPrompt.platform.handle})
                        </span>
                        <h3 className="font-editorial text-xl text-white leading-tight">
                          Disconnect {platformPrompt.platform.name}?
                        </h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlatformPrompt(null)}
                      className="p-1.5 rounded-full wood-glass-pill hover:bg-white/15 cursor-pointer"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <p className="text-xs text-white/75 leading-relaxed">
                    Disconnecting <strong className="text-white">{platformPrompt.platform.name}</strong> will stop aggregating new activity from this account into your Persona.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setPlatformPrompt(null)}
                      className="flex-1 py-2.5 rounded-full wood-glass-pill hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Keep Connected
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmDisconnectPlatform}
                      className="flex-1 py-2.5 rounded-full bg-[#D62828] hover:bg-[#b51f1f] text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ==================== DESKTOP-TO-IOS DOWNLOAD MODAL ==================== */}
      {showIosModal && (
        <div
          onClick={() => setShowIosModal(false)}
          className="fixed inset-0 z-50 bg-[#030D10]/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md apple-glass-strong rounded-[32px] p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8BBB92]">
                  Apple iOS Companion
                </span>
                <h2 className="font-editorial text-2xl text-white mt-1">
                  Take HELLOW Everywhere
                </h2>
              </div>
              <button
                onClick={() => setShowIosModal(false)}
                className="p-2 rounded-full wood-glass-pill hover:bg-white/15 cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <p className="text-xs text-white/75 leading-relaxed">
              While the Desktop Web Companion lets you curate your AI Icebreakers and browse
              local rewards, the <strong className="text-white">HELLOW iOS App</strong> unlocks background Bluetooth
              (BLE) 10–30 ft pings on trains, cafes, and festivals.
            </p>

            <div className="p-4 rounded-2xl wood-glass-pill flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#8BBB92] text-[#05161A] flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-white">
                  Scan with iPhone Camera
                </div>
                <p className="text-[11px] text-white/70 leading-snug">
                  Opens Apple TestFlight / App Store build synced to your @{username} account.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIosModal(false)}
              className="w-full py-3 rounded-full bg-[#8BBB92] hover:bg-[#2A835F] text-[#05161A] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue in Web Preview</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}