import {
  state,
  login,
  fetchData,
  KeepUserLogin,
  filterXPByDate,
  sortTransaction,
} from "./model.js";
import LoginView from "./view/LoginView.js";
import Graph1View from "./view/graph1View.js";

const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
    await fetchData();
    sortTransaction();
    const data = filterXPByDate("", state.data.transaction);
    Graph1View.render(data);
    Graph1View.mouseEnter();
  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.message);
  }
};

const controlUpdateUI = () => {
  KeepUserLogin();
  if (state.islogin) {
    sortTransaction();
    const data = filterXPByDate("", state.data.transaction);
    Graph1View.render(data);
    Graph1View.mouseEnter();
    // const {transactions: skills} = state.data;

   




    
  } else {
    LoginView.showForm();
  }
};

const controllGraph1userSelect = (value) => {
  const data = filterXPByDate(value, state.data.transaction);
  Graph1View.render(data);
  Graph1View.mouseEnter();
};

const init = () => {
  controlUpdateUI();
  LoginView.loginSubmissionHandler(controllLogin);
  Graph1View.filterXpGrap1Handler(controllGraph1userSelect);
};

init();
