import express from 'express'
const router = express.Router()

import { getTeam, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )
// router.get( '/', [ verifyToken, isAdmin ], getTeam )


export default router
