import {
  Music2,
  Layers,
  Camera,
  Plane,
  Aperture,
  Scissors,
  Compass,
  Palette,
} from 'lucide-react'

const media = (name) => `/media/${name}.webp`

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export const SERVICES = [
  {
    slug: 'music-videos',
    title: 'Music Videos',
    icon: Music2,
    summary: 'Visuals that match the record, frame for frame.',
    description:
      'We sit with the artist, find the world the song lives in, then build it. Concept, location, performance, color. The kind of video that gets replayed.',
    features: ['Concept and treatment', 'Performance shoots', 'Location work', 'Color grade'],
  },
  {
    slug: 'cover-art-motion',
    title: 'Cover Art & Motion Design',
    icon: Layers,
    summary: 'Album covers, mixtapes, and motion graphics with weight.',
    description:
      'From single artwork to full CD and DVD packaging, we design covers artists are proud to put their name on, then bring them to life in motion for the screen.',
    features: ['Album and single covers', 'CD and DVD packaging', 'Motion graphics', 'Lyric visuals'],
  },
  {
    slug: 'event-wedding-films',
    title: 'Event & Wedding Films',
    icon: Camera,
    summary: 'The day, the energy, the moments you will want to relive.',
    description:
      'Weddings, launches, concerts, ceremonies. We move quietly, cover every angle, and deliver a film that feels like being there again.',
    features: ['Weddings', 'Concerts', 'Launches', 'Same-week highlights'],
  },
  {
    slug: 'aerial-drone',
    title: 'Aerial & Drone Filming',
    icon: Plane,
    summary: 'A new angle on the story, from above.',
    description:
      'Licensed drone work for events, landscapes, and productions that need scale. Smooth, cinematic aerials that lift a film from good to memorable.',
    features: ['Event aerials', 'Landscape', 'Reveal shots', 'Real estate'],
  },
  {
    slug: 'photography',
    title: 'Photography',
    icon: Aperture,
    summary: 'Stills with the same care we give the moving image.',
    description:
      'Portraits, products, events, and editorial. Considered light, honest direction, and a final set you are proud to share.',
    features: ['Portraits', 'Product', 'Editorial', 'Event stills'],
  },
  {
    slug: 'video-editing',
    title: 'Video Editing & Post',
    icon: Scissors,
    summary: 'Footage in, finished film out.',
    description:
      'Already shot it? Hand us the cards. We edit, grade, mix, and finish to broadcast standard, whether it started on a phone or a cinema rig.',
    features: ['Story edit', 'Color grade', 'Sound mix', 'Motion graphics'],
  },
  {
    slug: 'creative-direction',
    title: 'Creative Direction',
    icon: Compass,
    summary: 'The idea before the camera ever turns on.',
    description:
      'Sometimes you need a partner to shape the whole thing. We lead concept and visual language across a campaign so every piece feels like one voice.',
    features: ['Concept', 'Visual language', 'Campaign look', 'Art direction'],
  },
  {
    slug: 'brand-print-design',
    title: 'Brand & Print Design',
    icon: Palette,
    summary: 'Logos, merchandise, and print that hold up off screen.',
    description:
      'We design the brand and the things people hold. Logos, apparel, posters, and full print production, all finished with the same eye we bring to film.',
    features: ['Logo and identity', 'Apparel and merch', 'Posters and print', 'Packaging'],
  },
]

/* ------------------------------------------------------------------ */
/* Portfolio projects (anchored to real K-Design work)                 */
/* ------------------------------------------------------------------ */
export const CATEGORIES = [
  'All',
  'Music Videos',
  'Events & Weddings',
  'Branding & Print',
  'Aerial',
  'Studio',
]

