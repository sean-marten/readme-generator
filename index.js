const inquirer = require("inquirer");
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
    type: "confirm",
    name: "includeTOC",
    message: "Would you like to include a table of contents?",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "editor",
    name: "description",
    message: "Write out the description for your ReadMe.",
  },
  {
    type: "editor",
    name: "installation",
    message: "Please describe how to install your application.",
  },
  {
    type: "editor",
    name: "usage",
    message: "Describe how to use your application.",
  },
  {
    type: "editor",
    name: "credits",
    message:
      "List all of your collaborators. Include any noteworthy third-party assets or tutorials.",
  },
  {
    type: "editor",
    name: "license",
    message:
      "Describe what other developers can and cannot do with your project.",
  },
  {
    type: "editor",
    name: "contributing",
    message: "Write out how other developers may contribute to your project.",
  },
  {
    type: "editor",
    name: "tests",
    message: "Provide examples for how to run your tests.",
  },
];

inquirer.prompt(userPrompts).then((answers) => {
  const answerArr = Object.values(answers);
  console.log(answerArr);
  for (let i = 2; i < answerArr.length; i++) {
    readmeContent[i - 2].content = answerArr[i];
  }
  console.log(readmeContent);
  fs.writeFile("./readme/README.md", "", (err) => {
    if (err) {
      throw err;
    }
    console.log("Successfully created readme file.");
  });

  writeToFile();
});

function getUserInfo() {}

function writeToFile() {
  readmeContent.forEach((item) => {
    if (item.heading == "Installation") {
      let tcContent = "## Table of Contents\n";
      let tableOfContents = [];
      readmeContent.forEach((item) => {
        if (item.content) {
          console.log(item);
          tableOfContents.push(`[${item.heading}](#${item.heading})\n\n`);
          console.log(tableOfContents);
        }
      });
      tableOfContents.forEach((item) => {
        console.log(tableOfContents, item);
        tcContent = tcContent.concat(item);
      });
      fs.appendFileSync("./readme/README.md", tcContent);
    }
    let content = "";
    const headingLevel = `${"#".repeat(item.headingLevel)} `;
    const heading = `${item.heading}\n`;
    if (item.content) {
      content = content.concat(headingLevel, heading, `${item.content}\n`);
    }
    console.log(content);

    fs.appendFileSync("./readme/README.md", content);
  });
}
