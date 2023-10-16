import View from "./View.js";
class Graph2View extends View {



  re
  const filteredSkillsTotal = Object.values(filteredSkills).reduce(
    (sum, amount) => sum + amount,
    0
  );
  let startAngle = 0;
  for (const [name, amount] of Object.entries(filteredSkills)) {
    const percentage = amount / filteredSkillsTotal;

    const endAngle = startAngle + percentage * 2 * Math.PI;

    // Calculate the coordinates of the outer arc
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    // Create the path for the current slice
    const path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path.setAttribute(
      "d",
      `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${
        percentage > 0.5 ? "1" : "0"
      },1 ${endX},${endY} Z`
    );
    path.setAttribute("fill", getRandomColor());
    document.getElementById("pieChart").appendChild(path);
    const labelPadding = 0.1;
    const labelX =
      centerX +
      radius *
        (0.5 + labelPadding) *
        Math.cos(startAngle + (endAngle - startAngle) / 2);
    const labelY =
      centerY +
      radius *
        (0.5 + labelPadding) *
        Math.sin(startAngle + (endAngle - startAngle) / 2);
    const text = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    text.setAttribute("x", labelX);
    text.setAttribute("y", labelY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#fff");

    text.textContent = `${name.replace("skill_", "")}   ${(
      percentage * 100
    ).toFixed(2)}%`;
    document.getElementById("pieChart").appendChild(text);
    startAngle = startAngle + percentage * 2 * Math.PI;
  }

   getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}




export default new Graph2View()