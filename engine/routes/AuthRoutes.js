import express from 'express'
import { google } from '../api/AuthApi.js'

const router = express.Router()

router.post('/google', google)

export default router