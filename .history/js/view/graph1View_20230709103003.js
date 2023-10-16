import View from "./View.js";
class Graph1View extends View {
  width = 700;
  height = 300;
  padding = 40;
  parentEl = document.querySelector(".svg-graph");

  generateMarkUp(data) {
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
          .join(" ")}" fill="none" stroke="" stroke-width="1" />`;

    data.forEach((el, i) => {
      const dotRadius = 2;
      svgMarkup += `
        <circle
          cx="${this.padding + i * xScale}"
          cy="${this.height - (this.padding + el.amount * yScale)}"
          r="${dotRadius}"
          fill="blue"
          class="data-point"
          data-amount="${el.amount}"
          data-date="${el.createdAt}"
        />
        </svg>
      `;
    });

    // svgMarkup += `</svg>`;

    return svgMarkup;
  }

  // Append SVG markup to the HTML
  // document.body.insertAdjacentHTML("beforeend", svgMarkup);

  // Event listeners for interactive dots
  // const
  mouseEnter() {
    const dataPoints = document.querySelectorAll(".data-point");

    dataPoints.forEach((dot) => {
      dot.addEventListener("mouseenter", showTooltip);
      dot.addEventListener("mouseleave", hideTooltip);
    });
  }

  // Show tooltip on mouseenter
  showTooltip(event) {
    const dot = event.target;
    const amount = dot.getAttribute("data-amount");
    const date = dot.getAttribute("data-date");
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = `Amount: ${amount}, Date: ${date}`;
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
}

export default new Graph1View();
