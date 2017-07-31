console.log("remove.js loaded");
{
  let body = document.querySelector("body");
  let clearBTN = document.getElementById("clear-btn");
  let messageBox = document.getElementById("message-box");
  let divArr = [];
  body.addEventListener("click", function(e) {
    console.log(e.target.className);
    if (e.target.className === "deleteBtn") {
      messageBox.removeChild(e.target.parentNode);
      console.log(Number(e.target.parentNode.id));
      divArr.splice(Number(e.target.parentNode.id), 1);
      console.log(divArr);
    }
    Chatty.updateDom();
  })




  console.log(divArr);

  Chatty.clearAll = function(){
    emptyArr = [];
    messageBox.innerHTML = '';
    Chatty.updateDom();
  }


  clearBTN.addEventListener("click", Chatty.clearAll);

  Chatty.updateDom = function(){
    let pracDiv1 = document.createElement("div");
    pracDiv1.innerHTML = "hello world";
    pracDiv1.id = 0;
    let pracDelBtn1 = document.createElement("button");
    pracDelBtn1.classList.add("deleteBtn")
    pracDelBtn1.innerHTML = "Delete"
    pracDiv1.appendChild(pracDelBtn1);
    divArr.push(pracDiv1);

    let pracDiv = document.createElement("div");
    pracDiv.innerHTML = "goodbye world";
    pracDiv.id = 1;
    let pracDelBtn = document.createElement("button");
    pracDelBtn.classList.add("deleteBtn")
    pracDelBtn.innerHTML = "Delete"
    pracDiv.appendChild(pracDelBtn);
    divArr.push(pracDiv);

    let pracDiv2 = document.createElement("div");
    pracDiv2.innerHTML = "goodbye world of mine";
    pracDiv2.id = 2;
    let pracDelBtn2 = document.createElement("button");
    pracDelBtn2.classList.add("deleteBtn")
    pracDelBtn2.innerHTML = "Delete"
    pracDiv2.appendChild(pracDelBtn2);
    divArr.push(pracDiv2);

    for (var i = 0; i < divArr.length; i++) {
      let eachMessage = divArr[i];
      messageBox.appendChild(eachMessage);
    }
  }

  Chatty.updateDom();
}
