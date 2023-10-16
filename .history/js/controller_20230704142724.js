import {data, LoadData} from "./model.js";

const controllLoadData = async () => {
  try {
   await LoadData
  } catch (err) {
    console.log("Error in load data", err);
  }
};
