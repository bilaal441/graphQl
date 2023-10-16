
import View from "./View.js";
class Graph1View extends View {
  

  width = 700;
   height = 300;
  thia = 40;


  xScale = (width - padding * 2) / (data.length - 1);
    yScale = (height - padding * 2) /
    (Math.max(...data.map((el) => el.amount)) -
      Math.min(...data.map((el) => el.amount)));



    generateMarkUp(data){
      svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <line x1="${thia}" y1="${height - thia}" x2="${
          width - thia
        }" y2="${height - thia}" stroke="none" />
        <line x1="${thia}" y1="${
          height - thia
        }" x2="${thia}" y2="${thia}" stroke="none" />
        <polyline points="${data
          .map((el) => el.amount)
          .map(
            (d, i) => `${thia + i * xScale},${height - (thia + d * yScale)}`
          )
          .join(" ")}" fill="none" stroke="blue" stroke-width="2" />`;
      
        data.forEach((el, i) => {
          const dotRadius = 2;
          svgMarkup += `
        <circle
          cx="${thia + i * xScale}"
          cy="${height - (thia + el.amount * yScale)}"
          r="${dotRadius}"
          fill="blue"
          class="data-point"
          data-amount="${el.amount}"
          data-date="${el.createdAt}"
        />
      `;
        });
      
        svgMarkup += `</svg>`;


    }
 
  

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
    console.log(dotRect.top, dot.style.top);
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





}

export default new  Graph1View();
