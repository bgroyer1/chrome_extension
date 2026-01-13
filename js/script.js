/* Global Variables */
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const errorSpan = document.querySelector("#error-span");
const deleteAllBtn = document.querySelector('#delete-btn')
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  renderList(myLeads)
} 


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
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderList(myLeads);
  } else {
    errorSpan.textContent = `Item already added`;
  }
  inputEl.value = ""; 
}

function renderList(leadsArr) {
  let listHTML = "";
  for (let lead of leadsArr) {
    listHTML += `<li class='list-item'><a target='_blank' href='${lead}'>${lead}</a></li>`;
  };
  ulEl.innerHTML = listHTML;
}

/* Event Listeners */
inputBtn.addEventListener("click", () => {
  saveLead();
});



deleteAllBtn.addEventListener("click", () => {
let userConfirmed = confirm('Delete all links?')
if (userConfirmed) {
  myLeads = []
  localStorage.clear();
  renderList(myLeads)
} else {
  return;
}
})
