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
const data = [0, 20, 35, 10, 45, 30, 50];

// Dimensions
const width = 400;
const height = 300;
const padding = 40;

// Create SVG container
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
document.body.appendChild(svg);

// Calculate data range
const yRange = Math.max(...data) - Math.min(...data);

// Calculate scales
const xScale = (width - padding * 2) / (data.length - 1);
const yScale = (height - padding * 2) / yRange;

// Draw axes
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxis.setAttribute("x1", padding);
xAxis.setAttribute("y1", height - padding);
xAxis.setAttribute("x2", width - padding);
xAxis.setAttribute("y2", height - padding);
xAxis.setAttribute("stroke", "black");
svg.appendChild(xAxis);

const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxis.setAttribute("x1", padding);
yAxis.setAttribute("y1", height - padding);
yAxis.setAttribute("x2", padding);
yAxis.setAttribute("y2", padding);
yAxis.setAttribute("stroke", "black");
svg.appendChild(yAxis);

// Draw line graph
const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
line.setAttribute(
  "points",
  data
    .map((d, i) => `${padding + i * xScale},${height - (padding + d * yScale)}`)
    .join(" ")
);
line.setAttribute("fill", "none");
line.setAttribute("stroke", "blue");
line.setAttribute("stroke-width", "2");
svg.appendChild(line);
