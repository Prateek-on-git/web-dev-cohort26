What are URL Parameters (Route Params)?

Definition:
URL parameters are named segments in the path used to identify a specific resource.
  Example: /users/42

Here:
42 is a URL parameter
It identifies a specific user

Express example
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});

req.params.id → "42"


What are Query Parameters (Query Strings)?
Definition:
Query parameters are key-value pairs added after ? in a URL to modify or filter results.
Think of them as filters or modifiers, not identifiers.

  Example:  /users?age=25&city=Delhi
Here:
age=25
city=Delhi
These are query parameters

Express example:
app.get('/users', (req, res) => {
  const age = req.query.age;
  const city = req.query.city;

  res.send(`Filter users by age ${age} and city ${city}`);
});

req.query:
{
  age: "25",
  city: "Delhi"
}

Differences

| Feature        | URL Params        | Query Params         |
| -------------- | ----------------- | -------------------- |
| Location       | Inside URL path   | After `?`            |
| Purpose        | Identify resource | Filter / modify data |
| Required?      | Usually required  | Usually optional     |
| Example        | `/users/42`       | `/users?age=25`      |
| Express Access | `req.params`      | `req.query`          |


  Example
Full URL:
http://example.com/users/42?age=25&active=true

Breakdown:

[Protocol]  http://
[Domain]    example.com
[Path]      /users/42        → URL PARAM (id = 42)
[Query]     ?age=25&active=true → QUERY PARAMS



When to Use Params vs Query (Rule of Thumb)
Use URL Params when:

✔ You need a specific resource
✔ The value is required
✔ It represents an ID or unique identifier

👉 Example:

GET /users/42
Use Query Params when:

✔ You are filtering, sorting, or searching
✔ Parameters are optional
✔ You can have multiple combinations

👉 Example:

GET /users?age=25&city=Delhi

Real world example
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const includePosts = req.query.includePosts;

  res.send({
    id,
    includePosts
  });
});

Request: /users/42?includePosts=true

Result:
{
  "id": "42",
  "includePosts": "true"
}



