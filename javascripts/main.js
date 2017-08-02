// console.log("main.js loaded");

{


  let radios = document.getElementById("users-radio");
  // console.log( "radios", radios );
  radios.addEventListener("click", (event) => {
  	inputArea.focus();
  });



  let thisMessage;

  let userMessages = Chatty.returnJSON();



	let inputArea = document.getElementById("messages-input");
	let outputDiv = document.getElementById("message-box");
	let messageStructure;
	let messageObject = {};
  let isEditing = false;
  let divToEdit;
  $("#messages-input").keypress((event) =>{ //event listener that determines if the text in the input is being edited or is a new message
    if (event.keyCode === 13 && isEditing === true) {
      Chatty.editMessage(); //if editing call the editing function

    } else if (event.keyCode === 13 && isEditing === false) {
      if (userMessages.length > 19) {
        userMessages.shift(); //if more than 20 messages in array take away first message in array
      }

      Chatty.createNewMessage(); //if new message call create new message function
    }
  });

  Chatty.getUserMessagesArr = () => { //function to return current user messages
    return userMessages
  }

  Chatty.updateUserMessagesArray = (newArray) => { //updates user messages array with new array. Used in deleting messages
    userMessages = newArray;
    Chatty.updateDelete();
  }

  Chatty.changeInputToEdit = (text, div, e) => { //function used when edit button is clicked to change conditions of input area to know if text is edited text or new text
    isEditing = true;
    inputArea.value = text;
    divToEdit = div;
    inputArea.focus();
  }

  Chatty.updateDelete = () => {
    outputDiv.innerHTML = '';
    userRadios = Array.from(document.querySelectorAll("#users-radio > input"));
    console.log("Update after delete", userMessages);
    for (let i = 0; i < userMessages.length; i++) {
      let messageDiv = document.createElement("div");
      messageDiv.id = i;

      let innerDiv = document.createElement("div");
      innerDiv.classList.add(userMessages[i].user);
      innerDiv.classList.add("msgDefault");
      innerDiv.id = i+100;

      messageStructure =
                        `
                        <img src="../images/${userMessages[i].user}.jpg" class="user_image">
                        <h4 class="username">${userMessages[i].user}</h4>
                        <p class="msg">${userMessages[i].message}</p>
                        <p class="date">${userMessages[i].timestamp}</p>
                        <p class="msgNumber">
                        Message #${i + 1}
                        </p>
                        `;
      innerDiv.innerHTML = messageStructure;



      let thisEditBtn = document.createElement("button");
      thisEditBtn.id = `editBtn${i}`;
      thisEditBtn.classList.add("editBtn");

      let thisXBtn = document.createElement("button");
      thisXBtn.id = `xBtn${i}`;
      thisXBtn.classList.add("deleteBtn");
      thisXBtn.innerHTML = "X"



        for (var l = 0; l < userRadios.length; l++) {
          if (userRadios[l].checked && userRadios[l].defaultValue === userMessages[i]["user"]) {
            thisEditBtn.classList.remove("hidden");
            thisEditBtn.classList.add("visible");
            thisXBtn.classList.remove("hidden");
            thisXBtn.classList.add("visible");
            break;
          } else {
            thisEditBtn.classList.remove("visible");
            thisEditBtn.classList.add("hidden");
            thisXBtn.classList.remove("visible");
            thisXBtn.classList.add("hidden");
          }
        }

      innerDiv.appendChild(thisEditBtn);
      innerDiv.appendChild(thisXBtn);

      messageDiv.appendChild(innerDiv);
     // messageDiv.appendChild(editBtn);
      $("#message-box").prepend(messageDiv);

      let thisEditButton = document.getElementById(`editBtn${i}`);
      thisEditButton.addEventListener("click", function(e) {
        let editedText = userMessages[i].message;
        let editedTextDiv = e.target.parentNode.parentNode;
        Chatty.changeInputToEdit(editedText, editedTextDiv);
      })
    };
    inputArea.value = '';
  }

  Chatty.createNewMessage = () => { //function called when creating new message
    event.preventDefault();

    let inputText = inputArea.value;
    let date = new Date();
    let utcDate = date.toLocaleString();
    var currentUser = document.querySelector('input[name = "user"]:checked').value;
    if (currentUser === "" || inputText==="") { //used to know if text is empty

          alert("You must select a user and enter a message.  This is CHATTY Cathy, not Emo Wallflower Cathy.");

    }  else  {

          messageObject = //message object created to add to userMessages array.
          {
            "id" : (userMessages.length),
            "user" : currentUser,
            "message" : inputText,
            "timestamp": utcDate
          }

          userMessages.push(messageObject); //push new object
          console.log("creating new message", userMessages);
          outputDiv.innerHTML = '';
          userRadios = Array.from(document.querySelectorAll("#users-radio > input"));

          for (let i = 0; i < userMessages.length; i++) { //run through array of user messages and recreate DOM
            let messageDiv = document.createElement("div");
            messageDiv.id = i;

            let innerDiv = document.createElement("div");
            innerDiv.classList.add(userMessages[i].user);
            innerDiv.classList.add("msgDefault");
            innerDiv.id = i+100;

            messageStructure =
                              `
                              <img src="../images/${userMessages[i].user}.jpg" class="user_image">
                              <h4 class="username">${userMessages[i].user}</h4>
                              <p class="msg">${userMessages[i].message}</p>
                              <p class="date">${userMessages[i].timestamp}</p>
                              <p class="msgNumber">
                              Message #${i + 1}
                              </p>
                              `;
            innerDiv.innerHTML = messageStructure;



            let thisEditBtn = document.createElement("button");
            thisEditBtn.id = `editBtn${i}`;
            thisEditBtn.classList.add("editBtn");

            let thisXBtn = document.createElement("button");
            thisXBtn.id = `xBtn${i}`;
            thisXBtn.classList.add("deleteBtn");
            thisXBtn.innerHTML = "X"



              for (var l = 0; l < userRadios.length; l++) { //checks for radio checked to determine which edit / delete buttons to show
                if (userRadios[l].checked && userRadios[l].defaultValue === userMessages[i]["user"]) {
                  thisEditBtn.classList.remove("hidden");
                  thisEditBtn.classList.add("visible");
                  thisXBtn.classList.remove("hidden");
                  thisXBtn.classList.add("visible");
                  break;
                } else {
                  thisEditBtn.classList.remove("visible");
                  thisEditBtn.classList.add("hidden");
                  thisXBtn.classList.remove("visible");
                  thisXBtn.classList.add("hidden");
                }
              }

            innerDiv.appendChild(thisEditBtn);
            innerDiv.appendChild(thisXBtn);

            messageDiv.appendChild(innerDiv);

            //messageDiv.appendChild(editBtn);
            $("#message-box").prepend(messageDiv);

            let thisEditButton = document.getElementById(`editBtn${i}`);
            thisEditButton.addEventListener("click", function(e) { // event listener that gets area to edit and to change text input to know the text is edited text instead of new text
              let editedText = userMessages[i].message;
              let editedTextDiv = e.target.parentNode.parentNode;
              Chatty.changeInputToEdit(editedText, editedTextDiv);
            })
          };

          inputArea.value="";
    }


  }

  Chatty.editMessage = (e) => { // this is the same as creating new message except it does not create a new message object and push to user message array.
    let inputText = inputArea.value;
    let indexOfDiv = Chatty.findIndex(userMessages, "id", Number(divToEdit.id));
    userMessages[indexOfDiv]["message"] = inputText;
    isEditing = false;
    outputDiv.innerHTML = '';
    userRadios = Array.from(document.querySelectorAll("#users-radio > input"));

    console.log("when editing", userMessages);
    for (let i = 0; i < userMessages.length; i++) {
      let messageDiv = document.createElement("div");
      messageDiv.id = i;

      let innerDiv = document.createElement("div");
      innerDiv.classList.add(userMessages[i].user);
      innerDiv.classList.add("msgDefault");
      innerDiv.id = i+100;

      messageStructure =
                        `
                        <img src="../images/${userMessages[i].user}.jpg" class="user_image">
                        <h4 class="username">${userMessages[i].user}</h4>
                        <p class="msg">${userMessages[i].message}</p>
                        <p class="date">${userMessages[i].timestamp}</p>
                        <p class="msgNumber">
                        Message #${i + 1}
                        </p>
                        `;
      innerDiv.innerHTML = messageStructure;



      let thisEditBtn = document.createElement("button");
      thisEditBtn.id = `editBtn${i}`;
      thisEditBtn.classList.add("editBtn");

      let thisXBtn = document.createElement("button");
      thisXBtn.id = `xBtn${i}`;
      thisXBtn.classList.add("deleteBtn");
      thisXBtn.innerHTML = "X"



        for (var l = 0; l < userRadios.length; l++) {
          if (userRadios[l].checked && userRadios[l].defaultValue === userMessages[i]["user"]) {
            thisEditBtn.classList.remove("hidden");
            thisEditBtn.classList.add("visible");
            thisXBtn.classList.remove("hidden");
            thisXBtn.classList.add("visible");
            break;
          } else {
            thisEditBtn.classList.remove("visible");
            thisEditBtn.classList.add("hidden");
            thisXBtn.classList.remove("visible");
            thisXBtn.classList.add("hidden");
          }
        }

      innerDiv.appendChild(thisEditBtn);
      innerDiv.appendChild(thisXBtn);

      messageDiv.appendChild(innerDiv);
     // messageDiv.appendChild(editBtn);
      $("#message-box").prepend(messageDiv);

      let thisEditButton = document.getElementById(`editBtn${i}`);
      thisEditButton.addEventListener("click", function(e) {
        let editedText = userMessages[i].message;
        let editedTextDiv = e.target.parentNode.parentNode;
        Chatty.changeInputToEdit(editedText, editedTextDiv);
      })
    };
    inputArea.value = '';
  }

  Chatty.loadJSONToDOM = () => { //loads from usermessages array. Now that I think about it the edit message function may be able to do this.
    console.log("loadingJSON", userMessages);
    for (let i = 0; i < userMessages.length; i++) {
      let messageDiv = document.createElement("div");
      messageDiv.id = i;
      messageDiv.classList.add(`${userMessages[i].user}`);
      messageDiv.classList.add("msgDefault")

      // let editBtn = document.createElement("button");
      // editBtn.id = `editBtn${i}`;
      // editBtn.className = "editBtn";
      // editBtn.innerHTML = "";

      messageStructure =
                        `<div>
                        <img src="../images/${userMessages[i].user}.jpg" class="user_image">
                        <h4 class="username">${userMessages[i].user}</h4>
                        <p class="msg">${userMessages[i].message}</p>
                        <p class="date">${userMessages[i].timestamp}</p>
                        <p class="msgNumber">
                        Message #${i + 1}
                        </p>
                        <button type="button" id="editBtn${i}" class="editBtn hidden"></button>
                        <button type="button" class="deleteBtn hidden" id="xBtn${i}">X</button>
                        </div>`;
      messageDiv.innerHTML = messageStructure;
      // messageDiv.appendChild(editBtn);
      $("#message-box").prepend(messageDiv);

      let thisEditButton = document.getElementById(`editBtn${i}`);
      thisEditButton.addEventListener("click", function(e) {
        let editedText = userMessages[i].message;
        let editedTextDiv = e.target.parentNode.parentNode;
        Chatty.changeInputToEdit(editedText, editedTextDiv);
      })
    };
    inputArea.value = '';
  }

  Chatty.loadJSONToDOM();
//////////////////////////////////////////////////////

	let users = { "names": ["Ronnie", "James", "Bruce", "Gene", "Dave"]}; //creates radio buttons
	let userSelectDiv = document.getElementById("users-radio");
  let userRadios;
  let currUserMessages;
	userSelectDiv.innerHTML = `<input type="radio" name="user" id="radio--defalut" value="" checked>Select A User</input>`
	Chatty.userSelect = () => {
		for (let i = 0; i < users.names.length; i++) { //adds radio buttons to DOM
		let name = users.names[i];
		// console.log( "name", name );
		let radioHTML = `<input type="radio" name="user" id="radio--${i}" value="${name}">${name}</input>`
		// console.log( "radioHTML", radioHTML );

		userSelectDiv.innerHTML += radioHTML;

		}
    userRadios = Array.from(document.querySelectorAll("#users-radio > input"));

    for (var j = 0; j < userRadios.length; j++) { //creates event listener that determines which edit and delete buttons to show based off which is clicked.
      let eachRadioUser = userRadios[j];
      eachRadioUser.addEventListener("click", function(e) {
        currUserMessages = Chatty.getUserMessagesArr();
        console.log(currUserMessages);
        for (var k = 0; k < currUserMessages.length; k++) {
          let thisEditButton = document.getElementById(`editBtn${k}`);
          let thisXButton = document.getElementById(`xBtn${k}`);
          if (eachRadioUser.checked && eachRadioUser.defaultValue === userMessages[k]["user"]) {
            thisEditButton.classList.remove("hidden");
            thisEditButton.classList.add("visible");
            thisXButton.classList.remove("hidden");
            thisXButton.classList.add("visible");
          } else {
            thisEditButton.classList.remove("visible");
            thisEditButton.classList.add("hidden");
            thisXButton.classList.remove("visible");
            thisXButton.classList.add("hidden");
          }
        }
      })
    }
	}
	Chatty.userSelect()
}




