"use strict";

import axios from "./util/axiosconfig.js";

let test = {
  name: "skye",
  last: "ayyad",
};
axios.post("list.json", test).then((res) => {
  console.log(res);
});
