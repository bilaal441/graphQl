import {state, login, fetchData, KeepUserLogin} from "./model.js";
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

window.addEventListener("load", () => {
  KeepUserLogin();
  if (state.islogin) {
    LoginView.hiddeForm();
  }
});

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();

// Sample data
const data = [20, 35, 10, 45, 30, 50, 20, 35, 10, 45, 30, 50];

// Dimensions
const width = 400;
const height = 300;
const padding = 40;

// Calculate scales
const xScale = (width - padding * 2) / (data.length - 1);
const yScale = (height - padding * 2) / (Math.max(...data) - Math.min(...data));

// Build SVG markup
let svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <line x1="${padding}" y1="${height - padding}" x2="${
  width - padding
}" y2="${height - padding}" stroke="black" />
    <line x1="${padding}" y1="${
  height - padding
}" x2="${padding}" y2="${padding}" stroke="black" />
    <polyline points="${data
      .map(
        (d, i) => `${padding + i * xScale},${height - (padding + d * yScale)}`
      )
      .join(" ")}" fill="none" stroke="blue" stroke-width="2" />
`;

// Add dots at each data point
data.forEach((d, i) => {
  svgMarkup += `
    <circle cx="${padding + i * xScale}" cy="${
    height - (padding + d * yScale)
  }" r="4" fill="blue" />
  `;
});

svgMarkup += "</svg>";

// Append SVG markup to the HTML
document.body.insertAdjacentHTML("beforeend", svgMarkup);
