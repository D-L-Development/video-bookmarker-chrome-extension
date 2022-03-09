class Storage{
    constructor(){
        this.bookmarks = getBookmarksFromLocalStorage();
        this.sessionName = this.getSessionNameFromLocalStorage();
    }

    writeToLocalStorage(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    getSessionNameFromLocalStorage(){
    
        let sessionName = localStorage.getItem("sessionName");
        if(sessionName)
        {
          return JSON.parse(sessionName);
        } 
        else
        {
          sessionName = prompt("Please enter a session name:");
          const newSessionName = {"sessionName": sessionName};
          writeToLocalStorage("sessionName", newSessionName);
          return newSessionName;
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
        // TODO: check to makes sure there isn't already a timestamp
        this.bookmarks[currentTimestamp] = bookmarkText;
        writeToLocalStorage("bookmarks", bookmarks);
    }
}