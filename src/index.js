// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

// Part 1: Getting Started

const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

// Part 2 & 3: Creating the Menu Bar and Submenu

const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Part 3: Adding Menu Buttons

menuLinks.forEach(function(link) {
  const linkEl = document.createElement('a');
  linkEl.href = link.href;
  linkEl.textContent = link.text;
  topMenuEl.appendChild(linkEl);
});

// Part 4 & 5: Adding Menu and Submenu Interaction

const topMenuLinks = topMenuEl.querySelectorAll('a');

topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }

  const linkIndex = Array.from(topMenuLinks).indexOf(event.target);
  const linkObject = menuLinks[linkIndex];

  event.target.classList.toggle('active');

  topMenuLinks.forEach(function(link) {
    if (link !== event.target) {
      link.classList.remove('active');
    }
  });

  if (event.target.classList.contains('active')) {
    if (linkObject.subLinks) {
      subMenuEl.style.top = '100%';
      buildSubMenu(linkObject.subLinks);
    } else {
      subMenuEl.style.top = '0';
    }
  } else {
    subMenuEl.style.top = '0';
  }
});

subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }

  subMenuEl.style.top = '0';
  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  });

  mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});

function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = '';
  subLinks.forEach(function(link) {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    linkEl.textContent = link.text;
    subMenuEl.appendChild(linkEl);
  });
}
