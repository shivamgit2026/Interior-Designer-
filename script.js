/**
 * VALENTI & CO. ARCHITECTURAL INTERIORS — CORE APPLICATION JAVASCRIPT
 * Includes:
 * 1. Three.js Real-time 3D Architectural Interior Room & Lighting Mood Controller
 * 2. Draggable Before/After Renovation Transformation Slider
 * 3. Portfolio Filtering & Case Study Modal Engine
 * 4. Interactive Design Scope & Investment Estimator
 * 5. Consultation Form Validation, Storage & Toast Notification
 * 6. Dynamic CMS Content Sync with Admin Panel
 * 7. Mobile Navigation & Accessible Accordion System
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initCMSContent();
  initHeader();
  initMobileNav();
  initHeroSlideshow();
  initBeforeAfterSlider();
  initPortfolio();
  initEstimator();
  initFAQ();
  initConsultationForm();
  initTestimonialsSlideshow();
  
  // Luxury Smooth Scroll & Editorial Animation Framework
  initSmoothScroll();
  initScrollAnimations();
  initScrollProgressAndBackToTop();
  initScrollParallax();
  initScrollSpy();
  initCounterAnimations();
});

/* ==========================================================================
   1. CMS Content Loader & Live Reactive Sync
   ========================================================================== */
const DEFAULT_CMS_DATA = {
  hero: {
    eyebrow: "Architectural Digest AD100 • New York & Paris",
    title: "Spaces Transformed Into <em>Living Art.</em>",
    description: "We conceive and realize bespoke private residences, heritage restorations, and penthouses through radical spatial harmony, tactile materiality, and quiet luxury.",
    primaryCTA: "Schedule Consultation",
    secondaryCTA: "Explore Portfolio",
    stats: [
      { num: "$95M+", label: "Value Enhanced" },
      { num: "140+", label: "Bespoke Spaces" },
      { num: "18", label: "Design Awards" },
      { num: "100%", label: "Turnkey Delivery" }
    ]
  },
  services: [
    {
      number: "01 / ARCHITECTURE",
      title: "Full Architectural Renovation",
      desc: "Complete spatial restructuring for historic brownstones, pre-war apartments, and luxury villas with structural alterations, HVAC engineering, and MEP integration.",
      features: ["Heritage Conservation & Landmarks Board approvals", "Acoustic isolation & smart architectural lighting"]
    },
    {
      number: "02 / INTERIORS",
      title: "Penthouse & Residence Design",
      desc: "Turnkey interior design for premier penthouses and estates. We curate palette harmonies, sculptural custom furniture, and site-specific fine art programs.",
      features: ["Curated haute couture furniture procurement", "Museum-standard art curation & gallery lighting"]
    },
    {
      number: "03 / CRAFTSMANSHIP",
      title: "Custom Millwork & Masonry",
      desc: "Proprietary architectural cabinetry, fluted marble islands, hidden doors, walk-in dressing rooms, and master bath monolithic stone carving.",
      features: ["Quarry-direct Italian marble & rare burl woods", "Proprietary brass hardware & integrated lighting"]
    }
  ],
  projects: [
    {
      id: 1,
      category: "penthouse",
      badge: "Penthouse • 5,200 sq ft",
      title: "The Tribeca Sky Residence",
      location: "Tribeca, New York City • 2025",
      image: "assets/images/hero-penthouse.jpg",
      details: {
        client: "Private Venture Capitalist",
        scope: "Complete 5,200 sq ft duplex gut renovation and double-height living room curation",
        materials: "Navona Travertine, Bouclé upholstery, Brushed Champagne Brass, European Pale Oak",
        quote: "The seamless integration of double-height glazing with organic sculptural furniture transformed our home into an acoustic sanctuary high above Manhattan."
      }
    },
    {
      id: 2,
      category: "villa",
      badge: "Coastal Villa • 7,400 sq ft",
      title: "Villa Cala Di Luna",
      location: "Mallorca, Spain • 2024",
      image: "assets/images/project-villa.jpg",
      details: {
        client: "Private International Collector",
        scope: "Ground-up architectural interior, bespoke linen millwork, and infinity terrace integration",
        materials: "Santanyí Limestone, Sun-bleached Teak, Handcrafted Terracotta, Organic Linen",
        quote: "Valenti captured the raw, wabi-sabi essence of the Balearic coastline while providing five-star turnkey comfort."
      }
    },
    {
      id: 3,
      category: "townhouse",
      badge: "Townhouse • 4,100 sq ft",
      title: "Hôtel Particulier Monceau",
      location: "8th Arrondissement, Paris • 2025",
      image: "assets/images/project-townhouse.jpg",
      details: {
        client: "French Fashion Family",
        scope: "Historic Haussmann apartment restoration, custom smoked walnut library, and Nero Marquina fireplace",
        materials: "French Oak Herringbone Parquet, Nero Marquina Marble, Pierre Jeanneret Vintage Armchairs",
        quote: "They restored the 19th-century soul of the apartment while seamlessly integrating 21st-century invisible technology."
      }
    },
    {
      id: 4,
      category: "hospitality",
      badge: "Hospitality • 2,900 sq ft",
      title: "L'Ambre Noir Private Members' Club",
      location: "Mayfair, London • 2024",
      image: "assets/images/project-hospitality.jpg",
      details: {
        client: "Hospitality Group",
        scope: "Bespoke cocktail lounge, fluted verde alpi marble bar, custom cognac banquettes, and acoustic ceiling panels",
        materials: "Verde Alpi Marble, Cognac Velvet, Fluted Solid Walnut, Aged Brass Luminaires",
        quote: "The mood, illumination, and tactile intimacy have established L'Ambre Noir as one of London's most coveted evening sanctums."
      }
    }
  ]
};

