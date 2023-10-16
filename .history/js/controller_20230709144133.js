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

window.addEventListener("load", () => {
  KeepUserLogin();
  if (state.islogin) {
    const data = state.data.transaction.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    Graph1View.render(data);
  } else {
    LoginView.showForm();
  }
});

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
  Graph1View.mouseEnter();
  
};

init();
