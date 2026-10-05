const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  document.body.classList.add("reveal-ready");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const workRows = document.querySelectorAll(".work-row");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    workRows.forEach((row) => {
      const match = filter === "all" || row.dataset.category === filter;
      row.style.display = match ? "grid" : "none";

      if (match) {
        row.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 360, easing: "ease-out" }
        );
      }
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    const open = nav.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
  });
}

const currentFile = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav > a").forEach((link) => {
  const linkFile = (link.getAttribute("href") || "").split("/").pop();
  if (linkFile === currentFile && linkFile !== "") link.setAttribute("aria-current", "page");
});

function renderIllustrationLibrary() {
  const library = window.ILLUSTRATION_LIBRARY;
  if (!library) return;
  const illustrationAssetHref = (path) => pathInfo().isEnglish ? `../${path}` : path;

  const viewer = document.createElement("div");
  viewer.className = "series-viewer";
  viewer.hidden = true;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.setAttribute("aria-label", "Illustration series viewer");
  viewer.innerHTML = `
    <div class="series-viewer-dialog">
      <header class="series-viewer-header">
        <div><small>Illustration series</small><h3></h3></div>
        <button class="series-viewer-close" type="button" aria-label="Close series">×</button>
      </header>
      <div class="series-viewer-stage">
        <button class="series-viewer-prev" type="button" aria-label="Previous image">←</button>
        <img class="series-viewer-image" src="" alt="">
        <button class="series-viewer-next" type="button" aria-label="Next image">→</button>
      </div>
      <div class="series-viewer-meta"><span></span><strong></strong></div>
      <div class="series-viewer-thumbs" aria-label="Choose an image"></div>
    </div>`;
  document.body.appendChild(viewer);

  const viewerTitle = viewer.querySelector("h3");
  const viewerImage = viewer.querySelector(".series-viewer-image");
  const viewerCounter = viewer.querySelector(".series-viewer-meta span");
  const viewerFilename = viewer.querySelector(".series-viewer-meta strong");
  const viewerThumbs = viewer.querySelector(".series-viewer-thumbs");
  let activeGroup = null;
  let activeIndex = 0;

  const showImage = (index) => {
    if (!activeGroup) return;
    activeIndex = (index + activeGroup.images.length) % activeGroup.images.length;
    const path = activeGroup.images[activeIndex];
    viewerImage.src = encodeURI(illustrationAssetHref(path));
    viewerImage.alt = `${activeGroup.title} ${activeIndex + 1}`;
    viewerCounter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activeGroup.images.length).padStart(2, "0")}`;
    viewerFilename.textContent = path.split("/").pop();
    viewerThumbs.querySelectorAll("button").forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === activeIndex);
      if (thumbIndex === activeIndex) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  };

  const closeViewer = () => {
    viewer.hidden = true;
    document.body.classList.remove("series-viewer-open");
  };

  const openViewer = (group) => {
    activeGroup = group;
    viewer.classList.toggle("is-single", group.images.length === 1);
    viewerTitle.textContent = group.title.replaceAll(" / ", " · ");
    viewerThumbs.replaceChildren();
    group.images.forEach((path, index) => {
      const thumb = document.createElement("button");
      thumb.type = "button";
      thumb.setAttribute("aria-label", `View image ${index + 1}`);
      const image = document.createElement("img");
      image.src = encodeURI(illustrationAssetHref(path));
      image.alt = "";
      image.loading = "lazy";
      thumb.appendChild(image);
      thumb.addEventListener("click", () => showImage(index));
      viewerThumbs.appendChild(thumb);
    });
    viewer.hidden = false;
    document.body.classList.add("series-viewer-open");
    showImage(0);
    viewer.querySelector(".series-viewer-close").focus();
  };

  viewer.querySelector(".series-viewer-close").addEventListener("click", closeViewer);
  viewer.querySelector(".series-viewer-prev").addEventListener("click", () => showImage(activeIndex - 1));
  viewer.querySelector(".series-viewer-next").addEventListener("click", () => showImage(activeIndex + 1));
  viewer.addEventListener("click", (event) => { if (event.target === viewer) closeViewer(); });
  document.addEventListener("keydown", (event) => {
    if (viewer.hidden) return;
    if (event.key === "Escape") closeViewer();
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });

  document.querySelectorAll("[data-illustration-key]").forEach((category) => {
    const key = category.dataset.illustrationKey;
    const series = library[key] || [];
    const mount = category.querySelector(".series-library");
    if (!mount) return;

    series.forEach((group, groupIndex) => {
      const article = document.createElement("article");
      article.className = "series-card";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "series-card-trigger";
      button.setAttribute("aria-haspopup", "dialog");

      const cover = document.createElement("span");
      cover.className = "series-card-cover";
      const coverImage = document.createElement("img");
      coverImage.src = encodeURI(illustrationAssetHref(group.images[0]));
      coverImage.alt = `${group.title} series cover`;
      coverImage.loading = "lazy";
      cover.appendChild(coverImage);

      const info = document.createElement("span");
      info.className = "series-card-info";
      const number = document.createElement("small");
      number.textContent = String(groupIndex + 1).padStart(2, "0");
      const title = document.createElement("strong");
      title.textContent = group.title.replaceAll(" / ", " · ");
      const count = document.createElement("em");
      count.textContent = group.images.length === 1 ? "Single work  ↗" : `${group.images.length} works  +`;
      info.append(number, title, count);
      button.append(cover, info);

      button.addEventListener("click", () => openViewer(group));

      article.appendChild(button);
      mount.appendChild(article);
    });
  });
}

renderIllustrationLibrary();

function setupIllustrationCategories() {
  const categories = Array.from(document.querySelectorAll(".sub-category"));
  const pageHead = document.querySelector(".page-head");
  if (!pageHead || categories.length < 2) return;

  const categoryNav = document.createElement("section");
  categoryNav.className = "illustration-category-nav reveal is-visible";
  categoryNav.setAttribute("aria-label", "Illustration categories");

  const intro = document.createElement("div");
  intro.className = "illustration-category-intro";
  intro.innerHTML = "<span>Browse by category</span><p>Choose a collection to explore.</p>";

  const buttons = document.createElement("div");
  buttons.className = "illustration-category-buttons";
  buttons.setAttribute("role", "tablist");
  let isInitializing = true;

  categories.forEach((category, index) => {
    const heading = category.querySelector("h2");
    const title = heading?.textContent.trim() || `Category ${index + 1}`;
    const slug = title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const itemCount = (window.ILLUSTRATION_LIBRARY?.[category.dataset.illustrationKey] || [])
      .reduce((total, group) => total + group.images.length, 0);

    category.id = `illustration-${slug}`;
    category.classList.add("illustration-category-panel");
    category.setAttribute("role", "tabpanel");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "illustration-category-button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", category.id);
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${title}</strong><small>${itemCount} works</small>`;

    button.addEventListener("click", () => {
      categories.forEach((panel) => {
        panel.hidden = panel !== category;
        panel.classList.toggle("is-active", panel === category);
      });
      buttons.querySelectorAll("button").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      if (!isInitializing) history.replaceState(null, "", `#${category.id}`);
    });

    buttons.appendChild(button);
  });

  intro.appendChild(buttons);
  categoryNav.appendChild(intro);
  pageHead.insertAdjacentElement("afterend", categoryNav);

  const requested = categories.find((category) => `#${category.id}` === window.location.hash);
  const initial = requested || categories[0];
  const initialButton = buttons.querySelector(`[aria-controls="${initial.id}"]`);
  initialButton?.click();
  isInitializing = false;
}

