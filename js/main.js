const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  document.body.classList.add('reveal-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const i18n = {
  zh: {
    lang: "zh-Hant",
    navHome: "首頁",
    navWorks: "作品",
    navIllustration: "插畫",
    navAbout: "關於",
    menu: "選單",
    backWorks: "← 返回作品",
    viewMore: "查看更多",
    showLess: "收合",
    filters: {
      all: "全部",
      visual: "視覺設計",
      interactive: "互動與遊戲",
      motion: "動態與空間",
      archive: "其他作品"
    },
    index: {
      title: "YU Portfolio",
      kicker: "視覺設計 / 插畫 / 互動專案",
      hero: "YUKI<br>創作作品",
      intro: "專注於視覺設計、插畫與互動體驗，將觀察、敘事與畫面轉化為完整的創作專案。",
      viewWorks: "查看作品",
      aboutMe: "關於我",
      selected: "精選作品",
      allWorks: "全部作品 →",
      oceanMeta: "國際獲獎 / 海報",
      oceanDesc: "以拋棄式口罩轉化為海洋生物，探討塑膠污染對生態的影響。",
      kitesMeta: "國際入選 / 海報",
      kitesTitle: "兒童風箏",
      kitesDesc: "戰爭取代了遊戲，風箏在天空中變成了戰鬥機。",
      boardMeta: "互動與遊戲",
      boardTitle: "同人擺攤教學桌遊",
      boardDesc: "以桌遊形式轉譯同人擺攤流程。",
      mixedTitle: "掙扎",
      mixedDesc: "在束縛與破碎之中，尋找出口。"
    },
    works: {
      title: "Works / YU Portfolio",
      label: "所有專案",
      heading: "作品",
      desc: "依作品性質整理為視覺設計、互動遊戲、動態與空間作品。主打作品放在前段，其他作品作為創作延伸。"
    },
    illustration: {
      title: "Illustration / YU Portfolio",
      label: "繪畫作品",
      heading: "插畫",
      desc: "整理角色設計、原創插畫、練習與二創作品，呈現不同階段的繪畫累積。",
      practice: "插畫練習",
      practiceDesc: "依創作類型整理，包含角色設計、插畫與日常練習。",
      characterDesign: "角色設計",
      characterDesc: "以角色造型與風格探索為主，呈現人物設定與視覺發展。",
      illustrationTitle: "插畫",
      illustrationDesc: "著重畫面氛圍、構圖與敘事感，呈現較完整的插畫作品。",
      sketch: "草圖與練習",
      sketchDesc: "包含草稿、角色草圖與造型練習，呈現創作過程與日常累積。",
      fanArt: "二創作品",
      fanArtDesc: "以既有作品與角色為基礎的創作，依風格與表現形式進行整理。",
      characterIllustration: "角色插畫",
      chibi: "Q版與風格化"
    },
    about: {
      title: "About / YU Portfolio",
      label: "關於",
      heading: "Yuki",
      background: "背景",
      desc: "目前以視覺設計、插畫與互動體驗作為主要創作方向。習慣從日常觀察與議題出發，透過圖像、敘事和媒材轉譯出具情緒與溝通性的作品。"
    }
  },
  en: {
    lang: "en",
    navHome: "Home",
    navWorks: "Works",
    navIllustration: "Illustration",
    navAbout: "About",
    menu: "Menu",
    backWorks: "← Back to Works",
    viewMore: "View More",
    showLess: "Show Less",
    filters: {
      all: "All",
      visual: "Visual Design",
      interactive: "Interactive & Game",
      motion: "Motion & Spatial",
      archive: "Archive"
    },
    index: {
      title: "YU Portfolio",
      kicker: "Visual Design / Illustration / Interactive Project",
      hero: "YUKI<br>Creative Works",
      intro: "A portfolio of visual design, illustration, and interactive projects shaped through observation, narrative, and image-making.",
      viewWorks: "View Works",
      aboutMe: "About Me",
      selected: "Selected Works",
      allWorks: "All Works →",
      oceanMeta: "International Award / Poster",
      oceanDesc: "Disposable masks are transformed into marine life to question the ecological impact of plastic pollution.",
      kitesMeta: "International Selected / Poster",
      kitesTitle: "Children's Kites",
      kitesDesc: "War replaces play, turning children's kites into fighter jets in the sky.",
      boardMeta: "Interactive & Game",
      boardTitle: "Doujin Market Board Game",
      boardDesc: "A board game that translates the process of running a doujin market booth into play.",
      mixedTitle: "Struggle",
      mixedDesc: "A mixed-media work about searching for an exit within restraint and fragmentation."
    },
    works: {
      title: "Works / YU Portfolio",
      label: "All Projects",
      heading: "Works",
      desc: "Projects are grouped by visual design, interactive game, motion, spatial work, and archive. Featured works appear first, followed by related creative studies."
    },
    illustration: {
      title: "Illustration / YU Portfolio",
      label: "Drawing Works",
      heading: "Illustration",
      desc: "A collection of character design, original illustration, studies, and fan art across different stages of drawing practice.",
      practice: "Illustration Practice",
      practiceDesc: "Organized by creation type, including character design, illustration, and daily studies.",
      characterDesign: "Character Design",
      characterDesc: "Character styling and visual exploration, showing design ideas and development.",
      illustrationTitle: "Illustration",
      illustrationDesc: "Finished illustration works focused on mood, composition, and visual storytelling.",
      sketch: "Sketch & Study",
      sketchDesc: "Sketches, character drafts, and studies that show process and daily accumulation.",
      fanArt: "Fan Art",
      fanArtDesc: "Works based on existing characters, arranged by style and visual approach.",
      characterIllustration: "Character Illustration",
      chibi: "Chibi & Stylized"
    },
    about: {
      title: "About / YU Portfolio",
      label: "About",
      heading: "Yuki",
      background: "Background",
      desc: "My work focuses on visual design, illustration, and interactive experiences. I often begin with everyday observation and social topics, then translate them through imagery, narrative, and material exploration."
    }
  }
};

