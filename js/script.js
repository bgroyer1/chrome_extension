/* Global Variables */
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const errorSpan = document.querySelector("#error-span");
const myLeads = [];

/* Functions */
function saveLead() {
  let value = inputEl.value.trim().toLowerCase();

  if (!value) {
    errorSpan.textContent = "Empty input";
    return;
  }

  if (!value.startsWith("http://") && !value.startsWith("https://")) {
    value = `https://` + value;
  }

  if (!myLeads.includes(value)) {
    errorSpan.textContent = "";
    myLeads.push(value);
  } else {
    errorSpan.textContent = `Item already added`;
  }
}

function renderLeadsHTML() {
  let listHTML = "";
  myLeads.forEach((lead) => {
    listHTML += `<li class='list-item'><a target='_blank' href='${lead}'>${lead}</a></li>`;
  });
  return listHTML;
}

function renderList() {
  saveLead();
  const listHTML = renderLeadsHTML();
  ulEl.innerHTML = listHTML;
  inputEl.value = "";
}

/* Event Listeners */
inputBtn.addEventListener("click", renderList);
