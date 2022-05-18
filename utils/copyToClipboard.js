function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

function formatMapToTableString(bookmarks){
    const TAB_CHAR = String.fromCharCode(9);
    const NEWLINE_CHAR = String.fromCharCode(10);
    let formatedString = "";
    for(let key in bookmarks){
      // timestamp + TAB + bookmark + NEWLINE
      formatedString += key + TAB_CHAR + bookmarks[key].text + NEWLINE_CHAR;
    }
    
    return formatedString;
}

function copyTableToClipboard(bookmarks){
    copyStringToClipboard(formatMapToTableString(bookmarks));
}
