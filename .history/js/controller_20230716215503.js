import {
  state,
  login,
  fetchData,
  KeepUserLogin,
  filterXPByDate,
  sortTransaction,
  forMatskills,
  formatSection1Data,
} from "./model.js";
import LoginView from "./view/LoginView.js";
import Graph1View from "./view/graph1View.js";
import Graph2View from "./view/graph2View.js";
import sectionView from "./view/sectionView.js";

const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
    await fetchData();
    sortTransaction();
    const data = filterXPByDate("", state.data.transaction);
 
    Graph1View.showGraphSection();
    Graph1View.render(data);
    Graph1View.mouseEnter();
    const skills = forMatskills();
    Graph2View.render(skills);
    sectionView.render(formatSection1Data());
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
    Graph1View.showGraphSection();
    Graph1View.mouseEnter();
    const skills = forMatskills();
    Graph2View.render(skills);
    sectionView.render(formatSection1Data());
  } else {
    LoginView.showForm();
    Graph1View.hiddeGraphSection();
  }
};

const controllGraph1userSelect = (value) => {
  const data = filterXPByDate(value, state.data.transaction);
  Graph1View.render(data);
  Graph1View.mouseEnter();
};

const controllLogout = () => {
  state.islogin = false;
  LoginView.showForm();
  localStorage.removeItem("userData");
  localStorage.removeItem("jwt");
  Graph1View.hiddeGraphSection();
  sectionView.clear();
};

const init = () => {
  controlUpdateUI();
  LoginView.loginSubmissionHandler(controllLogin);
  Graph1View.filterXpGrap1Handler(controllGraph1userSelect);
  sectionView.logoutHandler(controllLogout);
};

init();
