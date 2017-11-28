// chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.method == "getSelection")
//     sendResponse({data: window.getSelection().toString()})
//   else
//     sendResponse({})
// })

const textProcess = () => {
  const text = window.getSelection().toString().replace(/[\s\n]+/g, '')

  if (text.length === 1 && text[0] >= '\u3400' && text[0] <= '\u9FBF') {
    chrome.runtime.sendMessage({ text }, (res) => {
      console.log('content')
      console.log(res)
    })
  }
}

document.addEventListener('mouseup', textProcess)