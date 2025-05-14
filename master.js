// 🔹 Hero Section Image Slider
const images = [
  "./خطة التنمية المستدامة.png",

  "./sustainable-development-goals-still-life_23-2150196678.avif",
  "./top-view-esg-investment-project-with-business-leaders-meeting-brainstorm-invest-green-project-environmental-protection-with-sustainable-net-zero-renewable-energy-technologyreliance_31965-246527.avif",
];

const heroSection = document.querySelector(".landing");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const bulletsContainer = document.querySelector(".bullets");

let currentIndex = 0;
let autoSlideInterval;
const slideDuration = 5000;

const initBullets = () => {
  bulletsContainer.innerHTML = "";
  images.forEach((_, index) => {
    const bullet = document.createElement("li");
    bullet.addEventListener("click", () => goToSlide(index));
    bulletsContainer.appendChild(bullet);
  });
  updateBullets();
};

const updateBullets = () => {
  bulletsContainer.querySelectorAll("li").forEach((bullet, index) => {
    bullet.classList.toggle("active", index === currentIndex);
  });
};

const updateHeroBackground = () => {
  heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
  updateBullets();
};

const goToSlide = (index) => {
  currentIndex = index;
  updateHeroBackground();
  resetAutoSlide();
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateHeroBackground();
  resetAutoSlide();
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateHeroBackground();
  resetAutoSlide();
};

const resetAutoSlide = () => {
  clearInterval(autoSlideInterval);
  startAutoSlide();
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    if (!document.hidden) {
      nextSlide();
    }
  }, slideDuration);
};

let xDown = null;

const handleTouchStart = (evt) => {
  xDown = evt.touches[0].clientX;
};

const handleTouchMove = (evt) => {
  if (!xDown) return;

  const xUp = evt.touches[0].clientX;
  const xDiff = xDown - xUp;

  if (xDiff > 50) nextSlide();
  else if (xDiff < -50) prevSlide();

  xDown = null;
};

heroSection.addEventListener("touchstart", handleTouchStart, false);
heroSection.addEventListener("touchmove", handleTouchMove, false);

heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
initBullets();
startAutoSlide();

rightArrow.addEventListener("click", nextSlide);
leftArrow.addEventListener("click", prevSlide);
