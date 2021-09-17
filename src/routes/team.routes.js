import express from 'express'
const router = express.Router()

import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getTeams )
router.get( '/:teamId', [ verifyToken, isAdmin ], getTeamById )
router.post( '/', [ verifyToken, isAdmin ], createTeam )
router.put( '/:teamId', [ verifyToken, isAdmin ], updateTeam )
router.delete( '/:teamId', [ verifyToken, isAdmin ], deleteTeam )

export default router
