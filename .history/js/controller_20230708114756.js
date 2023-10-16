import {state, login, fetchData} from "./model.js";
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

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

window.addEventListener("load", function() {
  // Retrieve the data from local storage
  var storedData = localStorage.getItem("myData");

  // Check if the data exists in local storage
  if (storedData) {
    // Convert the retrieved data from a string to an array
    var dataList = JSON.parse(storedData);

    // Use the data to populate your list or perform other actions
    populateList(dataList);
  }
});





init();



