//functions

function emptyInputsFields() {
  let fields = [];
  fields.push(document.getElementById("publicServerNameInput"));
  fields.push(document.getElementById("privateServerNameInput"));
  fields.push(document.getElementById("privateServerPasswordInput"));
  fields.push(document.getElementById("joinPrivateServerPassword"));
  fields.push(document.getElementById("joinPrivateServerName"));

  for (let i = 0; i < fields.length; i++) {
    fields[i].value = "";
  }
}
function disableAllButtonActives() {
  let elements = [];
  elements.push(document.getElementById("createServer-btn"));
  elements.push(document.getElementById("joinPublicServer-btn"));
  elements.push(document.getElementById("joinPrivateServer-btn"));
  for (let i = 0; i < elements.length; i++) {
    //first remove them so you dont have dubble classes 
    elements[i].classList.remove("active");
    elements[i].classList.remove("notActive");
    //then add the notActive class
    elements[i].classList.add("notActive");
  }
}

function disableAllCanvases() {
  let elements = [];
  elements.push(document.getElementById("createServer"));
  elements.push(document.getElementById("joinPublicServer"));
  elements.push(document.getElementById("joinPrivateServer"));
  elements.push(document.getElementById("canvas"));
  elements.push(document.getElementById("waitingForOtherPlayer"));
  for (let i = 0; i < elements.length; i++) {
    //first remove them so you dont have dubble classes 
    elements[i].classList.remove("active");
    elements[i].classList.remove("notActive");
    //then add the notActive class
    elements[i].classList.add("notActive");
  }
}

function loadGame() {
  disableAllCanvases();
}

function showMenu(menu) {
  switch (menu) {
    // lobby
    case "menu":
      document.getElementById("menu").classList.remove("notActive");
      document.getElementById("menu").classList.remove("active");
      document.getElementById("menu").classList.add("active");

      document.getElementById("menu2").classList.remove("notActive");
      document.getElementById("menu2").classList.remove("active");
      document.getElementById("menu2").classList.add("notActive");
      break;
    // when canvas is true
    case "menu2":
      document.getElementById("menu").classList.remove("notActive");
      document.getElementById("menu").classList.remove("active");
      document.getElementById("menu").classList.add("notActive");

      document.getElementById("menu2").classList.remove("notActive");
      document.getElementById("menu2").classList.remove("active");
      document.getElementById("menu2").classList.add("active");
      break;
  }
}
function activeById(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById(id).classList.remove("notActive");
  document.getElementById(id).classList.add("active");
}

function deActiveById(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById(id).classList.remove("notActive");
  document.getElementById(id).classList.add("notActive");
}