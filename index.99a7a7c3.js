const n=[{id:"435tr34wrt",name:"Mono",interestRate:5,maxLoan:5e5,minPayment:1e3,loanTerm:12},{id:"asdfw342rew5",name:"Privat",interestRate:7,maxLoan:1e6,minPayment:5e3,loanTerm:50}],t=document.querySelector("#root"),e=document.createElement("div"),a=document.createElement("div"),o=document.createElement("ul"),d=document.createElement("button");e.classList.add("containerBanks"),a.classList.add("descrBank"),d.classList.add("buttonNewBank"),d.textContent="Add new Bank",t.append(e,a),e.append(o,d),function(){const t=n.map((n=>`\n        <li class="first-bank" data-id = "${n.id}"> \n        <p>${n.name}</p>\n     <div>\n               <button>E</first-bankbutton>\n        <button>D</button>\n             </div>\n           </li>\n         `)).join("");o.insertAdjacentHTML("beforeend",t)}(),o.addEventListener("click",(function(t){if("P"!==t.target.nodeName)return;const e=t.target.closest(".first-bank").dataset.id;(function(t){n.map((n=>{n.id===t&&console.log(n.name)}))})(e),console.log(function(t){return n.find((n=>n.id===t))}(e))}));
//# sourceMappingURL=index.99a7a7c3.js.map
