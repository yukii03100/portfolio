const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

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
    "../images/桌遊/角色/1.男性向.png",
    "../images/桌遊/角色/2.女性向.png",
    "../images/桌遊/角色/5.福瑞.png",
    "../images/桌遊/角色/3.原創.png",
    "../images/桌遊/角色/6.遊戲.png",
    "../images/桌遊/角色/4.vtuber.png"
  ];

  // ===== 正經牌 =====
  const taskImages = [
    "../images/桌遊/商品宣傳20張/19.png",
    "../images/桌遊/商品宣傳20張/13.png",
    "../images/桌遊/商品製作22張/11.png",
    "../images/桌遊/商品製作22張/15.png",
    "../images/桌遊/商品繪製26張/19.png",
    "../images/桌遊/商品繪製26張/9.png"
  ];

  // ===== 干擾牌 =====
  const eventImages = [
    "../images/桌遊/干擾牌/B19X4張.png",
    "../images/桌遊/干擾牌/B27X5張.png",
    "../images/桌遊/干擾牌/B30X2張.png",
    "../images/桌遊/干擾牌/B25X10張.png",
    "../images/桌遊/干擾牌/B5X1張.png",
    "../images/桌遊/干擾牌/B31X2張.png"
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

