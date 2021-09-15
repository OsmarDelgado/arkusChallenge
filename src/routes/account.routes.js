import express from 'express'
const router = express.Router()

import { getTeam, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getTeam )
router.get( '/:accountId', [ verifyToken, isAdmin, isUser ], getTeamById )
router.post( '/', [ verifyToken, isAdmin ], createTeam )
router.put( '/:accountId', [ verifyToken, isAdmin ], updateTeam )
router.delete( '/:accountId', [ verifyToken, isAdmin ], deleteTeam )

export default router