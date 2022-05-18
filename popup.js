console.log("Popup script ran!");

const STORAGE_KEY = "web-video-bookmarker-4$23hV2";
const tableWrapper = document.getElementById('tableWrapper');
const sessionName = document.querySelector('h1');

chrome.storage.sync.get(STORAGE_KEY, response=>{
    if(Object.keys(response).length > 0){
        // create UI
        const {bookmarks, sessionName} = response[STORAGE_KEY];
        createBookmarksTable(bookmarks);
        updateTitle(sessionName);
    }
})

// listener for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
    const {bookmarks, sessionName} = changes[STORAGE_KEY].newValue;
    createBookmarksTable(bookmarks);
    updateTitle(sessionName);
});

function createBookmarksTable(bookmarks){
    
    // remove the current HTML content
    tableWrapper.innerHTML = "";

    let HTML_Content = "";

    HTML_Content += `<table><tbody><tr><th class="timestamp">Timestamp:</th><th class="note">Note:</th></tr>`;
    
    for(const key in bookmarks){
        const currentBookmark = bookmarks[key];
        HTML_Content += `<tr><td class="timestamp">${currentBookmark.timestamp}</td><td class="note">${currentBookmark.text}</td></tr>`;
    }

    HTML_Content += "</tbody></table>"

    tableWrapper.innerHTML = HTML_Content;
}

function updateTitle(title){
    sessionName.innerText = title;
}