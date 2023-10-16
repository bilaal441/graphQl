let url = "https://learn.01founders.co/api/graphql-engine/v1/graphql";

const query = `
query {
  userdata: user(where: {login: {_ilike: "${searchBarValue}"}}) {
      login
      id
  }
  progressByUser: progress(
      where: {_and: [{user: {login: {_ilike: "${searchBarValue}"}}}, 
      {object: {type: {_eq: "project"}}},
      {isDone: {_eq: true}}, {grade: {_neq: 0}}]}
      order_by: {updatedAt: desc}
  ) {
      id
      grade
      createdAt
      updatedAt
      object {
          id
          name
      }
  }
  projectTransaction: transaction(
      where: {_and: [{user: {login: {_ilike: "${searchBarValue}"}}},
      {object: {type: {_eq: "project"}}},
      {type: {_eq: "xp"}}]}
      order_by: {amount: desc}
      ) {
      amount
      createdAt
      object {
          id
          name
      }
  }
}`;

const getJson = async () => {
  const res = await fetch({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
    },
    body: JSON.stringify({
      query,
    }),
  })


const json = 
};
