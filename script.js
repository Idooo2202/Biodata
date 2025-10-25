// Loading Spinner
window.addEventListener("load", () => {
  let loading = document.getElementById("loading");
  loading.style.display = "none"; // hilangkan loading
  document.body.classList.add("loaded");
});

// Scroll Parallax
let leftSide = document.getElementById("left-side");
let rightSide = document.getElementById("right-side");
let planet = document.getElementById("planet");
let hamburger = document.querySelector(".hamburger-menu");
let nav = document.querySelector("header nav");

// animasi card
const card = document.querySelector(".card");
const glare = document.createElement("div");
glare.classList.add("glare");
card.appendChild(glare);

card.addEventListener("mousemove", (e) => {
  const cardRect = card.getBoundingClientRect();
  const cardX = e.clientX - cardRect.left;
  const cardY = e.clientY - cardRect.top;

  const centerX = cardRect.width / 2.5;
  const centerY = cardRect.height / 2.5;

  const rotateX = ((cardY - centerY) / centerY) * 23;
  const rotateY = ((cardX - centerX) / centerX) * 23;

  card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  // Efek glare
  const percentX = (cardX / cardRect.width) * 100;
  const percentY = (cardY / cardRect.height) * 100;
  card.style.setProperty("--glare-x", `${percentX}%`);
  card.style.setProperty("--glare-y", `${percentY}%`);
  card.style.setProperty("--glare-opacity", 1);
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  card.style.setProperty("--glare-opacity", 0);
});


// Balik normal saat mouse keluar
card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});


window.addEventListener("scroll", () => {
  let value = window.scrollY;
  leftSide.style.left = value * -1 + "px";
  rightSide.style.right = value * -1 + "px";
  planet.style.transform = `translateY(${value * 1}px) rotate(${value * 0.3}deg)`;
});

// Toggle menu saat hamburger diklik
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// efek mengetik di h1
const typingElement = document.getElementById("typing");
const texts = ["M.RIDHO.AA", "FrontEnd-Devv", "Web Designerr"]; // kata-kata yang mau ditampilkan
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 700; // kecepatan ketik (ms)

function typeEffect() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  // atur kecepatan
  let delay = isDeleting ? 50 : 120;

  if (!isDeleting && charIndex === currentText.length) {
    delay = 2300; // jeda sebelum hapus
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // ganti teks berikutnya
    delay = 500;
  }

  setTimeout(typeEffect, delay);
}

// mulai efek
typeEffect();

const carousel = document.getElementById("carousel");
const projects = carousel.children;
const projectCount = projects.length;
const angle = 360 / projectCount;
let currRotation = 0;

// posisi project melingkar
for (let i = 0; i < projectCount; i++) {
  const rotation = angle * i;
  projects[i].style.transform = `rotateY(${rotation}deg) translateZ(400px)`;
}

// =====================
// SCROLL DALAM PROJECT
// =====================
const projectsSection = document.querySelector(".carousel");

projectsSection.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault(); // cegah scroll halaman dalam area ini

    if (e.deltaY > 0) {
      currRotation -= angle;
    } else if (e.deltaY < 0) {
      currRotation += angle;
    }

    carousel.style.transform = `rotateY(${currRotation}deg)`;
  },
  { passive: false }
);

// =====================
// DRAG DENGAN MOUSE
// =====================
let isDragging = false;
let startX = 0;

projectsSection.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let diff = e.clientX - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currRotation += angle; // drag ke kanan
    } else {
      currRotation -= angle; // drag ke kiri
    }
    carousel.style.transform = `rotateY(${currRotation}deg)`;
    startX = e.clientX; // reset posisi awal
  }
});

// =====================
// SWIPE DI HP
// =====================
let touchStartX = 0;

projectsSection.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

projectsSection.addEventListener("touchend", (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  let diff = touchEndX - touchStartX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currRotation += angle; // swipe kanan
    } else {
      currRotation -= angle; // swipe kiri
    }
    carousel.style.transform = `rotateY(${currRotation}deg)`;
  }
});


// background 3d
(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".projects");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();


