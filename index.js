"use strict";

// Menu fade animation
const nav = document.querySelector(".nav");

// Modal Window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// Tabbed Components
const tabs = document.querySelectorAll(".operations--tab");
const tabsContainer = document.querySelector(".operations--tab-container");
const tabsContent = document.querySelectorAll(".operations--content");

//////////////////////////////////////////////
// Modal Window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// BUTTON SCROLLING

btnScrollTo.addEventListener("click", function () {
  section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

// /////////////////////////////////////////////////////////////////
// PAGE NAVIGATION

// document.querySelectorAll(".nav--link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

// 1. Add Event Listener to common parent element

// 2. Determine what element originated the event

document.querySelector(".nav--links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains("nav--link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// Tabbed Components

// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB")));

// Using Event Delegation & closest method
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations--tab");

  // The Guard Clause
  if (!clicked) return;

  // Remove active classes for both tab and the content area.
  tabs.forEach((t) => t.classList.remove("operations--tab--active"));

  tabsContent.forEach((c) => c.classList.remove("operations--content--active"));

  // Activate Tab
  clicked.classList.add("operations--tab--active");

  // Active content area
  document
    .querySelector(`.operations--content--${clicked.dataset.tab}`)
    .classList.add("operations--content--active");
});

// Menu fade animation
// Code refacturing
const handleHover = function (e) {
  if (e.target.classList.contains("nav--link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav--link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler

function myFunction() {
  window.open("transaction.html", "_blank");
}

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imageObserver.observe(img));

// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");

  const btnLeft = document.querySelector(".slider--btn--left");
  const btnRight = document.querySelector(".slider--btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots--dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots--dot")
      .forEach((dot) => dot.classList.remove("dots--dot--active"));

    document
      .querySelector(`.dots--dot[data-slide="${slide}"]`)
      .classList.add("dots--dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Going to the next slide

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  //Current slide = 1: -100%, 0%, 100%, 200%

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots--dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page is fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "message";
// });