// Checkboxes change theme -- Abandoned in favor of Modal Theme Chooser

// var darkThemeBox = document.getElementById("dark-theme");
// var largeTextBox = document.getElementById("large-text");
// var body = document.getElementById("body");
// var nav = document.getElementById("nav");


// darkThemeBox.addEventListener("change", (event) => {
// 	if(darkThemeBox.checked === true) {
// 		body.classList.add("dark-theme");
// 		nav.classList.add("dark-theme");
// 	} else {
// 		body.classList.remove("dark-theme");
// 		nav.classList.remove("dark-theme");
// 	}

// });

// largeTextBox.addEventListener("change", (event) => {
// 	if(largeTextBox.checked === true) {
// 		messageBox.classList.add("large-text");
// 	} else {
// 		messageBox.classList.remove("large-text");
// 	}

// });


// Modal Theme Chooser

var body = document.getElementById("body"); //creates custom theme modal
var nav = document.getElementById("nav");

var bgColor = document.getElementById("bg-color");
var fontColor = document.getElementById("font-color");
var themeSave = document.getElementById("theme-save");
var themeDefault = document.getElementById("theme-default");

themeSave.addEventListener("click", (event) => {
	body.style.color = fontColor.value;
	nav.style.color = fontColor.value;
	body.style.backgroundColor = bgColor.value;
	nav.style.backgroundColor = bgColor.value;
});

themeDefault.addEventListener("click", (event) => {
	body.removeAttribute("style");
	nav.removeAttribute("style");
});
