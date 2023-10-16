import View from "./View.js";
class Graph1View extends View {
  parentEl = document.querySelector(".svg-graph");
  width = parseInt(getComputedStyle(this.parentEl).width);
  height = parseInt(getComputedStyle(this.parentEl).height);
  xpPostionsSelect = document.getElementById("xp-postions");
  padding = 40;
 

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

  filterXpGrap1Handler(callBack) {
    this.xpPostionsSelect.addEventListener("change", (e) => {
      callBack(e.target.value);
    });
  }
}

export default new Graph1View();
