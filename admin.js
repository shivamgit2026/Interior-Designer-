/**
 * VALENTI & CO. ARCHITECTURAL INTERIORS — ADMIN DASHBOARD CONTROLLER
 * Features:
 * 1. Session-based demonstration authentication
 * 2. Real-time Inquiries / Leads tracking, status manipulation, and CSV export
 * 3. Dynamic CMS for Hero Text, Services, Portfolio Projects & Image Gallery (Add/Delete/Edit)
 * 4. Full JSON database backup and restoration engine
 * 5. Instant cross-tab reactive synchronization with live website (index.html & subpages)
 */

const DEFAULT_ADMIN_CMS = {
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

// Initial Seed Inquiries
const INITIAL_DEMO_LEADS = [
  {
    id: "INQ-173849102",
    date: "Sep 18, 2026",
    time: "04:30 PM",
    name: "Lord Julian Sterling",
    email: "j.sterling@sterlingholdings.co.uk",
    phone: "+44 20 7946 0912",
    type: "Penthouse Residence",
    location: "Kensington, London",
    budget: "$3M+",
    message: "Seeking a complete interior overhaul of our 6,000 sq ft duplex penthouse overlooking Hyde Park. Priority on bespoke Italian marble millwork and acoustic wall paneling.",
    status: "New"
  },
  {
    id: "INQ-173848944",
    date: "Sep 17, 2026",
    time: "11:15 AM",
    name: "Dr. Vivienne Chen-Vance",
    email: "v.chen@vancemedical.com",
    phone: "+1 (415) 555-8921",
    type: "Coastal / Country Villa",
    location: "Carmel-by-the-Sea, California",
    budget: "$1.5M - $3M",
    message: "We have acquired an oceanfront mid-century estate requiring sensitive architectural modernization and turnkey furnishings.",
    status: "Contacted"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initAdminThemeEngine();
  initAuth();
  initTabs();
  initInquiries();
  initHeroCMS();
  initServicesCMS();
  initPortfolioCMS();
  initAddProjectModal();
  initDataTools();
  initMobileAdminSidebar();
  updateKPIs();
});

function initMobileAdminSidebar() {
  const toggleBtn = document.getElementById('admin-mobile-toggle');
  const sidebar = document.querySelector('.admin-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const navItems = document.querySelectorAll('.nav-item');

  if (!toggleBtn || !sidebar || !backdrop) return;

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('open');
  });

  backdrop.addEventListener('click', closeSidebar);

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });
}

function initAdminThemeEngine() {
  const savedTheme = localStorage.getItem('valenti_theme') || 'golden';

  function applyTheme(mood) {
    const validMoods = ['golden', 'dusk', 'noon'];
    if (!validMoods.includes(mood)) mood = 'golden';

    document.documentElement.setAttribute('data-theme', mood);
    document.body.setAttribute('data-theme', mood);
    localStorage.setItem('valenti_theme', mood);

    document.querySelectorAll('.mood-btn').forEach(btn => {
      if (btn.getAttribute('data-mood') === mood) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  applyTheme(savedTheme);

  const moodToggleBtn = document.getElementById('mood-toggle-btn');
  const moodSwitcher = document.getElementById('mood-switcher-menu');

  if (moodToggleBtn && moodSwitcher) {
    moodToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      moodSwitcher.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!moodSwitcher.contains(e.target) && !moodToggleBtn.contains(e.target)) {
        moodSwitcher.classList.remove('open');
      }
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mood-btn');
    if (btn) {
      const mood = btn.getAttribute('data-mood');
      if (mood) {
        applyTheme(mood);
        if (moodSwitcher) moodSwitcher.classList.remove('open');
      }
    }
  });
}

/* 1. Authentication */
function initAuth() {
  const overlay = document.getElementById('auth-overlay');
  const form = document.getElementById('auth-form');
  const logoutBtn = document.getElementById('logout-btn');

  const isAuthenticated = sessionStorage.getItem('valenti_admin_auth') === 'true';

  if (isAuthenticated) {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (email === 'admin@valenti.design' && password === 'luxury2026') {
      sessionStorage.setItem('valenti_admin_auth', 'true');
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        showToast("Welcome to Valenti Atelier CMS");
      }, 300);
    } else {
      alert("Invalid demo credentials. Use admin@valenti.design / luxury2026");
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('valenti_admin_auth');
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    });
  }
}

/* 2. Tab Navigation */
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });
}

