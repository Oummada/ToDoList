"use strict";
import "regenerator-runtime/runtime";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./util/indexfireBase";
const form = document.querySelector(".form");
const auth = getAuth();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form["email"].value;
  const name = form["name"].value;
  const password = form["password"].value;
  const repeatedpassword = form["repeatedpassword"].value;
  if (email === "" || name === "" || password === "") {
    alert("please fill all info");
    return;
  }
  if (password !== repeatedpassword) {
    alert("passwords are not matched");
    return;
  }
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    cred.user.displayName = name;
    form.reset();
    window.location.href = "./auth/login.html";
  });
});
