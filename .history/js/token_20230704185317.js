import {requestToken} from "@01-edu/api";

const z01Credianls = {
  domain: "learn.01founders.co",
  accesToken: process.env.API_KEY,
};



const token =  await requestToken(z01Credianls)