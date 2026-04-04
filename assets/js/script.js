// =====================
// SET YEAR
// =====================
document.getElementById("year").textContent = new Date().getFullYear();

// =====================
// COOKIE CONSENT + ANALYTICS
// =====================
const cookieBanner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookies");
const declineBtn = document.getElementById("declineCookies");

// Load Google Analytics ONLY after consent
function loadAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-P8PP6STM4N";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-P8PP6STM4N");
}

// Check saved choice
const consent = localStorage.getItem("cookieConsent");

if (consent === "accepted") {
  cookieBanner.style.display = "none";
  loadAnalytics();
} else if (consent === "declined") {
  cookieBanner.style.display = "none";
}

// Accept cookies
acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "accepted");
  cookieBanner.style.display = "none";
  loadAnalytics();
});

// Decline cookies
declineBtn.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "declined");
  cookieBanner.style.display = "none";
});

// =====================
// CONTACT MODAL
// =====================
const modal = document.getElementById("contactModal");
const openBtn = document.getElementById("openModal");
const contactBtn = document.getElementById("contactBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => (modal.style.display = "flex");
contactBtn.onclick = () => (modal.style.display = "flex");
closeBtn.onclick = () => (modal.style.display = "none");

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// =====================
// EMAILJS SEND FORM
// =====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_0y4kdau", "template_kjqhe0o", this).then(
    () => {
      alert("Message sent successfully!");
      contactForm.reset();
      modal.style.display = "none";
    },
    (err) => {
      alert("Failed to send message. Please try again later.");
      console.error(err);
    },
  );
});

// =====================
// TERMINAL TYPING ANIMATION
// =====================
const commands = [
  { command: "whoami", output: "Breno Brito" },
  { command: "role", output: "Full Stack Developer" },
  { command: "stack", output: "JavaScript • React • Node • MySQL" },
  { command: "interests", output: "Web Development • Systems • Technology" },
];

const terminalBody = document.querySelector(".terminal-body");

let commandIndex = 0;

function typeNextCommand() {
  if (commandIndex >= commands.length) return;

  const cmdLine = document.createElement("p");
  const promptSpan = document.createElement("span");
  promptSpan.classList.add("prompt");
  promptSpan.textContent = "$ ";

  const commandSpan = document.createElement("span");
  cmdLine.appendChild(promptSpan);
  cmdLine.appendChild(commandSpan);

  terminalBody.appendChild(cmdLine);

  const outputLine = document.createElement("p");
  outputLine.classList.add("terminal-output");
  terminalBody.appendChild(outputLine);

  let commandText = commands[commandIndex].command;
  let outputText = commands[commandIndex].output;
  let charIndex = 0;

  function typeCommandChar() {
    if (charIndex < commandText.length) {
      commandSpan.textContent += commandText.charAt(charIndex);
      charIndex++;
      setTimeout(typeCommandChar, 80);
    } else {
      setTimeout(typeOutputChar, 300);
    }
  }

  let outputCharIndex = 0;
  function typeOutputChar() {
    if (outputCharIndex < outputText.length) {
      outputLine.textContent += outputText.charAt(outputCharIndex);
      outputCharIndex++;
      setTimeout(typeOutputChar, 40);
    } else {
      commandIndex++;
      setTimeout(typeNextCommand, 500);
    }
  }

  typeCommandChar();
}

typeNextCommand();

// =====================
// SCROLL REVEAL
// =====================
const sections = document.querySelectorAll(".section, .project");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;

    if (top < triggerBottom) {
      sec.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =====================
// GRID BACKGROUND
// =====================
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let gridSize = 50;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawGrid() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255, 0, 0, 0.05)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function animateGrid() {
  drawGrid();
  requestAnimationFrame(animateGrid);
}

animateGrid();
