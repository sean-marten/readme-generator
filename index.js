const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const { readmeContent, userPrompts } = require("./constants");

promptUser();

async function promptUser() {
  await inquirer
    .prompt({
      type: "confirm",
      name: "readme",
      message:
        "If you have not read the README for this project, please do so before using. Have you read the README?",
    })
    .then((answer) => {
      const { readme } = answer;
      if (!readme) {
        return;
      }
    });
  await inquirer.prompt(userPrompts).then((answers) => {
    const { username, repoName, authToken, ...content } = answers;
    const listContent = Object.values(content);
    for (let i = 0; i < listContent.length; i++) {
      readmeContent[i].content = listContent[i];
    }
    fs.writeFile("./readme/README.md", "", (err) => {
      if (err) {
        console.log(`Failed to generate README.md file, ${err}`);
      }
    });
    runStuff(username, repoName, authToken);
  });
}

async function runStuff(username, repoName, authToken) {
  await getUserInfo(username, repoName, authToken);
  writeToFile(username, repoName);
}

async function getUserInfo(username, repoName, authToken) {
  var config = {
    headers: {
      Authorization: `token ${authToken}`,
    },
  };
  const queryUrl = `https://api.github.com/users/${username}`;
  try {
    const {
      data: { avatar_url, email },
    } = await axios.get(queryUrl, config);
    if (avatar_url && email) {
      readmeContent[
        readmeContent.indexOf(
          readmeContent.find((x) => x.heading === "Questions")
        )
      ].content = `\n![screenshot](${avatar_url})\n\nIf you have any questions, please contact me at ${email}!`;
    }
  } catch (err) {
    console.log(`Unable to retrieve Github user content, ${err}`);
  }
}

function writeToFile(username, repoName) {
  readmeContent.forEach((item) => {
    if (item.heading === "Installation") {
      writeTableOfContents();
    }
    if (item.heading === "Tests") {
      const badge = `\n[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/${username}/${repoName}/issues)\n`;
      fs.appendFileSync("./readme/README.md", badge);
    }
    let content = "";
    if (item.content) {
      let heading = "";
      const headingLevel = `${"#".repeat(item.headingLevel)} `;
      if (item.heading === "Title") {
        content = headingLevel + `${item.content}\n`;
      } else {
        heading = `${item.heading}\n`;
        content = headingLevel + heading + `${item.content}\n`;
      }
    }
    fs.appendFileSync("./readme/README.md", content);
  });
}

function writeTableOfContents() {
  let tocContent = "## Table of Contents\n";
  let tableOfContents = [];
  readmeContent.forEach((item) => {
    if (item.heading === "Title") {
      return;
    }
    if (item.content) {
      tableOfContents.push(`[${item.heading}](#${item.heading})\n\n`);
    }
  });
  tableOfContents.forEach((item) => {
    tocContent = tocContent.concat(item);
  });
  fs.appendFileSync("./readme/README.md", tocContent);
}
