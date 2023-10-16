import {state, login, fetchData} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
    await fetchData();



  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.message);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

window.addEventListener("load", function() {

});





init();



