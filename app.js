const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

// Define the add confirm inquirer array
const add = [
  {
    type: "confirm",
    name: "add",
    message: "Do you want to add more team members ?",
  },
];

// Define the employee type inquirer questions array
const employeeType = [
  {
    type: "list",
    name: "choice",
    message: "Choose the employee type?",
    choices: ["Engineer", "Intern"],
  },
];

// Define the manager inquirer questions array
const managerInquiry = [
  {
    type: "input",
    name: "name",
    message: "What is the manager name ?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the manager id ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager email ?",
  },
  {
    type: "input",
    name: "phone",
    message: "What is the manager office phone number ?",
  },
];

// Define the engineer inquirer questions array
const engineerInquiry = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer name ?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the engineer id ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer email ?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer github ?",
  },
];

// Define the intern inquirer questions array
const internInquiry = [
  {
    type: "input",
    name: "name",
    message: "What is the intern name ?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the intern id ?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern email ?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the intern school ?",
  },
];

// Prompt for manager info
inquirer.prompt(managerInquiry).then((manager) => {
  const { name, id, email, phone } = manager;
  const managerInstance = new Manager(name, id, email, phone);
  team.push(managerInstance);
  addTeamMember();
});

// Check for if new team member needs to be added and inquire to get member info.
async function addTeamMember() {
  const confirm = await inquirer.prompt(add);
  if (confirm.add) {
    const type = await inquirer.prompt(employeeType);
    switch (type.choice) {
      case "Engineer":
        const engineer = await inquirer.prompt(engineerInquiry);
        addEngineer(engineer);
        break;
      case "Intern":
        const intern = await inquirer.prompt(internInquiry);
        addIntern(intern);
        break;
    }
  } else {
    const html = render(team);
    createHtml(html);
  }
}

// Function to generate new engineer class and add to team array
function addEngineer(engineer) {
  const { name, id, email, github } = engineer;
  const engineerInstance = new Engineer(name, id, email, github);
  team.push(engineerInstance);
  addTeamMember();
}

// Function to generate new intern class and add to team array
function addIntern(intern) {
  const { name, id, email, school } = intern;
  const internInstance = new Intern(name, id, email, school);
  team.push(internInstance);
  addTeamMember();
}

// Function to create html using the team array
function createHtml(html) {
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
