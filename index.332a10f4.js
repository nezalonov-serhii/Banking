!function(){var n,t=[{id:"435tr34wrt",name:"Mono",interestRate:5,maxLoan:5e5,minPayment:1e3,loanTerm:12},{id:"asdfw342rew5",name:"Privat",interestRate:7,maxLoan:1e6,minPayment:5e3,loanTerm:50}],e=document.querySelector("#root"),a=document.createElement("div"),o=document.createElement("div"),i=document.createElement("ul"),d=document.createElement("button");a.classList.add("containerBanks"),o.classList.add("descrBank"),d.classList.add("buttonNewBank"),d.textContent="Add new Bank",e.append(a,o),a.append(i,d),n=t.map((function(n){return'\n        <li class="first-bank" data-id = "'.concat(n.id,'"> \n        <p>').concat(n.name,"</p>\n     <div>\n               <button>E</first-bankbutton>\n        <button>D</button>\n             </div>\n           </li>\n         ")})).join(""),i.insertAdjacentHTML("beforeend",n),i.addEventListener("click",(function(n){if("P"!==n.target.nodeName)return;var e=n.target.closest(".first-bank").dataset.id;(function(n){t.map((function(t){t.id===n&&console.log(t.name)}))})(e),console.log(function(n){return t.find((function(t){return t.id===n}))}(e))}))}();
//# sourceMappingURL=index.332a10f4.js.map
