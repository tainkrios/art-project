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
        markLovers = wrapper.querySelectorAll('.lovers'),
        markChef = wrapper.querySelectorAll('.chef'),
        markGirl = wrapper.querySelectorAll('.girl'),
        markGuy = wrapper.querySelectorAll('.guy'),
        no = document.querySelector<HTMLElement>('.portfolio-no')

  const typeFilter = (markType: NodeListOf<Element>) => {
    markAll.forEach(mark  => {
      mark.style.display = 'none'
      mark.classList.remove('animated', 'fadeIn')
    })

    no.style.display = 'none'
    no.classList.remove('animated', 'fadeIn')

    if (markType) {
      markType.forEach((mark: HTMLElement) => {
        mark.style.display = 'block'
        mark.classList.add('animated', 'fadeIn')
      })
    } else {
      no.style.display = 'block'
      no.classList.add('animated', 'fadeIn')
    }
  }

  const filterElement = (btn: Element, mark?: NodeListOf<Element>) => {
    btn.addEventListener('click', () => typeFilter(mark))
  }

  filterElement(btnAll, markAll)
  filterElement(btnLovers, markLovers)
  filterElement(btnChef, markChef)
  filterElement(btnGirl, markGirl)
  filterElement(btnGuy, markGuy)
  filterElement(btnGrandmother)
  filterElement(btnGranddad)

  menu.addEventListener('click', (e: Event) => {
    let target = e.target as HTMLElement

    if (target && target.tagName == 'LI') {
      items.forEach(btn => btn.classList.remove('active'))
      target.classList.add('active')
    }
  })
}