const phrasePairs = [
  ["口罩之海", "Ocean of Masks"],
  ["兒童風箏", "Children's Kites"],
  ["兒童風箏", "Children’s Kites"],
  ["寄住吧！", "Stay Inn!"],
  ["寄住吧!", "Stay Inn!"],
  ["點點善共創作品", "Diandianshan Co-creation"],
  ["同人擺攤教學桌遊", "Doujin Market Board Game"],
  ["隱形面具", "Invisible Mask"],
  ["密碼學教學遊戲", "Cryptography Escape Game"],
  ["AI 戀愛視覺小說", "AI Romance Visual Novel"],
  ["敘事設計", "Narrative Design"],
  ["AI 角色設計", "AI Character Design"],
  ["AI 協作方式", "AI Collaboration"],
  ["劇情規劃", "Story Planning"],
  ["技術研究", "Technical Research"],
  ["使用者體驗設計", "User Experience Design"],
  ["目前狀態", "Current Status"],
  ["我在專案中做了什麼？", "What I Did"],
  ["類型：視覺小說 / AI 聊天互動", "Type: Visual Novel / AI Chat Interaction"],
  ["工具：Monogatari、n8n、Gemini API 研究", "Tools: Monogatari, n8n, Gemini API Research"],
  ["狀態：原型開發中，聊天室 API 尚未完成串接", "Status: Prototype in progress, chat API not connected yet"],
  ["角色：以松岡凜為發想的二創互動角色", "Character: Fan-made interactive character inspired by Rin Matsuoka"],
  ["如廁衝天", "Toilet Rush"],
  ["掙扎", "Struggle"],
  ["奶昔超人", "Milkshake Hero"],
  ["攝影", "Photography"],
  ["作品存檔 / 3D", "Archive / 3D"],
  ["血不是罪", "Blood Is Not a Sin"],
  ["動畫練習", "Animation Study"],
  ["被留下的痕跡", "Traces Left Behind"],
  ["留痕", "Trace"],
  ["留痕 Trace of Being", "Trace of Being"],
  ["二重疏洪道的多元生活風景", "Everyday Scenes Along Erchong Floodway"],
  ["拉祜族圖騰投影", "Lahu Totem Projection"],
  ["一指動心", "One Finger, One Heart"],
  ["視覺設計練習", "Visual Design Studies"],
  ["視覺識別", "Visual Identity"],
  ["海報設計 / 國際獲獎", "Poster Design / International Award"],
  ["海報設計 / 國際入選", "Poster Design / International Selected"],
  ["品牌識別 / 平面設計", "Brand Identity / Graphic Design"],
  ["共創 / 平面設計", "Co-creation / Graphic Design"],
  ["桌遊 / 卡牌 / 小冊子", "Board Game / Cards / Booklet"],
  ["遊戲設計 / 教育專案", "Game Design / Educational Project"],
  ["動畫", "Animation"],
  ["複合媒材作品", "Mixed Media Works"],
  ["影像 / 構圖 / 日常觀察", "Image / Composition / Daily Observation"],
  ["實驗 / 模板網站 / 練習", "Experiments / Template-based Web / Practice"],
  ["海報設計", "Poster Design"],
  ["短篇循環動畫 / 動態練習", "Short Loop Animation / Motion Practice"],
  ["互動裝置", "Interactive Installation"],
  ["影片", "video"],
  ["投影", "projection"],
  ["識別", "Identity"],
  ["專案資訊", "Project Info"],
  ["專案", "Project"],
  ["資訊", "Info"],
  ["概念", "Concept"],
  ["視覺", "Visual"],
  ["系列", "Series"],
  ["系列延伸", "Series Extension"],
  ["得獎紀錄", "Awards"],
  ["角色設計", "Character Design"],
  ["場景", "Background"],
  ["導演", "Director"],
  ["編劇", "Screenwriter"],
  ["原畫", "Key Animation"],
  ["二原", "In-between Animation"],
  ["後製", "Post-production"]
];

