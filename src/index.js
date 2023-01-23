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
        <p>${bank.name}</p>
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

function showDescriptionOfBanks(e) {
  if (e.target.nodeName !== 'LI') return;

  const bankId = e.target.closest('.bank').dataset.id;
  // console.log(bankId);

  const selectedBank = banks.find(bank => bank.id === bankId);
  // console.log(selectedBank);

  const descriptionOfBank = `
      <ul class = "list description">
        <li class = "item-descr" >Bank: ${selectedBank.name}</li>
        <li class = "item-descr" >Interest Rate: ${selectedBank.interestRate}</li>
        <li class = "item-descr" >Max Loan: ${selectedBank.maxLoan}</li>
        <li class = "item-descr" >Min Payment: ${selectedBank.minPayment}</li>
        <li class = "item-descr" >Loan Term: ${selectedBank.loanTerm}</li>
      </ul>`;

  descrBank.innerHTML = descriptionOfBank;
}

rootEl.addEventListener('click', clikOnChangesBtn);

function clikOnChangesBtn(e) {
  e.preventDefault();

  if (e.target.textContent === 'Edit') {
    // console.log(e.target.textContent);
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

  document.querySelector('input[name = "new_bank"]').focus();

  buttonNewBank.disabled = true;

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
