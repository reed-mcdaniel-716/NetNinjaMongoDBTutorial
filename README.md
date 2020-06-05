# MongoDB tutorial from The Net Ninja on [YouTube](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jpvoYriLI0bY8DOgWZfi6u)
- **MongoDB** is a NoSQL, document-based database that is very popular
- It is used to store the sessions data for instances of **cBioPortal**([here](https://github.com/cBioPortal/session-service))
- For more about cookies and sessions, [here's a guru99 article](https://www.guru99.com/difference-between-cookie-session.html)
- This tutorial also introduces [Mocha](https://mochajs.org/), a popular JS testing framework (and we should probably test our code more)
- Shaun's code is on [GitHub](https://github.com/iamshaunjp/mongodb-playlist)

---
## Directory setup
```
.
├── README.md
├── docker-compose.yml
├── models
│   ├── author.js (model for Authors collection with embedded Books)
│   └── mathcourse.js (model form MathCourse collection)
├── mongodb
│   ├── dbdata (host data (empty))
│   └── mongo-variables.env (environment variables for mongo and mongo-express containers)
├── package-lock.json
├── package.json (project overview including testing specifications and dependencies)
└── test
    ├── connection.js (test for connecting to db)
    ├── deleting_test.js (test for deleting docs from collection)
    ├── finding_test.js (test for finding docs from collection)
    ├── nesting_test.js (test for working with models and embedded documents)
    ├── saving_test.js (test for saving docs from collection)
    └── updating_test.js (test for updating docs from collection)

4 directories, 13 files
```
---
## 1. Introduction to MongoDB
- **MongoDB** is a NoSQL database, meaning that rather then storing tabular data like in a relational database, you store data in other formats like documents ([fuller comparison here](https://www.mongodb.com/scale/nosql-vs-relational-databases))
- "**MongoDB** stores data in ***flexible, JSON-like documents***, meaning fields can vary from document to document and data structure can be changed over time"([docs](https://www.mongodb.com/what-is-mongodb))
- `Mongoose`, a Node.js package, is a MongoDB object modeling tool designed to work in an asynchronous environment ([docs](https://www.npmjs.com/package/mongoose))

---
## 2. Installing MongoDB Locally
- This will differ from the tutorial as I am using Docker
    - The Docker Hub documentation suggests the addition of **Mongo Express** as a MongoDB admin console
- To run: `docker-compose up`
- To bring everything down: `docker-compose down -v`
- To access mongodb: `docker exec -it mongodb bash`
- To access mongodb logs: `docker logs mongodb`
- Next we want to set up things for our Node.js application:
    1. `npm init` for new project `package.json`
    2. `npm install mongoose` for the `mongoose` package

---
## 3. Connecting to MongoDB
- Created `test/` directory to use for now, and later, for testing
- Using mongoose to facilitate connection to local MongoDB instance

---
## 4. Collections & Models
- Each MongoDB database may contain multiple **collections** of **documents**
- "A record in MongoDB is a **document**, which is a data structure composed of **field and value pairs**. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents." ([docs](https://docs.mongodb.com/manual/introduction/))
- "MongoDB stores data records as **BSON** documents. BSON is a binary representation of JSON documents, though it contains more data types than JSON." ([docs](https://docs.mongodb.com/manual/core/document/#bson-document-format))
- "MongoDB stores BSON documents, i.e. data records, in **collections**; the collections in databases." ([docs](https://docs.mongodb.com/manual/core/databases-and-collections/))
- "Data in MongoDB has a *flexible schema*. Collections do not enforce document structure by default. This flexibility gives you data-modeling choices to match your application and its performance requirements" ([docs](https://docs.mongodb.com/manual/data-modeling/))
    - We call this flexible schema of documents in a given collection a ***data model***

---
## 5. Introduction to Mocha
- [Mocha](https://mochajs.org/) is a Node.js testing framework, allowing us to perform tests within our Node.js applications
- Install `Mocha`: `npm install mocha`
- Tests make uses of the Node.js built-in `assert` module, which allows us to test expressions and, if they fail, terminate a program ([w3schools.com](https://www.w3schools.com/nodejs/ref_assert.asp))
- In `package.json` set: `"test": "mocha"`
    - Now when you run `npm run test` in the project, mocha tests will be run (test directory set to `"test"` during project init)

---
## 6. Saving Data to MongoDB
- Saving a document to the database is an asynchronous action, but `mongoose` allows us to use *promise chaining* automatically
- For a refresher on that, here is the [MDN documentation on promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

---
## 7. ES6 Promises
- Want to be able to use the ES6 `Promise` library rather than the `mongoose` default (more on the library [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))
- We also need to specify that a connection to the database needs to be run ***before*** any tests are run, using the `Mocha` **hook** `before()` ([doc](https://mochajs.org/#run-cycle-overview) includes order of `Mocha` components, including hooks)
    - In `Mocha`, hooks are functions specifying the order of certain code blocks

---
## 8. ~~Robomongo~~ `mongo-express`
- I will skip this in favor of trying to get `mongo-express` working in Docker, as is suggested in the Docker Hub documentation for MongoDB
    - `mongo-express` is a web-based MongoDB admin interface written in Node.js, Express.js, and Bootstrap3. ([doc](https://hub.docker.com/_/mongo-express))
- To use, go to `localhost:8081`

---
## 9. Dropping Collections
- We need to be able to clean up after our tests, otherwise we will have multiple instances of the same document, one for every time the test runs
    - Want to clear out the database before our test run, so that they accurately report whether or not the test database operations are successful

## 10. Finding & Reading Data
- Can use the `find()` method to find *all* documents in a collection matching a given criteria
- Can use the `findOne()` method to find *the first* document in a collection matching a given criteria
- Can use `insertMany()` to insert multiple documents into a collection at once

---
## 11. Object ID
- Each document gets a unique object id generated by MongoDB which we can search on as well
    - ***The unique ids `_id` are stored as object not strings for each document***

---
## 12. Deleting Records
- Can use the `deleteOne()` method on a model with criteria passed in to remove the first document it finds matching that criteria
- Can use the `deleteMany()` method on a model with criteria passed in to remove all documents it finds matching that criteria

---
## 13. Updating Records
- Can use the `updateOne()` method on a model with criteria passed in to update the first document it finds matching that criteria
- Can use the `updateMany()` method on a model with criteria passed in to update all documents it finds matching that criteria

---
## 14. Update Operators
- Update operators provide you additional functionality when updating documents in a collection
    - For example, you name wish to rename a field or update a numerical value only when its current value is greater or less than a certain threshold
---
## 15. Relational Data
- Suppose you have a bunch of authors and books associated with them
- In a relational database, you would likely have an Authors table and a Books table, with some sort of foreign key on the Books table that you could make use of in queries when you join the tables
- However, in document-based NoSQL databases like MongoDB, this is not how things are done i.e. you would not have separate collections for authors and books with some linkage between the two
- Instead, we can create a sort of hierarchy, with an array of Book documents nested in each Author document, and a single Authors collection
    - In this case, while we would only have a ***single*** Authors model, it would encompass ***two*** schemas, one for Authors and another for Books
- There are many different ways complex relationships can be modeled in MongoDB, a few of which are [referenced here](https://docs.mongodb.com/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)

---
## 16. Nesting Sub-documents
- **Sub-documents aka eembedded documents** can be used in testing in much the same way that single-level documents can


---
