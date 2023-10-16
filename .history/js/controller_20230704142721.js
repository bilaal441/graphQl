import {data, LoadData} from "./model.js";

const controllLoadData = async () => {
  try {
    LoadData
  } catch (err) {
    console.log("Error in load data", err);
  }
};
