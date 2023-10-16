import {state, login, fetchData, ke} from "./model.js";
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




window.addEventListener('load',  async ()=>{
  await


})




const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};



init();
