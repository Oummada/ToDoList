"use strict";

const input = document.querySelector(".input");
const addbtn = document.querySelector(".addbtn");
const container = document.querySelector(".list_container");
let counter = 0;
let list = [];
if (localStorage.getItem("list") === null) {
  localStorage.setItem("list", JSON.stringify([]));
}

const updateui = function (item) {
  let html = `
  <li
    class="
      list-group-item
      align-items-center
      d-flex
      justify-content-between
    "
  >
    <div class="">${item.id} : ${item.content}</div>
    <div class=" d-flex">
      <button data-id=${item.id} class="btn delete_btn btn-outline-danger mx-1">delete</button>
      <button data-id=${item.id} class="btn updatebtn btn-outline-primary mx-1">update</button>
      <button class="btn btn-outline-warning mx-1">check</button>
    </div>
  </li>
`;
  container.innerHTML += html;
};
addbtn.addEventListener("click", () => {
  if (input.value === "") return;
  const theid = String(Date.now());
  let item = { id: theid, content: input.value };

  //////display in window
  updateui(item);
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
      updateui(item);
    });
};
renderlist();

/// delete
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

/// update
let currentElementUpdates;
document
  .querySelector(".list_container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("updatebtn")) {
      currentElementUpdates = e.target.dataset.id;
      const currentItem = JSON.parse(localStorage.getItem("list")).find(
        (item) => item.id == currentElementUpdates
      );

      input.value = currentItem.content;
    }
    document.querySelector(".editOptions").classList.remove("d-none");
  });

document.querySelector(".editbtn").addEventListener("click", () => {
  console.log(currentElementUpdates);
  const list = JSON.parse(localStorage.getItem("list"));
  const something = list.find((item) => item.id == currentElementUpdates);
  something.content = input.value;
  localStorage.setItem("list", JSON.stringify(list));

  const it = document.querySelector(
    ` .updatebtn[data-id="${currentElementUpdates}"]`
  );
  it.parentElement.previousElementSibling.innerHTML = `${currentElementUpdates} : ${input.value} `;
});
document.querySelector(".cancelbtn").addEventListener("click", function () {
  input.value = "";
  document.querySelector(".editOptions").classList.add("d-none");
});
/// delete from  local storage
/// update from local storage
/// check form local storage true or false
