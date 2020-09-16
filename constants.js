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
    name: "license",
    message:
      "Describe what other developers can and cannot do with your project.",
  },
  {
    type: "editor",
    name: "credits",
    message:
      "List all of your collaborators. Include any noteworthy third-party assets or tutorials.",
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

module.exports = { readmeContent, userPrompts };
