import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('GET:/ 전체게시글확인')
})


router.get('/:name',(req,res)=>{
    res.status(201).send('get:/카테고리별 게시글확인')
})


export default router