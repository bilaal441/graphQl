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
    const skills = state.data.transactions
      .filter((skill) => skill.path.includes("/london/div-01/"))
      .reduce((grouped, skill) => {
        if (grouped.hasOwnProperty(skill.type)) {
          grouped[skill.type] += skill.amount;
        } else {
          grouped[skill.type] = skill.amount;
        }
        return grouped;
      }, {});

    const total = Object.values(skills).reduce(
      (sum, amount) => sum + amount,
      0
    );
    const minPercentage = 0.05;
    const filteredSkills = {};

    for (const [name, amount] of Object.entries(skills)) {
      const percentage = amount / total;
      if (percentage >= minPercentage) {
        filteredSkills[name] = amount;
      }
    }

    
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
