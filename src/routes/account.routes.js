import express from 'express'
const router = express.Router()

import { getAccounts, getAccountById, createAccount, updateAccound, deleteAccount } from '../controllers/account.controller.js'
import { verifyToken, isAdmin, isUser } from '../middlewares/index.js'

router.get( '/', [ verifyToken, isAdmin ], getAccounts )
router.get( '/:accountId', [ verifyToken, isAdmin ], getAccountById )
router.post( '/', [ verifyToken, isAdmin ], createAccount )
router.put( '/:accountId', [ verifyToken, isAdmin ], updateAccound )
router.delete( '/:accountId', [ verifyToken, isAdmin ], deleteAccount )

export default router