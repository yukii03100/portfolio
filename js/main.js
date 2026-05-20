const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
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
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

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
