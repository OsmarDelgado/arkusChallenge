import express from 'express'
const router = express.Router()

import { signUp, signIn } from '../controllers/auth.controller.js'

router.post( '/signIn', signIn )
router.post( '/signup', signUp )

export default router