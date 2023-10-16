import {data, login} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
    
  } catch (err) {
    console.log("Error in load data", err);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
