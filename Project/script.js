

let slides = document.querySelectorAll(".slide");
let dotsContainer = document.querySelector(".dots");
let index = 0;

/* Create dots dynamically */
slides.forEach((_, i) => {
  let dot = document.createElement("div");
  if (i === 0) dot.classList.add("active-dot");
  dot.onclick = () => {
    index = i;
    updateSlider();
  };
  dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dots div");

function updateSlider() {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active-dot"));

  slides[index].classList.add("active");
  dots[index].classList.add("active-dot");
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % slides.length;
  updateSlider();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
};

/* Auto Slide */
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 5000);



;

