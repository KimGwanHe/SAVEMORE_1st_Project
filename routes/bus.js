import express from 'express'
import * as busRepository from '../controller/bus.js'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('bus에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('구 리스트확인')
})

router.get('/:gu', busRepository.getAllbyGu);

export default router