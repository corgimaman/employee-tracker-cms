const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { Employee } = require('./models/employee')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'company_db'
});

const tableChoices = ['Departments', 'Roles', 'Employees']

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
  initApp();
});


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
  inquirer.prompt({
    name: 'addTo',
    type: 'rawlist',
    message: 'Which do you want to update?',
    choices: tableChoices
  }).then(answer => {
    switch(answer.addTo) {
      case 'Departments':
        addDepartments();
        break;
      case 'Roles':
        addRoles();
        break;
      case 'Employees':
        addEmployees();
        break;
      default:
        console.log(`Invalid action: ${answer.addTo}`);
        break;
    }
  });
};

// Read

const viewTables = () => {
  inquirer.prompt({
    name: 'viewTable',
    type: 'rawlist',
    message: 'Choose which you want to see:',
    choices: tableChoices
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



// functions to get data:

function getEmployees()

// function getEmployees(){
//   const query = `SELECT * FROM employee`;
//   let employees = []
//   connection.query(query, async (err, res) => {
//     if (err) throw err;
//     await res.forEach(r => {
//       const fullName = `${r.first_name} ${r.last_name}`
//       employees.push({ name: fullName, value: r.id })
//   });
//   });
//   return employees
// };

// function getEmployees(){
//   let employee = [];
//   connection.connect(function(err){
//     if (err) throw err;
//     var sql = `SELECT * FROM employee`;
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       console.table(result)
//       console.log(result)
//       employee.push(`${result.first_name} ${result.last_name}`)
//       return employee
//     })
//   })
// }

// function getEmployees() {
//   let employees = [];
//   connection.promise().query('SELECT * FROM employee').then(row => {
//     for (let i = 0; i < row.length; i++) {
//       const firstname = row.first_name[i];
//       const lastname = row.last_name[i];
//       const id = row.id[i];
//       employees.pop(firstname, lastname, id)
//     }
//     return employees
//   }).catch(err => {
//     console.log(err);
//   })
// }

//async function getEmployees() {
  // connection.query('SELECT * FROM employee', (err, res) => {
  //   if (err) throw err;
  //   //res.forEach(({ first_name, last_name }) => console.log(first_name, last_name))
  //   res.forEach(data => {
  //     const fullName = `${data.first_name} + ${data.last_name}`
  //     employees.push({ name: fullName, value: data.id})
  //   });
  //   return employees
  // });
// };

function getRoles() {

};

function getDepartments() {

};

// Create

function addDepartments(){
  inquirer.prompt({
    name: 'deptName',
    type: 'input',
    message: 'What is the name of the department?'
  }).then(answer => {
    connection.connect(function(err) {
      if (err) throw err;
      var sql = `INSERT INTO department (name) VALUES ('${answer.deptName}')`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        setTimeout(() => initApp(), 2000);
      });
    });
  });
}

function addRoles(){
  inquirer.prompt({
    name: 'title',
    type: 'input',
    message: 'What is the title of the Role?'
  },
  {
    name: 'salary',
    type: 'number',
    message: 'What is the salary?'
  },
  {
    name: 'department',
    type: 'rawlist',
    message: 'What department does the role belong to?',
    choices: getDepartments()
  }).then(answer => {
    // need to use foreign key to get department id
    connection.connect(function(err) {
      if (err) throw err;
      var sql = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}, ${answer.salary}, ${answer.department}')`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        setTimeout(() => initApp(), 2000);
      });
    });
  });
}

function addEmployees(){
  inquirer.prompt({
    name: 'first',
    type: 'input',
    message: 'What is their first name?'
  },
  {   
    name: 'last',
    type: 'input',
    message: 'What is their last name?'
  },
  {
    name: 'role',
    type: 'rawlist',
    message: 'What is their role?',
    choices: getRoles()
  },
  {
    name: 'managerCheck',
    type: 'confirm',
    message: 'Do they have a manager?'
  },
  {
    name: 'manager',
    type: 'rawlist',
    message: 'Who is their manager?',
    choices: getEmployees()
  }).then(answer => {
    // need to use foreign key to get department id and manager id?
    // also need an if statement to make different sql if no manager
    connection.connect(function(err) {
      if (err) throw err;
      var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}, ${answer.last_name}, ${answer.role_id}, ${answer.manager_id}')`;
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        setTimeout(() => initApp(), 2000);
      });
    });
  });
}