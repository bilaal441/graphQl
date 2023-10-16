import View from "./View.js";
class Graph1View extends View {
  parentEl = document.querySelector(".svg-graph");
  // width = parseInt(getComputedStyle(this.parentEl).width);
  // height = parseInt(getComputedStyle(this.parentEl).height);
  width = 400;
  height = 300;
  xpPostionsSelect = document.getElementById("xp-postions");
  padding = 40;
  generateMarkUp(data) {
    console.log(this.width, this.height);

    const filteredDataRange =
      Math.max(...data.map((el) => el.amount)) -
      Math.min(...data.map((el) => el.amount));

    const yScale = (this.height - this.padding * 2) / filteredDataRange;
    const xScale = (this.width - this.padding * 2) / (data.length - 1);

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
          .map(
            (el, i) =>
              `${this.padding + i * xScale},${
                this.height -
                (this.padding +
                  (el.amount - Math.min(...data.map((el, i) => el.amount)))) *
                  yScale
              }`
          )
          .join(" ")}" fill="none" stroke="#ffd700" stroke-width="2" />`;

    data.forEach((el, i) => {
      const dotRadius = 2;
      svgMarkup += `
        <circle
          cx="${this.padding + i * xScale}"
          cy="${
            this.height -
            (this.padding +
              (el.amount - Math.min(...data.map((el) => el.amount)))) *
              yScale
          }"
          r="${dotRadius}"
          fill="#ffd700"
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
    dataPoints.forEach((dot, i) => {
      if (i !== 0 && i !== dataPoints.length - 1)
        dot.addEventListener("mouseenter", this.showTooltip.bind(this));
      dot.addEventListener("mouseleave", this.hideTooltip.bind(this));
    });
  }

  createTooltip() {}

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

  filterXpGrap1Handler(callBack) {
    this.xpPostionsSelect.addEventListener("change", (e) => {
      callBack(e.target.value);
    });
  }
}

export default new Graph1View();