function switchTab(tabKey) {
  const navItems = document.querySelectorAll('.nav-item');
  const panes = document.querySelectorAll('.tab-pane');
  const heading = document.getElementById('tab-heading');

  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabKey) item.classList.add('active');
    else item.classList.remove('active');
  });

  panes.forEach(pane => {
    if (pane.id === `pane-${tabKey}`) pane.classList.add('active');
    else pane.classList.remove('active');
  });

  const titles = {
    overview: "Dashboard Overview",
    inquiries: "Client Inquiries & Commission Leads",
    hero: "Hero Section Content Management",
    services: "Bespoke Services Curation",
    portfolio: "Portfolio Projects & Image Gallery",
    studio: "Studio Coordinates & Concierge",
    settings: "Database Export & System Restoration"
  };

  if (heading && titles[tabKey]) heading.textContent = titles[tabKey];
}

/* 3. CMS Core Storage & Real-Time Live Sync */
function getCMSData() {
  const stored = localStorage.getItem('valenti_cms_data');
  return stored ? JSON.parse(stored) : DEFAULT_ADMIN_CMS;
}

function setCMSData(data) {
  localStorage.setItem('valenti_cms_data', JSON.stringify(data));
  // Dispatch storage event so live website tabs update instantly
  window.dispatchEvent(new Event('storage'));
  updateKPIs();
  showToast("CMS Content Updated & Synced to Live Site!");
}

function updateKPIs() {
  const data = getCMSData();
  const leads = getInquiries();
  const kpiProjects = document.getElementById('kpi-projects');
  const kpiServices = document.getElementById('kpi-services');
  if (kpiProjects) kpiProjects.textContent = data.projects ? data.projects.length : 0;
  if (kpiServices) kpiServices.textContent = data.services ? data.services.length : 0;
}

/* 4. Inquiries & Leads Management */
function getInquiries() {
  const stored = localStorage.getItem('valenti_inquiries');
  if (!stored) {
    localStorage.setItem('valenti_inquiries', JSON.stringify(INITIAL_DEMO_LEADS));
    return INITIAL_DEMO_LEADS;
  }
  return JSON.parse(stored);
}

function setInquiries(leads) {
  localStorage.setItem('valenti_inquiries', JSON.stringify(leads));
  window.dispatchEvent(new Event('storage'));
  renderInquiries();
}

function initInquiries() {
  renderInquiries();

  const exportBtn = document.getElementById('export-csv-btn');
  if (exportBtn) exportBtn.addEventListener('click', exportLeadsCSV);

  const clearBtn = document.getElementById('clear-leads-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to clear all inquiries?")) {
        setInquiries([]);
        showToast("All inquiries cleared.");
      }
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'valenti_inquiries') {
      renderInquiries();
      showToast("New client inquiry received!");
    }
  });
}

function renderInquiries() {
  const leads = getInquiries();
  const sidebarBadge = document.getElementById('sidebar-badge');
  const kpiInquiries = document.getElementById('kpi-inquiries');

  const newCount = leads.filter(l => l.status === 'New').length;
  if (sidebarBadge) sidebarBadge.textContent = newCount;
  if (kpiInquiries) kpiInquiries.textContent = leads.length;

  const overviewTable = document.getElementById('overview-inquiries-table');
  if (overviewTable) {
    if (leads.length === 0) {
      overviewTable.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted);">No inquiries logged yet.</td></tr>`;
    } else {
      overviewTable.innerHTML = leads.slice(0, 5).map(l => `
        <tr>
          <td>${l.date}</td>
          <td><strong>${escapeHtml(l.name)}</strong></td>
          <td>${escapeHtml(l.type)}</td>
          <td>${escapeHtml(l.budget)}</td>
          <td><span class="badge-status status-${l.status.toLowerCase()}">${l.status}</span></td>
        </tr>
      `).join('');
    }
  }

  const fullTable = document.getElementById('full-inquiries-table');
  if (fullTable) {
    if (leads.length === 0) {
      fullTable.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">No inquiries in database.</td></tr>`;
    } else {
      fullTable.innerHTML = leads.map((l, index) => `
        <tr>
          <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${l.date}</td>
          <td><strong>${escapeHtml(l.name)}</strong></td>
          <td>
            <a href="mailto:${escapeHtml(l.email)}" style="color: var(--admin-gold);">${escapeHtml(l.email)}</a><br>
            <span style="font-size: 0.75rem; color: var(--admin-text-muted);">${escapeHtml(l.phone)}</span>
          </td>
          <td>${escapeHtml(l.type)}</td>
          <td>${escapeHtml(l.location)}</td>
          <td>${escapeHtml(l.budget)}</td>
          <td>
            <select onchange="updateLeadStatus(${index}, this.value)" style="background: #0f1116; color: #fff; border: 1px solid var(--admin-border); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">
              <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="In Progress" ${l.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Archived" ${l.status === 'Archived' ? 'selected' : ''}>Archived</option>
            </select>
          </td>
          <td>
            <button type="button" class="btn-admin btn-admin-ghost" style="padding: 4px 8px; font-size: 0.75rem;" onclick="viewLeadDetail(${index})">View</button>
            <button type="button" class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.75rem; margin-left: 4px;" onclick="deleteLead(${index})">×</button>
          </td>
        </tr>
      `).join('');
    }
  }
}

