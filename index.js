const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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

// Create ---------------------------------

const addToTable = () => {
  inquirer.prompt({
    name: 'addTo',
    type: 'rawlist',
    message: 'Which do you want to add to?',
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
    message: 'What is the title of the Role?',
  },
  {
    name: 'salary',
    type: 'number',
    message: 'What is the salary?',
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

// Read ---------------------------------

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

// Edit ---------------------------------

const updateRoles = async () => {
  console.log("update roles!");
  getEmployees(function(employees) {
  inquirer.prompt({
    name: 'chosenOne',
    type: 'rawlist',
    message: 'Choose which employee you want to update:',
    choices: employees
  }).then(answer => {
    let employeeID = answer.chosenOne;
    getRoles(function(roles) {
      inquirer.prompt({
        name: 'chosenRole',
        type: 'rawlist',
        message: 'Which role do you want to assign to them?',
        choices: roles
      }).then(answer => {
        let roleID = answer.chosenRole;
        connection.query(`UPDATE employee SET ? WHERE ?`,
        [
          {
            role_id: roleID,
          },
          {
            id: employeeID,
          },
        ],
        (error) => {
          if (error) throw err;
          console.log('Updated successfully!');
          setTimeout(() => initApp(), 3000);
        })
      })
    })
  })
})
};


const updateManagers = () => {
  console.log("update managers!!!");
}

// Delete ---------------------------------

const deleteRows = () => {
  console.log("delete rows!");
  inquirer.prompt({
    name: 'deleteWhat',
    type: 'rawlist',
    message: 'Which do you want to delete?',
    choices: tableChoices
  }).then(answer => {
    switch(answer.deleteWhat) {
      case 'Departments':
        deleteDepartments();
        break;
      case 'Roles':
        deleteRoles();
        break;
      case 'Employees':
        deleteEmployees();
        break;
      default:
        console.log(`Invalid action: ${answer.deleteWhat}`);
        break;
    };
  });
};

function deleteDepartments() {

}



// functions to get data: ---------------------------------

 function getEmployees(cb){
  const query = `SELECT * FROM employee`;
  let employees = [];
    connection.query(query,(err, res) => {
    if (err) throw err;
     res.forEach(r => {
      const fullName = `${r.first_name} ${r.last_name}`;
      employees.push({ name: fullName, value: r.id });
     });
      cb(employees);
  });
};

function getRoles(cb) {
  const query = `SELECT * FROM role`
  let roles = [];
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(r => {
      roles.push({ name: r.title, value: r.id });
    });
    cb(roles);
  });
};

function getDepartments(cb) {
  const query = `SELECT * FROM department`;
  let departments = [];
  connection.query(query, (err, res) => {
    res.forEach(r => {
      departments.push({ name: r.name, value: r.id });
    });
    cb(departments);
  });
};