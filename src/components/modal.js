//

export const modal = function renderModal() {
  return `<div class="backdrop" data-modal>
    <div class="modal">
      <form action="">
        <input type="text" name="name" placeholder="NAME" />
        <input
          type="number"
          name="interestRateme"
          placeholder="interestRateme"
        />
        <input type="number" name="maxLoan" placeholder="maxLoan" />
        <input type="number" name="minPayment" placeholder="minPayment" />
        <input type="number" name="loanTerm" placeholder="loanTerm" />
        <button type="submit">Submit</button>
      </form>
      <button type="button" data-modal-close>Close</button>
    </div>
  </div>`;
};
