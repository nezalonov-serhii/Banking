import renderModal from './components/modal';
// import changeValueOfBank from "./components/changeDataBanks"
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
const modalWindow = document.querySelector('#modal');

const containerBanks = document.createElement('div');
const descrBank = document.createElement('div');
const listOfBanks = document.createElement('ul');

const buttonNewBank = document.createElement('button');

containerBanks.classList.add('containerBanks');
listOfBanks.classList.add('listOfBanks');
descrBank.classList.add('descrBank');
buttonNewBank.classList.add('buttonNewBank');
buttonNewBank.textContent = 'Create a new bank';

rootEl.append(containerBanks, descrBank);
containerBanks.append(listOfBanks, buttonNewBank);

renderBankList();

buttonNewBank.addEventListener('click', () => {
  const markup = `<div class="backdrop" data-modal>
    <div class="modal">
      <form action="" class="form form--create">
        <input type="text" name="name" placeholder="NAME" />
        <input
          type="number"
          name="interestRate"
          placeholder="interestRate"
        />
        <input type="number" name="maxLoan" placeholder="maxLoan" />
        <input type="number" name="minPayment" placeholder="minPayment" />
        <input type="number" name="loanTerm" placeholder="loanTerm" />
        <button type="submit" class="btn__create-bank">Create new bank</button>
      </form>
      <button class="btn__close" type="button" data-modal-close>X</button>
    </div>
  </div>`;

  modalWindow.innerHTML = markup;

  const backdrop = document.querySelector('.backdrop');
  backdrop.addEventListener('click', e => {
    if (
      e.currentTarget !== e.target &&
      !e.target.classList.contains('btn__close')
    )
      return;
    modalWindow.innerHTML = '';
  });

  const form = document.querySelector('.form');
  form.elements.name.focus();

  form.addEventListener('submit', submitForm);
});

function renderBankList() {
  const bankArray = banks
    .map(
      bank => `
        <li class="first-bank" data-id = "${bank.id}"> 
            ${bank.name}
          <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </div>
        </li>
         `
    )
    .join('');

  listOfBanks.innerHTML = bankArray;

  listOfBanks.addEventListener('click', showDescriptionOfBank);
}

// My task

function showDescriptionOfBank(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  const identification = e.target.closest('.first-bank').dataset.id;
  const preciseBank = findParticularId(identification);

  renderBankInfo(preciseBank);
}

function renderBankInfo({ name, interestRate, maxLoan, minPayment, loanTerm }) {
  const markup = `
  <h2 class="bank-card-title">${name}</h2>
<ul class="bank-data list">
  <li class="bank-data-chunk">
    <p class="inform">Interest Rate: ${interestRate}%</p>
  </li>
  <li class="bank-data-chunk">
    <p class="inform">Max Loan: ${maxLoan}$</p>
  </li>
  <li class="bank-data-chunk">
    <p class="inform">Min Payment: ${minPayment}$</p>
  </li>
  <li class="bank-data-chunk">
    <p class="inform">Loan Term: ${loanTerm} months</p>
  </li>
</ul>
  `;
  descrBank.innerHTML = markup;
}

function findParticularId(identification) {
  return banks.find(bank => bank.id === identification);
}

//!=========================================================================================

function submitForm(e) {
  e.preventDefault();

  const newBankData = {
    id: String(Date.now()),

    name: e.currentTarget.name.value,
    interestRate: e.currentTarget.interestRate.value,
    maxLoan: e.currentTarget.maxLoan.value,
    minPayment: e.currentTarget.minPayment.value,
    loanTerm: e.currentTarget.loanTerm.value,
  };

  banks.push(newBankData);

  modalWindow.innerHTML = '';

  renderBankList();
}

listOfBanks.addEventListener('click', changeable);

function changeable(e) {
  if (e.target.classList.contains('edit')) {
    changeValueOfBank(e);
  } else if (e.target.classList.contains('delete')) {
    deleteBank(e);
  }
}

function deleteBank(e) {
  const identification = e.target.closest('.first-bank').dataset.id;
  const bankIndex = banks.findIndex(bank => bank.id === identification);

  banks.splice(bankIndex, 1);

  renderBankList();
  descrBank.innerHTML = '';

  if (!banks[0]) {
    listOfBanks.innerHTML = `
        <li class="first-bank"> 
            Add a new Bank
        </li>
         `;

    listOfBanks.removeEventListener('click', showDescriptionOfBank);
  }
}

function changeValueOfBank(e) {
  e.preventDefault();

  const identification = e.target.closest('.first-bank').dataset.id;
  const preciseBank = findParticularId(identification);

  const markup = `<div class="backdrop" data-modal>
    <div class="modal">
      <form action="" class="form">
      <label> <span>Name:</span>
        <input type="text" name="name"   value="${preciseBank.name}" />
      </label>
      <label> <span>Interest rate:</span>
        <input
        type="number"
        name="interestRate"
        value="${preciseBank.interestRate}"
        />
      </label> 
      <label> <span>Max loan:</span>
        <input type="number" name="maxLoan" value="${preciseBank.maxLoan}"  />
      </label>
      <label> <span>Min payment:</span>
        <input type="number" name="minPayment" value="${preciseBank.minPayment}"  />
      </label>
      <label> <span>Loan term</span>
        <input type="number" name="loanTerm"  value="${preciseBank.loanTerm}" />
      </label>
        <button type="submit" class="btn__create-bank">Edit bank</button>
      </form>
      <button class="btn__close" type="button" data-modal-close>X</button>
    </div>
  </div>`;

  modalWindow.innerHTML = markup;

  const form = document.querySelector('.form');
  const backdrop = document.querySelector('.backdrop');

  form.elements.name.focus();

  backdrop.addEventListener('click', e => {
    if (
      e.currentTarget !== e.target &&
      !e.target.classList.contains('btn__close')
    )
      return;
    modalWindow.innerHTML = '';
  });

  form.addEventListener('submit', updateBank);

  function updateBank(e) {
    e.preventDefault();

    preciseBank.name = e.currentTarget.name.value;
    preciseBank.interestRate = e.currentTarget.interestRate.value;
    preciseBank.maxLoan = e.currentTarget.maxLoan.value;
    preciseBank.minPayment = e.currentTarget.minPayment.value;
    preciseBank.loanTerm = e.currentTarget.loanTerm.value;

    modalWindow.innerHTML = '';

    renderBankList();
    renderBankInfo(preciseBank);
  }
}
