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
    const data = filterXPByDate("", state.data.transaction);
    Graph1View.render(data);
    Graph1View.mouseEnter();
    // const {transactions: skills} = state.data;
    // const skills = state.data.transactions.reduce((grouped, skill) => {
    //   if (grouped.hasOwnProperty(skill.type)) {
    //     grouped[skill.type] += skill.amount;
    //   } else {
    //     grouped[skill.type] = skill.amount;
    //   }
    //   return grouped;
    // }, {});

    // const svgWidth = 400;
    // const svgHeight = 400;
    // const radius = Math.min(svgWidth, svgHeight) / 2;
    // const centerX = svgWidth / 2;
    // const centerY = svgHeight / 2;

    // // Calculate the total sum of amounts
    // const total = Object.values(skills).reduce(
    //   (sum, amount) => sum + amount,
    //   0
    // );

    // let startAngle = 0;
    // for (const [name, amount] of Object.entries(skills)) {
    //   const percentage = amount / total;

    //   // Check if the percentage exceeds the threshold (e.g., 5%)

    //   const endAngle = startAngle + percentage * 2 * Math.PI;

    //   // Calculate the coordinates of the outer arc
    //   const startX = centerX + radius * Math.cos(startAngle);
    //   const startY = centerY + radius * Math.sin(startAngle);
    //   const endX = centerX + radius * Math.cos(endAngle);
    //   const endY = centerY + radius * Math.sin(endAngle);

    //   // Create the path for the current slice
    //   const path = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "path"
    //   );
    //   path.setAttribute(
    //     "d",
    //     `M${centerX},${centerY} L${startX},${startY} A${radius},${radius} 0 ${
    //       percentage > 0.5 ? "1" : "0"
    //     },1 ${endX},${endY} Z`
    //   );
    //   path.setAttribute("fill", getRandomColor());

    //   // Append the path to the SVG element
    //   document.getElementById("pieChart").appendChild(path);

    //   // Add skill labels
    //   const labelX =
    //     centerX +
    //     radius * 0.6 * Math.cos(startAngle + (endAngle - startAngle) / 2);
    //   const labelY =
    //     centerY +
    //     radius * 0.6 * Math.sin(startAngle + (endAngle - startAngle) / 2);

    //   const text = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "text"
    //   );
    //   text.setAttribute("x", labelX + percentage);
    //   text.setAttribute("y", labelY);
    //   text.setAttribute("text-anchor", "middle");
    //   text.setAttribute("fill", "#000");
    //   text.textContent = name.replace("skill_", "");

    //   document.getElementById("pieChart").appendChild(text);

    //   startAngle = startAngle + percentage * 2 * Math.PI;
    // }
    // function getRandomColor() {
    //   const letters = "0123456789ABCDEF";
    //   let color = "#";
    //   for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // }

    const skills = state.data.transactions.reduce((grouped, skill) => {
      if (grouped.hasOwnProperty(skill.type)) {
        grouped[skill.type] += skill.amount;
      } else {
        grouped[skill.type] = skill.amount;
      }
      return grouped;
    }, {});

    const svgWidth = 400;
    const svgHeight = 400;
    const radius = Math.min(svgWidth, svgHeight) / 2;
    const labelRadius = radius * 1.1; // Radius for labels outside the pie chart
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Calculate the total sum of amounts
    const total = Object.values(skills).reduce(
      (sum, amount) => sum + amount,
      0
    );

    let startAngle = 0;
    const minPercentage = 0.05; // Minimum percentage to include in the pie chart
    const othersThreshold = total * minPercentage; // Threshold amount for "Others" category
    const others = [];

    for (const [name, amount] of Object.entries(skills)) {
      const percentage = amount / total;

      if (percentage >= minPercentage) {
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
            percentage > 0.25 ? "1" : "0"
          },1 ${endX},${endY} Z`
        );
        path.setAttribute("fill", getRandomColor());

        // Append the path to the SVG element
        document.getElementById("pieChart").appendChild(path);

        // Add skill labels outside the pie chart portions
        const labelAngle = startAngle + (endAngle - startAngle) / 2;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#000");
        text.textContent = name.replace("skill_", "");

        document.getElementById("pieChart").appendChild(text);

        startAngle = endAngle;
      } else {
        // Add the smaller skill types to the "Others" category
        others.push({name, amount});
      }
    }

    // Check if there are smaller skill types to be grouped under "Others"
    if (others.length > 0) {
      const othersTotal = others.reduce((sum, skill) => sum + skill.amount, 0);

      // Calculate the percentage and angle for the "Others" category
      const othersPercentage = othersTotal / total;
      const othersEndAngle = startAngle + othersPercentage * 2 * Math.PI;

      // Calculate the coordinates of the outer arc for "Others"
      const othersStartX = centerX + radius * Math.cos(startAngle);
      const othersStartY = centerY + radius * Math.sin(startAngle);
      const othersEndX = centerX + radius * Math.cos(othersEndAngle);
      const othersEndY = centerY + radius * Math.sin(othersEndAngle);

      // Create the path for the "Others" slice
      const othersPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      othersPath.setAttribute(
        "d",
        `M${centerX},${centerY} L${othersStartX},${othersStartY} A${radius},${radius} 0 ${
          othersPercentage > 0.25 ? "1" : "0"
        },1 ${othersEndX},${othersEndY} Z`
      );
      othersPath.setAttribute("fill", getRandomColor());

      // Append the path to the SVG element
      document.getElementById("pieChart").appendChild(othersPath);

      // Add the "Others" label outside the pie chart
      const othersLabelAngle = startAngle + (othersEndAngle - startAngle) / 2;
      const othersLabelX = centerX + labelRadius * Math.cos(othersLabelAngle);
      const othersLabelY = centerY + labelRadius * Math.sin(othersLabelAngle);

      const othersText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      othersText.setAttribute("x", othersLabelX);
      othersText.setAttribute("y", othersLabelY);
      othersText.setAttribute("text-anchor", "middle");
      othersText.setAttribute("fill", "#000");
      othersText.textContent = "Others";

      document.getElementById("pieChart").appendChild(othersText);
    }

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
