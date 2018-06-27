# Angular Template

Application Template Using Angular 5, Angular Material 2, Workbox Service Workers

# Getting Started

Run this command in your terminal to install all external packages - npm install

Create a new file in the root of the application called ".env" - Ask a C2F Developer for the contents of this file. It is necessary to have this file, but it cannot be placed on github for security reasons.

In order to run the application you must run the frontend and backend separately.

To run the front end - npm run serve
To run the back end - nodemon

# Setting Up A New Application

In the file "package.json" you need to change the name property to the name of your new application.
In the file "src/index.html" you need to change the value in the title tags to the name of your new application.
In the file ".angular-cli.json" you need to change the project.name property to the name of your new application.
In the file "src/app/components/topnav/topnav.component.html" you need to change the h1 value to the name of your new application.

The place to start adding your components and content is main.component.html. This represents the main page under the topnav in the application.

Testing files should be setup to just start adding tests. Run the command "npm run test" in order to run the tests and see the results.

# General Application Theory

In order to start working with this template what you need to do is the following:

Create components in Angular using the CLI command "ng g component NAME_OF_COMPONENT". Once a component is created you can add javascript logic in the ts file, html content in the html file, styling in the scss file and testing in the spec.ts file.

Components should be making calls to services which are created using the command "ng g service NAME_OF_SERVICE." Services make calls to the backend, which then performs all DB And API calls.

Once you have a service making a call to the correct endpoint, you need to go into app.js and add a route that corresponds to the endpoint you just specified.

After this you must create a route file in the routes folder, which contains an express route corresponding to the same endpoint. From here you can make DB calls using files in the db folder or external API calls using the fetch module.

All of this can be seen within the authentication folders and files and development should be modeled off of these files.
