// chrome.tabs.query({
//     active: true, 
//     windowId: chrome.windows.WINDOW_ID_CLIENT
// }, (tab) => {

// })

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)

    sendResponse({ message: 'hello world from background' })

    // chrome.tabs.query({ 
    //     active: true,
    //     currentWindow: true,
    // }, (tabs) => {
    //     const tab = tabs[0]
    //     chrome.tabs.sendMessage(tab.id, { message: 'hello world from background' }, (res) => {
    //         console.log('background')
    //         console.log(res)
    //     })
    // })
})