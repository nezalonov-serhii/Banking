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
      <li class="first-bank" data-id = "${bank.id}">
        <p>${bank.name}</p>
          <div>
            <button class = "btn">Edit</button>
            <button class = "btn btn__delete">Delete</button>
          </div>
        </li>
      `
    )
    .join('');

  listOfBanks.insertAdjacentHTML('beforeend', bankArray);
}

renderBankList();

listOfBanks.addEventListener('click', showDescriptionOfBanks);

function showDescriptionOfBanks(e) {
  if (e.target.nodeName !== 'LI') return;

  const bankId = e.target.closest('.first-bank').dataset.id;
  console.log(bankId);

  const selectedBank = banks.find(bank => bank.id === bankId);
  console.log(selectedBank);

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
