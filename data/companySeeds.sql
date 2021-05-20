USE company_db;

INSERT INTO department (name)
VALUES ("Management"),
	   ("Marketing"),
	   ("Operations"),
       ("Finance"),
       ("Sales"),
       ("Human Resources"),
       ("Purchasing");
       
INSERT INTO role (title, salary, department_id)
VALUES ("President", 350000, 1),
	   ("CFO", 275000, 1),
	   ("Supply Chain Management", 140000, 1),
	   ("Delivery Manager", 105000, 1),
       ("Operations Manager", 73000, 1),
       ("Director of Sales", 99000, 1),
       ("Director of HR", 97000, 1),
       ("Director of Purchasing", 101000, 1),
	   ("Market Research", 50000, 2),
	   ("Product Distribution", 58250, 2),
       ("Promotion", 51000, 2),
       ("Pricing", 56000, 2),
       ("Product Design", 100000, 3),
       ("Analyst", 67000, 3),
       ("Engineer", 98000, 3),
       ("Bookkeeper", 38000, 4),
       ("Advisor", 73000, 4),
       ("Accountant", 65000, 4),
       ("Accounts Clerk", 35000, 4),
       ("Sales Representative", 35000, 5),
       ("Brand Ambassador", 35000, 5),
       ("Sales Coordinator", 48000, 5),
       ("Specialist", 49000, 6),
       ("Recruiter", 55000, 6),
       ("Generalist", 57000, 6),
       ("Employee Relations", 71000, 6),
       ("Buyer", 46000, 7),
       ("Purchasing Agent", 52000, 7),
       ("Logistics", 48000, 7);
       
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alan", "Brand", 1),
       ("Toby", "Flenderson", 26);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Wallace", 2, 1),
	   ("Michael", "Scott", 6, 2),
	   ("Dwight", "Schrute", 20, 3); 