const domain = 'https://hvdic.thivien.net';

async function getPinyinData(text) {
  const res = await fetch(`https://hvdic.thivien.net/wpy/${text}`);
  const data = await res.text();
  return data;
}

async function getSinoVietData(text) {
  const res = await fetch(`https://hvdic.thivien.net/whv/${text}`);
  const data = await res.text();
  return data;
}

function fetchText(text) {
  return Promise.all([
    getPinyinData(text),
    getSinoVietData(text),
  ]);
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { text } = message;

  fetchText(text).then(([ pinyinData, sinoVietData ]) => {
    sendResponse({
      letter: text,
      pinyinData,
      sinoVietData,
    });
  });

  return true;
});