setupIllustrationCategories();

function addLinkedInLinks() {
  const linkedInUrl = "https://www.linkedin.com/in/shuyu-chou-3b863b25a/?isSelfProfile=true";

  document.querySelectorAll("footer").forEach((footer) => {
    if (footer.querySelector(".footer-linkedin")) return;
    const link = document.createElement("a");
    link.className = "footer-linkedin";
    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "LinkedIn ↗";
    footer.appendChild(link);
  });

  const toolTags = document.querySelector(".about-layout .tool-tags");
  if (toolTags && !document.querySelector(".about-linkedin")) {
    const link = document.createElement("a");
    link.className = "about-linkedin";
    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = "<span>Connect on LinkedIn</span><b>↗</b>";
    toolTags.insertAdjacentElement("afterend", link);
  }
}

addLinkedInLinks();

const workNavGroups = [
  {
    title: "Visual Design",
    items: [
      ["Ocean of Masks", "ocean-of-masks"],
      ["Children's Kites", "childrens-kites"],
      ["Temporary Stay", "cis"],
      ["Co-creation Project", "co-creation"],
      ["Traces Left Behind", "photograpy"],
      ["Blood Is Not a Sin", "period"],
      ["One Finger", "finger"],
      ["Visual Design Studies", "poster"],
      ["Visual Identity", "projectvisual"]
    ]
  },
  {
    title: "Interactive & Game",
    items: [
      ["Doujin Booth Game", "board-game"],
      ["Invisible Mask", "uiux"],
      ["Cryptography Game", "cryptography-game"],
      ["AI Romance Visual Novel", "monogatari-rin"],
      ["Trace of Being", "trace"],
      ["Lahu Projection", "projection"]
    ]
  },
  {
    title: "Motion & Spatial",
    items: [
      ["Toilet Launch", "animation"],
      ["Animation Study", "animationstudy"],
      ["Erchong Floodway", "omgvideo"]
    ]
  },
  {
    title: "Archive",
    items: [
      ["Struggle", "mixed-media"],
      ["Milkshake Hero", "milkshake"],
      ["3D & Motion Practice", "archive"]
    ]
  }
];

