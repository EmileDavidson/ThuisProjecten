const socket = io();

const canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

//game page

//buttons
document.getElementById("createPrivateServer-btn").addEventListener('click', () => {
  let name = document.getElementById("privateServerNameInput");
  let password = document.getElementById("privateServerPasswordInput");
  if (name.value === '') {return;}
  if (password.value === '') {return;}
  socket.emit('createServer', true, name.value, password.value)
});

document.getElementById("createPublicServer-btn").addEventListener('click', () => {
  let name = document.getElementById("publicServerNameInput");
  if (name.value === '') {return;}
  socket.emit('createServer', false, name.value, null)
});


socket.on('disconnect', function () {
  socket = null;
  alert("server down");
});


