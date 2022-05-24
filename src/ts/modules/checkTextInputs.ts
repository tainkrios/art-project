export const checkTextInputs = (selector: string) => {
  const txtInputs = document.querySelectorAll(selector)

  txtInputs.forEach(input => {
    input.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key.match(/[^а-яё 0-9]/ig)) {
        e.preventDefault()
      }
    })
  })
}