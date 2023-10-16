import {URL} from "../config.js";
let user = "Bilal Sharif";

export const state = {data: {}, islogin: false};

const query = `
  query {
    user {
      id
      login
    }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: {
        type: { _eq: "level" },
        eventId: {_eq: 134}
    
      }
    ) { amount }
  
  xp: transaction_aggregate(
    where: { type: {_eq: "xp"}, eventId: {_eq: 134}}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
   


    transaction(where: { type: { _eq: "xp" } }) {
      id
      type
      amount
      objectId
      userId
      createdAt
      path
    }
    transactions: transaction(where: { type: { _ilike: "%skill%" } }) {
      id
      type
      amount
      objectId
      userId
      createdAt
      path
    }

    progress(
      where: {
        grade: { _neq: 0 },
        object: { type: { _eq: "project" } },
        isDone: { _eq: true }
      }
    ) {
      id
      userId
      objectId
      grade
      createdAt
      updatedAt
      path
    }
    
   
    result {
      id
      objectId
      userId
      grade
      type
      createdAt
      updatedAt
      path
    }


    object {
      id
      name
      type
      attrs
    }
  }
`;

// const UserLevelInfo = `
// query level($userId:Int!, $rootEventId: Int!){
//     level: transaction(
//      limit: 1
//      order_by: { amount: desc }
//      where: {
//        userId: { _eq: $userId }
//        type: { _eq: "level" }
//        eventId: { _eq: $rootEventId }
//      }
//    ) { amount }
//  }
//  `;

export const login = async ({username, password}) => {
  try {
    const encodedCredentials = "Basic " + btoa(`${username}:${password}`);
    const res = await fetch(`${URL}api/auth/signin`, {
      method: "POST",
      headers: {
        Authorization: encodedCredentials,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const err = await res.json();
      console.log(err);
      throw Error(err.error);
    }
    const jwtData = await res.json();
    localStorage.setItem("jwt", jwtData);
  } catch (err) {
    throw err;
  }
};

export async function fetchData() {
  const jwtToken = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${URL}api/graphql-engine/v1/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({query}),
    });
    if (!res.ok) {
      throw Error(res.statusText);
    }

    const userData = await res.json();
    localStorage.setItem("userData", JSON.stringify(userData));
    state.data = userData.data;
  } catch (error) {
    console.error("Error fetching G data:", error);
  }
}

export const KeepUserLogin = () => {
  const jwt = localStorage.getItem("jwt");
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(jwt);
  if (jwt) {
    console.log(userData);
    state.data = userData?.data;
    console.log(state.data);
    state.islogin = true;
  }
};

export const filterXPByDate = (selectedValue, graphData) => {
  let filteredData = [];
  const currentDate = new Date();
  const dateAgo = new Date();

  const helper = () => {
    return graphData.filter((data) => {
      const dataDate = new Date(data.createdAt);
      console.log(dateAgo.getDate());
      return (
        dataDate >= dateAgo &&
        dataDate <= currentDate &&
        data.path.includes("london/div-01")
      );
    });
  };

  switch (selectedValue) {
    case "last week":
      dateAgo.setDate(currentDate.getDate() - 7);
      const arr = helper();
      if (arr.length > 1) {
        arr.push({
          amount: arr.reduce((occ, cur) => occ + cur.amount, 0),
          createdAt: dateAgo.toString(),
        });
      }

      const firstDay = new Date(arr[0].createdAt);

      filteredData =
        firstDay > dateAgo
          ? [{amount: 0, createdAt: dateAgo.toString()}, ...arr]
          : [...arr];

      break;

    case "last month":
      dateAgo.setMonth(currentDate.getMonth() - 1);
      const lastMonth = helper();
      const firstDayLastMonth = new Date(lastMonth[0].createdAt);

      if (lastMonth.length > 1) {
        lastMonth.push({
          amount: lastMonth.reduce((occ, cur) => occ + cur.amount, 0),
          createdAt: dateAgo.toString(),
        });
      }

      filteredData =
        firstDayLastMonth > dateAgo
          ? [{amount: 0, createdAt: dateAgo.toString()}, ...lastMonth]
          : [...lastMonth];

      break;

    case "last 3 months":
      filteredData = graphData.filter((data) => {
        dateAgo.setMonth(currentDate.getMonth() - 3);
        const dataDate = new Date(data.createdAt);
        return (
          dataDate >= dateAgo &&
          dataDate <= currentDate &&
          data.path.includes("london/div-01")
        );
      });
      break;

    case "last 6 months":
      filteredData = graphData.filter((data) => {
        dateAgo.setMonth(currentDate.getMonth() - 6);
        const dataDate = new Date(data.createdAt);
        return (
          dataDate >= dateAgo &&
          dataDate <= currentDate &&
          data.path.includes("london/div-01")
        );
      });
      break;
    default:
      // No filter selected, use the full data
      filteredData = graphData;
      break;
  }
  return filteredData;
};

export const sortTransaction = () => {
  state.data.transaction.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });
};

export const forMatskills = () => {
  const skills = state.data.transactions
    .filter((skill) => skill.path.includes("/london/div-01/"))
    .reduce((grouped, skill) => {
      if (grouped.hasOwnProperty(skill.type)) {
        grouped[skill.type] += skill.amount;
      } else {
        grouped[skill.type] = skill.amount;
      }
      return grouped;
    }, {});

  const total = Object.values(skills).reduce((sum, amount) => sum + amount, 0);
  const minPercentage = 0.05;
  const filteredSkills = {};

  for (const [name, amount] of Object.entries(skills)) {
    const percentage = amount / total;
    if (percentage >= minPercentage) {
      filteredSkills[name] = amount;
    }
  }
  return filteredSkills;
};

export const formatSection1Data = () => {
  console.log(state.data.xp.aggregate.some);
  const {amount} = state.data.xp.aggregate.some;

  const xp = Math.round(amount / 1000);

  return {
    level: state.data.level[0].amount,
    name: state.data.user[0].login,
    xp,
  };
};
