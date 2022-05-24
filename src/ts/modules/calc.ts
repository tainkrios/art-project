interface ICalc {
  size: string
  material: string
  options: string
  promo: string
  result: string
}

export const calc = (args: ICalc) => {
  const { size, material, options, promo, result } = args

  const sizeBlock = document.querySelector<HTMLInputElement>(size),
        materialBlock = document.querySelector<HTMLInputElement>(material),
        optionsBlock = document.querySelector<HTMLInputElement>(options),
        promoBlock = document.querySelector<HTMLInputElement>(promo),
        resultBlock = document.querySelector(result)

  let sum = 0

  const calcFunc = () => {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value))

    if (sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
    } else if (promoBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7).toString()
    } else {
      resultBlock.textContent = `${sum}`
    }
  }

  sizeBlock.addEventListener('change', calcFunc)
  materialBlock.addEventListener('change', calcFunc)
  optionsBlock.addEventListener('change', calcFunc)
  promoBlock.addEventListener('input', calcFunc)
}