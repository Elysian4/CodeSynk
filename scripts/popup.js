let totalCount = 0;
let siteCount = 0;
const maxSites = 15;

const addButton = document.querySelector('#addButton');
const siteList = document.querySelector('#siteList');
const totalCountEl = document.querySelector('#totalCount');

// Function to render the total count
function renderTotalCount() {
    totalCountEl.textContent = totalCount;
}

// Function to save data to localStorage
function saveData() {
    const siteEntries = [];

    siteList.querySelectorAll('li').forEach(li => {
        const name = li.querySelector('.site-name').textContent;
        const value = parseInt(li.querySelector('.site-value').textContent);
        siteEntries.push({ name, value });
    });

    localStorage.setItem('siteEntries', JSON.stringify(siteEntries));
    localStorage.setItem('totalCount', totalCount);
}

// Function to create a new coding site entry
function createSiteEntry(name, value) {
    const li = document.createElement('li');
    const siteName = document.createElement('span');
    const siteValue = document.createElement('span');
    const incrementBtn = document.createElement('button');
    const decrementBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    let currentValue = value;

    siteName.textContent = name;
    siteName.classList.add('site-name');
    siteValue.textContent = currentValue;
    siteValue.classList.add('site-value');

    const incrementImg = document.createElement('img');
    incrementImg.src = './assets/plus.png';  
    incrementImg.alt = 'Increment';
    incrementImg.style.width = '25px';  
    incrementBtn.appendChild(incrementImg);
    incrementBtn.addEventListener('click', () => {
        currentValue++;
        siteValue.textContent = currentValue;
        totalCount++;
        renderTotalCount();
        saveData();
    });

    const decrementImg = document.createElement('img');
    decrementImg.src = './assets/subtract.png';
    decrementImg.alt = 'Decrement';
    decrementImg.style.width = '25px';
    decrementBtn.appendChild(decrementImg);
    decrementBtn.addEventListener('click', () => {
        if (currentValue > 0) {
            currentValue--;
            siteValue.textContent = currentValue;
            totalCount--;
            renderTotalCount();
            saveData(); 
        }
    });

    const removeImg = document.createElement('img');
    removeImg.src = './assets/remove.png';  
    removeImg.alt = 'Remove';
    removeImg.style.width = '20px';  
    removeBtn.appendChild(removeImg);
    removeBtn.addEventListener('click', () => {
        totalCount -= currentValue;
        renderTotalCount();
        siteList.removeChild(li);
        siteCount--;
        saveData(); 
    });

    li.appendChild(removeBtn);
    li.appendChild(siteName);

    const colonSpan = document.createElement('span');
    colonSpan.textContent = ' : ';
    colonSpan.style.margin = '0 40px'; 
    li.appendChild(colonSpan);
    
    li.appendChild(siteValue);
    li.appendChild(decrementBtn);
    li.appendChild(incrementBtn);
    siteList.appendChild(li);
}


// Function to add a new site to the list
addButton.addEventListener('click', () => {
    const siteName = document.querySelector('#websiteName').value.trim();
    const siteValue = document.querySelector('#websiteValue').value.trim();

    // Error checking
    if (siteName === "") {
        alert("Please enter a valid name");
        return;
    }
    if (siteValue === "" || isNaN(siteValue)) {
        alert("Please enter a valid value or value cannot be empty");
        return;
    }

    const parsedValue = parseInt(siteValue);

    if (siteCount < maxSites) {
        createSiteEntry(siteName, parsedValue);
        totalCount += parsedValue;
        renderTotalCount();
        siteCount++;
        saveData();
    } else {
        alert("You can only add up to 15 sites.");
    }

    // Clear inputs
    document.querySelector('#websiteName').value = '';
    document.querySelector('#websiteValue').value = '';
});

// Function to load data from localStorage and render it
function loadData() {
    const savedSites = JSON.parse(localStorage.getItem('siteEntries')) || [];
    totalCount = parseInt(localStorage.getItem('totalCount')) || 0;

    savedSites.forEach(site => {
        createSiteEntry(site.name, site.value);
        siteCount++;
    });

    renderTotalCount();
}

// Load the saved data when the extension is opened
document.addEventListener('DOMContentLoaded', loadData);
