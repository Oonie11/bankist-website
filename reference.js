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
