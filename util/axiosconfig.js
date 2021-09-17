import "regenerator-runtime/runtime";
import axios from "axios";

//la partie provider qui se repete pour chaque requete http
export default axios.create({
  baseURL: "https://task-app-eb3cf-default-rtdb.firebaseio.com/",
});
