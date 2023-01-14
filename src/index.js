// В index.html має бути лише один <div id="root"> </div>
// В нього буде рендеритись вся розмітка застосунку.
// Створити в JS 2 <div>. Добавити їх в ДОМ.
// Зробити мінімальну стилізацію.

const rootEl = document.querySelector('#root');

const listsBanks = document.createElement('div');
const descrBank = document.createElement('div');

rootEl.append(listsBanks, descrBank);

listsBanks.classList.add('listsBanks');
descrBank.classList.add('descrBank');
