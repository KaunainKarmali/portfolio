// Namespace app

const app = {};

// Global variables
app.nav = document.getElementsByClassName("navLinks")[0];
app.menuBg = document.getElementsByClassName("menuBg")[0];

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

    let myForm = document.getElementById("contactForm");
    let formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Cont ent-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // Clear inputs
        document.getElementsByName("name")[0].value = "";
        document.getElementsByName("email")[0].value = "";
        document.getElementsByName("message")[0].value = "";

        // Show success message
        const successMsg = document.getElementById("successMsg");
        successMsg.classList.remove("hide");

        // Hide fail message (in case it is showing)
        const failMsg = document.getElementById("failMsg");
        failMsg.classList.add("hide");

        // Hide success message after a few seconds
        setTimeout(() => successMsg.classList.add("hide"), 3000);
      })
      .catch((error) => {
        // Show failure message
        const failMsg = document.getElementById("failMsg");
        failMsg.classList.remove("hide");

        // Hide success message (in case it is showing)
        const successMsg = document.getElementById("successMsg");
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
app.menuListener();
app.formListener();
