

document.getElementById("createPrivateServer-btn").addEventListener('click', () => {
  let name = document.getElementById("privateServerNameInput");
  let password = document.getElementById("privateServerPasswordInput");
  if (name.value === '') {
    alert("vul wel een naam in voor je server")
    return;
  }
  if (password.value === '') {
    alert("vul wel een password in voor je server")
    return;
  }
  socket.emit('createServer', true, name.value, password.value)
  loadGame();
  emptyInputsFields();
});

document.getElementById("createPublicServer-btn").addEventListener('click', () => {
  let name = document.getElementById("publicServerNameInput");
  if (name.value === '') {
    alert("vul wel een naam in voor je server")
    return;
  }
  socket.emit('createServer', false, name.value, null)
  loadGame();
  emptyInputsFields();
});


document.getElementById("createServer-btn").addEventListener('click', () => {
  //first set everything to not active.
  disableAllCanvases();
  disableAllButtonActives();
  activeById("createServer");
  activeById("createServer-btn");
  showMenu("menu");
});
document.getElementById("joinPublicServer-btn").addEventListener('click', () => {
  //first set everything to not active.
  disableAllCanvases();
  disableAllButtonActives();
  activeById("joinPublicServer");
  activeById("joinPublicServer-btn");
  showMenu("menu");

  socket.emit("getAllPublicGames");
});
document.getElementById("joinPrivateServer-btn").addEventListener('click', () => {
  //first set everything to not active.
  disableAllCanvases();
  disableAllButtonActives();
  activeById("joinPrivateServer");
  activeById("joinPrivateServer-btn");
  showMenu("menu");
});

document.getElementById("joiningPrivateServer-btn").addEventListener('click', () => {
  let name = document.getElementById("joinPrivateServerName");
  let password = document.getElementById("joinPrivateServerPassword");
  if (name.value === '') {
    alert("geef wel een naam mee");
    return;
  }

  if (password.value === '') {
    alert("geef wel een password mee");
    return;
  }

  socket.emit("joinPrivateServer", name.value, password.value);
  emptyInputsFields();
});

document.getElementById("leave-btn").addEventListener('click', () => {
  //first set everything to not active.
  disableAllCanvases();
  disableAllButtonActives();
  activeById("createServer-btn");
  activeById("createServer");
  showMenu("menu");
  emptyInputsFields();
  socket.emit('leaved');
});

function JoinServer(button){
  console.log("maar ik kom hier we");
  let name = button.innerText;
  socket.emit("joinPublicServer", name);
}

document.getElementById("updatePublicServer-button").addEventListener('click', ()=>{
  console.log("ik kom hier");
  socket.emit("getAllPublicGames");
})

