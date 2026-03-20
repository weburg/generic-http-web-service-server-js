# Generic HTTP Web Service Server in JavaScript (GHoWSt)

![Logo](http://www.weburg.com/ghowst/images/ghowstlogo.png)

## An example server providing the Web service and an HTML-only static client

> [!NOTE]
> This is a work in progress to bring a GHoWSt Node.js server library up to parity with the Java version. Refer to the Java version until this note is removed.

Simple MVC architecture where controllers are defined in app.js, views are in views/, and the model is whatever is needed, kept in src/.

Routing is provided by Express. Path parameters are not used. Query string and URI parsing are done as needed.

### General setup

We're going to use the cross-platform Node.js server and rely on Express to be the static HTML server.

Install Node.js 22 or better.

### IDE (WebStorm) setup

Mark directories as you wish, e.g. Sources Root, Templates, Test Sources, etc. (right click desired folder, then select Mark Directory As)

Using npm or your IDE, ensure that the dependencies in package.json are installed to your Node.js environment.

### Running the application

The application will run with the Node.js server on port 8081.

If using the CLI, ensure you are in the project directory. Run:

`npm run start`

If using an IDE, right-click the below file and select to run the start script.

`package.json`

Now test the application by going to http://localhost:8081 and make sure everything works.

### Running the tests

To run unit tests only:

`npm test`

To run unit and integration tests:

`npm run verify`