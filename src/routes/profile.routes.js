import express from 'express'
const router = express.Router()

import { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getProfiles )
router.get( '/:profileId', [ verifyToken, isAdmin ], getProfileById )
router.post( '/', [ verifyToken, isAdmin ], createProfile )
router.put( '/:profileId', [ verifyToken, isAdmin ], updateProfile )
router.delete( '/:profileId', [ verifyToken, isAdmin ], deleteProfile )


export default router