window.updateLeadStatus = function(index, newStatus) {
  const leads = getInquiries();
  if (leads[index]) {
    leads[index].status = newStatus;
    setInquiries(leads);
    showToast(`Status updated to ${newStatus}`);
  }
};

window.deleteLead = function(index) {
  const leads = getInquiries();
  if (confirm(`Delete inquiry from ${leads[index].name}?`)) {
    leads.splice(index, 1);
    setInquiries(leads);
    showToast("Inquiry deleted.");
  }
};

window.viewLeadDetail = function(index) {
  const leads = getInquiries();
  const l = leads[index];
  if (!l) return;

  document.getElementById('modal-lead-name').textContent = l.name;
  document.getElementById('modal-lead-meta').textContent = `${l.date} at ${l.time || 'N/A'}`;
  document.getElementById('modal-lead-email').textContent = l.email;
  document.getElementById('modal-lead-phone').textContent = l.phone;
  document.getElementById('modal-lead-type').textContent = l.type;
  document.getElementById('modal-lead-budget').textContent = l.budget;
  document.getElementById('modal-lead-loc').textContent = l.location;
  document.getElementById('modal-lead-message').textContent = l.message;

  document.getElementById('lead-modal').style.display = 'flex';
};

window.closeLeadModal = function() {
  document.getElementById('lead-modal').style.display = 'none';
};

function exportLeadsCSV() {
  const leads = getInquiries();
  if (leads.length === 0) return alert("No leads to export.");

  const headers = ["ID", "Date", "Name", "Email", "Phone", "Typology", "Location", "Budget", "Message", "Status"];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.date}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${l.type.replace(/"/g, '""')}"`,
    `"${l.location.replace(/"/g, '""')}"`,
    `"${l.budget.replace(/"/g, '""')}"`,
    `"${l.message.replace(/"/g, '""')}"`,
    `"${l.status}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `valenti-studio-leads-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast("Leads CSV Exported successfully.");
}

/* 5. Hero CMS Section */
function initHeroCMS() {
  const data = getCMSData();
  const form = document.getElementById('hero-cms-form');
  if (!form) return;

  const eyebrowInput = document.getElementById('cms-hero-eyebrow');
  const titleInput = document.getElementById('cms-hero-title');
  const descInput = document.getElementById('cms-hero-desc');
  const cta1Input = document.getElementById('cms-hero-cta1');
  const cta2Input = document.getElementById('cms-hero-cta2');
  const statsGrid = document.getElementById('cms-stats-grid');

  if (eyebrowInput) eyebrowInput.value = data.hero.eyebrow;
  if (titleInput) titleInput.value = data.hero.title;
  if (descInput) descInput.value = data.hero.description;
  if (cta1Input) cta1Input.value = data.hero.primaryCTA;
  if (cta2Input) cta2Input.value = data.hero.secondaryCTA;

  if (statsGrid && data.hero.stats) {
    statsGrid.innerHTML = data.hero.stats.map((s, idx) => `
      <div class="cms-group">
        <label class="cms-label">Stat ${idx + 1} Number</label>
        <input type="text" class="cms-input stat-num-input" value="${escapeHtml(s.num)}">
      </div>
      <div class="cms-group">
        <label class="cms-label">Stat ${idx + 1} Label</label>
        <input type="text" class="cms-input stat-label-input" value="${escapeHtml(s.label)}">
      </div>
    `).join('');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = getCMSData();
    updated.hero.eyebrow = eyebrowInput.value.trim();
    updated.hero.title = titleInput.value.trim();
    updated.hero.description = descInput.value.trim();
    updated.hero.primaryCTA = cta1Input.value.trim();
    updated.hero.secondaryCTA = cta2Input.value.trim();

    const numInputs = document.querySelectorAll('.stat-num-input');
    const labelInputs = document.querySelectorAll('.stat-label-input');
    updated.hero.stats = [];
    numInputs.forEach((inp, i) => {
      updated.hero.stats.push({
        num: inp.value.trim(),
        label: labelInputs[i].value.trim()
      });
    });

    setCMSData(updated);
  });
}

