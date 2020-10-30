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
  });
  document.getElementById("joinPrivateServer-btn").addEventListener('click', () => {
    //first set everything to not active.
    disableAllCanvases();
    disableAllButtonActives();
    activeById("joinPrivateServer");
    activeById("joinPrivateServer-btn");
    showMenu("menu");
  });
  document.getElementById("leave-btn").addEventListener('click', () => {
    //first set everything to not active.
    disableAllCanvases();
    disableAllButtonActives();
    activeById("createServer-btn");
    activeById("createServer");
    showMenu("menu");
  });
  
  //functions
  function disableAllButtonActives(){
    document.getElementById("createServer-btn").classList.remove("active");
    document.getElementById("joinPublicServer-btn").classList.remove("active");
    document.getElementById("joinPrivateServer-btn").classList.remove("active");
  
    document.getElementById("createServer-btn").classList.remove("notActive");
    document.getElementById("joinPublicServer-btn").classList.remove("notActive");
    document.getElementById("joinPrivateServer-btn").classList.remove("notActive");
  
    document.getElementById("createServer-btn").classList.add("notActive");
    document.getElementById("joinPublicServer-btn").classList.add("notActive");
    document.getElementById("joinPrivateServer-btn").classList.add("notActive");
  }
  function disableAllCanvases() {
    document.getElementById("createServer").classList.remove("active");
    document.getElementById("joinPublicServer").classList.remove("active");
    document.getElementById("joinPrivateServer").classList.remove("active");
    document.getElementById("canvas").classList.remove("active");
  
    document.getElementById("createServer").classList.remove("notActive");
    document.getElementById("joinPublicServer").classList.remove("notActive");
    document.getElementById("joinPrivateServer").classList.remove("notActive");
    document.getElementById("canvas").classList.remove("notActive");
  
    document.getElementById("createServer").classList.add("notActive");
    document.getElementById("joinPublicServer").classList.add("notActive");
    document.getElementById("joinPrivateServer").classList.add("notActive");
    document.getElementById("canvas").classList.add("notActive");
  }
  function loadCanvas() {
    disableAllCanvases();
    document.getElementById("canvas").classList.remove("notActive");
    document.getElementById("canvas").classList.add("active");
    showMenu("menu2");
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
  function activeById(id){
    document.getElementById(id).classList.add("active");
    document.getElementById(id).classList.remove("notActive");
  }