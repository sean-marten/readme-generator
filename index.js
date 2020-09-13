const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const readmeContent = [
  {
    headingLevel: 1,
    heading: "Title",
  },
  {
    headingLevel: 2,
    heading: "Description",
  },
  {
    headingLevel: 2,
    heading: "Installation",
  },
  {
    headingLevel: 2,
    heading: "Usage",
  },
  {
    headingLevel: 2,
    heading: "License",
  },
  {
    headingLevel: 2,
    heading: "Credits",
  },
  {
    headingLevel: 2,
    heading: "Contributing",
  },
  {
    headingLevel: 2,
    heading: "Tests",
  },
  {
    headingLevel: 2,
    heading: "Questions",
  },
];

const userPrompts = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "repoName",
    message: "What is the name of the repository for this readme?",
  },
  {
    type: "input",
    name: "authToken",
    message: "Please enter a valid Github Auth token.",
  },
  {
    type: "confirm",
    name: "includeTOC",
    message: "Would you like to include a table of contents?",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  // {
  //   type: "editor",
  //   name: "description",
  //   message: "Write out the description for your ReadMe.",
  // },
  // {
  //   type: "editor",
  //   name: "installation",
  //   message: "Please describe how to install your application.",
  // },
  // {
  //   type: "editor",
  //   name: "usage",
  //   message: "Describe how to use your application.",
  // },
  // {
  //   type: "editor",
  //   name: "credits",
  //   message:
  //     "List all of your collaborators. Include any noteworthy third-party assets or tutorials.",
  // },
  // {
  //   type: "editor",
  //   name: "license",
  //   message:
  //     "Describe what other developers can and cannot do with your project.",
  // },
  // {
  //   type: "editor",
  //   name: "contributing",
  //   message: "Write out how other developers may contribute to your project.",
  // },
  // {
  //   type: "editor",
  //   name: "tests",
  //   message: "Provide examples for how to run your tests.",
  // },
];

inquirer.prompt(userPrompts).then((answers) => {
  const answerArr = Object.values(answers);
  for (let i = 4; i < answerArr.length; i++) {
    readmeContent[i - 4].content = answerArr[i];
  }
  fs.writeFile("./readme/README.md", "", (err) => {
    if (err) {
      throw err;
    }
  });
  getUserInfo(answerArr[0], answerArr[1], answerArr[2]);
});

async function getUserInfo(username, repoName, authToken) {
  var config = {
    headers: {
      Authorization: `token ${authToken}`,
    },
  };
  const queryUrl = `https://api.github.com/users/${username}`;
  try {
    const { data } = await axios.get(queryUrl, config);
    console.log(data);
    if (data.avatar_url && data.email) {
      readmeContent[8].content = `\nIf you have any questions, please contact me at ${data.email}\n\n![screenshot](${data.avatar_url})`;
    }
  } catch (e) {
    console.log(e);
  }

  writeToFile(username, repoName);
}

function writeToFile(username, repoName) {
  console.log(readmeContent);
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
    const headingLevel = `${"#".repeat(item.headingLevel)} `;
    const heading = `${item.heading}\n`;
    if (item.content) {
      content = content.concat(headingLevel, heading, `${item.content}\n`);
    }
    fs.appendFileSync("./readme/README.md", content);
  });
}
