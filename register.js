"use strict";
import "regenerator-runtime/runtime";

import auth from "./util/indexfireBase";
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = form["email"].value;
  const name = form["name"].value;
  const password = form["password"].value;
  const repeatedpassword = form["repeatedpassword"].value;

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred);
  });
});
