const newSessionButton = document.getElementById("newSessionButton");

newSessionButton.addEventListener("click", (e) => {
  sendMessageToActiveTab({ action: "createNewSession" }, (response) => {
    if (response.status === "success") {
      console.log(`New session created!`);
    }
  });
});
