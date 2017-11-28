const createTemplate = () => {
  const template = `
    <div class="pexea12-hv-container">
      <p class="pexea12-hv-letter"></p>
      <p class="pexea12-hv-pronunciation">
        <span>Pinyin:</span> 
        <span class="pexea12-hv-pinyin"></span>
      </p>
      <p class="pexea12-hv-pronunciation">
        <span>Hán Việt:</span>
        <span class="pexea12-hv-sinoviet"></span>
      </p>
      <p class="pexea12-hv-meaning"></p>
      <p class="pexea12-hv-strokes">
        <img src="">
      </p>
    </div>
  `

  return template
}


const setTemplate = (container, { letter, pinyin, sinoViet, strokeImage, meaning }) => {
  container.querySelector('.pexea12-hv-letter').innerText = letter 
  container.querySelector('.pexea12-hv-pinyin').innerText = pinyin.join(', ')
  container.querySelector('.pexea12-hv-sinoviet').innerText = sinoViet.join(', ')
  container.querySelector('.pexea12-hv-meaning').innerHTML = meaning.replace(/\n/g, '<br/>')
  container.querySelector('.pexea12-hv-strokes img').src = strokeImage
}


const textProcess = () => {
  const text = window.getSelection().toString().replace(/[\s\n]+/g, '')

  if (text.length === 1 && text[0] >= '\u3400' && text[0] <= '\u9FBF') {
    chrome.runtime.sendMessage({ text }, (res) => {
      let container = document.querySelector('.pexea12-hv-container')

      if (!container) {
        const popup = createTemplate(res)
        document.body.innerHTML += popup
        container = document.querySelector('.pexea12-hv-container')
      }
      
      setTemplate(container, res)

    })
  }
}

document.addEventListener('mouseup', textProcess)