/* 6. Services CMS Section (Add / Delete / Edit) */
function initServicesCMS() {
  renderServicesCMS();

  const addBtn = document.getElementById('add-service-btn');
  const saveBtn = document.getElementById('save-services-btn');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const data = getCMSData();
      data.services.push({
        number: `0${data.services.length + 1} / SERVICE`,
        title: "New Bespoke Service",
        desc: "Service description narrative outlining spatial craft and execution."
      });
      setCMSData(data);
      renderServicesCMS();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const updated = getCMSData();
      const numInputs = document.querySelectorAll('.svc-num');
      const titleInputs = document.querySelectorAll('.svc-title');
      const descInputs = document.querySelectorAll('.svc-desc');

      updated.services = [];
      numInputs.forEach((inp, i) => {
        updated.services.push({
          number: inp.value.trim(),
          title: titleInputs[i].value.trim(),
          desc: descInputs[i].value.trim()
        });
      });

      setCMSData(updated);
      renderServicesCMS();
    });
  }
}

function renderServicesCMS() {
  const container = document.getElementById('services-cms-list');
  const data = getCMSData();
  if (!container) return;

  if (!data.services || data.services.length === 0) {
    container.innerHTML = `<p style="color: var(--admin-text-muted);">No services configured.</p>`;
    return;
  }

  container.innerHTML = data.services.map((svc, i) => `
    <div style="background: var(--admin-bg); border: 1px solid var(--admin-border); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.75rem; color: var(--admin-gold); font-weight: 700;">Service #${i + 1}</span>
        <button type="button" class="btn-admin btn-admin-danger" style="padding: 4px 10px; font-size: 0.72rem;" onclick="deleteService(${i})">🗑️ Delete Service</button>
      </div>
      <div class="cms-grid">
        <div class="cms-group">
          <label class="cms-label">Service Code</label>
          <input type="text" class="cms-input svc-num" value="${escapeHtml(svc.number)}">
        </div>
        <div class="cms-group">
          <label class="cms-label">Service Title</label>
          <input type="text" class="cms-input svc-title" value="${escapeHtml(svc.title)}">
        </div>
        <div class="cms-group col-full">
          <label class="cms-label">Description</label>
          <textarea class="cms-textarea svc-desc">${escapeHtml(svc.desc)}</textarea>
        </div>
      </div>
    </div>
  `).join('');
}

window.deleteService = function(index) {
  const data = getCMSData();
  if (confirm(`Delete service "${data.services[index].title}"?`)) {
    data.services.splice(index, 1);
    setCMSData(data);
    renderServicesCMS();
  }
};

/* 7. Portfolio Projects & Image Gallery CMS (Add / Delete / Edit Projects & Images) */
function initPortfolioCMS() {
  renderPortfolioCMS();

  const saveBtn = document.getElementById('save-portfolio-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const updated = getCMSData();
      const titleInputs = document.querySelectorAll('.proj-title');
      const locInputs = document.querySelectorAll('.proj-loc');
      const badgeInputs = document.querySelectorAll('.proj-badge');
      const catSelects = document.querySelectorAll('.proj-cat');
      const imgInputs = document.querySelectorAll('.proj-img');

      titleInputs.forEach((inp, i) => {
        if (updated.projects[i]) {
          updated.projects[i].title = inp.value.trim();
          updated.projects[i].location = locInputs[i].value.trim();
          updated.projects[i].badge = badgeInputs[i].value.trim();
          updated.projects[i].category = catSelects[i].value;
          updated.projects[i].image = imgInputs[i].value.trim();
        }
      });

      setCMSData(updated);
      renderPortfolioCMS();
    });
  }
}

