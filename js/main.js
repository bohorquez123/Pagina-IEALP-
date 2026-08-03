// main.js — controla los menús desplegables
document.querySelectorAll('.dropdown > button').forEach((boton) => {
  boton.addEventListener('click', () => {
    const menu = boton.nextElementSibling
    menu.classList.toggle('activo')
  })
})
 
// Menú hamburguesa en móvil
const toggle = document.querySelector('.menu-toggle')
const navbar = document.querySelector('.navbar')
toggle.addEventListener('click', () => {
  navbar.classList.toggle('navbar-abierta')
})
