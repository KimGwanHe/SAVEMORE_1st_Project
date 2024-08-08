import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('도서관 강의리스트 확인')
})


export default router