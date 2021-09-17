"use strict";

import axios from "./util/axiosconfig.js";

const input = document.querySelector(".input");
const container = document.querySelector(".list_container");
let alldata = [];

///add
document.querySelector(".addbtn").addEventListener("click", () => {
  if (input.value === "") return;
  const item = {
    id: String(Date.now()),
    content: input.value,
  };
  axios.post("list.json", item).then((res) => {
    console.log(res);
  });
  //display item
  displayContent(item);
  //emptying input
  input.value = "";
});

///getting the data and putting it in alldata state
axios.get("/list.json").then(({ data }) => {
  const thedata = Object.entries(data);
  for (const [key, value] of thedata) {
    value.id = key;
    alldata.push(value);
  }
  ///displaying it when page reloads
  alldata.forEach((item) => {
    displayContent(item);
  });
});


// function that displays the content
const displayContent = function (data) {
  let html = `
    <li
      class="
        list-group-item
        align-items-center
        d-flex
        justify-content-between
      "
    > 
      <div class="content">${data.id} : ${data.content}
      </div>
      <div class="d-flex">
        <button data-id=${data.id} class="btn delete_btn btn-outline-danger mx-1">delete</button>
        <button data-id=${data.id} class="btn updatebtn btn-outline-primary mx-1">update</button>
        <button data-id=${data.id} class="btn btnCheck btn-outline-warning mx-1">check</button>
      </div>
    </li>
  `;
  container.innerHTML += html;
};
