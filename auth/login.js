import "regenerator-runtime/runtime";
import axios from "../util/axiosconfig.js";
import app from "../util/indexfireBase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form["email"].value;
  const password = form["password"].value;
  if (email === "" || password === "") return;
  signInWithEmailAndPassword(auth, email, password).then((res) => {
    
    if (res.user) window.location.href = "../index.html";
  });
});
