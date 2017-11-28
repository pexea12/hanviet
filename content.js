const createTemplate = ({ letter, pinyin, sinoViet, strokeImage, meaning }) => {
  console.log(meaning)
  const template = `
    <div class="pexea12-hv-container">
      <p class="pexea12-hv-letter">
        ${ letter }
      </p>
      <p class="pexea12-hv-pronunciation">
        <span>Pinyin:</span> 
        ${ pinyin.join(', ') }
      </p>
      <p class="pexea12-hv-pronunciation">
        <span>Hán Việt:</span>
        ${ sinoViet.join(', ') }
      </p>
      <p class="pexea12-hv-meaning">
        ${ meaning.replace(/\n/g, '<br/>') }
      </p>
      <p class="pexea12-hv-strokes">
          <img src="${ strokeImage }">
      </p>
    </div>
  `

  return template
}


const textProcess = () => {
  const text = window.getSelection().toString().replace(/[\s\n]+/g, '')

  if (text.length === 1 && text[0] >= '\u3400' && text[0] <= '\u9FBF') {
    chrome.runtime.sendMessage({ text }, (res) => {
      const popup = createTemplate(res)

      document.body.innerHTML += popup
      console.log(document.body.innerHTML)
    })
  }
}

document.addEventListener('mouseup', textProcess)