function initCMSContent() {
  const stored = localStorage.getItem('valenti_cms_data');
  const data = stored ? JSON.parse(stored) : DEFAULT_CMS_DATA;

  // Sync Hero Content
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-description');
  const primaryCTA = document.getElementById('hero-primary-cta');
  const secondaryCTA = document.getElementById('hero-secondary-cta');

  if (eyebrowEl && data.hero.eyebrow) {
    eyebrowEl.innerHTML = `<span class="dot"></span><span>${data.hero.eyebrow}</span>`;
  }
  if (titleEl && data.hero.title) {
    titleEl.innerHTML = data.hero.title;
  }
  if (descEl && data.hero.description) {
    descEl.textContent = data.hero.description;
  }
  if (primaryCTA && data.hero.primaryCTA) {
    const span = primaryCTA.querySelector('span');
    if (span) span.textContent = data.hero.primaryCTA;
  }
  if (secondaryCTA && data.hero.secondaryCTA) {
    const span = secondaryCTA.querySelector('span');
    if (span) span.textContent = data.hero.secondaryCTA;
  }

  // Sync Stats
  const statsContainer = document.getElementById('hero-stats');
  if (statsContainer && data.hero.stats) {
    statsContainer.innerHTML = data.hero.stats.map(s => `
      <div class="stat-item">
        <span class="stat-number">${s.num}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  // Sync Portfolio Grid Projects & Images
  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid && data.projects) {
    portfolioGrid.innerHTML = data.projects.map(proj => `
      <article class="portfolio-card reveal-on-scroll parallax-img-wrap" data-category="${proj.category}" data-id="${proj.id}">
        <div class="portfolio-media">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" width="800" height="500" class="parallax-element" onerror="this.src='assets/images/hero-penthouse.jpg'">
          <span class="portfolio-badge">${proj.badge}</span>
        </div>
        <div class="portfolio-details">
          <div>
            <h3 class="portfolio-title">${proj.title}</h3>
            <p class="portfolio-location">${proj.location}</p>
          </div>
          <div class="portfolio-view-icon" aria-hidden="true">→</div>
        </div>
      </article>
    `).join('');
    if (typeof bindPortfolioListeners === 'function') {
      bindPortfolioListeners();
    }
  }

  // Listen for storage events across tabs (Admin updates reflect live)
  window.addEventListener('storage', (e) => {
    initCMSContent();
  });
}

/* ==========================================================================
   2. Header & Scroll Behavior
   ========================================================================= */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active page link matcher
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    } else if (href && !href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // 3D Lighting Mood Switcher 3-Lines Toggle Button
  const moodToggleBtn = document.getElementById('mood-toggle-btn');
  const moodSwitcher = document.getElementById('mood-switcher-menu');

  if (moodToggleBtn && moodSwitcher) {
    moodToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = moodSwitcher.classList.contains('open');
      if (isOpen) {
        moodSwitcher.classList.remove('open');
        moodToggleBtn.classList.remove('open');
        moodToggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        moodSwitcher.classList.add('open');
        moodToggleBtn.classList.add('open');
        moodToggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!moodSwitcher.contains(e.target) && !moodToggleBtn.contains(e.target)) {
        moodSwitcher.classList.remove('open');
        moodToggleBtn.classList.remove('open');
        moodToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  if (!toggle || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  toggle.addEventListener('click', toggleDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. Three.js Real-time 3D Architectural Interior Room
   ========================================================================== */
let scene, camera, renderer, animationFrameId;
let sunLight, ambientLight, roomLight, coveLightStrip;
let roomGroup, furnitureGroup;
let mouseX = 0, mouseY = 0;
let targetCameraX = 0, targetCameraY = 1.2;
let scrollTiltY = 0;

const LIGHT_MOODS = {
  golden: {
    ambientColor: 0x423832,
    ambientIntensity: 0.9,
    sunColor: 0xffa34d,
    sunIntensity: 2.2,
    sunPos: [8, 6, 6],
    roomLightColor: 0xffd29d,
    roomLightIntensity: 1.8,
    coveColor: 0xffaa55,
    bgColor: 0x0c0d10
  },
  dusk: {
    ambientColor: 0x181c2b,
    ambientIntensity: 0.7,
    sunColor: 0x4a6590,
    sunIntensity: 1.0,
    sunPos: [-7, 4, 5],
    roomLightColor: 0xff9933,
    roomLightIntensity: 2.8,
    coveColor: 0xff7722,
    bgColor: 0x08090d
  },
  noon: {
    ambientColor: 0x444b55,
    ambientIntensity: 1.2,
    sunColor: 0xfffaed,
    sunIntensity: 2.6,
    sunPos: [3, 9, 4],
    roomLightColor: 0xffedd6,
    roomLightIntensity: 1.2,
    coveColor: 0xffddaa,
    bgColor: 0x0e1014
  }
};

/* ==========================================================================
   Theme Engine (Day / Dusk / Noon Atmosphere Theme Controller)
   ========================================================================== */
function initThemeEngine() {
  const savedTheme = localStorage.getItem('valenti_theme') || 'golden';

  function applyTheme(mood) {
    const validMoods = ['golden', 'dusk', 'noon'];
    if (!validMoods.includes(mood)) {
      mood = 'golden';
    }

    document.documentElement.setAttribute('data-theme', mood);
    document.body.setAttribute('data-theme', mood);
    localStorage.setItem('valenti_theme', mood);

    // Update active class & aria-pressed across all theme buttons on the page
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
      if (btn.getAttribute('data-mood') === mood) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Update 3D WebGL scene lighting if present
    if (typeof applyLightingMood === 'function' && typeof scene !== 'undefined' && scene) {
      applyLightingMood(mood);
    }
  }

  // Apply initial theme immediately
  applyTheme(savedTheme);

  // Global click listener for all theme buttons across header and mobile drawer
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mood-btn');
    if (btn) {
      const mood = btn.getAttribute('data-mood');
      if (mood) {
        applyTheme(mood);

        // Close dropdown menu if button was inside header mood switcher
        const switcher = btn.closest('.mood-switcher');
        const toggleBtn = document.getElementById('mood-toggle-btn');
        if (switcher && toggleBtn) {
          switcher.classList.remove('open');
          toggleBtn.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  window.valentiThemeEngine = { applyTheme, getTheme: () => localStorage.getItem('valenti_theme') || 'golden' };
}

/* ==========================================================================
   Hero Slideshow Engine (Multi-Image Auto-Play & Interactive Controls)
   ========================================================================== */
function initHeroSlideshow() {
  const slideshow = document.getElementById('hero-slideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('slide-prev-btn');
  const nextBtn = document.getElementById('slide-next-btn');
  const currentNum = document.getElementById('current-slide-num');
  const indicatorDots = document.querySelectorAll('.indicator-dot');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideInterval = 4000; // 4s continuous auto transition

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    // Toggle active slide
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update slide counter display (e.g. 01, 02)
    if (currentNum) {
      currentNum.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    // Update indicator dots
    indicatorDots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Navigation button listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  // Indicator dots click listeners
  indicatorDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startAutoplay();
    });
  });

  // Touch Swipe Support
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        nextSlide();
        startAutoplay();
      } else if (touchEndX > touchStartX + 50) {
        prevSlide();
        startAutoplay();
      }
    }, { passive: true });
  }

  // Start autoplay immediately on launch
  startAutoplay();
}

function init3DHero() {
  const canvas = document.getElementById('hero-canvas');
  const container = document.getElementById('hero-canvas-wrap');
  if (!canvas || !container || typeof THREE === 'undefined') {
    document.body.classList.add('no-webgl');
    return;
  }

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('no-webgl');
    return;
  }

  const width = container.clientWidth;
  const height = container.clientHeight;

  const currentTheme = localStorage.getItem('valenti_theme') || 'golden';
  const initialMood = LIGHT_MOODS[currentTheme] || LIGHT_MOODS.golden;

  // Scene & Camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(initialMood.bgColor);
  scene.fog = new THREE.FogExp2(initialMood.bgColor, 0.04);

  camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 1.3, 4.8);

  // Renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
  } catch (err) {
    console.warn("WebGL not supported, falling back to photography hero:", err);
    document.body.classList.add('no-webgl');
    return;
  }

  // Construct Architectural 3D Space
  buildArchitecturalRoom();

  // Lighting
  setupLighting();
  applyLightingMood(currentTheme);

  // Mouse / Gyro Parallax
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCameraX = mouseX * 0.45;
    targetCameraY = 1.3 + mouseY * 0.25;
  });

  // Resize Listener
  window.addEventListener('resize', onWindowResize, { passive: true });

  // Start Animation Loop
  animate();
}

function buildArchitecturalRoom() {
  roomGroup = new THREE.Group();
  furnitureGroup = new THREE.Group();

  // Materials
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x9c9388,
    roughness: 0.35,
    metalness: 0.05
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x22262e,
    roughness: 0.85
  });

  const featureWallMat = new THREE.MeshStandardMaterial({
    color: 0x16181e,
    roughness: 0.95
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc5a880,
    metalness: 0.85,
    roughness: 0.25
  });

  const boucleMat = new THREE.MeshStandardMaterial({
    color: 0xe8e4dc,
    roughness: 0.92
  });

  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x241d19,
    roughness: 0.6
  });

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xd6cdbe,
    roughness: 0.4
  });

  // Floor (Travertine Stone Slab)
  const floorGeo = new THREE.PlaneGeometry(16, 16);
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -0.5;
  floorMesh.receiveShadow = true;
  roomGroup.add(floorMesh);

  // Back Architectural Wall
  const backWallGeo = new THREE.PlaneGeometry(16, 8);
  const backWall = new THREE.Mesh(backWallGeo, wallMat);
  backWall.position.set(0, 3.5, -4);
  backWall.receiveShadow = true;
  roomGroup.add(backWall);

  // Left Feature Wall with Architectural Niche
  const leftWallGeo = new THREE.BoxGeometry(0.5, 8, 12);
  const leftWall = new THREE.Mesh(leftWallGeo, featureWallMat);
  leftWall.position.set(-4.5, 3.5, 0);
  leftWall.receiveShadow = true;
  roomGroup.add(leftWall);

  // Floor-to-Ceiling Panoramic Window Frame (Right side)
  const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.2 });
  const frameGeo1 = new THREE.BoxGeometry(0.1, 7, 0.1);
  const frame1 = new THREE.Mesh(frameGeo1, windowFrameMat);
  frame1.position.set(2.8, 3, -2.5);
  roomGroup.add(frame1);

  const frameGeo2 = new THREE.BoxGeometry(0.1, 7, 0.1);
  const frame2 = new THREE.Mesh(frameGeo2, windowFrameMat);
  frame2.position.set(4.5, 3, -0.5);
  roomGroup.add(frame2);

  // Recessed Architectural Cove Ceiling
  const ceilingGeo = new THREE.BoxGeometry(16, 0.6, 12);
  const ceiling = new THREE.Mesh(ceilingGeo, wallMat);
  ceiling.position.set(0, 5.2, 0);
  ceiling.receiveShadow = true;
  roomGroup.add(ceiling);

  // Emissive Cove Light Strip on Ceiling
  const coveGeo = new THREE.BoxGeometry(8, 0.08, 0.15);
  const coveMat = new THREE.MeshStandardMaterial({
    color: 0xffc588,
    emissive: 0xffaa55,
    emissiveIntensity: 2.2
  });
  coveLightStrip = new THREE.Mesh(coveGeo, coveMat);
  coveLightStrip.position.set(0.5, 4.88, -2.8);
  roomGroup.add(coveLightStrip);

  /* --- Bespoke Sculptural Furniture --- */

  // 1. Modern Sculptural Curved Lounge Chair
  const chairGroup = new THREE.Group();
  chairGroup.position.set(1.2, -0.5, -0.8);
  chairGroup.rotation.y = -Math.PI / 5;

  // Chair Seat Base
  const seatGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.35, 32);
  const seat = new THREE.Mesh(seatGeo, boucleMat);
  seat.position.y = 0.35;
  seat.castShadow = true;
  seat.receiveShadow = true;
  chairGroup.add(seat);

  // Chair Curved Wrap-around Backrest
  const backGeo = new THREE.TorusGeometry(0.78, 0.22, 16, 32, Math.PI * 0.95);
  const backrest = new THREE.Mesh(backGeo, boucleMat);
  backrest.rotation.x = Math.PI / 2;
  backrest.rotation.z = Math.PI * 0.52;
  backrest.position.set(-0.15, 0.72, -0.1);
  backrest.castShadow = true;
  chairGroup.add(backrest);

  // Chair Legs (Architectural Dark Walnut / Brass)
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3;
    const legGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.28, 12);
    const leg = new THREE.Mesh(legGeo, darkWoodMat);
    leg.position.set(Math.cos(angle) * 0.55, 0.14, Math.sin(angle) * 0.55);
    leg.castShadow = true;
    chairGroup.add(leg);
  }
  furnitureGroup.add(chairGroup);

  // 2. Monolithic Travertine Pedestal Coffee Table
  const tableGroup = new THREE.Group();
  tableGroup.position.set(-0.5, -0.5, -0.4);

  const tablePlinthGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.32, 32);
  const tablePlinth = new THREE.Mesh(tablePlinthGeo, floorMat);
  tablePlinth.position.y = 0.16;
  tablePlinth.castShadow = true;
  tablePlinth.receiveShadow = true;
  tableGroup.add(tablePlinth);

  // Minimalist Ceramic Vase on Table
  const vaseGeo = new THREE.CylinderGeometry(0.09, 0.16, 0.38, 24);
  const vase = new THREE.Mesh(vaseGeo, ceramicMat);
  vase.position.set(0.12, 0.51, 0.05);
  vase.castShadow = true;
  tableGroup.add(vase);

  // Slender Dried Botanical Branch in Vase
  const branchGeo = new THREE.CylinderGeometry(0.008, 0.015, 0.75, 8);
  const branch = new THREE.Mesh(branchGeo, brassMat);
  branch.position.set(0.15, 0.95, 0.05);
  branch.rotation.z = -0.2;
  branch.castShadow = true;
  tableGroup.add(branch);

  // Architectural Monograph Book
  const bookGeo = new THREE.BoxGeometry(0.35, 0.04, 0.25);
  const book = new THREE.Mesh(bookGeo, darkWoodMat);
  book.position.set(-0.2, 0.34, 0.1);
  book.rotation.y = 0.4;
  book.castShadow = true;
  tableGroup.add(book);

  furnitureGroup.add(tableGroup);

  // 3. Modern Brass Minimalist Pendant Light (Center Ceiling)
  const pendantGroup = new THREE.Group();
  pendantGroup.position.set(0.4, 3.8, -0.6);

  // Suspension Cord
  const cordGeo = new THREE.CylinderGeometry(0.006, 0.006, 1.6, 8);
  const cord = new THREE.Mesh(cordGeo, brassMat);
  pendantGroup.add(cord);

  // Pendant Brass Dome
  const domeGeo = new THREE.ConeGeometry(0.28, 0.18, 24, 1, true);
  const dome = new THREE.Mesh(domeGeo, brassMat);
  dome.rotation.x = Math.PI;
  dome.position.y = -0.85;
  pendantGroup.add(dome);

  furnitureGroup.add(pendantGroup);

  scene.add(roomGroup);
  scene.add(furnitureGroup);
}

function setupLighting() {
  const initialMood = LIGHT_MOODS.golden;

  // Ambient Light
  ambientLight = new THREE.AmbientLight(initialMood.ambientColor, initialMood.ambientIntensity);
  scene.add(ambientLight);

  // Directional Sunlight with Soft Shadows
  sunLight = new THREE.DirectionalLight(initialMood.sunColor, initialMood.sunIntensity);
  sunLight.position.set(...initialMood.sunPos);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 25;
  sunLight.shadow.camera.left = -5;
  sunLight.shadow.camera.right = 5;
  sunLight.shadow.camera.top = 5;
  sunLight.shadow.camera.bottom = -5;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  // Warm Glowing Room Light (from Brass Pendant)
  roomLight = new THREE.PointLight(initialMood.roomLightColor, initialMood.roomLightIntensity, 7, 2);
  roomLight.position.set(0.4, 2.7, -0.6);
  roomLight.castShadow = true;
  scene.add(roomLight);
}

function applyLightingMood(moodKey) {
  const mood = LIGHT_MOODS[moodKey] || LIGHT_MOODS.golden;
  if (!scene || !ambientLight || !sunLight || !roomLight) return;

  // Smoothly update light colors & intensities
  ambientLight.color.setHex(mood.ambientColor);
  ambientLight.intensity = mood.ambientIntensity;

  sunLight.color.setHex(mood.sunColor);
  sunLight.intensity = mood.sunIntensity;
  sunLight.position.set(...mood.sunPos);

  roomLight.color.setHex(mood.roomLightColor);
  roomLight.intensity = mood.roomLightIntensity;

  if (coveLightStrip) {
    coveLightStrip.material.emissive.setHex(mood.coveColor);
  }

  scene.background.setHex(mood.bgColor);
  scene.fog.color.setHex(mood.bgColor);
}

function onWindowResize() {
  const container = document.getElementById('hero-canvas-wrap');
  if (!container || !renderer || !camera) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  // Smooth camera interpolation with scroll parallax integration
  camera.position.x += (targetCameraX - camera.position.x) * 0.04;
  camera.position.y += ((targetCameraY + scrollTiltY) - camera.position.y) * 0.04;
  camera.lookAt(0.2, 0.6, -0.6);

  // Subtle floating micro-motion on pendant lamp
  if (furnitureGroup) {
    furnitureGroup.children[2].rotation.y = Math.sin(Date.now() * 0.0008) * 0.04;
  }

  renderer.render(scene, camera);
}

/* ==========================================================================
   5. Interactive Before/After Transformation Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const slider = document.getElementById('before-after-slider');
  const afterLayer = document.getElementById('slider-after-layer');
  const handle = document.getElementById('slider-handle');
  if (!slider || !afterLayer || !handle) return;

  let isDragging = false;

  const setSliderPosition = (x) => {
    const rect = slider.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));

    afterLayer.style.width = `${position}%`;
    handle.style.left = `${position}%`;
    handle.setAttribute('aria-valuenow', Math.round(position));
  };

  const startDrag = (e) => {
    isDragging = true;
    e.preventDefault();
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    setSliderPosition(clientX);
  };

  slider.addEventListener('mousedown', (e) => {
    startDrag(e);
    setSliderPosition(e.clientX);
  });
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onDrag);

  slider.addEventListener('touchstart', (e) => {
    startDrag(e);
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('touchmove', onDrag, { passive: true });

  // Keyboard accessibility
  handle.addEventListener('keydown', (e) => {
    const current = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
    if (e.key === 'ArrowLeft') {
      const next = Math.max(0, current - 5);
      afterLayer.style.width = `${next}%`;
      handle.style.left = `${next}%`;
      handle.setAttribute('aria-valuenow', next);
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(100, current + 5);
      afterLayer.style.width = `${next}%`;
      handle.style.left = `${next}%`;
      handle.setAttribute('aria-valuenow', next);
    }
  });
}

/* ==========================================================================
   6. Portfolio Filtering & Case Study Modal
   ========================================================================== */
function initPortfolio() {
  bindPortfolioListeners();
}

function bindPortfolioListeners() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close-btn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-card').forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Case Study Modal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-id'), 10);
      const stored = localStorage.getItem('valenti_cms_data');
      const data = stored ? JSON.parse(stored) : DEFAULT_CMS_DATA;
      const project = data.projects.find(p => p.id === id);

      if (!project || !modal || !modalBody) return;

      const details = project.details || {
        scope: "Full architectural renovation and interior curation",
        materials: "Bespoke stone, fine hardwoods, custom lighting",
        quote: "Valenti transformed our space into a living sanctuary."
      };

      modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="border-radius: 8px; overflow: hidden; max-height: 420px;">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div>
            <span class="eyebrow" style="margin-bottom: 0.5rem;">${project.badge}</span>
            <h2 id="modal-project-title" style="font-family: var(--font-editorial); font-size: 2.2rem; color: var(--text-primary); margin-bottom: 0.5rem;">${project.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${project.location}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
            <div>
              <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.1em; margin-bottom: 0.25rem;">Client & Scope</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">${details.scope}</p>
            </div>
            <div>
              <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: var(--accent-gold); letter-spacing: 0.1em; margin-bottom: 0.25rem;">Material Curation</strong>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">${details.materials}</p>
            </div>
          </div>

          <blockquote style="border-left: 2px solid var(--accent-gold); padding-left: 1.25rem; font-style: italic; font-family: var(--font-editorial); font-size: 1.25rem; color: var(--text-primary);">
            "${details.quote}"
          </blockquote>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem;">
            <a href="consultation.html" class="btn btn-gold" onclick="document.getElementById('case-study-modal').classList.remove('open');">Inquire for Similar Space</a>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   7. Interactive Design Investment & Scope Estimator
   ========================================================================== */
function initEstimator() {
  const typeBtns = document.querySelectorAll('#calc-types .calc-option-btn');
  const tierBtns = document.querySelectorAll('#calc-tiers .calc-option-btn');
  const areaSlider = document.getElementById('calc-area-slider');
  const areaVal = document.getElementById('calc-area-val');
  const priceDisplay = document.getElementById('calc-estimate-display');
  const durationDisplay = document.getElementById('calc-duration');
  const teamDisplay = document.getElementById('calc-team');
  const ctaBtn = document.getElementById('calc-cta-btn');

  if (!areaSlider || !priceDisplay) return;

  let currentMult = 1.3;
  let currentRate = 220;
  let currentArea = 3500;
  let currentTypeLabel = "Penthouse Residence";

  const updateCalculations = () => {
    currentArea = parseInt(areaSlider.value, 10);
    areaVal.textContent = currentArea.toLocaleString('en-US');

    // Base calculation
    const baseCost = currentArea * currentRate * currentMult;
    const lowCost = Math.round(baseCost * 0.9 / 50000) * 50000;
    const highCost = Math.round(baseCost * 1.25 / 50000) * 50000;

    priceDisplay.textContent = `$${lowCost.toLocaleString('en-US')} – $${highCost.toLocaleString('en-US')}`;

    // Duration calculation
    let months = 6;
    if (currentArea > 6000) months = 10;
    else if (currentArea > 4000) months = 8;
    durationDisplay.textContent = `${months} – ${months + 2} Months`;

    // Team allocation
    if (currentArea > 6000) {
      teamDisplay.textContent = "Principal + 4 Senior Architects + Millwork Lead";
    } else {
      teamDisplay.textContent = "Principal + 2 Senior Architects";
    }

    // Prefill consultation link
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const select = document.getElementById('project-type');
        if (select) select.value = currentTypeLabel;
        const msg = document.getElementById('project-message');
        if (msg && !msg.value) {
          msg.value = `Estimated Project Scope: ${currentTypeLabel} (~${currentArea.toLocaleString('en-US')} sq ft). Budget Tier: ${priceDisplay.textContent}.`;
        }
      }, { once: true });
    }
  };

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMult = parseFloat(btn.getAttribute('data-mult')) || 1.3;
      currentTypeLabel = btn.textContent.trim();
      updateCalculations();
    });
  });

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRate = parseInt(btn.getAttribute('data-rate'), 10) || 220;
      updateCalculations();
    });
  });

  areaSlider.addEventListener('input', updateCalculations);
  updateCalculations();
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   9. Consultation Booking Form Handling & Persistence
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('client-name');
    const emailInput = document.getElementById('client-email');
    const phoneInput = document.getElementById('client-phone');
    const typeSelect = document.getElementById('project-type');
    const locationInput = document.getElementById('project-location');
    const budgetSelect = document.getElementById('project-budget');
    const messageInput = document.getElementById('project-message');

    // Validation
    [nameInput, emailInput, phoneInput, typeSelect].forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    });

    // Email format validation
    if (emailInput.value && !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Create Lead Submission Object
    const newInquiry = {
      id: 'INQ-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      type: typeSelect.value,
      location: locationInput.value.trim() || "Unspecified",
      budget: budgetSelect.value,
      message: messageInput.value.trim() || "No additional message provided.",
      status: "New"
    };

    // Store into localStorage for Admin Panel
    const existingInquiries = JSON.parse(localStorage.getItem('valenti_inquiries') || '[]');
    existingInquiries.unshift(newInquiry);
    localStorage.setItem('valenti_inquiries', JSON.stringify(existingInquiries));

    // Display Luxury Toast
    showToast("Consultation Request Received • Our atelier concierge will contact you within 24 hours.");

    // Reset Form
    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* ==========================================================================
   8. Luxury Inertial Smooth Scrolling Framework (Lenis + Native Fallback)
   ========================================================================== */
let lenisInstance = null;

function initSmoothScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Haute couture easeOutExpo curve
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Maintain natural mobile native touch response
      touchMultiplier: 1.5,
      wheelMultiplier: 1.05,
      infinite: false
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenisInstance;
  }

  // Smooth Anchor Navigation Integration
  initAnchorScroll();
}

function initAnchorScroll() {
  const headerOffset = 74; // Matches .header.scrolled height

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Close mobile drawer if open
      const drawer = document.getElementById('mobile-drawer');
      const toggle = document.getElementById('mobile-toggle');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      if (lenisInstance) {
        lenisInstance.scrollTo(targetEl, {
          offset: -headerOffset,
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   9. Scroll Reveal Animation Engine (IntersectionObserver + Stagger)
   ========================================================================== */
function initScrollAnimations() {
  // Automatically configure staggered delays for child elements
  document.querySelectorAll('.reveal-stagger').forEach(container => {
    Array.from(container.children).forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-stagger, .reveal-line'
  );

  elementsToReveal.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   10. Ambient Top Progress Bar & Haute Couture Radial Back-to-Top
   ========================================================================== */
function initScrollProgressAndBackToTop() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const progressCircle = document.getElementById('scroll-progress-circle');

  const circumference = 2 * Math.PI * 22; // r = 22 => ~138.23

  const updateScrollMetrics = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) : 0;
    const progressPercent = Math.min(100, Math.max(0, progress * 100));

    // 1. Top Edge Gold Progress Bar
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    // 2. Floating Radial Progress Back-to-Top Button
    if (scrollToTopBtn) {
      if (scrollY > 360) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }

      if (progressCircle) {
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = Math.max(0, offset);
      }
    }
  };

  // Bind to Lenis or window scroll
  if (lenisInstance) {
    lenisInstance.on('scroll', updateScrollMetrics);
  } else {
    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
  }

  // Initial call
  updateScrollMetrics();

  // Return to Top Click Handler
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   11. Subtle Scroll Parallax & 3D Spatial Depth
   ========================================================================== */
function initScrollParallax() {
  const parallaxImages = document.querySelectorAll('.parallax-element');
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // 1. 3D Hero Room Camera gentle vertical tilt with scroll depth
    if (scrollY < 1200) {
      scrollTiltY = scrollY * 0.0006;
    }

    // 2. Editorial Image Subtle Depth Translation
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.bottom > -50 && rect.top < windowHeight + 50) {
        const centerDiff = (rect.top + rect.height / 2) - (windowHeight / 2);
        const shiftY = centerDiff * 0.06;
        img.style.transform = `scale(1.08) translateY(${shiftY.toFixed(2)}px)`;
      }
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  if (lenisInstance) {
    lenisInstance.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

/* ==========================================================================
   12. Dynamic Nav ScrollSpy & Active Link Indicator
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  if (!sections.length || !navLinks.length) return;

  const updateActiveSection = () => {
    const scrollPos = (window.scrollY || document.documentElement.scrollTop) + 120;

    let currentSectionId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if (lenisInstance) {
    lenisInstance.on('scroll', updateActiveSection);
  } else {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
  }

  updateActiveSection();
}

/* ==========================================================================
   13. Animated Counter Numbers (Hero Stats & Metrics)
   ========================================================================== */
function initCounterAnimations() {
  const statsContainer = document.getElementById('hero-stats');
  if (!statsContainer) return;

  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateStats();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(statsContainer);

  function animateStats() {
    const statItems = statsContainer.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
      const numEl = item.querySelector('.stat-number');
      if (!numEl) return;

      const rawText = numEl.textContent.trim();
      
      // Parse numbers, prefix, and suffix
      // Examples: "$95M+", "140+", "18", "100%"
      let prefix = '';
      let suffix = '';
      let targetNumber = 0;

      if (rawText.startsWith('$')) {
        prefix = '$';
      }
      
      const numMatch = rawText.match(/(\d+)/);
      if (!numMatch) return;
      targetNumber = parseInt(numMatch[1], 10);

      const suffixMatch = rawText.replace(prefix, '').replace(numMatch[1], '');
      suffix = suffixMatch;

      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeOutExpo curve
        const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.round(targetNumber * easeVal);

        numEl.innerHTML = `${prefix}${currentVal}<span>${suffix}</span>`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          numEl.innerHTML = `${prefix}${targetNumber}<span>${suffix}</span>`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }
}

/* ==========================================================================
   14. Premium Interactive Testimonial Slideshow & Infinite Auto Loop Engine
   ========================================================================== */
function initTestimonialsSlideshow() {
  const track = document.getElementById('testimonial-track');
  const viewport = document.getElementById('testimonial-viewport');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const playToggleBtn = document.getElementById('testimonial-play-toggle');
  const counterEl = document.getElementById('testimonial-counter');
  const dotsContainer = document.getElementById('testimonial-dots');
  const progressFill = document.getElementById('testimonial-progress-fill');
  const filterBtns = document.querySelectorAll('.testimonial-filter-btn');

  if (!track || !viewport) return;

  const allCards = Array.from(track.querySelectorAll('.testimonial-card.slide-card'));
  if (allCards.length === 0) return;

  let activeCards = [...allCards];
  let currentIndex = 0;
  let isPaused = false;
  const SLIDE_DURATION = 4200; // 4.2 seconds auto loop
  let progressStartTime = null;
  let progressAnimationFrame = null;

  // Calculate visible cards count based on screen width
  function getCardsPerView() {
    const width = window.innerWidth;
    if (width <= 700) return 1;
    if (width <= 1100) return 2;
    return 3;
  }

  // Calculate max slide index possible
  function getMaxIndex() {
    const cardsPerView = getCardsPerView();
    return Math.max(0, activeCards.length - cardsPerView);
  }

  // Render Dot Indicators
  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIndex = getMaxIndex();
    const totalDots = maxIndex + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `testimonial-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Update Slide Track Position & UI State
  function updateSlideshow(animate = true) {
    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
      currentIndex = 0; // Wrap around to start for infinite loop
    }
    if (currentIndex < 0) {
      currentIndex = maxIndex; // Wrap around to end
    }

    if (activeCards.length === 0) {
      track.style.transform = 'translateX(0px)';
      return;
    }

    // Calculate card width and offset
    const cardWidth = activeCards[0].offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 28;

    const offset = currentIndex * (cardWidth + gap);

    track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    track.style.transform = `translateX(-${offset}px)`;

    // Update Counter (e.g. 01 / 08)
    if (counterEl) {
      const currentNum = String(currentIndex + 1).padStart(2, '0');
      const totalNum = String(activeCards.length).padStart(2, '0');
      counterEl.innerHTML = `${currentNum} <span class="counter-divider">/</span> ${totalNum}`;
    }

    // Update Dots
    renderDots();

    // Reset and restart Progress Bar
    resetProgressBar();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlideshow(true);
  }

  function nextSlide() {
    const maxIndex = getMaxIndex();
    if (currentIndex >= maxIndex) {
      currentIndex = 0; // Automatic infinite loop restart
    } else {
      currentIndex++;
    }
    updateSlideshow(true);
  }

  function prevSlide() {
    const maxIndex = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIndex; // Infinite loop wrap backward
    } else {
      currentIndex--;
    }
    updateSlideshow(true);
  }

  // Progress Bar Animation for Automatic Loop
  function startProgressBar() {
    if (isPaused || !progressFill) return;
    stopProgressBar();

    progressStartTime = performance.now();

    function step(now) {
      const elapsed = now - progressStartTime;
      const progress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      progressFill.style.width = `${progress}%`;

      if (elapsed < SLIDE_DURATION) {
        progressAnimationFrame = requestAnimationFrame(step);
      } else {
        progressFill.style.width = '100%';
        nextSlide();
      }
    }

    progressAnimationFrame = requestAnimationFrame(step);
  }

  function stopProgressBar() {
    if (progressAnimationFrame) {
      cancelAnimationFrame(progressAnimationFrame);
      progressAnimationFrame = null;
    }
  }

  function resetProgressBar() {
    stopProgressBar();
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
    }
    if (!isPaused) {
      startProgressBar();
    }
  }

  // Play / Pause Toggle Button
  function togglePlayPause() {
    isPaused = !isPaused;
    if (playToggleBtn) {
      const pauseIcon = playToggleBtn.querySelector('.pause-icon');
      const playIcon = playToggleBtn.querySelector('.play-icon');
      if (pauseIcon && playIcon) {
        if (isPaused) {
          pauseIcon.classList.add('hidden');
          playIcon.classList.remove('hidden');
          playToggleBtn.setAttribute('aria-label', 'Play Auto Slideshow');
          stopProgressBar();
        } else {
          pauseIcon.classList.remove('hidden');
          playIcon.classList.add('hidden');
          playToggleBtn.setAttribute('aria-label', 'Pause Auto Slideshow');
          startProgressBar();
        }
      }
    }
  }

  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', togglePlayPause);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      allCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hidden-filter');
        } else {
          card.classList.add('hidden-filter');
        }
      });

      activeCards = allCards.filter(card => !card.classList.contains('hidden-filter'));
      currentIndex = 0;
      updateSlideshow(true);
    });
  });

  // Touch Swipe & Drag Handler
  let startX = 0;
  let isDragging = false;

  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopProgressBar();
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      resetProgressBar();
    }
  }, { passive: true });

  // Pause on hover, resume on mouse leave
  viewport.addEventListener('mouseenter', () => {
    stopProgressBar();
  });

  viewport.addEventListener('mouseleave', () => {
    if (!isPaused) {
      startProgressBar();
    }
  });

  // Handle Window Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSlideshow(false);
    }, 150);
  });

  // Keyboard Arrow Control when in viewport
  document.addEventListener('keydown', (e) => {
    const rect = viewport.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Initialize Position & Start Continuous Auto Loop
  updateSlideshow(false);
  startProgressBar();
}
