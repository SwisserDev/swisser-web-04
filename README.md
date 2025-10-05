# 🎬 Swisser-Web-04

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7.1-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS">
</div>

<div align="center">
  <h3>Your FiveM Server Deserves a Cinematic First Impression</h3>
  <p>A stunning, GTA V-inspired website template that transforms your server into an unforgettable experience</p>
  <a href="#-get-started-in-minutes"><strong>Get Started »</strong></a>
</div>

---

## ✨ Why This Template Stands Out

Picture this: A visitor lands on your server's website and instantly feels like they've entered a **GTA V loading screen**. Cinematic animations, live player counts ticking up in real-time, and a sleek HUD-style design that screams premium quality. That's the power of **swisser-web-04**.

This isn't just another template—it's a complete experience designed to convert curious visitors into dedicated players. Whether you're launching a new FiveM roleplay server or revamping an existing one, this template handles everything from first impressions to legal compliance.

### What Makes It Special?

- **GTA V Authenticity** - Loading screens, HUD elements, and cinematics that feel straight out of Los Santos
- **Zero Configuration Stress** - One config file controls everything. Seriously, that's it.
- **Live & Breathing** - Real-time player counts, server status, and auto-refreshing stats
- **Deploy in Minutes** - Push to GitHub, and you're live. No server setup, no headaches.
- **Built for Results** - Designed to grow your player base with professional presentation

---

## 🎯 Features That Deliver

### 🎨 Cinematic Design System

Inspired by GTA V's iconic aesthetic, every pixel is crafted for impact:

- **GTA Loading Screen** - Authentic progress bar, rotating server tips, and typewriter animations
- **Parallax Hero Section** - Smooth scrolling with depth that pulls visitors into your world
- **HUD-Style Stats** - Live player count, server status, and key metrics displayed like in-game UI
- **Film Noir Effects** - Vignettes, scanlines, and subtle film grain for that cinematic polish
- **Responsive Excellence** - Gorgeous on desktop, tablet, and mobile

### ⚡ Powerful Features

Everything a modern FiveM server needs, ready to go:

| Feature | What It Does |
|---------|-------------|
| **Live Server Stats** | Real-time player count via FiveM API, updates every 30 seconds |
| **One-Click Connect** | Direct `fivem://connect` buttons—visitors join in seconds |
| **Jobs Showcase** | Professional career system with categories, salaries, and apply buttons |
| **Rules Section** | Clean, organized guidelines with priority tagging |
| **Team Profiles** | Showcase your admin team with role-based layouts |
| **Media Gallery** | Netflix-style grid for screenshots and videos |
| **Legal Pages** | GDPR-compliant Privacy Policy and Terms of Service |
| **Smart Navigation** | Transparent navbar that solidifies on scroll |

### 🛠️ Developer-Friendly

Built with modern tools and best practices:

- **React 19.1** - Latest React with concurrent features
- **TypeScript 5.8** - Full type safety, zero errors out of the box
- **Vite 7.1** - Lightning-fast dev server and instant HMR
- **Tailwind CSS 3.4** - Custom GTA design system with utility classes
- **GSAP + Framer Motion** - Hollywood-grade animations
- **Automated Deployment** - GitHub Actions workflow included

---

## 🚀 Get Started in Minutes

### Quick Start

```bash
# Clone the repository
git clone https://github.com/SwisserDev/swisser-web-04.git

# Navigate to the project
cd swisser-web-04

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Your site is now running at `http://localhost:5173` 🎉

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings (Source: GitHub Actions)
3. Push to main branch:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

Your site goes live automatically at `https://SwisserDev.github.io/swisser-web-04/`

---

## 🎮 Connect Your FiveM Server

### Step 1: Find Your Server Code

