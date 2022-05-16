class Storage{
    constructor(){
        this.videoSession = {};
        this.STORAGE_KEY = "web-video-bookmarker-4$23hV2";
        this.setVideoSessionFromLocalStorage();

        document.addEventListener('keydown', e=>{
            if(e.key == '-'){
                chrome.storage.sync.get(this.STORAGE_KEY, (result)=>{
                    console.log(result);
                })
            }
        })
    }

    writeToLocalStorage(){
        chrome.storage.sync.set(this.videoSession, ()=>{
            console.log("value set to");
            console.log(this.videoSession);
        })
    }


    
    setVideoSessionFromLocalStorage(){
        
        chrome.storage.sync.get(this.STORAGE_KEY,(response)=>{
            

            // if there is a session in storage, then return it
            if(response.key){ 
                return response.key; 
            }
            
            else{

                this.videoSession = {
                    [this.STORAGE_KEY]: {
                        sessionName: "some name",
                        bookmarks: {
                                "00:45:32": {
                                    timestamp: "00:45:32",
                                    text: "lorem ipsum"    
                                },
                                "00:41:25": {
                                    timestamp: "00:41:25",
                                    text: "lorem ipsum"    
                                }
                        }
                        
                    }
                }

                console.log("TAG", "Video session after being set");
                console.log(this.videoSession);

                this.writeToLocalStorage();
            }
        })
    }



    addBookmark(currentTimestamp, bookmarkText){
                
        if(!this.videoSession[this.STORAGE_KEY].bookmarks[currentTimestamp])
        {
            this.videoSession[this.STORAGE_KEY].bookmarks[currentTimestamp] = bookmarkText;
            this.writeToLocalStorage();
        }
        else
        {
            
        }
        
    }


    reset(){
        chrome.storage.sync.remove(this.STORAGE_KEY, ()=>{
            console.log("Session removed!");
        })
    }

    printBookmarksPretty(){
        console.clear();
        console.log(`%cSession Name: %c${this.videoSession[this.STORAGE_KEY].sessionName}`, "color: yellow", "color: #DEB887");
        const bookmarkFromLocalStorage = this.videoSession[this.STORAGE_KEY].bookmarks;
        console.log("%cCurrent Bookmarks: ", "color: red");
        console.table(bookmarkFromLocalStorage);
    }
}