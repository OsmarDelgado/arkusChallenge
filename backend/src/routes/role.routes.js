import express from 'express'
const router = express.Router()

import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/role.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getRoles )
router.get( '/:roleId', [ verifyToken, isAdmin ], getRoleById )
router.post( '/', [ verifyToken, isAdmin ], createRole )
router.put( '/:roleId', [ verifyToken, isAdmin ], updateRole )
router.delete( '/:roleId', [ verifyToken, isAdmin ], deleteRole )

export default router
