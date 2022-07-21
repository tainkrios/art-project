export const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]')


  let events = ['dragenter', 'dragleave', 'dragover', 'drop']
  events.forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false)
    });
  });

  function preventDefaults(e: Event) {
    e.preventDefault()
    e.stopPropagation()
  }

  function highlight(item: Element) {
    item.closest('.file_upload').style.border = '5px solid yellow'
    item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  }

  function unhighlight(item) {
    item.closest('.file_upload').style.border = 'none'
    if (item.closest('.calc-form')) {      
      item.closest('.file_upload').style.backgroundColor = '#fff'
    } else {
      item.closest('.file_upload').style.backgroundColor = '#ededed'
    }
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => highlight(input), false)
    })
  });

  ['dragleave', 'drop'].forEach(eventName => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => unhighlight(input), false)
    })
  });

  fileInputs.forEach(input => {
    input.addEventListener('drop', (e: Event) => {
      input.files = e.dataTransfer.files
      const file = input.files[0]
      const fileName = file.name.split('.')[0]
      const fileType = file.name.split('.')[1]      
      const dots = fileName.length > 6 ? '...' : '.'
      const name = `${fileName.substring(0, 6)}${dots}${fileType}`
      input.previousElementSibling.textContent = name
    })
  })
}
