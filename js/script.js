/* Global Variables */
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const errorSpan = document.querySelector("#error-span");
const myLeads = [];

/* Functions */
function saveLead() {
  if (!myLeads.includes(inputEl.value.toLowerCase()) && inputEl.value) {
    errorSpan.textContent = "";
    myLeads.push(inputEl.value);
  }else if (!inputEl.value) {
    errorSpan.textContent = "Empty Input";
  } else {
    errorSpan.textContent = `Item already added`;
  }
}

function renderLeadsHTML() {
  let listHTML = "";
  myLeads.forEach((lead) => {
    listHTML += `<li class='list-item'>${lead}</li>`;
  });
  return listHTML;
}

function renderList() {
  saveLead();
  const listHTML = renderLeadsHTML();
  ulEl.innerHTML = listHTML;
  inputEl.value = ''
}

/* Event Listeners */
inputBtn.addEventListener("click", renderList);
