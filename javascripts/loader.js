console.log("loader.js loaded");

{
  var Chatty = {};

  let loadedJSON = [];

  Chatty.loadJSON = function(callback) {
    let myR = new XMLHttpRequest();
    myR.addEventListener("load", function(){
      loadedJSON = JSON.Parse(this.responseText);
      callback(loadedJSON)
    })
    myR.open("GET", "messages.json")
    myR.send();
  }
}

{
  Chatty.getMessages = function(messages) {
    console.log(messages);
    return messages
  }
}

Chatty.loadJSON(Chatty.getMessages);
