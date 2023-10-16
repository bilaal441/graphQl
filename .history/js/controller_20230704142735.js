import {data, LoadData} from "./model.js";

const controllLoadData = async () => {
  try {
   await LoadData()
   console
  } catch (err) {
    console.log("Error in load data", err);
  }
};