1. Visit [servers.fivem.net](https://servers.fivem.net)
2. Search for your server
3. Copy the code from the URL (e.g., `ymkax5`)

### Step 2: Update Configuration

Open `src/config/site.config.json` and find the API section:

```json
{
  "api": {
    "serverCode": "ymkax5",  // Replace with your code
    "cfxApiUrl": "https://servers-frontend.fivem.net/api/servers/single/",
    "refreshInterval": 30000
  }
}
```

That's it! Your site now displays:

- ✅ **Live player count** - Updates every 30 seconds
- ✅ **Server online/offline status** - With pulsing indicator
- ✅ **Direct connect button** - One-click join via FiveM protocol
- ✅ **Max player capacity** - Displayed in stats HUD

---

## 🎨 Customize Everything

### The Power of One File

Everything lives in `src/config/site.config.json` (~700 lines of pure customization):

```json
{
  "server": {
    "name": "Your Server Name",
    "tagline": "Your Epic Tagline",
    "description": "Your immersive description...",
    "maxPlayers": 256,
    "loadingTips": [
      "Custom tip 1",
      "Custom tip 2"
    ]
  },
  "images": {
    "hero": {
      "loadingBackground": "your-loading-image-url",
      "mainBackground": "your-hero-image-url"
    }
  }
}
```

### What You Can Customize

| Section | What It Controls |
|---------|------------------|
| **server** | Name, tagline, description, stats, loading tips |
| **images** | Hero backgrounds, team avatars, gallery images |
| **jobs** | Job listings with categories, salaries, descriptions |
| **rules** | Server guidelines with priority levels |
| **team** | Staff profiles with roles and social links |
| **gallery** | Media showcase with categories |
| **social** | Discord, Twitter, Instagram links |
| **legal** | Company info, emails, GDPR compliance |

### Professional Image Hosting

All images are hosted on **Unsplash CDN** by default:

- Global CDN for fast loading worldwide
- No GitHub Pages path issues
- Professional stock photos included
- Simply replace URLs to use your own images

### Color Customization

Want to change the color scheme? Edit `tailwind.config.js`:

```js
colors: {
  'accent': {
    'blue': '#5E9CD3',    // Change primary color
    'yellow': '#F7B731',  // Change secondary color
  }
}
```

---

## 📦 Project Structure

```
swisser-web-04/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages deployment
├── public/
│   ├── images/                 # Static image assets
│   └── vite.svg                # Favicon
├── src/
│   ├── components/
│   │   ├── Hero/               # Landing section with loading screen
│   │   ├── Features/           # Feature grid showcase
│   │   ├── Jobs/               # Career system
│   │   ├── Rules/              # Server guidelines
│   │   ├── Team/               # Staff profiles
│   │   ├── Gallery/            # Media showcase
│   │   ├── Navigation/         # Header & mobile nav
│   │   ├── Footer/             # Footer with links
│   │   └── Legal/              # Privacy & Terms pages
│   ├── config/
│   │   └── site.config.json    # ⭐ YOUR SINGLE CONFIG FILE
│   ├── hooks/                  # React custom hooks
│   ├── lib/                    # GSAP and utilities
│   ├── pages/                  # Route pages
│   ├── types/                  # TypeScript definitions
│   └── utils/                  # Helper functions
├── index.html                  # SEO meta tags
├── package.json                # Dependencies
├── tailwind.config.js          # Design system
├── tsconfig.json               # TypeScript config
└── vite.config.ts              # Vite configuration
```

---

## 🎬 Design Philosophy

### GTA V-Inspired Aesthetics

Every design decision draws from GTA V's iconic visual language:

- **Loading Screens** - Authentic progress bars, tips, and stage indicators
- **HUD Elements** - Stats panels with colored borders and icons
- **Film Noir Palette** - Deep blacks (#0D0D0D), crisp whites, blue/yellow accents
- **Kinetic Typography** - Bebas Neue headlines, Rajdhani UI text
- **Parallax Depth** - Scrolling reveals layers of content cinematically

### Technical Excellence

- **Type-Safe** - Full TypeScript coverage with strict mode
- **Performance** - Optimized bundle sizes, lazy loading, efficient animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **SEO-Ready** - Meta tags, Open Graph, structured data
- **Mobile-First** - Responsive breakpoints, touch gestures

---

## 📋 Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Type check without emitting
npm run deploy       # Build and deploy to GitHub Pages
```

---

## 🎯 Perfect For

- **New FiveM Servers** - Launch with a professional web presence from day one
- **Server Rebrands** - Modernize your image and attract new players
- **Roleplay Communities** - Showcase your narrative-driven server with cinematic flair
- **Gaming Collectives** - Present multiple servers under one polished umbrella
- **Development Studios** - Portfolio piece for custom FiveM frameworks

---

## 🤝 Support & Community

### Need Help?

- 📖 **Documentation** - All configuration options are commented in `site.config.json`
- 💬 **Issues** - Found a bug? [Open an issue](https://github.com/SwisserDev/swisser-web-04/issues)
- 🔧 **Customization** - The code is clean and well-commented for easy modification

### Show Your Support

If **swisser-web-04** helps your server succeed:

- ⭐ **Star this repo** - Helps others discover it
- 🔄 **Share it** - Spread the word in FiveM communities
- 💝 **Credit** - Keep the footer attribution (optional but appreciated)

---

## 📄 License & Usage

Free to use for personal and commercial FiveM servers. Modify, customize, and make it your own.

**Attribution appreciated but not required.**

---

<div align="center">
  <h3>Ready to Transform Your Server's First Impression?</h3>
  <p>Give your FiveM community the website it deserves</p>
  <br>
  <strong>Every Story. Every Choice. Every Moment.</strong>
  <br><br>
  <sub>Built with ❤️ for the FiveM community</sub>
</div>
