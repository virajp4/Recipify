let USERS = [
  {
    email: "test@gmail.com",
    password: "123456",
  },
];

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const logoutButton = document.getElementById("logoutButton");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const navItems = document.querySelectorAll(".nav-item");

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");
  const logoutButton = document.getElementById("logoutButton");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (isLoggedIn) {
    navItems.forEach((item, idx) => {
      if (idx == 1 || idx == 2) item.style.display = "block";
    });
    if (loginButton) loginButton.style.display = "none";
    if (signupButton) signupButton.style.display = "none";
    if (logoutButton) logoutButton.style.display = "block";
  } else {
    if (loginButton) loginButton.style.display = "block";
    if (signupButton) signupButton.style.display = "block";
    if (logoutButton) logoutButton.style.display = "none";
  }
});

if (loginForm)
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get("email");
    const password = formData.get("password");

    const user = USERS.find((user) => user.email === email && user.password === password);
    if (user) {
      alert("Successfully logged in");
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "index.html";
    } else {
      if (USERS.find((user) => user.email === email)) {
        alert("Invalid password");
      } else {
        alert("User not found");
      }
    }
  });

if (signupForm)
  document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get("email");
    const password = formData.get("password");

    if (USERS.find((user) => user.email === email)) {
      alert("User already exists");
    } else {
      USERS.push({ email, password });
      alert("Signup successful");
      localStorage.setItem("isLoggedIn", true);
    }
  });

if (logoutButton)
  document.getElementById("logoutButton").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
