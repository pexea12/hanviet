const domain = 'http://hvdic.thivien.net'

const getPinyin = (text) => {
  return fetch(`http://hvdic.thivien.net/wpy/${ text }`)
    .then(res => res.text())
    .then((data) => {
      const dom = document.createElement('html')
      dom.innerHTML = data.replace('<!doctype html>', '')

      const pinyin = Array.from(dom.querySelectorAll('.info .hvres-goto-link'))
        .map(span => span.innerText)

      const strokeImage = dom.querySelector('.hvres-animation .lazy').dataset.original

      console.log(pinyin, strokeImage)
    })
}

const getSino = (text) => {
  return fetch(`http://hvdic.thivien.net/whv/${ text }`) 
    .then(res => res.text())
    .then((data) => {
      const dom = document.createElement('html')
      dom.innerHTML = data.replace('<!doctype html>', '')

      const sino = dom.querySelector('.hvres-meaning .hvres-goto-link').innerText

      const meaning = dom.querySelector('.hvres-meaning.han-clickable').innerText

      console.log(sino, meaning)
    })
}

const fetchText = (text) => {
  return Promise.all([ getPinyin(text), getSino(text) ])
    .then(() => {
      console.log('Done')
    })
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { text } = message

    fetchText(text)

    sendResponse({ message: 'hello world from background' })
})