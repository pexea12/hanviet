// document.getElementById('paste').onclick = () => {
//     alert('Hello World')
// }

function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    console.log(tab)
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text'); 
      text.innerHTML = response.data;
    });
  });
}

window.onload = () => {
  document.getElementById('paste').addEventListener('click', pasteSelection)
}


