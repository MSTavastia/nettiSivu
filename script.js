'use strict';
// Navilinkit pysyvät koko ajan näkyvissä nykyisessä ikkunassa
const naviLinkit = document.querySelector('.nav');
// Modal on pop- up ikkuna joka tulee nykyisen ikkunan päälle
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
// Sulkee ja avaa pop up ikkunan
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Vieritä nappi, menee tiettyyn kohtaan
const nappiVieritä = document.querySelector('.btn--scroll-to');
// verrkkosivujen osat. Nämä tulevat järjestäen  headerin jälkeen
const sektio1 = document.querySelector('#section--1');
const sektio2 = document.querySelector('#section--2');
const sektio3 = document.querySelector('#section--3');
// Välilehti osio joihin kuuluu sektio2 pikkuvälilehdet ja tekstit
const valilehdet = document.querySelectorAll('.operations__tab');
const valilehtiSailo = document.querySelector('.operations__tab-container');
const valilehtiSisalto = document.querySelectorAll('.operations__content');
// Pop-up ikkunan funktio avaamiseen. Tämä on määritetty alussa piiloon
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Pop-up ikkunan funktio sulkemiseen
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
valilehtiSailo.addEventListener('click', function (e) {
  const klikki = e.target.closest('.operations__tab');
  if (!klikki) return;
  valilehdet.forEach(lehti =>
    lehti.classList.remove('operations__tab--active')
  );
  valilehtiSisalto.forEach(sisalto =>
    sisalto.classList.remove('operations__content--active')
  );
  klikki.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${klikki.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Vieritä nappi. Tämä mahdollistaa ikkunan vierityksen tiettyyn kohtaan
nappiVieritä.addEventListener('click', function (e) {
  // Ottaa koordinaatit. X = vasemmalta, Y = ylhäältä, width = leveys
  const koordinaatitS1 = sektio1.getBoundingClientRect();
  // Vierittää ikkunan kyseiseen kohtaan: sektio1. Smooth = hidannukset alussa ja lopussa
  sektio1.scrollIntoView({
    behavior: 'smooth',
  });
  console.log(koordinaatitS1);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

valilehtiSailo.addEventListener('click', function (e) {
  const klikki = e.target.closest('.operations__tab');
  if (!klikki) return;
  valilehdet.forEach(lehti =>
    lehti.classList.remove('operations__tab--active')
  );
  valilehtiSisalto.forEach(sisalto =>
    sisalto.classList.remove('operations__content--active')
  );
  klikki.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${klikki.dataset.tab}`)
    .classList.add('operations__content--active');
});

const tarkennus = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkki = e.target;
    const viereisetLinkit = linkki
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = linkki.closest('.nav').querySelector('img');
    viereisetLinkit.forEach(el => {
      if (el !== linkki) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
naviLinkit.addEventListener('mouseover', tarkennus.bind(0.5));
naviLinkit.addEventListener('mouseout', tarkennus.bind(1));

const headeri = document.querySelector('.header');
const naviKorkeus = naviLinkit.getBoundingClientRect().height;
const stickyNavi = function (entries) {
  const [paasy] = entries;

  if (!paasy.isIntersecting) naviLinkit.classList.add('sticky');
  else naviLinkit.classList.remove('sticky');
};
const headeriObs = new IntersectionObserver(stickyNavi, {
  root: null,
  threshold: 0,
  rootMargin: `-${naviKorkeus}px`,
});
headeriObs.observe(headeri);

const sektioAll = document.querySelectorAll('.section');

const paljastaSektio = function (entries, observer) {
  const [paasy] = entries;

  if (!paasy.isIntersecting) return;

  paasy.target.classList.remove('section--hidden');
  observer.unobserve(paasy.target);
};

const sektioObs = new IntersectionObserver(paljastaSektio, {
  root: null,
  threshold: 0.15,
});
sektioAll.forEach(function (sektio) {
  sektioObs.observe(sektio);
  //  sektio.classList.add('sektion--hidden');
});

const imgValitsin = document.querySelectorAll('img[data-src]');

const imgLataa = function (entries, observer) {
  const [paasy] = entries;

  if (!paasy.isIntersecting) return;
  paasy.target.src = paasy.target.dataset.src;
  paasy.target.addEventListener('load', function () {
    paasy.target.classList.remove('lazy-img');
  });
  observer.unobserve(paasy.target);
};

const imgObs = new IntersectionObserver(imgLataa, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgValitsin.forEach(img => imgObs.observe(img));

const liuUt = document.querySelectorAll('.slide');
const btnVasen = document.querySelector('.slider__btn--left');
const btnOikea = document.querySelector('.slider__btn--right');
let curLiuku = 0;
const maxLiuku = liuUt.length;

const meneLiukuun = function (liuku) {
  liuUt.forEach(
    (liukuu, i) =>
      (liukuu.style.transform = `translateX(${100 * (i - liuku)}%)`)
  );
};
meneLiukuun(0);

const nextLiuku = function () {
  if (curLiuku === maxLiuku - 1) {
    curLiuku = 0;
  } else {
    curLiuku++;
  }
  meneLiukuun(curLiuku);
};
const prevLiuku = function () {
  if (curLiuku === 0) {
    curLiuku = maxLiuku - 1;
  } else {
    curLiuku--;
  }
  meneLiukuun(curLiuku);
};

btnOikea.addEventListener('click', nextLiuku);
btnVasen.addEventListener('click', prevLiuku);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const liukuja = document.querySelector('.slider');
// liukuja.style.overflow = 'visible';
// const alkuCoord = sektio1.getBoundingClientRect();
// console.log(alkuCoord);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (this.window.scrollY > alkuCoord.top) naviLinkit.classList.add('sticky');
//   else naviLinkit.classList.remove('sticky');
// });

// const huomioExit = function (entries, huomio) {
//   entries.forEach(paasy => {
//     console.log(paasy);
//   });
// };

// const huomioOpt = {
//   root: null,
//   threshold: 0.1,
// };

// const huomio = new IntersectionObserver(huomioExit, huomioOpt);
// huomio.observe(sektio1);

// console.log(koordinaatitS1);
// console.log(e.target.getBoundingClientRect());
// console.log('Nykyinen (X/Y)', window.scrollX, scrollY);
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(id);
//   });
// });
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const headi = document.querySelector('.header');
const kaikkiSektiot = document.querySelectorAll('.section');
console.log(kaikkiSektiot);

document.getElementById('section--1');
const kaikkiNapit = document.getElementsByTagName('button');
console.log(kaikkiNapit);

document.getElementsByClassName('btn');

// .insertAdjacentHTML

const viesti = document.createElement('div');
viesti.classList.add('keksi');
viesti.textContent =
  'Tämä keksi ottaa sulta nyt tietoja... Lisää Tähän myöhemmin...';
viesti.innerHTML =
  'Tämä keksi ottaa sulta nyt tietoja... Lisää Tähän myöhemmin... <button class="btn btn--close-cookie">Okei!</button>';
headi.append(viesti); // prepend. before. ja after!!!

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    viesti.remove();
  });

viesti.style.backgroundColor = '#37383d';
viesti.style.width = '120%';
console.log(getComputedStyle(viesti).color);

viesti.style.height =
  Number.parseFloat(getComputedStyle(viesti).height, 10) + 30 * 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
logo.alt = 'Vaihda nimi';
logo.setAttribute('company', 'Valuutanvaihto');
logo.getAttribute('src');

const linkki = document.querySelector('.twitter-link');
console.log(logo.dataset.versionNumber);

logo.classList.add('l');
logo.classList.remove('l');
logo.classList.toggle('l');
logo.classList.contains('l');
//logo.className = 'marko';

const nappiVieritä = document.querySelector('.btn--scroll-to');
const sektio1 = document.querySelector('#section--1');
const sektio2 = document.querySelector('#section--2');
const sektio3 = document.querySelector('#section--3');

//console.log('Vanha off (X/Y)', window.pageXOffset, pageYOffset);
// koordinaatitS1.left + window.scrollX,
// koordinaatitS1.top + window.scrollY
// window.scrollTo({
//   left: koordinaatitS1.left + window.scrollX,
//   top: koordinaatitS1.top + window.scrollY,
//   behavior: 'smooth',

nappiVieritä.addEventListener('click', function (e) {
  const koordinaatitS1 = sektio1.getBoundingClientRect();
  console.log(koordinaatitS1);
  console.log(e.target.getBoundingClientRect());
  console.log('Nykyinen (X/Y)', window.scrollX, scrollY);
  sektio1.scrollIntoView({
    behavior: 'smooth',
  });
});
const alertH1 = function (e) {
  alert('Hjuva Hjuva');
};
const headi1 = document.querySelector('h1');
headi1.addEventListener('mouseenter', function (e) {
  alert('addEventListener: Tämähän toimii vallan hyvin');
  setTimeout(() => headi1.removeEventListener('mouseenter', alertH1));
});

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)}${randomInt(0, 255)})`;
console.log(randomColor);

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Kontti', e.target, e.currentTarget);
  e.stopPropagation();
});
*/
/*
const headi1 = document.querySelector('h1');
console.log(headi1.querySelectorAll('.highlight'));
console.log(headi1.childNodes);
console.log(headi1.children);
headi1.firstElementChild.style.color = 'white';
headi1.lastElementChild.style.color = 'grey';

console.log(headi1.parentNode);
console.log(headi1.parentElement);
headi1.closest('.header').style.background = 'var(--gradient-secondary)';
headi1.closest('h1').style.background = 'var(--gradient-primary)';
console.log(headi1.previousElementSibling);
console.log(headi1.nextElementSibling);
console.log(headi1.previousSibling);
console.log(headi1.nextSibling);

console.log(headi1.parentElement.children);
[...headi1.parentElement.children].forEach(function (el) {
  if (el !== headi1) el.style.transform = 'scale(0.5)';
});
*/
