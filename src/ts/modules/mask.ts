export const mask = (selector: string) => {

  const setCursorPosition = (position: number, element: HTMLInputElement) => {
    element.focus()

    if (element.setSelectionRange) {
      element.setSelectionRange(position, position)
    }
  }

  function createMask(event: Event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        value = this.value.replace(/\D/g, '')

    if (def.length >= value.length) {
      value = def
    }

    this.value = matrix.replace(/./g, function(a: string) {
      return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : a
    })

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = ''
      }
    } else {
      setCursorPosition(this.value.length, this)
    }
  }

  const inputs = document.querySelectorAll(selector)

  inputs.forEach(input => {
    input.addEventListener('input', createMask)
    input.addEventListener('focus', createMask)
    input.addEventListener('blur', createMask)
  })
}