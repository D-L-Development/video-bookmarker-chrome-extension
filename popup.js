console.log("Popup script ran!");

const STORAGE_KEY = "web-video-bookmarker-4$23hV2";
const tableWrapper = document.getElementById('tableWrapper');

chrome.storage.sync.get(STORAGE_KEY, response=>{
    if(Object.keys(response).length > 0){
        // create UI
        const {bookmarks} = response[STORAGE_KEY];
        createBookmarksTable(bookmarks);
    }
})

// listener for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
    const {bookmarks} = changes[STORAGE_KEY].newValue;
    createBookmarksTable(bookmarks);
});

function createBookmarksTable(bookmarks){
    
    let HTML_Content = "";

    HTML_Content += "<table><tbody><tr><th>Timestamp:</th><th>Note:</th></tr>"
    
    for(const key in bookmarks){
        const currentBookmark = bookmarks[key];
        HTML_Content += `<tr><td>${currentBookmark.timestamp}</td><td>${currentBookmark.text}</td></tr>`;
    }

    HTML_Content += "<tbody/><table/>"

    tableWrapper.innerHTML = HTML_Content;
}