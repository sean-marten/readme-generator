const axios = require("axios");

username = "sean-marten";

async function getUserInfo(username) {
  var config = {
    headers: {
      Authorization: "token a40a6741644ab2a36c2bf281de40f3190894d9d4",
    },
  };
  const queryUrl = `https://api.github.com/users/hharrison3`;
  try {
    const { data } = await axios.get(queryUrl, config);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

getUserInfo();
