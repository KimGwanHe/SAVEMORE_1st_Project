import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('GET:/물가소식,행사, 커뮤니티 선택창')
})

router.get('/news',(req,res)=>{
    res.status(200).send('소식 리스트 출력')
})

router.get('/events',(req,res)=>{
    res.status(200).send('행사장 및 등등 사이트 이동')
})

router.get('/community',(req,res)=>{
    res.status(200).send('커뮤니티 글목록')
})

router.post('/community',(req,res)=>{
    res.status(201).send('POST:/users 게시글작성')
})

router.put('/community/:name/:id',(req,res)=>{
    res.status(201).send('PUT:/users/:id 게시글수정')
})

router.delete('/community/:name/:id',(req,res)=>{
    res.status(201).send('DELETE:/users/:id 게시글삭제')
})

export default router