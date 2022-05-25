export const filter = () => {
  const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        btnAll = menu.querySelector('.all'),
        btnLovers = menu.querySelector('.lovers'),
        btnChef = menu.querySelector('.chef'),
        btnGirl = menu.querySelector('.girl'),
        btnGuy = menu.querySelector('.guy'),
        btnGrandmother = menu.querySelector('.grandmother'),
        btnGranddad = menu.querySelector('.granddad'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll<HTMLElement>('.all'),
        markLovers = wrapper.querySelectorAll<HTMLElement>('.lovers'),
        markChef = wrapper.querySelectorAll<HTMLElement>('.chef'),
        markGirl = wrapper.querySelectorAll<HTMLElement>('.girl'),
        markGuy = wrapper.querySelectorAll<HTMLElement>('.guy'),
        no = document.querySelector<HTMLElement>('.portfolio-no')

  const typeFilter = (markType?: NodeListOf<Element>) => {
    markAll.forEach(mark => {
      mark.style.display = 'none'
      mark.classList.remove('animated', 'fadeIn')
    })

    no.style.display = 'none'
    no.classList.remove('animated', 'fadeIn')

    if (markType) {
      markType.forEach(mark => {
        mark.style.display = 'block' //тут так и не нашел нужный тип
        mark.classList.add('animated', 'fadeIn')
      })
    } else {
      no.style.display = 'block'
      no.classList.add('animated', 'fadeIn')
    }
  }

  btnAll.addEventListener('click', () => {
    typeFilter(markAll)
  })
  btnLovers.addEventListener('click', () => {
    typeFilter(markLovers)
  })
  btnChef.addEventListener('click', () => {
    typeFilter(markChef)
  })
  btnGirl.addEventListener('click', () => {
    typeFilter(markGirl)
  })
  btnGuy.addEventListener('click', () => {
    typeFilter(markGuy)
  })
  btnGrandmother.addEventListener('click', () => {
    typeFilter()
  })
  btnGranddad.addEventListener('click', () => {
    typeFilter()
  })

  menu.addEventListener('click', (e: Event) => {
    let target = e.target as HTMLElement

    if (target && target.tagName == 'LI') {
      items.forEach(btn => btn.classList.remove('active'))
      target.classList.add('active')
    }
  })
}