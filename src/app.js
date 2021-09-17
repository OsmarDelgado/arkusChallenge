/**
 * Importing Libraries
 */
// Import Express
import express from 'express'
// Import Morgan
import morgan from 'morgan'
// Import as pkg the package.json
import pkg from '../package.json';
// Import Initial Setup for Roles
import { initialRoles, createSuperUser } from "./libs/initialSetup.js";
// Config Enviroment variables
import dotenv from 'dotenv'
dotenv.config()

/**
 * Importing Routes
 */
import authRoutes from './routes/auth.routes.js'
import rolesRoutes from './routes/role.routes.js'
import usersRoutes from './routes/user.routes.js'
import teamsRoutes from './routes/team.routes.js'
import accountRoutes from './routes/account.routes.js'
import profilesRoutes from './routes/profile.routes.js'
import myProfileRoutes from './routes/myProfile.routes.js'

/** 
 * Initialization
 */
const app = express()
initialRoles()
createSuperUser()

// Import data from package.json for get its information
app.set('pkg', pkg)

/**
 * Middlewares
 */
// Initial morgan
app.use( morgan('dev') )
// Config app for undestand json
app.use( express.json() )
// For recive simple data
app.use( express.urlencoded({ extended : false }) )

/**
 * Routes
 */
app.use( '/api/v1/auth', authRoutes )
app.use( '/api/v1/roles', rolesRoutes )
app.use( '/api/v1/users', usersRoutes )
app.use( '/api/v1/teams', teamsRoutes )
app.use( '/api/v1/accounts', accountRoutes )
app.use( '/api/v1/profiles', profilesRoutes )
app.use( '/api/v1/profiles', profilesRoutes )
app.use( '/api/v1/myProfile', myProfileRoutes )

/**
 * GET home
 */
app.get('/', (req, res) => {
    // Show in client the name, author, description and version from package.json (pkg)
    res.json({
        application : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version
    });
});

export default app;