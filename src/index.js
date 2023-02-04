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
console.log('🚀 ~ modalWindow', modalWindow);

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

buttonNewBank.addEventListener('click', () => {
  const markup = `<div class="backdrop" data-modal>
    <div class="modal">
      <form action="" class="form">
        <input type="text" name="name" placeholder="NAME" />
        <input
          type="number"
          name="interestRate"
          placeholder="interestRate"
        />
        <input type="number" name="maxLoan" placeholder="maxLoan" />
        <input type="number" name="minPayment" placeholder="minPayment" />
        <input type="number" name="loanTerm" placeholder="loanTerm" />
        <button type="submit">Submit</button>
      </form>
      <button class="btn__close" type="button" data-modal-close>Close</button>
    </div>
  </div>`;

  modalWindow.innerHTML = markup;

  const closeButton = document.querySelector('.btn__close');
  closeButton.addEventListener('click', () => {
    modalWindow.innerHTML = '';
  });

  const form = document.querySelector('.form');

  form.addEventListener('submit', submitForm);
});

function submitForm(e) {
  e.preventDefault();

 

  const newBankData = {
    id: String(Date.now()),

    name: e.currentTarget.elements.name.value,
    interestRate: e.currentTarget.interestRate.value,
    maxLoan: e.currentTarget.maxLoan.value,
    minPayment: e.currentTarget.minPayment.value,
    loanTerm: e.currentTarget.loanTerm.value,
  };

  banks.push(newBankData);

  modalWindow.innerHTML = '';

  renderBankList();
}

function renderBankList() {
  const bankArray = banks
    .map(
      bank => `
        <li class="first-bank" data-id = "${bank.id}"> 
        ${bank.name}
     <div>
               <button class="edit">E</button>
        <button class="delete">D</button>
             </div>
           </li>
         `
    )
    .join('');

  listOfBanks.innerHTML = bankArray;



    listOfBanks.addEventListener('click', changeable)

  function changeable(e) {
    if (e.target.classList.contains("edit")) {
    changeValueOfBank(e)
   
    }
    else if (e.target.classList.contains("delete")){
  deleteBank(e)
  }
}
  


}



function deleteBank(e) {
  const identification = e.target.closest('.first-bank').dataset.id;
  const bankIndex = banks.findIndex(bank => bank.id === identification) 
  


  banks.splice(bankIndex, 1);


  modalWindow.innerHTML = '';

  renderBankList();

  
}

renderBankList();

// My task
listOfBanks.addEventListener('click', showDescriptionOfBank);

function showDescriptionOfBank(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  const identification = e.target.closest('.first-bank').dataset.id;

  console.log(identification);
  console.log(banks);

  const currentBank = findParticularId(identification);
  renderBankInfo(currentBank);
}

function findParticularId(identification) {
  return banks.find(bank => bank.id === identification);
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

function changeValueOfBank(e) {
  e.preventDefault();

  const identification = e.target.closest('.first-bank').dataset.id;

  function findParticularId(identification) {
    return banks.find(bank => bank.id === identification);
  }
  const preciseBank = findParticularId(identification);

  const markup = `<div class="backdrop" data-modal>
    <div class="modal">
      <form action="" class="form">
        <input type="text" name="name" placeholder="NAME"  value="${preciseBank.name}" />
        <input
          type="number"
          name="interestRate"
          placeholder="interestRate "  value="${preciseBank.interestRate}"
        />
        <input type="number" name="maxLoan" placeholder="maxLoan" value="${preciseBank.maxLoan}"  />
        <input type="number" name="minPayment" placeholder="minPayment" value="${preciseBank.minPayment}"  />
        <input type="number" name="loanTerm" placeholder="loanTerm"  value="${preciseBank.loanTerm}" />
        <button type="submit">Submit</button>
      </form>
      <button class="btn__close" type="button" data-modal-close>Close</button>
    </div>
  </div>`;

  modalWindow.innerHTML = markup;
  const form = document.querySelector('.form');

  form.addEventListener('submit', updateBank);
  function updateBank(e) {
    e.preventDefault();
    preciseBank.name = e.currentTarget.name.value;

    preciseBank.interestRate = e.currentTarget.interestRate.value;
    preciseBank.maxLoan = e.currentTarget.maxLoan.value;
    preciseBank.minPayment = e.currentTarget.minPayment.value;
    preciseBank.loanTerm = e.currentTarget.loanTerm.value;
    modalWindow.innerHTML = '';
  }
}
