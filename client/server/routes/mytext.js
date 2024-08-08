import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('GET:/게시글확인')
})

// router.post('/',(req,res)=>{
//     res.status(200).send('게시글 작성')
// })


router.get('/:id',(req,res)=>{
    res.status(201).send('게시글 내용확인')
})


router.put('/:id',(req,res)=>{
    res.status(201).send('게시글수정')
})

router.delete('/:id',(req,res)=>{
    res.status(201).send('게시글삭제')
})

export default router