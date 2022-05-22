console.log("Content Script Ran!");

let video = null;
let initialPageLoad = true;


// when (CTRL) + (,) are pressed then reset the session
document.addEventListener('keydown', e=>{
    if(e.ctrlKey && e.key == ','){
        
        // clear local storage and look for video element if user says yes
        const userResponse = prompt("Are you sure you want to reset the session?", "no");
        if(userResponse.toLowerCase() === "yes"){
            if(video){
                video.storage.reset();
                entryPoint();
            }
        }

    }
})


// this is the entry point to the application
// it starts by searching for a video element on the page
entryPoint();


function entryPoint(){
    // try to get an HTML video element
    getVideoElement().then((res)=>{

        

        video = new Video(res.video);

        // only add the lisnteners once
        if(initialPageLoad){

            initialPageLoad = false;

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
                if(e.ctrlKey && e.key == '.'){
                    // ask user for timestamp
                    const userTimeStamp = prompt("Enter the timestamp HH:MM:SS");
                    if(userTimeStamp){
                        const timeStamp = userTimeStamp.split(':'); // split it at the colons
                        // minutes are worth 60 seconds. Hours are worth 60 minutes.
                        const seconds = (+timeStamp[0]) * 60 * 60 + (+timeStamp[1]) * 60 + (+timeStamp[2]);
                        
                        // jump to that timestamp 
                        video.jumpToTimestamp(seconds);
                    }
                }
            })

            document.addEventListener('keydown', e=>{
                if(e.ctrlKey && e.key == '['){
                    // create the sidebar here
                    const div = document.createElement("div"); 
                    div.setAttribute('id', 'myDiv');
                    // document.body.appendChild(div); 
                    div.innerText="Dako";
                    document.body.insertBefore(div, document.body.firstChild);
                    
                    const style = {
                        position: 'fixed',
                        backgroundColor: 'yellow',
                        width: '200px',
                        height: '200px',
                        zIndex: '100'
                    }

                    Object.assign(div.style, style);
                }
            })

        }

        
        
    }).catch((err)=>{
        console.log("Error!", err);
    })
}




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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg === "toggle"){
        console.log("Message recieved");
        sendResponse({status: "success"});
        toggle();
    }
})

const iframe = document.createElement('iframe'); 
iframe.style.background = "green";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px"; 
iframe.src = chrome.runtime.getURL("popup.html")

document.body.appendChild(iframe);

function toggle(){
    if(iframe.style.width == "0px"){
        iframe.style.width="400px";
    }
    else{
        iframe.style.width="0px";
    }
}