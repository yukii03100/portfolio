const nestedWorkPage = window.location.pathname.includes("/en/works/");

function pagePath(path) {
  return nestedWorkPage && path.startsWith("../") ? `../${path}` : path;
}

const works = {
  "ocean-of-masks": {
    title: "Ocean of Masks",
    original: "../works/ocean-of-masks.html",
    category: "Visual Design / Poster",
    cover: "../images/visual/maskjellyfish.png",
    meta: ["Poster Design", "2024", "International Award", "Visual concept / poster design"],
    concept: "This poster transforms disposable masks into marine organisms to visualize the environmental damage created by pandemic waste. The image uses an uncanny, beautiful creature to draw viewers into a subject that is otherwise easy to ignore.",
    outcome: "The project extends into a small poster series and exhibition documentation, connecting ecological concern with strong visual symbolism.",
    gallery: ["../images/visual/mask ocean poster mockup.png", "../images/visual/maskjellyfish.png", "../images/visual/seaturtle.png"]
  },
  "childrens-kites": {
    title: "Children's Kites",
    original: "../works/childrens-kites.html",
    category: "Visual Design / Poster",
    cover: "../images/visual/children's kites MMOCKUP.png",
    meta: ["Poster Design", "2024", "IDA Honorable Mention", "Concept / poster design"],
    concept: "Children's Kites contrasts childhood play with the violence of war. Kites, usually symbols of freedom and imagination, are visually transformed into fighter jets to express how conflict steals ordinary childhood scenes.",
    outcome: "The work was selected internationally and presents a direct visual metaphor with a quiet but critical tone.",
    gallery: ["../images/visual/children's kites.png", "../images/visual/children's kites MMOCKUP.png"]
  },
  "cis": {
    title: "Temporary Stay",
    original: "../works/cis.html",
    category: "Visual Design / Brand Identity",
    cover: "../images/CIS/mock up01.png",
    meta: ["Brand Identity", "CIS", "Graphic Design", "Logo / applications"],
    concept: "A brand identity project built around the idea of temporary living, warmth, and everyday companionship. The visual system uses approachable forms and flexible applications to create a friendly brand atmosphere.",
    outcome: "The project includes logo development, printed applications, packaging, and brand mockups.",
    gallery: ["../images/CIS/logo01.png", "../images/CIS/logo.png", "../images/CIS/mock up06.png", "../images/CIS/mock up10.jpg"]
  },
  "co-creation": {
    title: "Dian Dian Shan Co-creation Project",
    original: "../works/co-creation.html",
    category: "Visual Design / Co-creation",
    cover: "../images/visual/face.jpg",
    meta: ["Co-creation", "Graphic Design", "Exhibition", "Visual development"],
    concept: "A co-creation project that turns shared observation and discussion into graphic works. The series explores visibility, care, and the emotional traces behind ordinary faces and scenes.",
    outcome: "The work includes visual pieces, mockups, and exhibition documentation.",
    gallery: ["../images/visual/black.png", "../images/visual/face.jpg", "../images/visual/image01.png", "../images/real/IMG_2170.JPG"]
  },
  "board-game": {
    title: "Doujin Booth Teaching Board Game",
    original: "../works/board-game.html",
    category: "Board Game / Educational Design",
    cover: "../images/boardgame/image01.jpg",
    meta: ["Board Game", "2+ players", "Approx. 60 minutes", "Art direction / card design / booklet"],
    concept: "An educational board game that translates the process of preparing and running a fan-market booth into a playful system. Players learn booth flow, product planning, task handling, and unexpected events through cards and interaction.",
    outcome: "The project includes character cards, task cards, event cards, a map, a booklet, and collaborative production materials.",
    gallery: ["../images/boardgame/mapreal.jpg", "../images/boardgame/image01.jpg", "../images/boardgame/character/image03.png", "../images/boardgame/card03/7.png"]
  },
  "uiux": {
    title: "Invisible Mask",
    original: "../works/uiux.html",
    category: "Interactive & Interface",
    cover: "../images/invisablemask/cover.jpg",
    meta: ["UIUX", "Prototype", "Research", "Interface design"],
    concept: "Invisible Mask is a UIUX project that begins with user research and turns emotional or behavioral needs into an interface experience. The process includes survey material, persona development, empathy mapping, journey mapping, and service flow.",
    outcome: "The final output includes a visual prototype and research-based interface documentation.",
    gallery: ["../images/invisablemask/User survey.png", "../images/invisablemask/PERSONA.png", "../images/invisablemask/empathy map.png", "../images/invisablemask/UIUX MOCKUP.png"]
  },
  "cryptography-game": {
    title: "Cryptography Escape Room Game",
    original: "../works/cryptography-game.html",
    category: "Interactive & Game / Team Project",
    cover: "../images/game/office.png",
    meta: ["Educational Game", "Cryptography", "Team project", "Character / interface / visual assets"],
    concept: "A browser-based escape room game that introduces cryptography through puzzle solving. The game combines character dialogue, level design, and visual scenes to make abstract encryption concepts more accessible.",
    outcome: "The project includes multiple rooms, character assets, AI dialogue, and a playable web game.",
    gallery: ["../images/game/Tool Room.png", "../images/game/classroom.png", "../images/game/operation.png", "../images/game/ai.png"]
  },
  "animation": {
    title: "Toilet Launch",
    original: "../works/animation.html",
    category: "Animation / Team Project",
    cover: "../images/animation/1.png",
    meta: ["Animation", "Team project", "Storyboard", "Character / scene design"],
    concept: "A humorous animation project that turns an everyday public restroom into the starting point of an absurd event. The work uses exaggerated motion and character acting to create comedic tension.",
    outcome: "The page documents the concept, story, character design, scene development, and team roles.",
    gallery: ["../images/animation/角色.png", "../images/animation/場景 大遠景廁所（土撥鼠那張）_V03.png", "../images/animation/5.png"]
  },
  "mixed-media": {
    title: "Struggle",
    original: "../works/mixed-media.html",
    category: "Mixed Media & Sculpture",
    cover: "../images/archive/1.jpg",
    meta: ["Mixed Media", "Sculpture", "Experiment", "Material study"],
    concept: "A mixed-media work about pressure, restriction, and emotional fracture. The material language suggests a body or feeling caught between collapse and escape.",
    outcome: "The work is documented through object photography and detail images.",
    gallery: ["../images/archive/2.jpg", "../images/archive/4.jpg", "../images/archive/3.jpg", "../images/archive/5.jpg"]
  },
  "milkshake": {
    title: "Milkshake Hero",
    original: "../works/milkshake.html",
    category: "Mixed Media & Sculpture",
    cover: "../images/archive/IMG_0556.jpg",
    meta: ["Mixed Media", "Object work", "Character concept", "Material experiment"],
    concept: "A playful mixed-media piece that builds a character-like presence through material, color, and form. The work sits between object, sculpture, and visual narrative.",
    outcome: "The series records multiple angles and details of the object.",
    gallery: ["../images/archive/IMG_0544.jpg", "../images/archive/IMG_0550.jpg", "../images/archive/IMG_0624.jpg", "../images/archive/IMG_0630.jpg"]
  },
  "photograpy": {
    title: "Traces Left Behind",
    original: "../works/photograpy.html",
    category: "Photography Series",
    cover: "../images/photograpy/image3.jpg",
    meta: ["Photography", "Daily observation", "Composition", "Image series"],
    concept: "A photography series observing objects, marks, and fragments left in everyday spaces. The images focus on quiet evidence of presence, abandonment, and time.",
    outcome: "The series gathers small visual traces into a restrained photographic narrative.",
    gallery: ["../images/photograpy/image3.jpg", "../images/photograpy/image5.jpg", "../images/photograpy/image4.jpg", "../images/photograpy/image2.jpg"]
  },
  "archive": {
    title: "3D & Motion Practice",
    original: "../works/archive.html",
    category: "3D / Motion Practice",
    cover: "../images/3D/Untitled 1383912-Screenshot 1548693.png",
    meta: ["Blender", "Maya", "Spline", "Render / video"],
    concept: "A collection of 3D and motion studies made through coursework and experimentation. The works explore lighting, rhythm, modeling, rendered stills, and online 3D presentation.",
    outcome: "The archive includes Blender animation, Maya still-life practice, and Spline web 3D experiments.",
    gallery: ["../images/3D/bottle.jpg", "../images/3D/glasses.jpg", "../images/3D/Untitled 1383912-Screenshot 1548677.png"]
  },
  "period": {
    title: "Blood Is Not a Sin",
    original: "../works/period.html",
    category: "Visual Design / Poster",
    cover: "../images/visual/period mockup.png",
    meta: ["Poster Design", "Social issue", "Stigma", "Visual message"],
    concept: "A poster project about menstrual stigma. The work uses direct visual language to challenge shame, silence, and the social discomfort surrounding blood and the body.",
    outcome: "The final poster frames menstruation as a normal body experience rather than a taboo.",
    gallery: ["../images/visual/period.png", "../images/visual/period mockup.png"]
  },
  "animationstudy": {
    title: "Animation Study",
    original: "../works/animationstudy.html",
    category: "Animation / Motion Practice",
    cover: "../images/animation/動畫mockup.png",
    meta: ["Animation", "Loop practice", "Motion", "After Effects"],
    concept: "Short animation studies focused on timing, rhythm, and movement. These exercises build familiarity with motion, looping, and animated composition.",
    outcome: "The page gathers several short animated outputs and motion experiments.",
    gallery: ["../images/animation/動畫mockup.png", "../images/animation/動畫mockup01.png", "../images/animation/動畫mockup02.png"]
  },
  "trace": {
    title: "Trace of Being",
    original: "../works/trace.html",
    category: "Interactive Installation",
    cover: "../images/video/video02.mp4",
    meta: ["Interactive installation", "Video", "Presence", "Team project"],
    concept: "An interactive installation about presence and traces. The work uses moving image and spatial interaction to let participants sense how action can leave marks in an environment.",
    outcome: "The project was developed as a team installation with shared concept, visual, and technical roles.",
    gallery: []
  },
  "omgvideo": {
    title: "Erchong Floodway",
    original: "../works/omgvideo.html",
    category: "Video Study",
    cover: "../images/video/video01.mp4",
    meta: ["Video", "Landscape documentation", "Observation", "Editing"],
    concept: "A video study documenting the Erchong Floodway through landscape, atmosphere, and movement. The work treats the site as a layered public space shaped by water, infrastructure, and daily life.",
    outcome: "The video focuses on place-based observation and image rhythm.",
    gallery: []
  },
  "projection": {
    title: "Lahu Totem Projection",
    original: "../works/projection.html",
    category: "Projection Mapping",
    cover: "../images/lahu/900.png",
    meta: ["Projection mapping", "Totem", "Motion visual", "Object projection"],
    concept: "A projection mapping project inspired by Lahu totemic forms. The work develops visual patterns, movement, and object projection to connect cultural motifs with spatial media.",
    outcome: "The project includes projection object design and visual development studies.",
    gallery: ["../images/lahu/2.png", "../images/lahu/3-1.png", "../images/lahu/4-1.png", "../images/lahu/15-1.png"]
  },
  "finger": {
    title: "One Finger, One Heartbeat",
    original: "../works/finger.html",
    category: "Poster Design",
    cover: "../images/visual/poster01.jpg",
    meta: ["Poster Design", "Visual message", "Graphic study", "Series"],
    concept: "A poster project that uses a simple gesture as the center of visual communication. The composition explores how a minimal action can carry emotional tension and symbolic meaning.",
    outcome: "The series develops the idea through multiple poster variations.",
    gallery: ["../images/visual/poster03.jpg", "../images/visual/poster01.jpg", "../images/visual/poster02.jpg"]
  },
  "poster": {
    title: "Visual Design Studies",
    original: "../works/poster.html",
    category: "Visual Design",
    cover: "../images/visual/LOST.jpg",
    meta: ["Poster Design", "Graphic practice", "Typography", "Composition"],
    concept: "A collection of poster and visual design studies exploring composition, typography, social themes, and image-driven messages.",
    outcome: "The works show a range of visual strategies, from direct social commentary to formal graphic experiments.",
    gallery: ["../images/visual/LOST.jpg", "../images/visual/15,IN.jpg", "../images/visual/child.jpg", "../images/visual/OVERFISHING.jpg"]
  },
  "projectvisual": {
    title: "Visual Identity",
    original: "../works/projectvisual.html",
    category: "Visual System / Identity",
    cover: "../images/visual/yzu mockup.png",
    meta: ["Identity System", "Visual experiment", "Graphic design", "Mockup"],
    concept: "A visual identity and graphic experiment collection that explores systematic visual language, layout, mockups, and image composition.",
    outcome: "The project includes identity applications and Photoshop-based visual experiments.",
    gallery: ["../images/visual/11702133.png", "../images/visual/yzu01.png", "../images/visual/yzu02.png", "../images/visual/ps.png"]
  }
};

