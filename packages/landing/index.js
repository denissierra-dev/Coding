const nav = document.querySelector(".Nav-var");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const navHeight = nav.offsetHeight;
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    nav.classList.add("navbar--hidden");
  } else {
    nav.classList.remove("navbar--hidden");
  }
  
  lastScrollY = currentScrollY;
});

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); 
    
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

const observerOptions = {
  root: null,
  rootMargin: `-${navHeight}px 0px -70% 0px`, 
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      
      const id = entry.target.getAttribute("id");
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-links");

// Abrir y cerrar al hacer clic en la hamburguesa
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");
});

// Cerrar el menú automáticamente al hacer clic en un enlace (importante en móviles)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-menu_visible");
  });
});