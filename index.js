const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

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
        choices: ["Add a department, role, or employee", "View departments, roles, or employees", "Update employee roles", "Exit App"],
        type: "rawlist"
    }
];
// Bonus answers to add to choices: "Update employee managers", "View employees by manager", "Delete departments, roles, or employees", "View total utilized budget of a department"

connection.connect(err => {
  if(err) throw err;
  console.log("Welcome to the CMS!");
  console.log('line 26' + getEmployees());
  //initApp();
});

// functions to get data:

// function getEmployees() {
//   let employees = [];
//   connection.query('SELECT * FROM employee', async (err, res) => {
//     if (err) throw err;
//     //console.log(res);
//     await res.forEach(person => {
//       let fullName = `${person.first_name} ${person.last_name}`
//       employees.push({ name: fullName, id: person.role_id});
//     })
//     console.log('line 41'+employees);
//     return employees;
//   });
//   console.log('line 43!!' + employees);
// };

const allEmployees = await 

function getRoles() {

};

function getDepartments() {

};

function initApp() {
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
        /*
        case 'View total utilized budget of a department':
          departmentBudget();
          break;
                  
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        */
        case 'Update employee roles':
          updateRoles();
          break;
        /*
        case 'Update employee managers':
          updateManagers();
          break;

        case 'Delete departments, roles, or employees':
          deleteRows();
          break;
        */
       case 'Exit App':
         console.log("Good bye!");
         connection.end();
         break;
         
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
}

// Create

const addToTable = () => {
  console.log("add to table!");
};

// Read

const viewTables = () => {
  inquirer.prompt({
    name: 'viewTable',
    type: 'rawlist',
    message: 'Choose which you want to see:',
    choices: ['Departments', 'Roles', 'Employees']
  }).then(answer => {
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
        columns = 'first_name, last_name';
        break;
      default:
        console.log(`Invalid action: ${answer.viewTable}`);
        break;  
    }

    let query = `SELECT ${columns} FROM ${table}`
    //console.log(query);
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      // Add a timeout to let user see result before starting app again
      setTimeout(() => initApp(), 3000);
    });

  });
};

const departmentBudget = () => {
  console.log("department budget!!!");
}

const viewEmployeesByManager = () => {
  console.log("view by manager!")
};

// Edit

const updateRoles = () => {
  console.log("update roles!");
  inquirer.prompt({
    name: 'chosenOne',
    type: 'rawlist',
    message: 'Choose which employee you want to update:',
    choices: getEmployees()
  }).then(answer => {
    console.log(answer)
  })
};

const updateManagers = () => {
  console.log("update managers!!!");
}

// Delete

const deleteRows = () => {
  console.log("delete rows!");
}