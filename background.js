const domain = 'http://hvdic.thivien.net'

const letterInfo = {
  letter: null,
  pinyin: null,
  strokeImage: null,
  sinoViet: null,
  meaning: null,
}

const getPinyin = (text) => {
  return fetch(`http://hvdic.thivien.net/wpy/${ text }`)
    .then(res => res.text())
    .then((data) => {
      const dom = document.createElement('html')
      dom.innerHTML = data.replace('<!doctype html>', '')

      letterInfo.pinyin = Array.from(dom.querySelectorAll('.info .hvres-goto-link'))
        .map(span => span.innerText)

      letterInfo.strokeImage = domain + dom.querySelector('.lazy').dataset.original
    })
}

const getSinoViet = (text) => {
  return fetch(`http://hvdic.thivien.net/whv/${ text }`) 
    .then(res => res.text())
    .then((data) => {
      const dom = document.createElement('html')
      dom.innerHTML = data.replace('<!doctype html>', '')

      letterInfo.sinoViet = Array.from(dom.querySelectorAll('.hvres-meaning .hvres-goto-link'))
        .map(span => span.innerText)

      letterInfo.meaning = dom.querySelector('.hvres-meaning.han-clickable').innerText

      dicts = Array.from(dom.querySelectorAll('.hvres-source'))

      dicts.forEach((source) => {
        if (source.innerText === 'Từ điển phổ thông') {
          letterInfo.meaning = source.nextSibling.nextSibling.innerText
        }
      })
    })
}

const fetchText = (text) => {
  return Promise.all([ getPinyin(text), getSinoViet(text) ])
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { text } = message

    fetchText(text)
      .then(() => {
        letterInfo.letter = text 
        sendResponse(letterInfo)
      })

    return true
})