const fetchText = (text) => {
  const getPinyin = fetch(`http://hvdic.thivien.net/wpy/${ text }`)
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      console.log(data)
    })

  const getSino = fetch(`http://hvdic.thivien.net/whv/${ text }`) 

  // return Promise.all([ getPinyin, getSino ])
  //   .then((res) => {
  //   })
  //   .then((data) => {
  //     const pinyinRes = document.createElement(data[0])
  //     const sinoRes = document.createElement(data[1])

  //     const pinyin = Array.from(
  //         pinyinRes.querySelector('.info')
  //           .getElementsByClassName('hvres-goto-link')
  //       )
  //       .map(span => span.innerHTML)

  //     const strokeImage = pinyinRes
  //       .querySelector('.hvres-animation')
  //       .querySelector('.lazy')
  //       .src


  //   })
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { text } = message

    fetchText(text)

    sendResponse({ message: 'hello world from background' })
})