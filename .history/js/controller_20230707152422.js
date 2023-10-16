import {state, login} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.error);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
