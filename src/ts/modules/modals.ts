interface IBindModal {
  triggerSelector: string
  modalSelector: string
  closeSelector: string
  destroy?: boolean
}

export const modals = () => {
  let btnPressed = false

  function bindModal(args: IBindModal) {
    const {
      triggerSelector,
      modalSelector,
      closeSelector,
      destroy = false
    } = args

    const triggers = document.querySelectorAll(triggerSelector),
          modal: HTMLElement = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll<HTMLElement>('[data-modal]'),
          scroll = calсScroll()

    triggers.forEach((trigger: Element) => {
      trigger.addEventListener('click', (e: Event) => {
        if (e.target) {
          e.preventDefault()
        }

        btnPressed = true

        if (destroy) {
          trigger.remove()
        }

        windows.forEach((window: HTMLElement) => {
          window.style.display = 'none'
        })

        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = `${scroll}px`
      })
    })

    close.addEventListener('click', () => {
      closeModal()
    })

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })

    modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target === modal) {
        closeModal()
      }
    })

    const closeModal = () => {
      windows.forEach((window: HTMLElement) => {
        window.style.display = 'none'
      })

      modal.style.display = 'none'
      document.body.style.overflow = ''
      document.body.style.marginRight = `0px`
    }
  }

  function showModalByTime(selector: string, time: number) {
    setTimeout(() => {
      let display: string | null = null

      document.querySelectorAll('[data-modal]').forEach((item: Element) => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block'
        }
      })
      if (!display) {
        document.querySelector<HTMLElement>(selector).style.display = 'block'
        document.body.style.overflow = 'hidden'
        const scroll = calсScroll()
        document.body.style.marginRight = `${scroll}px`
      }
    }, time)
  }

  function calсScroll() {
    const div = document.createElement('div')

    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'

    document.body.append(div)

    const scrollWidth = div.offsetWidth - div.clientWidth

    div.remove()

    return scrollWidth
  }

  function openByScroll(selector: string) {
    window.addEventListener('scroll', () => {
      if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
        document.querySelector<HTMLElement>(selector).click()
      }
    })
  }

  bindModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close'
  }),
  bindModal({
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close'
  }),
  bindModal({
    triggerSelector: '.fixed-gift',
    modalSelector: '.popup-gift',
    closeSelector: '.popup-gift .popup-close',
    destroy: true
  })

  openByScroll('.fixed-gift')

  // showModalByTime('.popup-consultation', 6000)
}
