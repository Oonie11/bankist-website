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
  console.log(entry);
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
  section.classList.add("section--hidden");
});

//! /////////////////////////////////////
//! OLDER METHODS
//! /////////////////////////////////////

//! OLD METHOD FOR STICKY NAVIGATION
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener(`scroll`, () => {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//! OLD WAY OF USING EVENT-LISTENERS
// h1.onmouseenter = (e) => {
//   alert(`onMouseEnter: you entered the heading zone.`);
// };

//! /////////////////////////////////////
//! practice code below
//! /////////////////////////////////////

///////////////////////////////////////
// DOM TRAVERSING
///////////////////////////////////////

// const h1 = document.querySelector(`h1`);

// //GOING downwards: Chid
// console.log(h1.querySelectorAll(`.highlight`));
// console.log(h1.childNodes);
// //give us HTML collection which is a live collection
// console.log(h1.children);
// h1.firstElementChild.style.color = `white`;
// h1.lastElementChild.style.color = `orangered`;

// //GOING upwards: Parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(`.header`).style.background = `var(--gradient-secondary)`;

// h1.closest(`h1`).style.background = `var(--gradient-primary)`;

// //going sideways
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//* event listener mouse enter
// const h1 = document.querySelector(`h1`);
// const alertH1 = (e) => {
//   alert(`you entered the heading zone.`);
//   h1.removeEventListener(`mouseenter`, alertH1);
// };
// h1.addEventListener(`mouseenter`, alertH1);

// //rgb(255,255,255)
// const randomInt = (min, max) => {
//   return Math.round(Math.random() * (max - min) + 1 + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   this.style.backgroundColor = randomColor();
//   //* e.target logs the element we are targeting or is affected.
//   //* e.current target gives us the element the event-handler is attached to.
//   console.log(`link`, e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   //stops propagation
//   // e.stopPropagation(); //! usually not a good idea to stop event propagation in real-world
// });
// document.querySelector(`.nav__links`).addEventListener(`click`, (e) => {
//   e.currentTarget.style.backgroundColor = randomColor();
//   console.log(`container`, e.target, e.currentTarget);
// });
// document.querySelector(`.nav`).addEventListener(`click`, function (e) {
//   e.currentTarget.style.backgroundColor = randomColor();
//   console.log(`nav`, e.target, e.currentTarget);
// });
///////////////////////////////////////
///////////////////////////////////////
// console.log(`document`, document.documentElement);
// console.log(`document`, document.head);
// console.log(`document`, document.body);

// const allSections = document.querySelectorAll(`.section`);
// console.log(allSections);

// document.getElementById(`section--1`);

// const allButtons = document.getElementsByTagName(`button`);
// console.log(`allButtons`, allButtons);

// //CREATING AND INSERTING CLASSES
// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// // message.textContent = `we use cookies for improved functionality and analytics`;
// message.innerHTML =
//   `we use cookies for improved functionality and analytics<button class ='btn btn-close-cookie' >got it!</button>`;

// const header = document.querySelector(`.header`);
// // header.prepend(message);
// //This is a live object and cannot be place in more than one place.
// header.append(message);

// //to put multiple cookie message
// // header.append(message.cloneNode(true));

// //insert the element as a sibling of header and not the child.
// header.before(message);
// header.after(message);

// //DELETE ELEMENTS
// const cookieButton = document.querySelector(`.btn-close-cookie`);
// const deleteCookie = () => {
//   //new way of removing element
//   // message.remove();
//   //old method (DOM TRAVERSING)
//   // message.parentElement.removeChild(message);
// };
// cookieButton.addEventListener(`click`, deleteCookie);

// //STYLES
// message.style.background = `#37383d`;
// message.style.width = `120%`;

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + `px`;

// //setting style using css variable
// document.documentElement.style.setProperty(`--color-primary`, `orangeRed`);

// //ATTRIBUTES
// const logo = document.querySelector(`.nav__logo`);
// console.log(`logo`, logo);
// console.log(logo.alt);
// console.log(logo.className);

// //non standard wont work since it is not a standard property
// // console.log(logo.designer);

// //getting non standard property
// console.log(logo.getAttribute(`designer`));

// // setting the attributes
// logo.alt = `Beautiful minimalist logo`;
// logo.setAttribute(`company`, `Bankist`);

// //this will log absolute  path
// console.log(logo.src);

// //this will get relative path
// console.log(logo.getAttribute(`src`));

// const link = document.querySelector(`.nav__link--btn`);
// //this will print the absolute path
// console.log(link.href);

// //this will give relative path that is in html document.
// console.log(link.getAttribute(`href`));

// //DATA-ATTRIBUTE (needs to start with word data in html)
// console.log(logo.dataset.versionNumber);

// //CLASSES
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// //don't use this (it will overwrite the existing classes)
// logo.className = `jonas`
