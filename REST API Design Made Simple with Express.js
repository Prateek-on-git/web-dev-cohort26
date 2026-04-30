REST API Design Made Simple with Express.js
What is a REST API?

A REST API (Representational State Transfer) is a way for applications to communicate over the internet.

Think of it like a conversation:

The client (browser, mobile app) sends a request
The server (Express.js app) processes it
The server sends back a response

👉 Example:
You open an app → it asks the server for user data → server sends JSON → app displays it.


Resources in REST Architecture

In REST, everything revolves around resources.

A resource is any data you want to manage:

Users
Products
Orders

Each resource is identified by a URL

:/users
/products
/orders

You interact with resources using HTTP methods.




HTTP Methods (CRUD Mapping)
Operation	HTTP Method	Description
Create	POST	Add new data
Read	GET	Fetch data
Update	PUT	Modify existing data
Delete	DELETE	Remove data




HTTP Methods Explained
GET

Used to retrieve data

GET /users
GET /users/1
POST

Used to create new data

POST /users
PUT

Used to update existing data

PUT /users/1
DELETE

Used to delete data

DELETE /users/1



Status Codes Basics

Status codes tell the client what happened.

Code	Meaning
200	OK (Success)
201	Created
400	Bad Request
404	Not Found
500	Server Error

👉 Example:

User found → 200
User created → 201
Invalid input → 400



Designing RESTful Routes (Users Example)

Let’s design routes for a users resource.

Action	Route	Method
Get all users	/users	GET
Get one user	/users/:id	GET
Create user	/users	POST
Update user	/users/:id	PUT
Delete user	/users/:id	DELETE

Express.js Example

const express = require('express');
const app = express();

app.use(express.json());

// Get all users
app.get('/users', (req, res) => {
  res.status(200).json({ message: 'List of users' });
});

// Get single user
app.get('/users/:id', (req, res) => {
  res.status(200).json({ message: `User ${req.params.id}` });
});

// Create user
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// Update user
app.put('/users/:id', (req, res) => {
  res.status(200).json({ message: `User ${req.params.id} updated` });
});

// Delete user
app.delete('/users/:id', (req, res) => {
  res.status(200).json({ message: `User ${req.params.id} deleted` });
});

app.listen(3000, () => console.log('Server running on port 3000'));

REST Request–Response Lifecycle (Simple Flow)
Client sends request
Server receives it
Server processes logic
Server sends response
Client displays result
Client → Request → Server → Response → Client



Route Naming Best Practices
✔ Use nouns, not verbs
✔ Keep URLs clean and consistent



Good:
/users
/users/1

Bad:
/getUsers
/createUser
/deleteUser


What is a Payload?

A payload is the data the client sends to the server (usually in POST and PUT requests).
Example JSON payload:

{
  "name": "John",
  "email": "john@example.com"
}


Access Payload in POST (Create User)

Update your POST route like this:

app.post('/users', (req, res) => {
  const userData = req.body;

  console.log(userData); // see payload in terminal

  res.status(201).json({
    message: 'User created',
    data: userData
  });
});

Access Payload in PUT (Update User)
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  res.status(200).json({
    message: `User ${userId} updated`,
    updatedData
  });
});
