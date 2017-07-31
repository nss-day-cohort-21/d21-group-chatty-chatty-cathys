console.log("main.js loaded");

// Checkboxes change theme

var darkThemeBox = document.getElementById("dark-theme");
var largeTextBox = document.getElementById("large-text");
var body = document.getElementById("body");
var nav = document.getElementById("nav");
var messageBox = document.getElementById("message-box");

darkThemeBox.addEventListener("change", (event) => {
	if(darkThemeBox.checked === true) {
		body.classList.add("dark-theme");
		nav.classList.add("dark-theme");
	} else {
		body.classList.remove("dark-theme");
		nav.classList.remove("dark-theme");
	}

});

largeTextBox.addEventListener("change", (event) => {
	if(largeTextBox.checked === true) {
		messageBox.classList.add("large-text");
	} else {
		messageBox.classList.remove("large-text");
	}

});