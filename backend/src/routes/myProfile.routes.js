import express from 'express'
const router = express.Router()

import { getMyProfile, updateMyProfile } from '../controllers/profile.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isUser ], getMyProfile )
router.put( '/', [ verifyToken, isUser ], updateMyProfile )

export default router