export const PROJECTS = [
  {
    slug: 'zaflex-jalousie',
    title: 'Zaflex, Jalousie',
    category: 'Music Videos',
    client: 'Zaflex',
    year: 2019,
    cover: media('zaflex-jalousie'),
    summary: 'Single artwork and CD packaging for the release of Jalousie.',
    description:
      'We handled the full visual identity for Zaflex single Jalousie, from the cover portrait treatment to the printed CD and case. The brief was clean, confident, and a little cinematic, and that is exactly where we took it.',
    services: ['Cover Art & Motion Design', 'Photography'],
    video: '',
    gallery: [media('nvasion'), media('kryx-matik')],
    featured: true,
  },
  {
    slug: 'wyllyam-feval-alp',
    title: 'Wyllyam Feval, #ALP ft Sensei',
    category: 'Music Videos',
    client: 'Wyllyam Feval',
    year: 2016,
    cover: media('wyllyam-alp'),
    summary: 'Release campaign and promo visuals for the #ALP music video.',
    description:
      'A bold promo build for the launch of #ALP featuring Sensei. We designed the release key art and the supporting visuals that carried the drop across screens, built around strong type and a confident color block.',
    services: ['Creative Direction', 'Cover Art & Motion Design'],
    video: '',
    gallery: [media('kryx-matik')],
    featured: true,
  },
  {
    slug: 'rosalie-giscard-wedding',
    title: 'Rosalie & Giscard',
    category: 'Events & Weddings',
    client: 'Private commission',
    year: 2017,
    cover: media('rosalie-giscard'),
    summary: 'A full wedding film and keepsake DVD the couple still watches.',
    description:
      'Two families, one day, covered with a light footprint so it stayed theirs. We delivered the highlight film and a designed keepsake DVD, the kind of work that travels by word of mouth across an entire community.',
    services: ['Event & Wedding Films', 'Photography'],
    video: '',
    gallery: [],
    featured: true,
  },
  {
    slug: 'kate-4-life',
    title: 'Kate, 4 Life',
    category: 'Music Videos',
    client: 'Kate',
    year: 2018,
    cover: media('kate-4life'),
    summary: 'Album artwork and motion visuals for Music From My Soul.',
    description:
      'We designed the full album package for Kate, from the cover and disc to the back tracklist, then carried the look into motion for the release. Bright, open, and built to feel like the music it carries.',
    services: ['Cover Art & Motion Design', 'Video Editing & Post'],
    video: '',
    gallery: [],
    featured: false,
  },
  {
    slug: 'nvasion-kryx-matik',
    title: 'NVASION, Kryx Matik',
    category: 'Music Videos',
    client: 'Kryx Matik',
    year: 2019,
    cover: media('nvasion'),
    summary: 'Mixtape cover art and label identity for the Kryx Matik crew.',
    description:
      'A high-contrast mixtape cover and disc design for the NVASION release. We leaned into a cinematic, almost film-poster treatment to match the energy of the crew and the record.',
    services: ['Cover Art & Motion Design', 'Creative Direction'],
    video: '',
    gallery: [media('kryx-matik')],
    featured: false,
  },
  {
    slug: 'brotherhood-apparel',
    title: 'Brotherhood, Apparel & Identity',
    category: 'Branding & Print',
    client: 'Brotherhood',
    year: 2018,
    cover: media('brotherhood'),
    summary: 'Logo, varsity apparel, and brand mark for a growing movement.',
    description:
      'We built the Brotherhood identity from the mark up, then put it on something people wear with pride. The varsity jacket design balances a clean front crest with a bold back statement, finished for production.',
    services: ['Brand & Print Design', 'Creative Direction'],
    video: '',
    gallery: [],
    featured: false,
  },
  {
    slug: 'family-street-brand',
    title: 'Family Street, FST',
    category: 'Branding & Print',
    client: 'Family Street',
    year: 2015,
    cover: media('family-street'),
    summary: 'Streetwear branding and headwear design for the FST label.',
    description:
      'Logo and apparel design for the Family Street label, including the embroidered headwear line. A clean, ownable mark built to live on caps, tees, and everything the crew puts it on.',
    services: ['Brand & Print Design'],
    video: '',
    gallery: [],
    featured: false,
  },
  {
    slug: 'aerial-reel',
    title: 'Aerial Capabilities',
    category: 'Aerial',
    client: 'K-Design Pictures',
    year: 2019,
    cover: media('aerial-inspire'),
    summary: 'Cinematic drone coverage for events, landscapes, and productions.',
    description:
      'Our aerial unit brings a new angle to every shoot. From smooth reveal shots over an event to wide landscape passes, we run the drone as a storytelling tool, not a gimmick.',
    services: ['Aerial & Drone Filming', 'Video Editing & Post'],
    video: '',
    gallery: [media('aerial-operator')],
    featured: false,
  },
  {
    slug: 'studio-productions',
    title: 'Inside the Studio',
    category: 'Studio',
    client: 'K-Design Pictures',
    year: 2019,
    cover: media('studio-bts'),
    summary: 'Controlled studio production for portraits, interviews, and spots.',
    description:
      'Our studio setup lets us shape light from the ground up for portraits, interviews, product, and commercial work. A calm, organised space where the look is decided on purpose, not by accident.',
    services: ['Creative Direction', 'Photography', 'Video Editing & Post'],
    video: '',
    gallery: [media('studio-set'), media('studio-flag')],
    featured: false,
  },
  {
    slug: 'print-production',
    title: 'Print Production',
    category: 'Branding & Print',
    client: 'K-Design Pictures',
    year: 2019,
    cover: media('print-production'),
    summary: 'Full-color print finishing for covers, packaging, and collateral.',
    description:
      'Design does not stop at the screen. We see covers, packaging, and campaign collateral through to a finished, full-color print so the physical piece matches the idea behind it.',
    services: ['Brand & Print Design'],
    video: '',
    gallery: [],
    featured: false,
  },
]

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
export const TESTIMONIALS = [
  {
    name: 'Zaflex',
    role: 'Recording Artist',
    company: '',
    rating: 5,
    quote:
      'They treated my single like it was their own. The cover and the whole package came back better than I pictured it. This is the team I call first.',
  },
  {
    name: 'Wyllyam Feval',
    role: 'Recording Artist',
    company: '',
    rating: 5,
    quote:
      'The release visuals for #ALP made the drop feel like an event. Strong work, delivered on time, and they understood the vibe immediately.',
  },
  {
    name: 'Rosalie and Giscard',
    role: 'Newlyweds',
    company: '',
    rating: 5,
    quote:
      'We barely noticed the crew on the day, then the film arrived and we cried. Years later we still watch it. Thank you for keeping that day alive.',
  },
  {
    name: 'Kate',
    role: 'Recording Artist',
    company: '',
    rating: 5,
    quote:
      'From the album cover to the motion visuals, everything felt like one idea. They got the heart of the music and put it on screen.',
  },
  {
    name: 'Brotherhood',
    role: 'Brand',
    company: '',
    rating: 5,
    quote:
      'They built our identity from nothing and put it on something we are proud to wear. The logo and the jackets get noticed everywhere.',
  },
  {
    name: 'Kryx Matik',
    role: 'Music Collective',
    company: '',
    rating: 5,
    quote:
      'The NVASION artwork hits like a film poster. Dr Ndoumbe and the team get the culture and raise the bar on every release.',
  },
]

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */
export const TEAM = [
  {
    name: 'Dr Ndoumbe',
    role: 'Founder, Director & Motion Designer',
    photo: '/media/dr-ndoumbe.webp',
    bio: 'Directs the films and designs the motion. The eye behind the studio.',
  },
  {
    name: 'Production Team',
    role: 'Producers & Coordinators',
    photo: null,
    bio: 'Keeps every shoot on time and on budget.',
  },
  {
    name: 'Camera & Aerial',
    role: 'Cinematographers & Drone Pilots',
    photo: null,
    bio: 'On the ground and in the air, lighting and flying every shot.',
  },
  {
    name: 'Post & Design',
    role: 'Editors, Colorists & Designers',
    photo: null,
    bio: 'Where footage becomes film and ideas become covers.',
  },
]

