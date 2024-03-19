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
  // Estää ikkunan siirtymisen
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Pop-up ikkunan funktio piilottamiseen
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// Pop-up ikkunan avaus
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// Pop-up ikkunan sulku
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
// Valitsee koko navilinkit alueen '.nav__links'
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // Estää ikkunan siirtymisen
  e.preventDefault();
  // Valitsee yksittäisen navilinkin 'nav__link'
  if (e.target.classList.contains('nav__link')) {
    // Hakee href index.html tiedostosta
    const id = e.target.getAttribute('href');
    // Vierittää ikkunan kyseisen osion kohdalle haettuaan href. Smooth = hidannukset alussa ja lopussa
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
// Tarkkailee onko hiiri kohteen päällä vai ulkona
naviLinkit.addEventListener('mouseover', tarkennus.bind(0.5));
naviLinkit.addEventListener('mouseout', tarkennus.bind(1));
// Valitsee headerin
const headeri = document.querySelector('.header');
// Ottaa ikkunan koordinaatit
const naviKorkeus = naviLinkit.getBoundingClientRect().height;
// Funktio navilinkin kiinnittämiseen ylös
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
