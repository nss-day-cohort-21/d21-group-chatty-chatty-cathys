// console.log("remove.js loaded");
{
  let body = document.querySelector("body");
  let clearBTN = document.getElementById("clear-btn");
  let messageBox = document.getElementById("message-box");

  messageBox.addEventListener("click", function(e) {
    if (e.target.className === "deleteBtn") {
      let currentMessagesArr = Chatty.getUserMessagesArr();
      let index = Chatty.findIndex(currentMessagesArr, "id", Number(e.target.parentNode.id));
      currentMessagesArr.splice(index, 1);
      Chatty.updateUserMessagesArray(currentMessagesArr);
      messageBox.removeChild(e.target.parentNode);
    }
  })

  Chatty.clearAll = function(){
    let clearArray = []
    Chatty.updateUserMessagesArray(clearArray);
    messageBox.innerHTML = '';
  }

  Chatty.findIndex = (array, property, value) => {
    for(var i = 0, l = array.length ; i < l ; i++) {
      if(array[i][property] === value) {
        console.log(i);
        return i;
      }
    }
  }

  clearBTN.addEventListener("click", Chatty.clearAll);
}