function getPageKey() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "index.html") return "index";
  if (path === "works.html") return "works";
  if (path === "illustration.html") return "illustration";
  if (path === "about.html") return "about";
  return "project";
}

function setText(selector, text) {
  if (!text) return;
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
}

function setHTML(selector, html) {
  if (!html) return;
  document.querySelectorAll(selector).forEach((element) => {
    element.innerHTML = html;
  });
}

function setScopedText(root, selector, text) {
  if (!root || !text) return;
  root.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
}

function applyPhraseLanguage(lang) {
  const to = lang === "en" ? 1 : 0;
  const from = lang === "en" ? 0 : 1;
  const phraseMap = new Map();

  phrasePairs.forEach((pair) => {
    phraseMap.set(pair[from], pair[to]);
    phraseMap.set(pair[to], pair[to]);
  });

  document.querySelectorAll("h1, h2, h3, p, span, a, button, strong").forEach((element) => {
    if (element.children.length > 0) return;
    const current = element.textContent.trim();
    if (phraseMap.has(current)) {
      element.textContent = phraseMap.get(current);
    }
  });
}

function createLanguageSwitcher() {
  const header = document.querySelector(".site-header");
  if (!header || document.querySelector(".lang-switch")) return;

  const switcher = document.createElement("div");
  switcher.className = "lang-switch";
  switcher.setAttribute("aria-label", "Language switcher");
  switcher.innerHTML = `
    <button class="lang-option" type="button" data-lang-option="zh">中</button>
    <button class="lang-option" type="button" data-lang-option="en">EN</button>
  `;

  header.appendChild(switcher);

  switcher.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.langOption);
    });
  });
}

function updateSwitcher(lang) {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.langOption === lang);
    button.setAttribute("aria-pressed", button.dataset.langOption === lang ? "true" : "false");
  });
}

function applyLanguage(lang) {
  const selected = i18n[lang] ? lang : "zh";
  const t = i18n[selected];
  const pageKey = getPageKey();
  const page = t[pageKey];

  localStorage.setItem("portfolioLang", selected);
  document.documentElement.lang = t.lang;

  setText('.nav a[href$="index.html"]', t.navHome);
  setText('.nav a[href$="works.html"]', t.navWorks);
  setText('.nav a[href$="illustration.html"]', t.navIllustration);
  setText('.nav a[href$="about.html"]', t.navAbout);
  setText(".menu-toggle", t.menu);
  setText(".back-link", t.backWorks);

  document.querySelectorAll(".filter-btn").forEach((button) => {
    const label = t.filters[button.dataset.filter];
    if (label) button.textContent = label;
  });

  document.querySelectorAll(".view-more-btn").forEach((button) => {
    button.textContent = button.classList.contains("expanded") ? t.showLess : t.viewMore;
  });

  if (page?.title) document.title = page.title;

  if (pageKey === "index") {
    setText(".hero-kicker", page.kicker);
    setHTML(".hero h1", page.hero);
    setText(".hero p", page.intro);
    setText('.hero-actions a[href$="works.html"]', page.viewWorks);
    setText('.hero-actions a[href$="about.html"]', page.aboutMe);
    setText(".featured .section-title span", page.selected);
    setText('.featured .section-title a[href$="works.html"]', page.allWorks);

    const ocean = document.querySelector('.project-card[href*="ocean-of-masks"]');
    setScopedText(ocean, ".project-info span", page.oceanMeta);
    setScopedText(ocean, ".project-info p", page.oceanDesc);

    const kites = document.querySelector('.project-card[href*="childrens-kites"]');
    setScopedText(kites, ".project-info span", page.kitesMeta);
    setScopedText(kites, ".project-info h2", page.kitesTitle);
    setScopedText(kites, ".project-info p", page.kitesDesc);

    const board = document.querySelector('.project-card[href*="board-game"]');
    setScopedText(board, ".project-info span", page.boardMeta);
    setScopedText(board, ".project-info h2", page.boardTitle);
    setScopedText(board, ".project-info p", page.boardDesc);

    const mixed = document.querySelector('.project-card[href*="mixed-media"]');
    setScopedText(mixed, ".project-info h2", page.mixedTitle);
    setScopedText(mixed, ".project-info p", page.mixedDesc);
  }

  if (pageKey === "works") {
    setText(".page-head span", page.label);
    setText(".page-head h1", page.heading);
    setText(".page-head p", page.desc);
  }

  if (pageKey === "illustration") {
    setText(".page-head > span", page.label);
    setText(".page-head h1", page.heading);
    setText(".page-head > p", page.desc);

    const sections = document.querySelectorAll(".illustration-section");
    setScopedText(sections[0], ".section-title span", page.practice);
    setScopedText(sections[0], ".section-title p", page.practiceDesc);
    setScopedText(sections[1], ".section-title span", page.fanArt);
    setScopedText(sections[1], ".section-title p", page.fanArtDesc);

    const categories = document.querySelectorAll(".sub-category");
    setScopedText(categories[0], "h2", page.characterDesign);
    setScopedText(categories[0], ".category-desc", page.characterDesc);
    setScopedText(categories[1], "h2", page.illustrationTitle);
    setScopedText(categories[1], ".category-desc", page.illustrationDesc);
    setScopedText(categories[2], "h2", page.sketch);
    setScopedText(categories[2], ".category-desc", page.sketchDesc);
    setScopedText(categories[3], "h2", page.characterIllustration);
    setScopedText(categories[4], "h2", page.chibi);
  }

  if (pageKey === "about") {
    setText(".mini-label", page.label);
    setText(".about-layout h1", page.heading);
    setText(".about-layout h2", page.background);
    setText(".about-layout p", page.desc);
  }

  applyPhraseLanguage(selected);
  updateSwitcher(selected);
}

