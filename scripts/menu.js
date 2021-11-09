const openHumburger = document.querySelector("#hamburger");
const fullScreenMenu = document.querySelector(".fullscreen-menu");
const fullScreenMenuClose = document.querySelector(".fullscreen-menu__close");

openHumburger.addEventListener('click', e => {
    fullScreenMenu.style.display = 'flex';
    e.preventDefault();
})

fullScreenMenuClose.addEventListener('click', e => {
    fullScreenMenu.style.display = 'none';
    e.preventDefault();
})
