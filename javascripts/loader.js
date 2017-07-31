// console.log("loader.js loaded");

{
  var Chatty = {};

  let loadedJSON = [];

  Chatty.loadJSON = function(callback) {
    let myR = new XMLHttpRequest();
    myR.addEventListener("load", function(){
      loadedJSON = JSON.parse(this.responseText);
      callback(loadedJSON)
    })
    myR.open("GET", "messages.json")
    myR.send();
  }

  Chatty.pushJSON = (message) => {
    loadedJSON.push(message);
  }

  Chatty.returnJSON = () => {
    console.log(loadedJSON);
    return loadedJSON
  }
}



{
  let messageBox = document.getElementById("message-box"); //get message display area
  let jsonMessages; // store current json message
  Chatty.getMessages = function(messages) {
    for (var i = 0; i < messages.length; i++) {

      jsonMessages = messages[i];

      Chatty.pushJSON(jsonMessages);

      let eachMessageDiv = document.createElement("div"); // create a div for each json message
      eachMessageDiv.id = `jsonMessage${jsonMessages.messageID}`;
      eachMessageDiv.innerHTML = jsonMessages.message; //set text of div to message from json file

      let eachMessageDeleteButton = document.createElement("button"); //create delete button for each message
      eachMessageDeleteButton.id = `deleteBtn${jsonMessages.messageID}`;
      eachMessageDeleteButton.innerHTML = "Delete";
      eachMessageDiv.appendChild(eachMessageDeleteButton); //append btn to div and then div to display area, so it is now on the DOM
      messageBox.appendChild(eachMessageDiv);

      let thisMessgaeDeleteButton = document.getElementById(`deleteBtn${jsonMessages.messageID}`); //get each button by ID created
      thisMessgaeDeleteButton.addEventListener("click", function(e) {
        messageBox.removeChild(eachMessageDiv); //add event listener that removes the div the button is in from the DOM
      })
    }
  }
}

Chatty.loadJSON(Chatty.getMessages);
