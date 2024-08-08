import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('구 리스트확인')
})


export default router