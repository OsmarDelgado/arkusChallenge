import express from 'express'
const router = express.Router()

import { verifyDuplicateUser, verifyRoleExist } from '../middlewares/verifyDuplicated.js'

import { getUsers, getUsersById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getUsers )
router.get( '/:userId', [ verifyToken, isAdmin ], getUsersById )
router.post( '/', [ verifyToken, isAdmin, verifyDuplicateUser, verifyRoleExist ], createUser )
router.put( '/:userId', [ verifyToken, isAdmin, verifyDuplicateUser, verifyRoleExist ], updateUser )
router.delete( '/:userId', [ verifyToken, isAdmin ], deleteUser )

export default router
