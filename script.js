`use strict`;

const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.btn--close-modal`);
const btnOpenModal = document.querySelectorAll(`.btn--show-modal`);
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

///////////////////////////////////////
// Modal window
///////////////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

btnOpenModal.forEach((btn) => {
  btn.addEventListener(`click`, openModal);
});

// for (let i = 0; i < btnOpenModal.length; i++)
//   btnOpenModal[i].addEventListener(`click`, openModal);

btnCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
});

//* IMPLEMENTING SMOOTH SCROLLING

// EVENT LISTENER FOR SMOOTH SCROLLING
btnScrollTo.addEventListener(`click`, function (e) {
  // const s1coord = section1.getBoundingClientRect();

  // console.log(s1coord);
  // console.log(e.target.getBoundingClientRect());
  // console.log(`current scroll (x/y)`, window.pageXOffset, pageYOffset);
  // //to get the height and width of the viewport
  // console.log(
  //   `height/width viewport`,
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth

  // //*scrolling
  // window.scrollTo(
  //   s1coord.left + window.pageXOffset,
  //   s1coord.top + window.pageYOffset
  // );

  //Old Method of Scrolling
  // window.scrollTo({
  //   left: s1coord.left + window.pageXOffset,
  //   top: s1coord.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });
  console.log(`scroll was clicked`);
  //New method of scrolling
  section1.scrollIntoView({ behavior: `smooth` });
});

//////////////////////////////////////////////////
//* (PAGE NAVIGATION) event delegation: implementing page navigation
//////////////////////////////////////////////////
//!adding event handler to each property
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
// document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

//*adding event listener using event delegation.

//todo:1 add event listener to common parent element
//todo:2  determine what event created/originated the event

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

//////////////////////////////////////////////////
//* Tabbed Component
//////////////////////////////////////////////////

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);

  //GUARD CLAUSE //! outside button click gives null error. below code prevents that error.
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove(`operations__tab--active`));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //active tab
  clicked.classList.add(`operations__tab--active`);
  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////////////////
//* Menu Fade Animation
//////////////////////////////////////////////////

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest("nav").querySelector(".nav__logo");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//* Passing "ARGUMENTS" into handler
//! not using mouseenter event bcz it doesn't bubble
nav.addEventListener("mouseover", handleHover.bind(0.5));
//to undo mouse enter event
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////
//* Sticky Navigation
//////////////////////////////////////////////////

//! The Intersection Observer API
// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight.height);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  const { isIntersecting } = entry;
  if (!isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////////////////////////////////////
//* REVEAL section on scroll: using Intersection observer API
//////////////////////////////////////////////////
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//////////////////////////////////////////////////
//* Lazy loading images
//////////////////////////////////////////////////
const imageTargets = document.querySelectorAll("img[data-src]");

const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src with src-data
  entry.target.src = entry.target.dataset.src;
  // remove blur filter only after image finish loading
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imageTargets.forEach((image) => {
  imageObserver.observe(image);
});

//////////////////////////////////////////////////
//* Slider
//////////////////////////////////////////////////

//! temporary
// const slider = document.querySelector(".slider");
// slider.style.transform = `scale(0.4) translateX(-800px)`;
// slider.style.overflow = `visible`;
//!

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const maxSlide = slides.length;
let curSlide = 0;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

//function to go to next slide
const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

//function to go to previous slide
const prevSlide = () => {
  // if (curSlide === 0) {
  //   curSlide = maxSlide - 1;
  //   goToSlide(curSlide);
  // } else {
  //   curSlide--;
  //   goToSlide(curSlide);
  // }
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
};

//align slides in row
goToSlide(0);

//next slide
btnRight.addEventListener(`click`, nextSlide);
btnLeft.addEventListener(`click`, prevSlide);

// //previous slide
// btnLeft.addEventListener(`click`, function () {
//   curSlide--;
//   slides.forEach(
//     (slide, i) =>
//       (slide.style.transform = `translateX(${100 * (i + curSlide)}%)`)
//   );
// });
