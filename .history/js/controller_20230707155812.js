import {state, login, fetchData, query} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
     awaitfetchData()




  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.message);
  }
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
