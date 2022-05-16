class Storage{
    constructor(){
        this.bookmarks = this.getBookmarksFromLocalStorage();
        this.videoSession = this.getVideoSessionFromLocalStorage();
        const STORAGE_KEY = "web-video-bookmarker-4$23hV2";
    }

    writeToLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    getVideoSessionFromLocalStorage(){
    
        // get video session object from local storage
        let videoSession = localStorage.getItem("videoSession");
        if(videoSession)
        {
          return JSON.parse(videoSession);
        } 
        else
        {
          // if no session object is found, then ask the user for one
          const newSessionName = prompt("Please enter a session name:");
          videoSession = {"sessionName": newSessionName};
          this.writeToLocalStorage("videoSession", videoSession);
          return videoSession;
        }
    }

    getBookmarksFromLocalStorage(){
    
        let prev_bookmarks = localStorage.getItem("bookmarks");
        if(prev_bookmarks)
        {
          return JSON.parse(prev_bookmarks);
        } 
        else
        {
          return {}
        }
        
    }

    addBookmark(currentTimestamp, bookmarkText){
                
        if(!this.bookmarks[currentTimestamp])
        {
            this.bookmarks[currentTimestamp] = bookmarkText;
            this.writeToLocalStorage("bookmarks", this.bookmarks);
        }
        else
        {
            const userResponse = prompt("There's already a bookmark here! Would you like to replace it with this one?", "no");
            if(userResponse.toLowerCase() === "yes"){
                this.bookmarks[currentTimestamp] = bookmarkText;
                this.writeToLocalStorage("bookmarks", this.bookmarks);
            }
        }
        
    }

    // reset(){
    //     localStorage.removeItem('videoSession');
    //     localStorage.removeItem('bookmarks');
    // }

    reset(){
        chrome.storage.sync.remove(STORAGE_KEY, ()=>{
            console.log("Session removed!");
        })
    }

    printBookmarksPretty(){
        console.clear();
        console.log(`%cSession Name: %c${this.videoSession.sessionName}`, "color: yellow", "color: #DEB887");
        const bookmarkFromLocalStorage = this.getBookmarksFromLocalStorage();
        console.log("%cCurrent Bookmarks: ", "color: red");
        console.table(bookmarkFromLocalStorage);
    }
}