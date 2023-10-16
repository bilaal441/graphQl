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

    // Sample data
    const data = state.data.transaction;
    console.log(data);

    // Dimensions
    const width = 800;
    const height = 300;
    const padding = 40;

    // Calculate scales
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale =
      (height - padding * 2) /
      (Math.max(...data.map((el) => el.amount)) -
        Math.min(...data.map((el) => el.amount)));

    // Build SVG markup
    let svgMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <line x1="${padding}" y1="${height - padding}" x2="${
      width - padding
    }" y2="${height - padding}" stroke="none" />
    <line x1="${padding}" y1="${
      height - padding
    }" x2="${padding}" y2="${padding}" stroke="none" />
    <polyline points="${data
      .map((el) => el.amount)
      .map(
        (d, i) => `${padding + i * xScale},${height - (padding + d * yScale)}`
      )
      .join(" ")}" fill="none" stroke="blue" stroke-width="2" />`;

    // Add interactive dots at each data point
    data.forEach((el, i) => {
      const dotRadius = 2; // Adjust the radius of the dots
      svgMarkup += `
    <circle
      cx="${padding + i * xScale}"
      cy="${height - (padding + el.amount * yScale)}"
      r="${dotRadius}"
      fill="blue"
      class="data-point"
      data-amount="${el.amount}"
      data-date="${el.createdAt}"
    />
  `;
    });

    svgMarkup += `</svg>`;

    // Append SVG markup to the HTML
    document.body.insertAdjacentHTML("beforeend", svgMarkup);

    // Event listeners for interactive dots
    const dataPoints = document.querySelectorAll(".data-point");

    dataPoints.forEach((dot) => {
      dot.addEventListener("mouseenter", showTooltip);
      dot.addEventListener("mouseleave", hideTooltip);
    });

    // Show tooltip on mouseenter
    function showTooltip(event) {
      const dot = event.target;
      const amount = dot.getAttribute("data-amount");
      const date = dot.getAttribute("data-date");

      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = `Amount: ${amount}, Date: ${date}`;

      const dotRect = dot.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      console.log(dotRect.top,do);
      const tooltipTop = dotRect.top - tooltipHeight - 10;
      const tooltipLeft = dotRect.left - (tooltipWidth / 2 - dotRect.width / 2);

      tooltip.style.top = `${tooltipTop}px`;
      tooltip.style.left = `${tooltipLeft}px`;

      document.body.appendChild(tooltip);
    }

    // Hide tooltip on mouseleave
    function hideTooltip(event) {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    }
  }
});

const init = () => {
  LoginView.loginSubmissionHandler(controllLogin);
};

init();
