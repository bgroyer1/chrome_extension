/* Global Variables */
const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const errorSpan = document.querySelector("#error-span");
const deleteAllBtn = document.querySelector("#delete-btn");
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderList(myLeads);
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
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
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
  }
  ulEl.innerHTML = listHTML;
}

/* Event Listeners */
inputBtn.addEventListener("click", () => {
  saveLead();
});

deleteAllBtn.addEventListener("click", () => {
  let userConfirmed = confirm("Delete all links?");
  if (userConfirmed) {
    myLeads = [];
    localStorage.clear();
    renderList(myLeads);
  } else {
    return;
  }
});

// copilot code below this point!
// Cross-browser helper to get the active tab in the current window.
// Prefers the promise-based `browser.tabs.query` (Firefox), falls back to `chrome.tabs.query`.

// async function
async function getActiveTab() {
  // does the global browser exist? does it have tabs? can you query those tabs?
  // if yes, you are in a firefox style environment
  if (typeof browser !== "undefined" && browser.tabs && browser.tabs.query) {
    // browser.tabs.query returns a primse
    // active specifies we are only looking at the active tab
    // current window specifies only the current window
    // result is an array of tabs, even if there's only one
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    // defensive check, make sure tabs exist
    // returns the first , and in this case, only, tab in the array
    return tabs && tabs[0];
  }

  // checks for chrome extension api
  if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
    // chrome api is callback based, not promise based
    // chrome.tabs.query does not return a promise
    // must pass callback instead
    // wrapping it in a promise lets us use async/await
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // result is passed into callback as tabs
        // chrome does NOT throw errors
        // it sets chrome.runtime.last error instead
        // without this check, errors fail silently
        if (chrome.runtime && chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message));
        }
        resolve(tabs && tabs[0]);
      });
    });
  }
  // final fail safe
  throw new Error("Tabs API is not available in this environment");
}

tabBtn.addEventListener("click", async () => {
  try {
    errorSpan.textContent = ''
    const tab = await getActiveTab();
    const url = tab?.url;

    if (!url) {
      errorSpan.textContent = "Active tab has no URL";
      return;
    }

    if (myLeads.includes(url)) {
      errorSpan.textContent = "";
    }
    myLeads.push(url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderList(myLeads);
  } catch (err) {
    console.error("Error getting active tab:", err);
    errorSpan.textContent = err?.message ?? "Could not get active tab";
  }
});

