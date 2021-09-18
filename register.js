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

  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred);
  });
});
