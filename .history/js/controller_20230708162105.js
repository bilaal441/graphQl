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

// Example dataset
const data = [
  {date: "2023-07-01", xp: 100},
  {date: "2023-07-02", xp: 150},
  {date: "2023-07-03", xp: 120},
  // ... more data entries
];

// Dimensions
const width = 400;
const height = 300;
const padding = 40;

// Calculate scales
const xScale = (width - padding * 2) / (data.length - 1);
const yScale =
  (height - padding * 2) / Math.max(...data.map((entry) => entry.xp));

// Generate SVG markup
const svgMarkup = `
  <svg width="${width}" height="${height}">
    <line x1="${padding}" y1="${height - padding}" x2="${
  width - padding
}" y2="${height - padding}" stroke="black" />
    <line x1="${padding}" y1="${
  height - padding
}" x2="${padding}" y2="${padding}" stroke="black" />
    <polyline
      points="${data
        .map(
          (entry, i) =>
            `${padding + i * xScale},${height - (padding + entry.xp * yScale)}`
        )
        .join(" ")}"
      fill="none"
      stroke="blue"
      stroke-width="2"
    />
  </svg>
`;

// Insert SVG markup into the document
document
  .getElementById("graphContainer")
  .insertAdjacentHTML("beforeend", svgMarkup);
