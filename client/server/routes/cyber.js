import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('카테고리 리스트확인')
})


router.get('/:category',(req,res)=>{
    res.status(201).send('카테고리별 강의목록확인')
})

export default router