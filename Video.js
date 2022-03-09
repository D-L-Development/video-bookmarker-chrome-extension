class Video{
    constructor(videoElement){
        this.video = videoElement;
        this.storage = new Storage();


        document.addEventListener('keydown', e=>{
            if(e.ctrlKey && e.key == 'b'){
              addBookmark();
            }
        })
          
        document.addEventListener('keydown', e=>{
            if(e.ctrlKey && e.key == ';'){
                // print bookmarks pretty
                printBookmarksPretty();
                copyStringToClipboard(formatMapToTableString());
            }
        })
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
        pause();
        const currentTimestamp = getCurrentTimestamp()
        const bookmarkText = prompt(`Add a bookmark at ${currentTimestamp}`);
        if(bookmarkText){
            this.storage.addBookmark(currentTimestamp, bookmarkText);
        }
        
        
        // printBookmarksPretty();
        play();
    }

    printBookmarksPretty(){
        console.clear();
        console.log(`%cSession Name: %c${sessionName}`, "color: yellow", "color: #DEB887");
        const bookmarkFromLocalStorage = JSON.parse(localStorage.getItem('bookmarks'));
        console.log("%cCurrent Bookmarks: ", "color: red");
        console.table(bookmarkFromLocalStorage);
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
        for(let key in bookmarks){
          // timestamp + TAB + bookmark + NEWLINE
          formatedString += key + TAB_CHAR + bookmarks[key] + NEWLINE_CHAR;
        }
        
        return formatedString;
    }
}
