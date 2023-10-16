import {data, LoadData} from "./model.js";
import LoginView from "./view/LoginView.js";
const controllLogin = async ({email, password}) => {
  try {
    await LoadData();
  } catch (err) {
    console.log("Error in load data", err);
  }
};

const init = () => {
  LoginView.

};

init();
