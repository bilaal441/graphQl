import {data,login} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async ({email, password}) => {
  try {
    await login();
  } catch (err) {
    console.log("Error in load data", err);
  }
};



const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
