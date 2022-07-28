export const burger = (menuSelector: string, burgerSelector: string) => {
  const menuElement = document.querySelector<HTMLElement>(menuSelector),
        burgerElement = document.querySelector(burgerSelector)

  menuElement.style.display = 'none'

  burgerElement.addEventListener('click', () => {
    menuElement.style.display = menuElement.style.display == 'none' && window.screen.availWidth < 993 ? 'block' : 'none'
  })

  window.addEventListener('resize', () => { 
    if (window.screen.availWidth > 992) {
      menuElement.style.display = 'none'
    }
  })
}