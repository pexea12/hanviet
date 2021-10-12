function createTemplate() {
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
  `;

  return template;
}


const popupElement = document.createElement('template');
popupElement.innerHTML = createTemplate();

document.body.appendChild(popupElement.content.childNodes[1]);

const container = document.querySelector('.pexea12-hv-container');
const button = container.querySelector('.pexea12-hv-cancel');
const loading = container.querySelector('.pexea12-hv-loading');
const content = container.querySelector('.pexea12-hv-content');

function setTemplate({ letter, pinyin, sinoViet, meaning }) {
  container.querySelector('.pexea12-hv-letter').innerText = letter;
  container.querySelector('.pexea12-hv-pinyin').innerText = pinyin.join(', ');
  container.querySelector('.pexea12-hv-sinoviet').innerText = sinoViet.join(', ');
  container.querySelector('.pexea12-hv-meaning').innerHTML = meaning.replace(/\n/g, '<br/>');
  container.querySelector('#pexea12-hv-strokes').innerHTML = '';
}


function toggleLoading(on = true) {
  if (on) {
    loading.style.display = 'block';
    content.style.display = 'none';
  } else {
    loading.style.display = 'none';
    content.style.display = 'block';
  }
}

function processPinyinData(pinyinData) {
  const dom = document.createElement('html');
  dom.innerHTML = pinyinData.replace('<!doctype html>', '');

  return {
    pinyin: Array.from(dom.querySelectorAll('.info .hvres-goto-link'))
      .map(span => span.innerText),
  };
}

function processSinoVietData(sinoVietData) {
  const dom = document.createElement('html');
  dom.innerHTML = sinoVietData.replace('<!doctype html>', '');

  const sinoViet = Array.from(dom.querySelectorAll('.hvres-meaning .hvres-goto-link'))
    .map(span => span.innerText);

  const meaning = dom.querySelector('.hvres-meaning.han-clickable').innerText;
  if (meaning) return {
    sinoViet,
    meaning,
  }

  const meaningList = Array.from(dom.querySelectorAll('.hvres-source'))
    .filter(source => source.innerText === 'Từ điển phổ thông')
    .map((source) => source.nextSibling.nextSibling.innerText);

  return {
    sinoViet,
    meaning: meaningList.length > 0 ? meaningList[0] : '',
  };
}

document.addEventListener('mouseup', () => {
  const text = window.getSelection().toString().replace(/[\s\n]+/g, '');

  if (text.length === 1 && text[0] >= '\u3400' && text[0] <= '\u9FBF') {
    container.style.display = 'block';

    toggleLoading(true);
    chrome.runtime.sendMessage({ text }, ({ letter, pinyinData, sinoVietData }) => {
      toggleLoading(false);
      setTemplate({
        letter,
        ...processSinoVietData(sinoVietData),
        ...processPinyinData(pinyinData),
      });

      const writer = HanziWriter.create('pexea12-hv-strokes', text, {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
        radicalColor: '#168F16',
        delayBetweenLoops: 2500,
      });

      writer.loopCharacterAnimation();
    });
  }
});

button.addEventListener('click', () => {
  container.style.display = 'none';
});
