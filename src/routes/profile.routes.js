import express from 'express'
const router = express.Router()

import {  } from '../controllers/profile.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )


export default router
