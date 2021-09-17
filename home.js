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
    check: false,
  };
  axios.post("list.json", item).then((res) => {
    console.log(res.data.name);
    item.id = res.data.name;
    displayContent(item);
  });
  //display item
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
      ${data.check === true ? '<hr class="hr">' : ""}
      </div>
      <div class="d-flex">
        <button data-id=${
          data.id
        } class="btn delete_btn btn-outline-danger mx-1">delete</button>
        <button data-id=${
          data.id
        } class="btn updatebtn btn-outline-primary mx-1">update</button>
       ${
         data.check === false
           ? `<button data-id=${data.id} class="btn btnCheck btn-outline-warning mx-1">check</button>`
           : ""
       }
        
      </div>
    </li>
  `;
  container.innerHTML += html;
};

/// delete btn
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    if (window.confirm("are you sure")) {
      //delete from db
      const idTarget = e.target.dataset.id;
      axios.delete("./list/" + idTarget + ".json").then((res) => {
        const newTable = alldata.filter((item) => item.id !== idTarget);
        alldata = newTable;
      });

      ///delete from view
      document
        .querySelector(`.delete_btn[data-id="${idTarget}"]`)
        .parentElement.parentElement.remove();
    }
  }
});

// update btn
let currentId;
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("updatebtn")) {
    const targetId = e.target.dataset.id;
    currentId = targetId;
    document.querySelector(".editOptions").classList.remove("d-none");
    const currentObject = alldata.find((item) => item.id === currentId);
    console.log(currentObject);
    input.value = currentObject.content;
  }
});

document.querySelector(".cancelbtn").addEventListener("click", () => {
  input.value = "";
  document.querySelector(".editOptions").classList.add("d-none");
});
document.querySelector(".editbtn").addEventListener("click", () => {
  const updatedcontent = {
    id: currentId,
    content: input.value,
  };
  axios.put("list/" + currentId + ".json", updatedcontent);
  const newdata = alldata.find((item) => item.id === currentId);
  newdata.content = input.value;
  document.querySelector(
    `.updatebtn[data-id="${currentId}"]`
  ).parentElement.previousElementSibling.innerHTML = `${newdata.id} : ${newdata.content}`;
  input.value = "";
});

////
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnCheck")) {
    const elementid = e.target.dataset.id;
    const data = alldata.find((item) => item.id == elementid);
    data.check = true;
    axios.put("list/" + elementid + ".json", data).then((res) => {
      const data = alldata.find((item) => item.id == elementid);
      data.check = true;
    });
    e.target.parentElement.previousElementSibling.innerHTML +=
      '<hr class="hr">';
    e.target.remove();
  }
});

//// check and search
