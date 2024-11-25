# Node.js Task Manager
A simple application for maintaining a to-do list.

## Table of Contents
- [About](#about)
- [Instructions](#instructions)
- [Code Structure](#code-structure)

### About
This application is built to help the user with maintaing a to-do list. It offers basic CRUD (Create, Read, Update, Delete) operations to be performed on the tasks. It also offers the ability to categorize tasks on the basis of their priority and view them with a filter, and a task can also be marked 'Pending' or 'Completed'.

### Instructions
In order to use this application, you need to install **Express**, **Mongoose** and **EJS** NPM packages. You can install these packages by going to the repository directory and running `npm i express mongoose ejs` in the command line. It is also necessary for MongoDB to be installed locally on the device. If you wish to change the particulars like the port, MongoDB URI, etc. used by the application, you can install **Dotenv** package as a development dependency by running `npm i -D dotenv` in the command line. And make sure to create a **.env** file to store the variables for the particulars.

To change the
- port, you can create a variable named `PORT` and assign it the port number as a value.
- MongoDB connection URI (including database name), you can use variable `URI`.
- collection name, use variable `COLLECTION`.

### Code Structure
There are separate sections on the front-end for updating and deleting tasks as different forms have been used with unique _action_.
The task list collapses after updation or deletion as the filter is in a separate form.
An additional _cryptoid_ field has been added to the MongoDB collection to uniquely identify tasks for updation and deletion.