function renderPortfolioCMS() {
  const container = document.getElementById('portfolio-cms-list');
  const data = getCMSData();
  if (!container) return;

  if (!data.projects || data.projects.length === 0) {
    container.innerHTML = `<p style="color: var(--admin-text-muted); text-align: center; padding: 2rem;">No portfolio projects. Click "+ Add New Project & Image" to add one.</p>`;
    return;
  }

  container.innerHTML = data.projects.map((proj, i) => `
    <div class="project-cms-card">
      <div class="project-thumb-wrap">
        <img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.title)}" onerror="this.src='assets/images/hero-penthouse.jpg'">
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-size: 0.75rem; color: var(--admin-gold); font-weight: 700;">Project #${i + 1} • ID: ${proj.id}</span>
          <button type="button" class="btn-admin btn-admin-danger" style="padding: 4px 10px; font-size: 0.72rem;" onclick="deleteProject(${i})">
            🗑️ Delete Project & Image
          </button>
        </div>

        <div class="cms-grid">
          <div class="cms-group">
            <label class="cms-label">Project Title</label>
            <input type="text" class="cms-input proj-title" value="${escapeHtml(proj.title)}">
          </div>
          <div class="cms-group">
            <label class="cms-label">Location & Year</label>
            <input type="text" class="cms-input proj-loc" value="${escapeHtml(proj.location)}">
          </div>
          <div class="cms-group">
            <label class="cms-label">Badge Tag</label>
            <input type="text" class="cms-input proj-badge" value="${escapeHtml(proj.badge)}">
          </div>
          <div class="cms-group">
            <label class="cms-label">Category</label>
            <select class="cms-select proj-cat">
              <option value="penthouse" ${proj.category === 'penthouse' ? 'selected' : ''}>Penthouse</option>
              <option value="villa" ${proj.category === 'villa' ? 'selected' : ''}>Coastal Villa</option>
              <option value="townhouse" ${proj.category === 'townhouse' ? 'selected' : ''}>Townhouse</option>
              <option value="hospitality" ${proj.category === 'hospitality' ? 'selected' : ''}>Hospitality</option>
            </select>
          </div>
          <div class="cms-group col-full">
            <label class="cms-label">Image Source / URL</label>
            <input type="text" class="cms-input proj-img" value="${escapeHtml(proj.image)}" onchange="renderPortfolioCMS()">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.deleteProject = function(index) {
  const data = getCMSData();
  const proj = data.projects[index];
  if (confirm(`Are you sure you want to delete project "${proj.title}" and remove its image from the website?`)) {
    data.projects.splice(index, 1);
    setCMSData(data);
    renderPortfolioCMS();
    showToast(`Project "${proj.title}" deleted live.`);
  }
};

function initAddProjectModal() {
  const addBtn = document.getElementById('add-project-btn');
  const modal = document.getElementById('add-project-modal');
  const form = document.getElementById('add-project-form');

  if (addBtn && modal) {
    addBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-proj-title').value.trim();
      const category = document.getElementById('new-proj-category').value;
      const badge = document.getElementById('new-proj-badge').value.trim();
      const location = document.getElementById('new-proj-loc').value.trim();
      const image = document.getElementById('new-proj-image').value.trim();
      const scope = document.getElementById('new-proj-scope').value.trim();
      const materials = document.getElementById('new-proj-materials').value.trim();
      const quote = document.getElementById('new-proj-quote').value.trim();

      const data = getCMSData();
      const newId = data.projects.length > 0 ? Math.max(...data.projects.map(p => p.id)) + 1 : 1;

      data.projects.push({
        id: newId,
        category: category,
        badge: badge,
        title: title,
        location: location,
        image: image,
        details: {
          client: "Private Atelier Client",
          scope: scope,
          materials: materials,
          quote: quote
        }
      });

      setCMSData(data);
      renderPortfolioCMS();
      closeAddProjectModal();
      form.reset();
      showToast(`New project "${title}" created & published live!`);
    });
  }
}

window.closeAddProjectModal = function() {
  const modal = document.getElementById('add-project-modal');
  if (modal) modal.style.display = 'none';
};

/* 8. Database Export & Backup Tools */
function initDataTools() {
  const exportBtn = document.getElementById('export-json-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const fullBackup = {
        cms: getCMSData(),
        inquiries: getInquiries(),
        exportedAt: new Date().toISOString()
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
      const anchor = document.createElement('a');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", `valenti-studio-backup-${Date.now()}.json`);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      showToast("JSON Database Backup downloaded.");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to restore factory defaults? All custom edits will be reset.")) {
        localStorage.removeItem('valenti_cms_data');
        localStorage.removeItem('valenti_inquiries');
        showToast("Factory defaults reinstated.");
        setTimeout(() => location.reload(), 1000);
      }
    });
  }
}

/* Toast Utilities */
function showToast(msg) {
  const toast = document.getElementById('admin-toast');
  const text = document.getElementById('admin-toast-text');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
