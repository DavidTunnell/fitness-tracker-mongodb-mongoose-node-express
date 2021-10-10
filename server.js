// Dependencies
const express = require("express");
const favicon = require("serve-favicon");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const helpers = require("./utils/helpers");
require("dotenv").config();

// Incorporate the custom helper methods: ./utils/helpers.js
const handlebars = expressHandlebars.create({
    helpers,
});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        // Stored in milliseconds (86,400,000 === 1 day)
        //28800000 = 8 hours
        maxAge: 28800000,
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
app.use(session(sess));

//setup handlebars with express
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//allow api to use json and url encoding
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

//set public folder
app.use(express.static(path.join(__dirname, "public")));

//favicon as defined: https://www.npmjs.com/package/serve-favicon
app.use(favicon(path.join(__dirname, "public", "./assets/favicon.ico")));

// Sets up the routes
app.use(controllers);

// Starts the server to begin listening with sequelize for db connection
//force start should be false if using 'npm run seed' to populate and create db as it will recreate tables each server reload
sequelize
    .sync({
        force: false,
    })
    .then(() => {
        app.listen(PORT, () =>
            console.log("App is now listening on: http://localhost:" + PORT)
        );
    });

// catch errors and forward to error handler
app.use((req, res, next) => {
    const error = new Error(
        `Oops! Page '${req.path}' not found! Please check the url and try again..`
    );
    error.status = 404;
    next(error);
});
// middleware with 4 parameters to handle a error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            //  this states the error message
            message: error.message,
            // this will highlight the location of the error (filename, line# etc)
            stack: error.stack,
        },
    });
});