function pathInfo() {
  const path = window.location.pathname.replaceAll("\\", "/");
  return {
    isEnglish: document.documentElement.lang.startsWith("en") || path.includes("/en/"),
    inEnglishWorks: path.includes("/en/works/"),
    inChineseWorks: path.includes("/works/") && !path.includes("/en/works/")
  };
}

function workHref(slug) {
  const info = pathInfo();

  if (info.inEnglishWorks) return `${slug}.html`;
  if (info.isEnglish) return `works/${slug}.html`;
  if (info.inChineseWorks) return `${slug}.html`;
  return `works/${slug}.html`;
}

function worksListHref() {
  const info = pathInfo();

  if (info.inEnglishWorks) return "../works.html";
  if (info.isEnglish) return "works.html";
  if (info.inChineseWorks) return "../works.html";
  return "works.html";
}

function enhanceWorksDropdown() {
  if (!nav || nav.querySelector(".works-dropdown")) return;

  const worksLink = Array.from(nav.querySelectorAll("a")).find((link) => {
    const href = link.getAttribute("href") || "";
    return /(^|\/|\.\.\/)works\.html$/.test(href);
  });

  if (!worksLink) return;

  const wrapper = document.createElement("div");
  wrapper.className = "nav-item works-dropdown";

  const trigger = worksLink.cloneNode(true);
  trigger.classList.add("works-trigger");
  trigger.setAttribute("aria-haspopup", "true");

  const panel = document.createElement("div");
  panel.className = "works-dropdown-panel";

  const allLink = document.createElement("a");
  allLink.href = worksListHref();
  allLink.className = "works-all-link";
  allLink.textContent = "All Works";
  panel.appendChild(allLink);

  workNavGroups.forEach((group) => {
    const groupEl = document.createElement("div");
    groupEl.className = "works-menu-group";

    const heading = document.createElement("span");
    heading.className = "works-menu-heading";
    heading.textContent = group.title;
    groupEl.appendChild(heading);

    group.items.forEach(([label, slug]) => {
      const item = document.createElement("a");
      item.href = workHref(slug);
      item.textContent = label;
      groupEl.appendChild(item);
    });

    panel.appendChild(groupEl);
  });

  wrapper.append(trigger, panel);
  worksLink.replaceWith(wrapper);
}