function mediaMarkup(src, title) {
  const resolvedSrc = pagePath(src);

  if (/\.(mp4|mov)$/i.test(src)) {
    return `<video src="${resolvedSrc}" controls muted playsinline></video>`;
  }

  return `<img src="${resolvedSrc}" alt="${title}">`;
}

function renderWork() {
  const params = new URLSearchParams(window.location.search);
  const pageId = window.location.pathname.split("/").pop().replace(/\.html$/, "");
  const id = params.get("id") || (works[pageId] ? pageId : "ocean-of-masks");
  const work = works[id];
  const root = document.getElementById("work-root");
  const zhLink = document.getElementById("zh-link");

  if (!work) {
    root.insertAdjacentHTML("beforeend", `
      <section class="project-hero reveal">
        <span>Work not found</span>
        <h1>Missing Project</h1>
        <p>This English project page could not be found.</p>
      </section>
    `);
    return;
  }

  document.title = `${work.title} / YU Portfolio`;
  zhLink.href = pagePath(work.original);

  root.insertAdjacentHTML("beforeend", `
    <section class="project-hero reveal">
      <span>${work.category}</span>
      <h1>${work.title}</h1>
      <p>${work.concept}</p>
    </section>

    <section class="project-cover reveal">
      ${mediaMarkup(work.cover, work.title)}
    </section>

    <section class="project-info reveal">
      ${work.meta.map((item, index) => `
        <div>
          <span>${["Type", "Year / Format", "Recognition", "Role"][index] || "Info"}</span>
          <p>${item}</p>
        </div>
      `).join("")}
    </section>

    <section class="project-detail reveal">
      <div>
        <h2>Concept</h2>
        <p>${work.concept}</p>
      </div>
      <div>
        <h2>Output</h2>
        <p>${work.outcome}</p>
      </div>
    </section>

    ${work.gallery.length ? `
      <section class="project-gallery reveal">
        ${work.gallery.map((src) => mediaMarkup(src, work.title)).join("")}
      </section>
    ` : ""}

    <section class="project-detail reveal">
      <div>
        <h2>Original Page</h2>
        <p>This English page is a translated overview. The original project page keeps the full image sequence and process documentation.</p>
      </div>
      <div>
        <h2>Link</h2>
        <p><a class="button" href="${pagePath(work.original)}">View original Chinese page</a></p>
      </div>
    </section>
  `);
}

renderWork();
