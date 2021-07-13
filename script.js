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
const $imgTargets = document.querySelectorAll('img[data-src]');

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

const loadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

$imgTargets.forEach(img => imageObserver.observe(img));

const slider = function () {
  const $slides = document.querySelectorAll('.slide');
  const $btnLeft = document.querySelector('.slider__btn--left');
  const $btnRight = document.querySelector('.slider__btn--right');
  const $dotsContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlides = $slides.length;

  const goToSlide = function (slide) {
    $slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const createDots = function () {
    $slides.forEach((_, i) => {
      $dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };

  init();

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  $btnRight.addEventListener('click', nextSlide);

  $btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  $dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

slider();
