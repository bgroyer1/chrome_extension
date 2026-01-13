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
    inputEl.value = "";
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    renderList();
  } else {
    errorSpan.textContent = `Item already added`;
  }
}

function renderList() {
  let listHTML = "";
  myLeads.forEach((lead) => {
    listHTML += `<li class='list-item'><a target='_blank' href='${lead}'>${lead}</a></li>`;
  });
  ulEl.innerHTML = listHTML;
}

/* Event Listeners */
inputBtn.addEventListener("click", () => {
  saveLead();
});
