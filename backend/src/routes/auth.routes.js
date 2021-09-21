import express from 'express'
const router = express.Router()

import { signUp, signIn } from '../controllers/auth.controller.js'
import { verifyDuplicateUser, verifyRoleExist } from '../middlewares/verifyDuplicated.js'

router.post( '/signIn', signIn )
router.post( '/signUp', [ verifyDuplicateUser, verifyRoleExist ], signUp )

export default router