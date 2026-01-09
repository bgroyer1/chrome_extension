const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const myLeads = [];

function saveLead() {
  if (!myLeads.includes(inputEl.value.toLowerCase()) && inputEl.value) {
    myLeads.push(inputEl.value)
    
  }
  inputEl.value = ''
  console.log(myLeads)
  console.log("button clicked!");
}

inputBtn.addEventListener("click", saveLead);
