import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('GET:/시설종류 확인')
})

router.get('/lib',(req,res)=>{
    res.status(200).send('도서관 구 확인')
})

router.get('/lib/:name',(req,res)=>{
    res.status(200).send('해당 구의 도서관 리스트 확인')
})

router.get('/cafe',(req,res)=>{
    res.status(200).send('카페 리스트 확인')
})

router.get('/cafeteria',(req,res)=>{
    res.status(200).send('급식소 리스트 확인')
})

router.get('/job',(req,res)=>{
    res.status(200).send('직업소개소 확인')
})

router.get('/wifi',(req,res)=>{
    res.status(200).send('와이파이 지도 페이지로 이동')
})

export default router