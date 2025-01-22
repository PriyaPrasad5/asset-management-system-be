# Node.JS Backend App
=====================
### Overview
This is a simple Node.js backend application that uses Express.js to handle HTTP requests and MySql database to
store and retrieve data.
### Dependencies
* `express`: A popular Node.js web framework for building web applications.
* `mysql`: A popular SQL database for storing and retrieving data.
* `body-parser`: A middleware that parses the request body and makes it available in the request object
### Setup
1. Clone the repository to your local machine: `git clone https://github.com/PriyaPrasad5/asset-management-system-be.git`
2. Install the dependencies by running `npm install` in the terminal.
3. Create a new file named `.env` in the root directory and add the environment configration.
4. Run `npm run seed:all` to seed the data.
5. Run `npm start` to start the server.
6. To test api in Swagger:- http://localhost:4000/api-docs/