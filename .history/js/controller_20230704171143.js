import {data, LoadData} from "./model.js";
import {} from 
const controllLogin = async ({email, password}) => {

  try {
    await LoadData();
  } catch (err) {
    console.log("Error in load data", err);
  }
};

const init = () => {
  controllLoadData();
};

init();