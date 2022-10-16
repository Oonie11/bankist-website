"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

// for (let i = 0; i < btnOpenModal.length; i++)
//   btnOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//* IMPLEMENTING SMOOTH SCROLLING
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// EVENT LISTENER FOR SMOOTH SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  const s1coord = section1.getBoundingClientRect();

  // console.log(s1coord);
  // console.log(e.target.getBoundingClientRect());
  // console.log("current scroll (x/y)", window.pageXOffset, pageYOffset);
  // //to get the height and with of the viewport
  // console.log(
  //   "height/width viewport",
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
  //   behavior: "smooth",
  // });

  //New method of scrolling
  section1.scrollTo({ behavior: "smooth" });
});

//! /////////////////////////////////////
//!practice code below
//! /////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////
// console.log("document", document.documentElement);
// console.log("document", document.head);
// console.log("document", document.body);

// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// document.getElementById("section--1");

// const allButtons = document.getElementsByTagName("button");
// console.log("allButtons", allButtons);

// //CREATING AND INSERTING CLASSES
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "we use cookies for improved functionality and analytics";
// message.innerHTML =
//   "we use cookies for improved functionality and analytics<button class ='btn btn-close-cookie' >got it!</button>";

// const header = document.querySelector(".header");
// // header.prepend(message);
// //This is a live object and cannot be place in more than one place.
// header.append(message);

// //to put multiple cookie message
// // header.append(message.cloneNode(true));

// //insert the element as a sibling of header and not the child.
// header.before(message);
// header.after(message);

// //DELETE ELEMENTS
// const cookieButton = document.querySelector(".btn-close-cookie");
// const deleteCookie = () => {
//   //new way of removing element
//   // message.remove();
//   //old method (DOM TRAVERSING)
//   // message.parentElement.removeChild(message);
// };
// cookieButton.addEventListener("click", deleteCookie);

// //STYLES
// message.style.background = "#37383d";
// message.style.width = "120%";

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// //setting style using css variable
// document.documentElement.style.setProperty("--color-primary", "orangeRed");

// //ATTRIBUTES
// const logo = document.querySelector(".nav__logo");
// console.log("logo", logo);
// console.log(logo.alt);
// console.log(logo.className);

// //non standard wont work since it is not a standard property
// // console.log(logo.designer);

// //getting non standard property
// console.log(logo.getAttribute("designer"));

// // setting the attributes
// logo.alt = "Beautiful minimalist logo";
// logo.setAttribute("company", "Bankist");

// //this will log absolute  path
// console.log(logo.src);

// //this will get relative path
// console.log(logo.getAttribute("src"));

// const link = document.querySelector(".nav__link--btn");
// //this will print the absolute path
// console.log(link.href);

// //this will give relative path that is in html document.
// console.log(link.getAttribute("href"));

// //DATA-ATTRIBUTE (needs to start with word data in html)
// console.log(logo.dataset.versionNumber);

// //CLASSES
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

// //don't use this (it will overwrite the existing classes)
// logo.className = "jonas"
