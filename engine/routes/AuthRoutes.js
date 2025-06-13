import express from 'express'
import { google } from '../api/AuthApi.js'
import { session } from '../api/AuthSession.js'
import { users } from '../api/AuthUsersEmail.js'

const router = express.Router()

router.post('/google', google)

router.post('/session', session)

router.post('/users', users)

export default router