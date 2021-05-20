const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'company_db'
});

const startingPrompt = [
    {
        name: "startingPoint",
        message: "What would you like to do?",
        choices: ["Add a department, role, or employee", "View departments, roles, or employees", "Update employee roles"],
        type: "rawlist"
    }
];

// Bonus answers to add to choices: "Update employee managers", "View employees by manager", "Delete departments, roles, or employees", "View total utilized budget of a department"

inquirer
  .prompt(startingPrompt)
  .then(answer => {
    switch(answer.startingPoint) {
      case 'Add a department, role, or employee':
        addToTable();
        break;

      case 'View departments, roles, or employees':
        viewTables();
        break;

      case 'Update employee roles':
        updateRoles();
        break;
      /*
      case 'Update employee managers':
        updateManagers();
        break;

      case 'View employees by manager':
        viewEmployeesByManager();
        break;
      
      case 'Delete departments, roles, or employees':
        deleteRows();
        break;

      case 'View total utilized budget of a department':
        departmentBudget();
        break;
      */
      default:
        console.log(`Invalid action: ${answer.startingPrompt}`);
        break;  
    }
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error.isTtyError);
    } else {
      // Something else went wrong
      console.log(error);
    }
  });


const addToTable = () => {
  console.log("add to table!");
};

const viewTables = () => {
  console.log("view table!");
  inquirer.prompt({
    name: 'viewTable',
    type: 'rawlist',
    message: 'Choose which you want to see:',
    choices: ['Departments', 'Roles', 'Employees']
  }).then(answer => {
    console.log(answer)
    let table;
    let columns;
    switch(answer.viewTable) {
      case 'Departments':
        table = 'department';
        columns = 'name';
        break;
      case 'Roles':
        table = 'role';
        columns = 'title';
        break;
      case 'Employees':
        table = 'employee';
        columns = 'first_name, last_name'
        break;
      default:
        console.log(`Invalid action: ${answer.viewTable}`);
        break;  
    }

    let query = `SELECT ${columns} FROM ${table}`
    console.log(query);


  });
};

const updateRoles = () => {
  console.log("update roles!");
};