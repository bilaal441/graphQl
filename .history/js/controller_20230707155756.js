import {state, login, fe} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
 




  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.message);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
