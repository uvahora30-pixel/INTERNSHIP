// About Page JS (Optional Interactivity)

// Example: Simple fade-in for sections on scroll
const sections = document.querySelectorAll('.section');

const revealSection = () => {
  const trigger = window.innerHeight * 0.85;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < trigger){
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
};

// Initial styles
sections.forEach(sec =>{
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(40px)';
  sec.style.transition = '0.8s ease';
});

window.addEventListener('scroll', revealSection);
window.addEventListener('load', revealSection);



