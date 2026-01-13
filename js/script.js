/* Global Variables */
const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn")
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

// copilot code 
// Cross-browser helper to get the active tab in the current window.
// Prefers the promise-based `browser.tabs.query` (Firefox), falls back to `chrome.tabs.query`.
async function getActiveTab() {
  if (typeof browser !== 'undefined' && browser.tabs && browser.tabs.query) {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    return tabs && tabs[0]
  }

  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (chrome.runtime && chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }
        resolve(tabs && tabs[0])
      })
    })
  }
  throw new Error('Tabs API is not available in this environment')
}

tabBtn.addEventListener('click', async () => {
  try {
    const tab = await getActiveTab();
    if (!tab) {
      errorSpan.textContent = 'No active tab found';
      return;
    }

    const url = tab.url;
    if (!url) {
      errorSpan.textContent = 'Active tab has no URL';
      return;
    }

    if (!myLeads.includes(url)) {
      myLeads.push(url);
      localStorage.setItem('myLeads', JSON.stringify(myLeads));
      renderList(myLeads);
      errorSpan.textContent = '';
    } else {
      errorSpan.textContent = 'Item already added';
    }
  } catch (err) {
    console.error('Error getting active tab:', err);
    errorSpan.textContent = err.message || 'Could not get active tab';
  }
});