/* ------------------------------------------------------------------ */
/* Journal / blog                                                      */
/* ------------------------------------------------------------------ */
export const POSTS = [
  {
    slug: 'designing-a-cover-that-sells-the-song',
    title: 'Designing a cover that sells the song',
    category: 'Craft',
    date: '2025-05-18',
    readingTime: '5 min',
    excerpt:
      'A cover is the first thing a listener meets. Here is how we build artwork that earns the play before a single note has sounded.',
    body: 'Cover art is design under pressure. It has to read at thumbnail size, hold up in print, and feel like the music all at once. We walk through our process from the first portrait to the finished case.',
  },
  {
    slug: 'why-we-fly-the-drone',
    title: 'Why we treat the drone as a second camera',
    category: 'Behind the scenes',
    date: '2025-04-02',
    readingTime: '4 min',
    excerpt:
      'Aerial is not a gimmick. Used with intention, a single reveal shot can lift an entire film. Notes from our aerial unit.',
    body: 'A drone earns its place when the shot could not exist any other way. We share how we plan aerials around the story instead of bolting them on at the end.',
  },
  {
    slug: 'lighting-on-a-real-budget',
    title: 'Cinematic lighting on a real budget',
    category: 'Craft',
    date: '2025-02-21',
    readingTime: '6 min',
    excerpt:
      'You do not need a truck of lights to make something look expensive. You need to understand one source well.',
    body: 'Most of our most-praised shots used a single light and a lot of intention. Here is how we think about light when the budget is tight.',
  },
  {
    slug: 'production-in-yaounde',
    title: 'What it is like to produce film in Yaoundé',
    category: 'Studio',
    date: '2025-01-12',
    readingTime: '5 min',
    excerpt:
      'The challenges are real and so are the advantages. An honest look at building a production studio in Cameroon.',
    body: 'Permits, weather, power, and the generosity of the people who let us into their work. Notes from years on the ground in Soa and across the city.',
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null
}

export function getRelatedProjects(slug, limit = 3) {
  const current = getProject(slug)
  if (!current) return PROJECTS.slice(0, limit)
  return PROJECTS.filter((p) => p.slug !== slug && p.category === current.category)
    .concat(PROJECTS.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit)
}

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null
}
