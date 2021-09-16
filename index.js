"use strict";

const input = document.querySelector(".input");
const addbtn = document.querySelector(".addbtn");
const container = document.querySelector(".list_container");
let counter = 0;
let list = [];
if (localStorage.getItem("list") === null) {
  localStorage.setItem("list", JSON.stringify([]));
}
addbtn.addEventListener("click", () => {
  if (input.value === "") return;
  const theid = String(Date.now());
  let item = { id: theid, content: input.value };

  //////display in window
  let html = `
    <li
    class="
      list-group-item
      align-items-center
      d-flex
      justify-content-between
    "
  >
    <div>${item.id} : ${item.content}</div>
    <div class="d-flex">
      <button data-id=${item.id} class="btn delete_btn btn-outline-danger mx-1">delete</button>
      <button class="btn btn-outline-primary mx-1">update</button>
      <button class="btn btn-outline-warning mx-1">check</button>
    </div>
  </li>
`;
  container.innerHTML += html;

  /// register to local

  if (localStorage.getItem("list") === null) {
    localStorage.setItem("list", JSON.stringify([]));
  }
  let fromLocal = JSON.parse(localStorage.getItem("list"));
  fromLocal.push(item);
  localStorage.setItem("list", JSON.stringify(fromLocal));
  ///emptying the input
  input.value = "";
});

const renderlist = function () {
  const items = JSON.parse(localStorage.getItem("list"));
  if (items !== null)
    items.forEach((item) => {
      let html = `
    <li
    class="
      list-group-item
      align-items-center
      d-flex
      justify-content-between
    "
  >
    <div>${item.id} : ${item.content}</div>
    <div class="target d-flex">
      <button data-id=${item.id} class="btn delete_btn btn-outline-danger mx-1">delete</button>
      <button class="btn btn-outline-primary mx-1">update</button>
      <button class="btn btn-outline-warning mx-1">check</button>
    </div>
  </li>
    `;
      container.innerHTML += html;
    });
};
renderlist();
document.querySelector(".list_container").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
         ///updating the ui
    e.target.parentElement.parentElement.remove();
    //updating the local storage
    const id = e.target.dataset.id;
    let oldarray = JSON.parse(localStorage.getItem("list"));
    const newArray = oldarray.filter((item) => item.id != id);
    localStorage.setItem("list", JSON.stringify(newArray));
  }
});

/// delete from  local storage
/// update from local storage
/// check form local storage true or false
