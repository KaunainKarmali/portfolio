// Namespace app

const app = {};

// Global variables
app.nav = document.getElementsByClassName("navLinks")[0];
app.menuBg = document.getElementsByClassName("menuBg")[0];

// **********************************************
// Toggle light and dark mode
// **********************************************

app.toggleThemeListener = () => {
  const toggle = document.getElementById("toggle");

  toggle.addEventListener("click", app.toggleTheme);
};

app.toggleTheme = (e) => {
  const body = document.querySelector("body");
  const openMenuIcon = document.querySelector(".openMenuIcon");
  const openMenuText = document.querySelector(".openMenuText");
  const logo = document.querySelector(".logo");
  const navLinks = [...document.querySelectorAll(".navLink")];

  // Dark mode
  if (e.target.checked) {
    body.classList.add("contrast");
    openMenuIcon.classList.add("contrastIcon");
    openMenuText.classList.add("contrastIcon");
    logo.setAttribute("src", "./assets/logoAlt.png");

    navLinks.forEach((link) => {
      link.classList.add("contrast");
    });
  }

  // Light mode
  else {
    body.classList.remove("contrast");
    openMenuIcon.classList.remove("contrastIcon");
    openMenuText.classList.remove("contrastIcon");
    logo.setAttribute("src", "./assets/logo.png");
    navLinks.forEach((link) => {
      link.classList.remove("contrast");
    });
  }
};

// **********************************************
// Toggle menu open and close
// **********************************************

// Add event listener to the nav menu to listen for open and close clicks
app.menuListener = () => {
  // -----------------------------------------
  // Menu open listeners
  // -----------------------------------------
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

  // -----------------------------------------
  // Menu close listeners
  // -----------------------------------------

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
  const navLinks = [...document.getElementsByClassName("navLink")]; // Spread operator converts HTML collection into an array

  navLinks.forEach((link) => {
    link.addEventListener("click", app.closeMenu);
    link.addEventListener("keydown", (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        app.closeMenu();
      }
    });
  });
};

// Opens nav menu
app.openMenu = () => {
  app.nav.classList.add("open");
  app.menuBg.classList.add("dimBg");
};

// Closes nav menu
app.closeMenu = () => {
  app.nav.classList.remove("open");
  app.menuBg.classList.remove("dimBg");
};

// **********************************************
// Contact form submission
// **********************************************

app.formListener = () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    handleSubmit(e);
  });

  // Submit the form inputs to netlify and show success / failure messages to the user
  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = document.getElementById("contactForm");
    const formData = new FormData(myForm);

    const successMsg = document.getElementById("successMsg");
    const failMsg = document.getElementById("failMsg");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // Clear inputs
        document.getElementsByName("name")[0].value = "";
        document.getElementsByName("email")[0].value = "";
        document.getElementsByName("message")[0].value = "";

        // Show success message

        successMsg.classList.remove("hide");

        // Hide fail message (in case it is showing)
        failMsg.classList.add("hide");

        // Hide success message after a few seconds
        setTimeout(() => successMsg.classList.add("hide"), 3000);
      })
      .catch((error) => {
        // Show failure message
        failMsg.classList.remove("hide");

        // Hide success message (in case it is showing)
        successMsg.classList.add("hide");

        // Hide failure message after a few seconds
        setTimeout(() => failMsg.classList.add("hide"), 3000);
      });
  };
};

// **********************************************
// Call functions on start
// **********************************************

// Call functions on initialization
app.toggleThemeListener();
app.menuListener();
app.formListener();
