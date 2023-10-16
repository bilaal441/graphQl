import {state, login} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
  } catch (err) {
    console.log("Error in load data", err);
    LoginView.err(err.message);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
