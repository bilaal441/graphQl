import {state, login, fetchData, KeepUserLogin} from "./model.js";
import LoginView from "./view/LoginView.js";
import Graph1View from "./view/graph1View.js";

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
  Graph1View.mouseEnter();
  Graph1View.filterXpGrap1Handler();
};

init();
