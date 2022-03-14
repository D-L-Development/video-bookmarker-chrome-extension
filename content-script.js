console.log("Content Script Ran!");

//console.log(chrome.storage);

let video = null;

// try to get an HTML video element
getVideoElement().then((res)=>{
    video = new Video(res.video);

    document.addEventListener('keydown', e=>{
        if(e.ctrlKey && e.key == 'b'){
            video.addBookmark();
        }
    })
      
    document.addEventListener('keydown', e=>{
        if(e.ctrlKey && e.key == ';'){
            // print bookmarks pretty
            video.storage.printBookmarksPretty();
            video.copyStringToClipboard(video.formatMapToTableString());
            console.log("I copied the table to your clipboard!");
        }
    })

    document.addEventListener('keydown', e=>{
        if(e.ctrlKey && e.key == ','){
            
            // clear local storage if user says yes
            const userResponse = prompt("Are you sure you want to delete the session?", "no");
            if(userResponse.toLowerCase() === "yes"){
                video.storage.reset();
                location.reload()
                console.log("Storage cleared!!");
            }
   
        }
    })
    
}).catch((err)=>{
    console.log("Error!", err);
})




// resolves a promise with an HTML video element
// or throw an error
function getVideoElement(repeatCount = 20){

    // return a promise
    return new Promise((resolve, reject)=>{

    // declare time interval
    const intervalId = setInterval(()=>{

        // if repeated (repeatCount) times, then reject
        if(--repeatCount <= 0){
            clearInterval(intervalId);
            reject("Failed to find video!");
        }

        // try to get video again
        const video = document.querySelector('video');
        if(video){
            clearInterval(intervalId);
            resolve({video});
        }
    }, 500);

    })
}