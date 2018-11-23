const createTemplate = () => {
  const template = `
    <div class="pexea12-hv-container">
      <div class="pexea12-hv-loading">
        <div></div>
      </div>
      <div class="pexea12-hv-content">
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
        <div id="pexea12-hv-strokes">
        </div>
      </div>
      <div class="pexea12-hv-cancel">
        <a>Close</a>
      </div>
    </div>
  `

  return template
}


const popup = createTemplate()
document.body.innerHTML += popup

const container = document.querySelector('.pexea12-hv-container')
const button = container.querySelector('.pexea12-hv-cancel')
const loading = container.querySelector('.pexea12-hv-loading')
const content = container.querySelector('.pexea12-hv-content')

const setTemplate = ({ letter, pinyin, sinoViet, meaning }) => {
  container.querySelector('.pexea12-hv-letter').innerText = letter
  container.querySelector('.pexea12-hv-pinyin').innerText = pinyin.join(', ')
  container.querySelector('.pexea12-hv-sinoviet').innerText = sinoViet.join(', ')
  container.querySelector('.pexea12-hv-meaning').innerHTML = meaning.replace(/\n/g, '<br/>')
  container.querySelector('#pexea12-hv-strokes').innerHTML = ''
}


const toggleLoading = (on = true)  => {
  if (on) {
    loading.style.display = 'block'
    content.style.display = 'none'
  } else {
    loading.style.display = 'none'
    content.style.display = 'block'
  }
}

document.addEventListener('mouseup', () => {
  const text = window.getSelection().toString().replace(/[\s\n]+/g, '')

  if (text.length === 1 && text[0] >= '\u3400' && text[0] <= '\u9FBF') {
    container.style.display = 'block'

    toggleLoading(true)
    chrome.runtime.sendMessage({ text }, (res) => {
      toggleLoading(false)
      setTemplate(res)

      const writer = HanziWriter.create('pexea12-hv-strokes', text, {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
        radicalColor: '#168F16',
        delayBetweenLoops: 2500,
      })

      writer.loopCharacterAnimation()
    })
  }
})

button.addEventListener('click', () => {
  container.style.display = 'none'
})
