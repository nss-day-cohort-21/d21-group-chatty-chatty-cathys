// console.log("loader.js loaded");

{
  var Chatty = {};

  let loadedJSON = [];

  let messagesArray = [];

  Chatty.loadJSON = function(callback) {
    let myR = new XMLHttpRequest();
    myR.addEventListener("load", function(){
      loadedJSON = JSON.parse(this.responseText);
      callback(loadedJSON)
    })
    myR.open("GET", "messages.json", false)
    myR.send();
  }

  Chatty.pushJSON = (message) => {
    for (var i = 0; i < message.length; i++) {
      let eachMessage = message[i]
      messagesArray.push(eachMessage);
    }

  }

  Chatty.returnJSON = () => {
    return messagesArray
  }
}



// {
//   let messageBox = document.getElementById("message-box"); //get message display area
//   let jsonMessages; // store current json message
//   Chatty.getMessages = function(messages) {
//     for (var i = 0; i < messages.length; i++) {
//
//       jsonMessages = messages[i];
//
//       Chatty.pushJSON(jsonMessages);
//
//     }
// }

Chatty.loadJSON(Chatty.pushJSON);
