import {data, LoadData} from "./model.js";

const controllLogin = async ({}) => {
  try {
    await LoadData();
    // console.log(data);
  } catch (err) {
    console.log("Error in load data", err);
  }
};

const init = () => {
  controllLoadData();
};










init();
