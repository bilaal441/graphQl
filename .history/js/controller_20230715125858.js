import {
  state,
  login,
  fetchData,
  KeepUserLogin,
  filterXPByDate,
  sortTransaction,
} from "./model.js";
import LoginView from "./view/LoginView.js";
import Graph1View from "./view/graph1View.js";

const controllLogin = async (bj) => {
  try {
    await login(bj);
    LoginView.hiddeForm();
    await fetchData();
    sortTransaction();
    const data = filterXPByDate("", state.data.transaction);
    Graph1View.render(data);
    Graph1View.mouseEnter();
  } catch (err) {
    console.log("Error in load data", err.message);
    LoginView.error(err.message);
  }
};

const controlUpdateUI = () => {
  KeepUserLogin();
  if (state.islogin) {
    sortTransaction();
    const filterXPByData = filterXPByDate("", state.data.transaction);
    Graph1View.render(fi);
    Graph1View.mouseEnter();

    const skills =  transactions


    const svgWidth = 400;
    const svgHeight = 400;
    const radius = Math.min(svgWidth, svgHeight) / 2;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Calculate the total sum of amounts
    const total = skills.reduce((sum, skill) => sum + skill.amount, 0);

    let startAngle = 0;
    skills.forEach((skill) => {
      const percentage = skill.amount / total;
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
      path.setAttribute("fill", getRandomColor()); // Generate a random color for each slice

      // Append the path to the SVG element
      document.getElementById("pieChart").appendChild(path);

      // Add skill labels
      const labelX =
        centerX +
        radius * 0.6 * Math.cos(startAngle + (endAngle - startAngle) / 2);
      const labelY =
        centerY +
        radius * 0.6 * Math.sin(startAngle + (endAngle - startAngle) / 2);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", labelX);
      text.setAttribute("y", labelY);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#fff");
      text.textContent = skill.type; // Use the skill name as the label

      document.getElementById("pieChart").appendChild(text);

      // Update the start angle for the next slice
      startAngle = endAngle;
    });

    // Function to generate a random color
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  } else {
    LoginView.showForm();
  }
};

const controllGraph1userSelect = (value) => {
  const data = filterXPByDate(value, state.data.transaction);
  Graph1View.render(data);
  Graph1View.mouseEnter();
};

const init = () => {
  controlUpdateUI();
  LoginView.loginSubmissionHandler(controllLogin);
  Graph1View.filterXpGrap1Handler(controllGraph1userSelect);
};

init();
