// Namespace app

const app = {};

// Global variables
app.nav = document.getElementsByClassName("navLinks")[0];
app.menuBg = document.getElementsByClassName("menuBg")[0];

// **********************************************
// Apply nav style based on user scroll
// **********************************************

// Listen for scroll events to determine the style to apply
app.scrollListener = () => {
  document.addEventListener("scroll", app.applyNavStyle);
};

// Apply styles based on scroll position
app.applyNavStyle = () => {
  const scrollY = window.scrollY;

  const navEl = document.querySelector("nav");

  if (scrollY > 75) {
    navEl.classList.add("addBoxShadow");
  } else {
    navEl.classList.remove("addBoxShadow");
  }
};

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
  const contactIcons = [...document.querySelectorAll(".contactIcon")];
  const navEl = document.querySelector("nav");

  // Dark mode
  if (e.target.checked) {
    body.classList.add("contrast");
    openMenuIcon.classList.add("contrastIcon");
    openMenuText.classList.add("contrastIcon");
    logo.setAttribute("src", "./assets/logoAlt.png");
    navEl.classList.add("contrast");

    navLinks.forEach((link) => {
      link.classList.add("contrast");
    });

    contactIcons.forEach((link) => {
      link.classList.add("contrastIcon");
    });
  }

  // Light mode
  else {
    body.classList.remove("contrast");
    openMenuIcon.classList.remove("contrastIcon");
    openMenuText.classList.remove("contrastIcon");
    navEl.classList.remove("contrast");
    logo.setAttribute("src", "./assets/logo.png");

    navLinks.forEach((link) => {
      link.classList.remove("contrast");
    });
    contactIcons.forEach((link) => {
      link.classList.remove("contrastIcon");
    });
  }
};

// **********************************************
// Name animations
// **********************************************

app.nameAnimation = () => {
  const spans = document.querySelectorAll(".word span");

  spans.forEach((span, index) => {
    span.addEventListener("click", (e) => {
      e.target.classList.add("active");
    });
    span.addEventListener("animationend", (e) => {
      e.target.classList.remove("active");
    });

    // Initial animation
    setTimeout(() => {
      span.classList.add("active");
    }, 600 * (index + 1));
  });
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
  openBtn.addEventListener("click", () => {
    app.openMenu();
    app.addNavStyles();
  });

  // Open if enter or space is pressed
  openBtn.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      app.openMenu();
      app.addNavStyles();
    }
  });

  // -----------------------------------------
  // Menu close listeners
  // -----------------------------------------

  const closeBtn = document.getElementsByClassName("closeMenuBtn")[0];

  // Close if btn is clicked
  closeBtn.addEventListener("click", () => {
    app.closeMenu();
    app.removeNavStyles();
  });

  // Close if enter or space is pressed
  closeBtn.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      app.closeMenu();
      app.removeNavStyles();
    }
  });

  // Close if the blurred background is clicked
  app.menuBg.addEventListener("click", () => {
    app.closeMenu();
    app.removeNavStyles();
  });

  // Close if a nav link is clicked or pressed
  const navLinks = [...document.getElementsByClassName("navLink")]; // Spread operator converts HTML collection into an array

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      app.closeMenu();
      app.removeNavStyles();
    });

    link.addEventListener("keydown", (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        app.closeMenu();
        app.removeNavStyles();
      }
    });
  });
};

// Opens nav menu
app.openMenu = () => {
  app.nav.classList.add("open");
  app.menuBg.classList.add("dimBg");
};

// Apply certain styles to the nav when the menu is opened
app.addNavStyles = () => {
  const navEl = document.querySelector("nav");
  navEl.classList.add("transparentBg");
  navEl.classList.remove("addBoxShadow");

  const leftNavEl = document.getElementsByClassName("leftNav")[0];
  leftNavEl.classList.add("addFilter");
};

// Closes nav menu
app.closeMenu = () => {
  app.nav.classList.remove("open");
  app.menuBg.classList.remove("dimBg");
};

// Apply certain styles to the nav when the menu is closed
app.removeNavStyles = () => {
  const navEl = document.querySelector("nav");
  navEl.classList.remove("transparentBg");

  // Applies certain styles to the nav based on the user's scroll
  app.applyNavStyle();

  const leftNavEl = document.getElementsByClassName("leftNav")[0];
  leftNavEl.classList.remove("addFilter");
};

// **********************************************
// Navigate back to home
// **********************************************

app.navBtnListener = () => {
  window.addEventListener("scroll", (e) => {
    const yScroll = window.scrollY;

    const homeBtn = document.getElementsByClassName("homeBtn")[0];

    if (yScroll >= 100) {
      homeBtn.classList.remove("hideBtn");
    } else {
      homeBtn.classList.add("hideBtn");
    }
  });
};

app.homeBtnListener = () => {
  const homeBtn = document.getElementsByClassName("homeBtn")[0];

  homeBtn.addEventListener("click", app.scrollHome);
  homeBtn.addEventListener("keypress", (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      app.scrollHome;
    }
  });
};

app.scrollHome = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
// Dynamically update the copyright year to the footer
// **********************************************

app.footerText = () => {
  const year = new Date().getFullYear();

  const footerText = document.getElementsByClassName("footerText")[0];
  footerText.innerHTML = `${year} &copy | Designed and coded by Kaunain Karmali`;
};

// **********************************************
// Call functions on start
// **********************************************

app.init = () => {
  // Call functions on
  app.scrollListener();
  app.toggleThemeListener();
  app.menuListener();
  app.nameAnimation();
  app.navBtnListener();
  app.homeBtnListener();
  app.formListener();
  app.footerText();
};

app.init();
