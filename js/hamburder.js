export const navShow = document.getElementById('nav-burger');
export const leftSide = document.querySelector('.left')
export const rightSide = document.querySelector('.right')
export const show = document.querySelector(".show")

function openNav() {
    leftSide.classList.add('active')
}

function closeNav() {
    leftSide.classList.remove('active')
}

export { openNav, closeNav }