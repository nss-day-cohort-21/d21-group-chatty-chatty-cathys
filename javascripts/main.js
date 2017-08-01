// console.log("main.js loaded");

//MAIN TEXT AREA FUNCTION//

{
  let thisMessage;
  let eachJSONMessage = Chatty.returnJSON();
  let userMessages = [];
  for (var i = 0; i < eachJSONMessage.length; i++) {
    thisMessage = eachJSONMessage[i];
    userMessages.push(thisMessage);
  }

	let inputArea = document.getElementById("messages-input");
	let outputDiv = document.getElementById("message-box");
	let messageStructure;
	let messageObject = {};
	// console.log( "userText", userText );


$("#messages-input").unbind().keypress((event) =>{
	if (event.keyCode === 13) {
    if (userMessages.length > 19) {
      userMessages.shift();
    }
	 	event.preventDefault();
	 	// console.log( "return was pressed" );
	 	let inputText = inputArea.value;
	 	let date = new Date();
		let utcDate = date.toUTCString();
		// console.log( "utcDate", utcDate );
		messageObject =
		{
			"id" : (userMessages.length),
			"user" : "",
			"message" : inputText,
			"timestamp": utcDate
		}
		// console.log( "messageObject", messageObject );
	 	userMessages.push(messageObject);
    // sole.log( "userMessages", userMessages );
    outputDiv.innerHTML = '';
 		for (let i = 0; i < userMessages.length; i++) {
      let messageDiv = document.createElement("div");
      messageDiv.id = i;
			messageStructure =
                        `<h4>${userMessages[i].user}</h4>
      									<p>${userMessages[i].message}</p>
      									<p>${userMessages[i].timestamp}</p>
      									<p>
      									Message #${i + 1}
      									</p>
      									<button type="button" class="deleteBtn">Delete</button>`;
      messageDiv.innerHTML = messageStructure;
      outputDiv.appendChild(messageDiv);
		};

		inputArea.value="";
    }
  });

  Chatty.getUserMessagesArr = () => {
    return userMessages
  }

  Chatty.updateUserMessagesArray = (newArray) => {
    userMessages = newArray;
  }

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

var body = document.getElementById("body");
var nav = document.getElementById("nav");

var bgColor = document.getElementById("bg-color");
var fontColor = document.getElementById("font-color");
var themeSave = document.getElementById("theme-save");

themeSave.addEventListener("click", (event) => {
	body.style.color = fontColor.value;
	nav.style.color = fontColor.value;
	body.style.backgroundColor = bgColor.value;
	nav.style.backgroundColor = bgColor.value;
});
