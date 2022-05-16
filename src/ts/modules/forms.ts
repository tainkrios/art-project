export const forms = () => {
  const forms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll<HTMLInputElement>('[name="upload"]')

  const message = {
    loading: 'Загрузка...',
    sucсess: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  }

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  }

  const postData = async (url: string, data: FormData) => {
    const res = await fetch(url, {
      method: 'POST',
      body: data
    })
    return await res.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => {
      input.value = ''
    })
    upload.forEach(load => {
      load.previousElementSibling.textContent = 'Файл не выбран'
    })
  }

  upload.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0])
      let dots = ''
      const arr = item.files[0].name.split('.')
      arr[0].length > 6 ? dots = '...' : dots = '.'
      const name = arr[0].substring(0, 6) + dots + arr[1]
      item.previousElementSibling.textContent = name
    })
  })

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.classList.add('status')
      statusMessage.style.textAlign = 'center'
      form.parentNode.append(statusMessage)

      form.classList.add('animated', 'fadeOutUp')
      setTimeout(() => {
        form.style.display = 'none'
      }, 450);

      const statusImg = document.createElement('img')
      statusImg.setAttribute('src', message.spinner)
      statusImg.classList.add('animated', 'fadeInUp')
      statusMessage.append(statusImg)

      const textMessage = document.createElement('div')
      textMessage.textContent = message.loading
      statusMessage.append(textMessage)

      const formData = new FormData(form)
      let api = ''
      form.closest('.popup-design') || form.classList.contains('calc-form') ? api = path.designer : api = path.question

      postData(api, formData)
        .then(res => {
          console.log('res :', res)
          statusImg.setAttribute('src', message.ok)
          textMessage.innerHTML = message.sucсess
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail)
          statusMessage.innerHTML = message.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMessage.remove()
            form.style.display = 'block'
            form.classList.remove('fadeOutUp')
            form.classList.add('fadeInUp')
          }, 5000)
        })
    })
  })
}