createLanguageSwitcher();
applyLanguage(localStorage.getItem("portfolioLang") || "zh");

const filterButtons = document.querySelectorAll('.filter-btn');
const workRows = document.querySelectorAll('.work-row');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    workRows.forEach((row) => {
      const match = filter === 'all' || row.dataset.category === filter;
      row.style.display = match ? 'grid' : 'none';

      if (match) {
        row.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 360, easing: 'ease-out' }
        );
      }
    });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const cursor = document.querySelector('.cursor-dot');

if (cursor) {
  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

document.querySelectorAll('a, button, .project-card, .gallery-item').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.4)';
  });

  item.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

if (lightbox && lightboxImg) {
  const galleryImages = document.querySelectorAll(
    ".gallery-item img, .project-gallery img, .series-grid img, .project-full img, .project-cover img"
  );

  galleryImages.forEach(img => {
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

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove("active");
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {

  // ===== 角色牌 =====
  const charImages = [
    "../images/boardgame/character/1.png",
    "../images/boardgame/character/2.png",
    "../images/boardgame/character/3.png",
    "../images/boardgame/character/4.png",
    "../images/boardgame/character/5.png",
    "../images/boardgame/character/6.png"
  ];

  // ===== 正經牌 =====
  const taskImages = [
    "../images/images/boardgame/card01/19.png",
    "../images/images/boardgame/card01/5.png",
    "../images/images/boardgame/card03/5.png",
    "../images/images/boardgame/card03/9.png",
    "../images/images/boardgame/card04/19.png",
    "../images/images/boardgame/card04/9.png"
  ];

  // ===== 干擾牌 =====
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

  let c = 0, t = 0, e = 0;

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

// ===== 粒子背景 =====
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-particles");
  if (!canvas) {
    console.log("canvas 沒抓到");
    return;
  }

  const ctx = canvas.getContext("2d");

  let particles = [];
  const count = 80; // 多一點比較明顯

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < count; i++) {
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

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.15)"; // ← 改成黑色你一定看得到
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
});


const limit = 4;

document.querySelectorAll(".view-more-btn").forEach(btn => {
  const grid = btn.previousElementSibling;
  const items = grid.querySelectorAll(".gallery-item");

  if (items.length <= limit) {
    btn.style.display = "none";
    return;
  }

  // 初始隱藏
  items.forEach((item, index) => {
    if (index >= limit) {
      item.classList.add("is-hidden");
    }
  });

  btn.addEventListener("click", () => {
    const isExpanded = btn.classList.contains("expanded");

    if (!isExpanded) {
      items.forEach(item => item.classList.remove("is-hidden"));
      const lang = localStorage.getItem("portfolioLang") || "zh";
      btn.textContent = i18n[lang].showLess;
      btn.classList.add("expanded");
    } else {
      items.forEach((item, index) => {
        if (index >= limit) {
          item.classList.add("is-hidden");
        }
      });
      const lang = localStorage.getItem("portfolioLang") || "zh";
      btn.textContent = i18n[lang].viewMore;
      btn.classList.remove("expanded");

      grid.scrollIntoView({ behavior: "smooth" });
    }
  });
});
