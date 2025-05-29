        const results = [
            "災厄！HPが1減るよ",
            "何も起きないよ",
            "小さな幸運、金貨+1",
            "回復！HP+1",
            "奇跡の遭遇、特別なセリフが出る",
            "大成功！次回の出目を+1補正"
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

    