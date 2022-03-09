class Video{
    constructor(videoElement){
        this.video = videoElement;
        this.storage = new Storage();
    }

    play(){
        this.video.play();
    }

    pause(){
        this.video.pause();
    }

    getCurrentTimestamp(){
        // get the current video time in seconds
        const currentVideoTime = Math.floor(this.video.currentTime);
        // return the converted seconds into a string timestamp
        return new Date(currentVideoTime * 1000).toISOString().substr(11, 8);
    }

    addBookmark(){
        this.pause();
        const currentTimestamp = this.getCurrentTimestamp()
        const bookmarkText = prompt(`Add a bookmark at ${currentTimestamp}`);
        
        // if text input is not empty, then add bookmark
        if(bookmarkText){
            this.storage.addBookmark(currentTimestamp, bookmarkText);
            this.storage.printBookmarksPretty();
        }
        this.play();
    }

    copyStringToClipboard (str) {
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

    formatMapToTableString(){
        const TAB_CHAR = String.fromCharCode(9);
        const NEWLINE_CHAR = String.fromCharCode(10);
        let formatedString = "";
        for(let key in this.storage.bookmarks){
          // timestamp + TAB + bookmark + NEWLINE
          formatedString += key + TAB_CHAR + this.storage.bookmarks[key] + NEWLINE_CHAR;
        }
        
        return formatedString;
    }
}
