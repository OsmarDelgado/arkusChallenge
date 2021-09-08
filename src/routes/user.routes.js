import express from 'express'
const router = express.Router()

import { getUsers, getUsersById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getUsers )
router.get( '/:userId', [ verifyToken, isAdmin ], getUsersById )
router.post( '/', [ verifyToken, isAdmin ], createUser )
router.put( '/:userId', [ verifyToken, isAdmin ], updateUser )
router.delete( '/:userId', [ verifyToken, isAdmin ], deleteUser )

export default router
