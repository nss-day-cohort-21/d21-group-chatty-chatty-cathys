// console.log("remove.js loaded");
{
  let body = document.querySelector("body");
  let clearBTN = document.getElementById("clear-btn");
  let messageBox = document.getElementById("message-box");
  let divArr = [];
  body.addEventListener("click", function(e) {
    if (e.target.className === "deleteBtn") {
      messageBox.removeChild(e.target.parentNode);
    }
    console.log(e.target.parentNode.id);
    let currentMessagesArr = Chatty.getUserMessagesArr();
    console.log(currentMessagesArr);
  })




  Chatty.clearAll = function(){
    emptyArr = [];
    messageBox.innerHTML = '';
    Chatty.updateDom();
  }

  clearBTN.addEventListener("click", Chatty.clearAll);
}
