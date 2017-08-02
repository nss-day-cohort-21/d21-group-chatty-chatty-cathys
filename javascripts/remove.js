// console.log("remove.js loaded");
{
  let body = document.querySelector("body");
  let clearBTN = document.getElementById("clear-btn");
  let messageBox = document.getElementById("message-box");

  messageBox.addEventListener("click", function(e) { //event listener for deleteBtn
    if (e.target.className === "deleteBtn visible") {
      let currentMessagesArr = Chatty.getUserMessagesArr(); //update with current Messages in array.
      console.log("Before Splice", currentMessagesArr);
      let index = Chatty.findIndex(currentMessagesArr, "id", Number(e.target.parentNode.parentNode.id)); //set index to the index of the correct message in the array.
      currentMessagesArr.splice(index, 1); //splice out message from array with found index
      console.log("After Splice", currentMessagesArr);
      messageBox.removeChild(e.target.parentNode.parentNode); //remove message from DOM

      for (var i = 0; i < currentMessagesArr.length; i++) {
        currentMessagesArr[i]["id"] = i;
      }

      Chatty.updateUserMessagesArray(currentMessagesArr); //call function to update current Messages array

    }
  })

  Chatty.clearAll = function(){ //function to clear all messages from DOM
    let clearArray = []
    Chatty.updateUserMessagesArray(clearArray); //updates user Messages array with clear array
    messageBox.innerHTML = '';
  }

  Chatty.findIndex = (array, property, value) => { //function to find index of message to be deleted in user messages array used in message deletion
    for(var i = 0, l = array.length ; i < l ; i++) {
      if(array[i][property] === value) {
        return i;
      }
    }
  }

  clearBTN.addEventListener("click", Chatty.clearAll);
}
