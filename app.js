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

const add = [
  {
    type: "confirm",
    name: "add",
    message: "Do you want to add more team members ?",
  },
];

const employeeType = [
  {
    type: "list",
    name: "choice",
    message: "Choose the employee type?",
    choices: ["Engineer", "Intern"],
  },
];
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

inquirer.prompt(managerInquiry).then((manager) => {
  const { name, id, email, phone } = manager;
  const managerInstance = new Manager(name, id, email, phone);
  team.push(managerInstance);
  addTeamMember();
});

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

function addEngineer(engineer) {
  const { name, id, email, github } = engineer;
  const engineerInstance = new Engineer(name, id, email, github);
  team.push(engineerInstance);
  addTeamMember();
}

function addIntern(intern) {
  const { name, id, email, school } = intern;
  const internInstance = new Intern(name, id, email, school);
  team.push(internInstance);
  addTeamMember();
}

function createHtml(html) {
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
