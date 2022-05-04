interface ISliders {
  slides: string
  direction?: string
  previous?: string
  next?: string
}

export const sliders = (args: ISliders) => {
  const { slides, direction, previous, next } = args

  let slideIndex = 1,
      paused:null|number = null
  const items = document.querySelectorAll<HTMLElement>(slides)

  function showSlides(n: number) {
    if (n > items.length) {
      slideIndex = 1
    }

    if (n < 1) {
      slideIndex = items.length
    }

    items.forEach((item) => {
      item.classList.add('animated')
      item.style.display = 'none'
    })

    items[slideIndex - 1].style.display = 'block'
  }

  showSlides(slideIndex)

  function plusSlides(n: number) {
    showSlides((slideIndex += n))
  }

  try {
    const previousBtn = document.querySelector(previous),
      nextBtn = document.querySelector(next)

    previousBtn.addEventListener('click', () => {
      plusSlides(-1)
      items[slideIndex - 1].classList.remove('slideInLeft')
      items[slideIndex - 1].classList.add('slideInRight')
    })

    nextBtn.addEventListener('click', () => {
      plusSlides(1)
      items[slideIndex - 1].classList.remove('slideInRight')
      items[slideIndex - 1].classList.add('slideInLeft')
    })
  } catch (e) {}

  const activateAnimation = () => {
    if (direction === 'vertical') {
      paused = setInterval(() => {
        plusSlides(1)
        items[slideIndex - 1].classList.add('slideInDown')
      }, 3000)
    } else {
      paused = setInterval(() => {
        plusSlides(1)
        items[slideIndex - 1].classList.remove('slideInRight')
        items[slideIndex - 1].classList.add('slideInLeft')
      }, 3000)
    }
  }

  activateAnimation()

  items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused)
  })
  items[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation()
  })
}
