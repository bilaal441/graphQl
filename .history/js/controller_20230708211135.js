import {state, login, fetchData, KeepUserLogin, } from "./model.js";
import LoginView from "./view/LoginView.js";
import G from 'first'

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
    LoginView.hiddeForm();

    // Sample data
    const data = state.data.transaction.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
  }
});

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
