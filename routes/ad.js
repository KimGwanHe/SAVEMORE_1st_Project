import express from 'express'
import { getActiveAdvertisements } from '../controller/ad.js'

const router = express.Router()


router.get('/ads/active', getActiveAdvertisements);


export default router;