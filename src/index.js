const banks = [
  {
    id: '435tr34wrt',
    name: 'Mono',
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: 'asdfw342rew5',
    name: 'Privat',
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];

const rootEl = document.querySelector('#root');

const containerBanks = document.createElement('div');
const descrBank = document.createElement('div');
const listOfBanks = document.createElement('ul');
const buttonNewBank = document.createElement('button');

containerBanks.classList.add('containerBanks');
descrBank.classList.add('descrBank');
listOfBanks.classList.add('list');
buttonNewBank.classList.add('buttonNewBank');
buttonNewBank.textContent = 'Add new Bank';

rootEl.append(containerBanks, descrBank);
containerBanks.append(listOfBanks, buttonNewBank);

function renderBankList() {
  const bankArray = banks
    .map(
      bank => `
      <li class="bank" data-id = "${bank.id}">
        <p class = "titel">${bank.name}</p>
          <div>
            <button class = "btn btn__edit">Edit</button>
            <button class = "btn btn__delete">Delete</button>
          </div>
        </li>
      `
    )
    .join('');

  listOfBanks.innerHTML = bankArray;

  listOfBanks.addEventListener('click', showDescriptionOfBanks);
}

renderBankList();

function showDescriptionOfBanks(e, active) {
  if (e.target.nodeName !== 'LI' && e.target.textContent !== 'Edit') return;

  const bankId = e.target.closest('.bank').dataset.id;
  // console.log(bankId);
  const selectedBank = banks.find(bank => bank.id === bankId);
  // console.log(selectedBank);

  const descriptionOfBank = `
      <ul class = "list description">
        <li class = "item-descr" ><label>Bank:<input value = "${selectedBank.name}" name = "name" disabled></label></li>
        <li class = "item-descr" ><label>Interest Rate:<input value = "${selectedBank.interestRate}" name = "interestRate" disabled></label></li>
        <li class = "item-descr" ><label>Max Loan:<input value = "${selectedBank.maxLoan}" name = "maxLoan" disabled></label></li>
        <li class = "item-descr" ><label>Min Payment:<input value = "${selectedBank.minPayment}" name = "minPayment" disabled></label></li>
        <li class = "item-descr" ><label>Loan Term:<input value = "${selectedBank.loanTerm}" name = "loanTerm" disabled></label></li>
      </ul>`;

  descrBank.innerHTML = descriptionOfBank;
}

rootEl.addEventListener('click', clikOnChangesBtn);

function clikOnChangesBtn(e) {
  e.preventDefault();

  const allBtnEl = document.querySelectorAll('button');

  if (e.target.textContent === 'Edit') {
    // console.log(e.target.textContent);

    showDescriptionOfBanks(e);
    e.target.textContent = '✓';

    const bankId = e.target.closest('.bank').dataset.id;
    const selectedBank = banks.find(bank => bank.id === bankId);

    disabledAllBtn(e.target);

    descrBank.addEventListener('input', desckrChange);

    function desckrChange(e) {
      const titelEl = document.querySelector(`[data-id = "${bankId}"] .titel`);

      if (e.target.name === 'name') {
        selectedBank.name = e.target.value;
        titelEl.textContent = e.target.value;
      } else if (e.target.name === 'interestRate')
        selectedBank.interestRate = +e.target.value;
      else if (e.target.name === 'maxLoan')
        selectedBank.maxLoan = +e.target.value;
      else if (e.target.name === 'minPayment')
        selectedBank.minPayment = +e.target.value;
      else if (e.target.name === 'loanTerm')
        selectedBank.loanTerm = +e.target.value;
    }

    desckrInputChangeDisabled(false);
  } else if (e.target.textContent === '✓') {
    e.target.textContent = 'Edit';

    [...allBtnEl].map(e => (e.disabled = false));

    desckrInputChangeDisabled(true);
  }

  function desckrInputChangeDisabled(status) {
    const itemsDesckr = descrBank.firstElementChild.children;

    [...itemsDesckr].map(
      e =>
        (e.querySelector('input').disabled = e.querySelector('input').disabled =
          status)
    );
  }

  if (e.target.textContent === 'Delete') {
    // console.log(e.target.textContent);

    const bankEl = e.target.closest('.bank');
    const bankId = e.target.closest('.bank').dataset.id;
    const indexBank = banks.findIndex(bank => bank.id === bankId);

    bankEl.remove();
    banks.splice(indexBank, 1);
    console.log(banks);

    if (!areThereAnyBanks('bank')) {
      const blank = `<li class = "add-first-bank">
        <p>
          Add your first bank
        </p>
      </li>`;

      listOfBanks.insertAdjacentHTML('beforeend', blank);

      listOfBanks.removeEventListener('click', showDescriptionOfBanks);
    }
  }
}

function disabledAllBtn(el) {
  const allBtnsEl = document.querySelectorAll('button');

  [...allBtnsEl].map(btn => (btn.disabled = true));
  el.disabled = false;
}

function areThereAnyBanks(classChek) {
  const arrOfBanks = [...listOfBanks.children];
  return arrOfBanks.some(arr => arr.classList.contains(classChek));
}

buttonNewBank.addEventListener('click', clikOnNewBank);

function clikOnNewBank(e) {
  e.preventDefault();

  if (areThereAnyBanks('add-first-bank')) {
    listOfBanks.querySelector('.add-first-bank').remove();
  }

  const newBank = `<li class = "bank">
    <form class = "form__new-bank">
      <input class = "add-new-bank" name = "new_bank">
      <button class = "btn btn__agree">&#10003</button>
    </form>
  </li>`;

  listOfBanks.insertAdjacentHTML('beforeend', newBank);

  disabledAllBtn(document.querySelector('.btn__agree'));

  document.querySelector('input[name = "new_bank"]').focus();

  const formNewBank = document.querySelector('.form__new-bank');
  formNewBank.addEventListener('click', agreeNewBank);

  function agreeNewBank(e) {
    if (e.target.nodeName !== 'BUTTON') return;

    banks.push({
      id: `${Date.now()}`,
      name: formNewBank.firstElementChild.value,
      interestRate: '',
      maxLoan: '',
      minPayment: '',
      loanTerm: '',
    });

    buttonNewBank.disabled = false;
    renderBankList();

    console.log(banks);
  }
}
