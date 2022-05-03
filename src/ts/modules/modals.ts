interface IBindModal {
  triggerSelector: string
  modalSelector: string
  closeSelector: string
  closeClickOverlay?: boolean
}

export const modals = () => {
  function bindModal(args: IBindModal) {
    const {
      triggerSelector,
      modalSelector,
      closeSelector,
      closeClickOverlay = true
    } = args
    const triggers = document.querySelectorAll(triggerSelector),
      modal: HTMLElement = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll<HTMLElement>('[data-modal]'),
      scroll = calсScroll()

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e: any) => {
        if (e.target) {
          e.preventDefault()
        }

        windows.forEach((window) => {
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeModal()
      }
    })

    const closeModal = () => {
      windows.forEach((window) => {
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

      document.querySelectorAll('[data-modal]').forEach((item) => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block'
        }
      })
      if (!display) {
        document.querySelector<HTMLElement>(selector).style.display = 'block'
        document.body.style.overflow = 'hidden'
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

  bindModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close'
  }),
    bindModal({
      triggerSelector: '.button-consultation',
      modalSelector: '.popup-consultation',
      closeSelector: '.popup-consultation .popup-close'
    })
  // showModalByTime('.popup-consultation', 6000)
}
