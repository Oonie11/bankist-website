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

///////////////////////////////////////
///////////////////////////////////////
//CREATING AND INSERTING CLASSES
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "we use cookies for improved functionality and analytics";
message.innerHTML =
  "we use cookies for improved functionality and analytics<button class ='btn btn-close-cookie' >got it!</button>";

const header = document.querySelector(".header");
// header.prepend(message);
//This is a live object and cannot be place in more than one place.
header.append(message);

//to put multiple cookie message
// header.append(message.cloneNode(true));

//insert the element as a sibling of header and not the child.
header.before(message);
header.after(message);

//DELETE ELEMENTS
const cookieButton = document.querySelector(".btn-close-cookie");
const deleteCookie = () => {
  //new way of removing element
  // message.remove();
  //old method (DOM TRAVERSING)
  // message.parentElement.removeChild(message);
};
cookieButton.addEventListener("click", deleteCookie);
