import {
  state,
  login,
  fetchData,
  KeepUserLogin,
  filterXPByDate,
} from "./model.js";
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

const controlUpdateUI = () => {
  KeepUserLogin();
  if (state.islogin) {
    const data = state.data.transaction.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    Graph1View.render(data);
  }
};

const controllGraph1userSelect = (value) => {
  const data = filterXPByDate(value, state.data.transaction);
  console.log()
  Graph1View.render(data);
};

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
  controlUpdateUI();
  Graph1View.mouseEnter();
  Graph1View.filterXpGrap1Handler(controllGraph1userSelect);
};

init();
