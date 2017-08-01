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
    messagesArray.push(message);
  }

  Chatty.returnJSON = () => {
    return messagesArray
  }
}



{
  let messageBox = document.getElementById("message-box"); //get message display area
  let jsonMessages; // store current json message
  Chatty.getMessages = function(messages) {
    for (var i = 0; i < messages.length; i++) {

      jsonMessages = messages[i];

      Chatty.pushJSON(jsonMessages);


      messageStructure = `<div id="${i}">
                    <img src="../images/${messages[i].user}.jpg" class="user_image">
                    <h4>${messages[i].user}</h4>
                    <p>${messages[i].message}</p>
                    <p>${messages[i].timestamp}</p>
                    <p>
                    Message #${i + 1}
                    </p>
                    <button type="button" class="deleteBtn">Delete</button>
                    </div>`;
                    $(messageBox).prepend(messageStructure)
      };

    }
}

Chatty.loadJSON(Chatty.getMessages);
