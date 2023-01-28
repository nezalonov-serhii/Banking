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
listOfBanks.classList.add('listOfBanks');
descrBank.classList.add('descrBank');
buttonNewBank.classList.add('buttonNewBank');
buttonNewBank.textContent = 'Create a new bank';

rootEl.append(containerBanks, descrBank);
containerBanks.append(listOfBanks, buttonNewBank);

function renderBankList() {
  const bankArray = banks
    .map(
      bank => `
        <li class="first-bank" data-id = "${bank.id}"> 
        <p>${bank.name}</p>
     <div>
               <button>E</button>
        <button>D</button>
             </div>
           </li>
         `
    )
    .join('');

  listOfBanks.insertAdjacentHTML('beforeend', bankArray);
}
renderBankList();

// My task
listOfBanks.addEventListener('click', showDescriptionOfBanks);

function showDescriptionOfBanks(e) {
  if (e.target.nodeName !== 'P') {
    return;
  }

  const identification = e.target.closest('.first-bank').dataset.id;

  nameOfBanks(identification);
  console.log(findParticularId(identification));
}

function findParticularId(identification) {
  return banks.find(bank => bank.id === identification);
}

function nameOfBanks(identification) {
  return banks.map(bank => {
    if (bank.id === identification) {
      console.log(bank.name);
    }
  });
}
