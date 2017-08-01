console.log("main.js loaded");

//MAIN TEXT AREA FUNCTION//

{
	let userMessages = [];
	let inputArea = document.getElementById("messages-input");
	let outputDiv = document.getElementById("message-box");
	let messageStructure;
	let messageObject = {};
	// console.log( "userText", userText );

	
	// console.log( "currentUser", currentUser );

	Chatty.addReturnButton = (element) => {
		element.addEventListener("keypress", (event) =>{
			if (event.keyCode === 13) {
			 	event.preventDefault();
				let currentUser = document.querySelector('input[name = "user"]:checked').value
				let inputText = inputArea.value;

				if (currentUser === "" || inputText==="") {

					alert("You must select a user and enter a message.  This is CHATTY Cathy, not Emo Wallflower Cathy.");

				}  else  {

			 	console.log( "currentUser", currentUser );
			 	
			 	let date = new Date();
				let utcDate = date.toUTCString();
				console.log( "utcDate", utcDate );

				messageObject = 
				{
					"id" : (userMessages.length + 1),
					"user" : currentUser,
					"message" : inputText,
					"timestamp": utcDate
				}
				console.log( "messageObject", messageObject );
			 	
			 	

			 	userMessages.push(messageObject);

			 	// console.log( "userMessages", userMessages );
			 		for (let i = 0; i < userMessages.length; i++) {
						messageStructure = `<div id="${i}">
												<h4>${userMessages[i].user}</h4>
												<p>${userMessages[i].message}</p>
												<p>${userMessages[i].timestamp}</p>
												<p>
												Message #${i + 1}
												<p>
												</div>
												<button type="button">Delete</button>`;

				
					};

				}

				outputDiv.innerHTML += messageStructure;
				inputArea.value="";
		    }
	    });

    }
	Chatty.addReturnButton(inputArea);
}
//////////////////////////////////////////////////////
{
	let users = { "names": ["Axl", "Brett", "Paul", "Ozzy", "Klaus"]};
	let userSelectDiv = document.getElementById("users-radio");
	userSelectDiv.innerHTML = `<input type="radio" name="user" id="radio--defalut"" value="" checked>Select A User</input>`
	Chatty.userSelect = ()=> {
		for (let i = 0; i < users.names.length; i++) {
		let name = users.names[i];
		// console.log( "name", name );
		let radioHTML = `<input type="radio" name="user" id="radio--${i}"" value="${name}">${name}</input>`
		// console.log( "radioHTML", radioHTML );

		userSelectDiv.innerHTML += radioHTML;
		};
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







