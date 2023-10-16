import {state, login, fetchData, KeepUserLogin} from "./model.js";
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

window.addEventListener("load", () => {
  if (state.islogin) {
    LoginView.hiddeForm();
  }
});

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
