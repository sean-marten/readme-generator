const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");

const { readmeContent, userPrompts } = require("./constants");

init();

function init() {
  promptUser();
}

function promptUser() {
  console.log(
    "If you have not read the README for this project, please do so before using."
  );
  inquirer.prompt(userPrompts).then((answers) => {
    const answerArr = Object.values(answers);
    for (let i = 4; i < answerArr.length; i++) {
      readmeContent[i - 4].content = answerArr[i];
    }
    fs.writeFile("./readme/README.md", "", (err) => {
      if (err) {
        console.log(`Failed to generate README.md file, ${err}`);
      }
    });
    getUserInfo(answerArr[0], answerArr[1], answerArr[2]);
  });
}

async function getUserInfo(username, repoName, authToken) {
  var config = {
    headers: {
      Authorization: `token ${authToken}`,
    },
  };
  const queryUrl = `https://api.github.com/users/${username}`;
  try {
    const { data } = await axios.get(queryUrl, config);
    if (data.avatar_url && data.email) {
      readmeContent[8].content = `\nIf you have any questions, please contact me at ${data.email}\n\n![screenshot](${data.avatar_url})`;
    }
  } catch (err) {
    console.log(`Unable to retrieve Github user content, ${err}`);
  }

  writeToFile(username, repoName);
}

function writeToFile(username, repoName) {
  readmeContent.forEach((item) => {
    if (item.heading === "Installation") {
      let tcContent = "## Table of Contents\n";
      let tableOfContents = [];
      readmeContent.forEach((item) => {
        if (item.content) {
          tableOfContents.push(`[${item.heading}](#${item.heading})\n\n`);
        }
      });
      tableOfContents.forEach((item) => {
        tcContent = tcContent.concat(item);
      });
      fs.appendFileSync("./readme/README.md", tcContent);
    }
    if (item.heading === "Tests") {
      const badge = `[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/${username}/${repoName}/issues)\n`;
      fs.appendFileSync("./readme/README.md", badge);
    }
    let content = "";
    if (item.content) {
      let heading = "";
      const headingLevel = `${"#".repeat(item.headingLevel)} `;
      if (item.heading === "Title") {
        content = content.concat(headingLevel, `${item.content}\n`);
      } else {
        heading = `${item.heading}\n`;
        content = content.concat(headingLevel, heading, `${item.content}\n`);
      }
    }
    fs.appendFileSync("./readme/README.md", content);
  });
}
