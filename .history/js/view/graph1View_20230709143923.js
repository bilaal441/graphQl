import View from "./View.js";
class Graph1View extends View {
  parentEl = document.querySelector(".svg-graph");
  width = parseInt(getComputedStyle(this.parentEl).width);
  height = parseInt(getComputedStyle(this.parentEl).height);
  xpPostionsSelect = document.getElementById("xp-postions");
  padding = 40;
  generateMarkUp(data) {
    console.log(this.width, this.height);
    const xScale = (this.width - this.padding * 2) / (data.length - 1);
    const yScale =
      (this.height - this.padding * 2) /
      (Math.max(...data.map((el) => el.amount)) -
        Math.min(...data.map((el) => el.amount)));
    let svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${
      this.height
    }">
        <line x1="${this.padding}" y1="${this.height - this.padding}" x2="${
      this.width - this.padding
    }" y2="${this.height - this.padding}" stroke="none" />
        <line x1="${this.padding}" y1="${this.height - this.padding}" x2="${
      this.padding
    }" y2="${this.padding}" stroke="none" />
        <polyline points="${data
          .map((el) => el.amount)
          .map(
            (d, i) =>
              `${this.padding + i * xScale},${
                this.height - (this.padding + d * yScale)
              }`
          )
          .join(" ")}" fill="none" stroke="#164d71" stroke-width="2" />`;

    data.forEach((el, i) => {
      const dotRadius = 2;
      svgMarkup += `
        <circle
          cx="${this.padding + i * xScale}"
          cy="${this.height - (this.padding + el.amount * yScale)}"
          r="${dotRadius}"
          fill="#3498db"
          class="data-point"
          data-amount="${Math.round(el.amount / 1000)}"
          data-date="${el.createdAt}"
        />
     
      `;
    });

    svgMarkup += `</svg>`;

    return svgMarkup;
  }

  // Append SVG markup to the HTML
  // document.body.insertAdjacentHTML("beforeend", svgMarkup);

  // Event listeners for interactive dots
  // const
  mouseEnter() {
    const dataPoints = document.querySelectorAll(".data-point");
    dataPoints.forEach((dot) => {
      dot.addEventListener("mouseenter", this.showTooltip.bind(this));
      dot.addEventListener("mouseleave", this.hideTooltip.bind(this));
    });
  }

  // Show tooltip on mouseenter
  showTooltip(event) {
    const dot = event.target;
    const amount = dot.getAttribute("data-amount");
    const date = dot.getAttribute("data-date");
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = `${amount}KB Date: ${date}`;
    const dotRect = dot.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipTop = dotRect.top - tooltipHeight - 10;
    const tooltipLeft = dotRect.left - (tooltipWidth / 2 - dotRect.width / 2);
    tooltip.style.top = `${tooltipTop}px`;
    tooltip.style.left = `${tooltipLeft}px`;
    this.parentEl.append(tooltip);
  }

  // Hide tooltip on mouseleave
  hideTooltip(event) {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  }

  // addWindowRezise() {
  //   window.addEventListener("resize", () => {
  //     this.width = parseInt(getComputedStyle(this.parentEl).width);
  //   });
  // }

filterXpGrap1Handler(){

const xpPostionsSelect = document.getElementById("xp-postions");
const svgGraph = document.querySelector(".svg-graph");

// Sample graph data
const graphData = [
  { date: "2023-01-01", amount: 10 },
  { date: "2023-02-01", amount: 15 },
  { date: "2023-03-01", amount: 8 },
  { date: "2023-04-01", amount: 12 },
  { date: "2023-05-01", amount: 20 },
  { date: "2023-06-01", amount: 5 },
  { date: "2023-07-01", amount: 18 },
];

// Function to generate the graph based on the filtered data
function generateGraph(filteredData) {
  // Generate the graph using the filtered data
  // Replace this code with your actual graph generation logic

  console.log(filteredData);
}

// Event listener for the select input
xpPostionsSelect.addEventListener("change", function () {
  const selectedValue = this.value;
  let filteredData = [];

  // Apply the appropriate filter based on the selected value
  switch (selectedValue) {
    case "last week":
      filteredData = graphData.filter((data) => {
        // Logic to filter by the last week
        // Modify this condition according to your specific requirement
        const currentDate = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        const dataDate = new Date(data.date);
        return dataDate >= weekAgo && dataDate <= currentDate;
      });
      break;

    case "last month":
      // Logic to filter by the last month
      // Modify this condition according to your specific requirement
      filteredData = graphData.filter((data) => {
        const currentDate = new Date();
        const monthAgo = new Date();
        monthAgo.setMonth(currentDate.getMonth() - 1);
        const dataDate = new Date(data.date);
        return dataDate >= monthAgo && dataDate <= currentDate;
      });
      break;

    case "last 3 months":
      // Logic to filter by the last 3 months
      // Modify this condition according to your specific requirement
      filteredData = graphData.filter((data) => {
        const currentDate = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
        const dataDate = new Date(data.date);
        return dataDate >= threeMonthsAgo && dataDate <= currentDate;
      });
      break;

    case "last 6 months":
      // Logic to filter by the last 6 months
      // Modify this condition according to your specific requirement
      filteredData = graphData.filter((data) => {
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        const dataDate = new Date(data.date);
        return dataDate >= sixMonthsAgo && dataDate <= currentDate;
      });
      break;

    default:
      // No filter selected, use the full data
      filteredData = graphData;
      break;
  }

  // Call the function to generate the graph with the filtered data
  generateGraph(filteredData);
});

// Initial graph generation with full data
generateGraph();


}


}

export default new Graph1View();
