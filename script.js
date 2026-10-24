const toast = document.getElementById("toast");
const wishButton = document.getElementById("wishButton");
const wishNote = document.getElementById("wishNote");
const loveButton = document.getElementById("loveButton");

let toastTimer = null;
let candlesOut = false;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
}

function showerHearts() {
  for (let i = 0; i < 36; i++) {
    const heart = document.createElement("span");
    heart.className = "confetti";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = ["♡", "♥", "✧"][i % 3];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 12 + Math.random() * 18 + "px";
    heart.style.color = ["#b36b82", "#e0a0b4", "#ce8b9e", "#a87754"][i % 4];
    heart.style.setProperty("--duration", 3 + Math.random() * 3 + "s");
    heart.style.setProperty("--drift", (Math.random() - .5) * 200 + "px");
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

wishButton.addEventListener("click", () => {
  candlesOut = !candlesOut;
  document.querySelector(".flame").classList.toggle("out", candlesOut);

  if (candlesOut) {
    wishButton.textContent = "light them again ♡";
    wishNote.textContent = "may your sweetest wish come true";
    showerHearts();
    notify("Wish made. Sending a little magic your way ♡");
  } else {
    wishButton.textContent = "make a wish & blow ♡";
    wishNote.textContent = "a little birthday magic";
  }
});

loveButton.addEventListener("click", () => {
  showerHearts();
  notify("In every version of my life, I'd still choose you ♡");
});

document.querySelectorAll(".photo-area img").forEach(image => {
  function showFallback() {
    image.parentElement.classList.add("missing");
  }
  image.addEventListener("error", showFallback);
  if (image.complete && image.naturalWidth === 0) showFallback();
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}
