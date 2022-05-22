console.log("Background.js Script Ran!");

chrome.action.onClicked.addListener(tab => {
    if(tab.url.indexOf("chrome://extensions/") === -1){
        chrome.tabs.sendMessage(tab.id, "toggle", function (response){
            if(response.status === "success"){
                console.log(`Message sent to tab ${tab.id}`);
            }
        });
    }
    
})
