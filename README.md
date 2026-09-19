# VALENTI & CO. ARCHITECTURAL INTERIORS
### Ultra-Luxury 3D Architectural Web Application & Admin CMS

An elite, agency-grade digital experience for a high-end luxury interior architecture atelier based in New York and Paris. Engineered with real-time 3D WebGL interior rendering, responsive editorial typography, conversion-driven client inquiry pipeline, and a dedicated SaaS admin content management system.

---

## Architecture & Features

### 1. Haute Couture High-Resolution Luxury Interior Slideshow Hero
- Built with custom multi-image crossfade transitions and ambient Ken Burns subtle motion.
- Showcases 5 ultra-high-resolution 8k architectural interior design projects (Manhattan Penthouse, Mallorca Coastal Villa, Parisian Townhouse Salon, Tribeca Architectural Master Suite, Mayfair Private Members' Lounge).
- **Interactive Controls & HUD**: Step counter (`01 / 05`), previous/next navigation buttons, indicator progress bars, and touch swipe gestures.
- **Atmosphere Theme Engine**: Full integration with **Golden Hour (Day)**, **Dusk Noir (Night)**, and **High Noon** themes.

### 2. Haute-Couture Visual Identity & Editorial Design System
- **Palette**: Deep Obsidian (`#0b0c0e`), Warm Travertine Ivory (`#f8f7f4`), Champagne Brushed Brass (`#c5a880`), Architectural Graphite (`#181b21`).
- **Typography Pairing**: *Cormorant Garamond* (Editorial Haute Horlogerie Serif) + *Syne* (Avant-garde Architectural Display) + *Plus Jakarta Sans* (Contemporary Precision UI).
- 100% bespoke high-resolution architectural photography generated specifically for this project (penthouses, villas, Parisian townhouses, and boutique hospitality spaces).

### 3. Interactive Client Conversion Features
- **Spatial Metamorphosis Slider**: Real-time draggable split-screen Before & After transformation comparison demonstrating renovation impact.
- **Filterable Selected Works Gallery**: Filter between Penthouses, Coastal Villas, Heritage Townhouses, and Hospitality with modal case study stories.
- **Interactive Scope & Investment Estimator**: Dynamic calculation based on project typology, gross floor area slider, and material finish tier, with automatic prefilling of the consultation form.
- **Private Consultation Booking Engine**: Client-side validation, error handling, and immediate persistence to the admin leads database with instant feedback toasts.

### 4. SaaS Administrative Dashboard (`admin.html`)
- Modern dark SaaS dashboard with private login authentication.
- **Demo Credentials**:
  - Email: `admin@valenti.design`
  - Password: `luxury2026`
- **Inquiries & Leads CRM**: View incoming leads with client details, phone, email, project typology, budget bracket, message notes, status changer (New, Contacted, In Progress, Archived), and one-click **CSV Lead Export**.
- **Visual CMS**: Edit Hero headlines, narrative, CTA labels, stats ticker, services, and portfolio projects with immediate cross-tab reactive synchronization to `index.html`.
- **System Tools**: Export complete database to JSON backup and Restore Studio Factory Defaults.

### 5. SEO & Performance Optimization
- Semantic HTML5 structure (single H1, structured landmarks).
- Comprehensive **Schema.org JSON-LD** structured data (`InteriorDesignStudio` & `ProfessionalService`).
- Open Graph, Twitter Cards, canonical tags, and preloaded Google Fonts.
- Zero bulky external frameworks (No React, Next, Vue, or Tailwind) ensuring fast load times and clean browser rendering.

---

## File Structure

```text
c:/Users/HP/OneDrive/Desktop/Interior Design/
├── index.html            # Main luxury website
├── admin.html            # Staff admin panel & leads CRM
├── style.css             # Design tokens & master responsive stylesheet
├── script.js             # Three.js 3D room, before/after slider & CMS sync
├── admin.js              # Admin authentication, leads management & CMS editor
├── README.md             # Project documentation & deployment guide
└── assets/
    └── images/
        ├── hero-penthouse.jpg        # Manhattan penthouse living room
        ├── project-villa.jpg         # Mediterranean coastal villa
        ├── project-townhouse.jpg     # Haussmann historic townhouse
        ├── project-hospitality.jpg   # Saint-Germain cocktail lounge
        ├── before-renovation.jpg     # Pre-renovation dated apartment
        ├── after-renovation.jpg      # Transformed luxury open-plan space
        └── founder.jpg               # Elena Valenti, Principal Architect
```

---

## How to Run Locally

Because this project uses pure standard web technologies (HTML5, Vanilla CSS, Vanilla JavaScript, and Three.js via CDN), no compilation or heavy build step is required!

### Option 1: Direct Browser
Simply double-click or open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local HTTP Server (Recommended)
Using Python or Node for the best local asset loading experience:
```bash
# Using Python 3:
python -m http.server 3000

# Or using npx serve:
npx serve .
```
Then navigate to `http://localhost:3000` in your browser.
Open `http://localhost:3000/admin.html` for the Admin CMS.

---

## Production Deployment

### Deploy to Netlify
1. Drag and drop the `Interior Design` project folder onto [Netlify Drop](https://app.netlify.com/drop).
2. Or connect your Git repository; leave build command blank and publish directory as `./`.

### Deploy to Vercel
1. Run `npx vercel` in the project directory or import your GitHub repository into Vercel.
2. Framework Preset: **Other**
3. Output Directory: `./`
4. Deploy!
