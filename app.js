// Namespace app

const app = {};

// Global variables
app.nav = document.getElementsByClassName("navLinks")[0];
app.menuBg = document.getElementsByClassName("menuBg")[0];
app.navLink = [...document.getElementsByClassName("navLink")]; // Spred operator converts HTML collection into an array

// Toggle menu open and close

// Add event listener to the nav menu to listen for open and close clicks
app.menuListener = () => {
  // **********************************************
  // Menu open listener
  // **********************************************
  const openBtn = document.getElementsByClassName("openMenuBtn")[0];

  // Open if btn is clicked
  openBtn.addEventListener("click", app.openMenu);

  // Open if enter or space is pressed
  openBtn.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      app.openMenu();
    }
  });

  // Close if a nav link is clicked
  openBtn.addEventListener("click", app.openMenu);

  // **********************************************
  // Menu close listener
  // **********************************************

  const closeBtn = document.getElementsByClassName("closeMenuBtn")[0];

  // Close if btn is clicked
  closeBtn.addEventListener("click", app.closeMenu);

  // Close if enter or space is pressed
  closeBtn.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      app.closeMenu();
    }
  });

  // Close if the blurred background is clicked
  app.menuBg.addEventListener("click", app.closeMenu);

  // Close if a nav link is clicked or pressed
  console.log(app.navLink);
  app.navLink.forEach((link) => {
    link.addEventListener("click", app.closeMenu);
    link.addEventListener("keydown", (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        app.closeMenu();
      }
    });
  });
};

app.openMenu = () => {
  app.nav.classList.add("open");
  app.menuBg.classList.add("dimBg");
};

app.closeMenu = () => {
  app.nav.classList.remove("open");
  app.menuBg.classList.remove("dimBg");
};

// Call functions on initialization
app.menuListener();
