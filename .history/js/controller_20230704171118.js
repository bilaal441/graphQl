import {data, LoadData} from "./model.js";

const controllLogin = async ({email, passw }) => {
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
