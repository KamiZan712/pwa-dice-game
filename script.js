const results = [
    "和食",
    "洋食",
    "中華",
    "イタリアン",
    "フレンチ",
    "好きなもの"
];

function rollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.dice').textContent = `🎲${roll}`;
    document.getElementById('result').textContent = results[roll - 1];
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        const { source, cacheName } = event.data;

        const statusElem = document.getElementById('cacheStatus');
        if (source === 'network') {
            statusElem.textContent = `ネットワークから取得${cacheName}`;
        } else if (source === 'cache') {
            statusElem.textContent = `キャッシュから取得${cacheName}`;
        }
    });
}

const choices = [];

function addChoice() {
    const input = document.getElementById('choiceInput');
    const val = input.value.trim();
    if (!val) {
        alert('選択肢を入力してください');
        return;
    }
    choices.push(val);
    input.value = '';
    renderChoices();
}

function renderChoices() {
    const ul = document.getElementById('choiceList');
    ul.innerHTML = '';
    choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.textContent = choice + ' ';
        const btn = document.createElement('button');
        btn.textContent = '削除';
        btn.onclick = () => {
            choices.splice(index, 1);
            renderChoices();
        };
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function pickRandom() {
    if (choices.length === 0) {
        alert('まず選択肢を追加してください');
        return;
    }
    const randomIndex = Math.floor(Math.random() * choices.length);
    const selected = choices[randomIndex];
    document.getElementById('randomResult').textContent = `選ばれたのは: ${selected}`;
}