function enableWorksDropdownClick() {
  const dropdowns = document.querySelectorAll(".works-dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".works-trigger");
    if (!trigger) return;

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const willOpen = !dropdown.classList.contains("is-open");

      dropdowns.forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".works-trigger")?.setAttribute("aria-expanded", "false");
      });

      if (willOpen) {
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".works-dropdown")) return;

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".works-trigger")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".works-trigger")?.setAttribute("aria-expanded", "false");
    });
  });
}

function addPageAssistControls() {
  const projectPage = document.querySelector(".project-page");
  if (!projectPage || document.querySelector(".page-assist")) return;

  const controls = document.createElement("div");
  controls.className = "page-assist";

  const works = document.createElement("a");
  works.href = worksListHref();
  works.textContent = "Works";

  const top = document.createElement("button");
  top.type = "button";
  top.textContent = "Top";
  top.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  controls.append(works, top);
  document.body.appendChild(controls);
}

enhanceWorksDropdown();
enableWorksDropdownClick();
addPageAssistControls();

const cursor = document.querySelector(".cursor-dot");

if (cursor) {
  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

document.querySelectorAll("a, button, .project-card, .gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(2.4)";
  });

  item.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

if (lightbox && lightboxImg) {
  const galleryImages = document.querySelectorAll(
    ".gallery-item img, .project-gallery img, .series-grid img, .project-full img, .project-cover img"
  );

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  lightbox.addEventListener("click", (event) => {
    if (event.target !== lightboxImg) {
      lightbox.classList.remove("active");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const charImages = [
    "../images/boardgame/character/1.png",
    "../images/boardgame/character/2.png",
    "../images/boardgame/character/3.png",
    "../images/boardgame/character/4.png",
    "../images/boardgame/character/5.png",
    "../images/boardgame/character/6.png"
  ];

  const taskImages = [
    "../images/boardgame/card01/19.png",
    "../images/boardgame/card01/5.png",
    "../images/boardgame/card03/5.png",
    "../images/boardgame/card03/9.png",
    "../images/boardgame/card04/19.png",
    "../images/boardgame/card04/9.png"
  ];

  const eventImages = [
    "../images/boardgame/card02/B19.png",
    "../images/boardgame/card02/B27.png",
    "../images/boardgame/card02/B30.png",
    "../images/boardgame/card02/B25.png",
    "../images/boardgame/card02/B5.png",
    "../images/boardgame/card02/B31.png"
  ];

  const charImg = document.getElementById("charImg");
  const taskImg = document.getElementById("taskImg");
  const eventImg = document.getElementById("eventImg");

  let c = 0;
  let t = 0;
  let e = 0;

  setInterval(() => {
    if (charImg) {
      c = (c + 1) % charImages.length;
      charImg.src = charImages[c];
    }

    if (taskImg) {
      t = (t + 1) % taskImages.length;
      taskImg.src = taskImages[t];
    }

    if (eventImg) {
      e = (e + 1) % eventImages.length;
      eventImg.src = eventImages[e];
    }
  }, 2000);
});

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const count = 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
});

const limit = 4;

document.querySelectorAll(".view-more-btn").forEach((btn) => {
  const grid = btn.previousElementSibling;
  if (!grid) return;

  const items = grid.querySelectorAll(".gallery-item");

  if (items.length <= limit) {
    btn.style.display = "none";
    return;
  }

  items.forEach((item, index) => {
    if (index >= limit) {
      item.classList.add("is-hidden");
    }
  });

  btn.addEventListener("click", () => {
    const isExpanded = btn.classList.contains("expanded");

    if (!isExpanded) {
      items.forEach((item) => item.classList.remove("is-hidden"));
      btn.textContent = "Show Less";
      btn.classList.add("expanded");
    } else {
      items.forEach((item, index) => {
        if (index >= limit) {
          item.classList.add("is-hidden");
        }
      });
      btn.textContent = "View More";
      btn.classList.remove("expanded");
      grid.scrollIntoView({ behavior: "smooth" });
    }
  });
});
