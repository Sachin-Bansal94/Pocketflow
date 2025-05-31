INSERT INTO users(username,email,password) VALUES('karthik','karthikmohan2004@gmail.com','welcome123');

SELECT * FROM users WHERE email='karthikmohan2004@gmail.com';

-- For creating the trasaction table --

CREATE TABLE transactions(
	useremail varchar(250) REFERENCES users(email),
	amount int NOT NULL,
	type varchar(250) NOT NULL,
	dateExpense DATE  NOT NULL,
	category varchar(250) NOT NULL,
	reference varchar(250) NOT NULL,
	description varchar(250) NOT NULL
)

--Inserting the values into the database--
INSERT INTO transactions VALUES('test123@gmail.com',100,'expense', 'education','02-11-2004','samosaking','pocketFlow','pocketFlowtest');

--Comparing the date values--
SELECT * FROM TRANSACTIONS WHERE dateexpense >= '2024-04-01';
SELECT useremail,amount,type,dateexpense,category,reference,description,transaction_id FROM users JOIN transactions ON email = userEmail WHERE email = $1 AND dateexpense >=$2;