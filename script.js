'use strict';

///////////////////////////////////////
// Modal window

const $modal = document.querySelector('.modal');
const $overlay = document.querySelector('.overlay');
const $btnCloseModal = document.querySelector('.btn--close-modal');
const $btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const $section1 = document.querySelector('#section--1');
const $header = document.querySelector('.header');
const $tabs = document.querySelectorAll('.operations__tab');
const $tabsContainer = document.querySelector('.operations__tab-container');
const $tabsContent = document.querySelectorAll('.operations__content');
const $nav = document.querySelector('.nav');
const $allSections = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();

  $modal.classList.remove('hidden');
  $overlay.classList.remove('hidden');
};

const closeModal = function () {
  $modal.classList.add('hidden');
  $overlay.classList.add('hidden');
};

$btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

$btnCloseModal.addEventListener('click', closeModal);
$overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !$modal.classList.contains('hidden')) {
    closeModal();
  }
});

// btnScrollTo.addEventListener('click', () => {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id !== '#')
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

$tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  $tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  $tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

$nav.addEventListener('mouseover', handleHover.bind(0.5));
$nav.addEventListener('mouseout', handleHover.bind(1));

// const initialCords = $section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCords.top) $nav.classList.add('sticky');
//   else $nav.classList.remove('sticky');
// });

const navHeight = $nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) $nav.classList.add('sticky');
  else $nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe($header);

const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

$allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
