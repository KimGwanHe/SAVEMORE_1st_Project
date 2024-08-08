import express from 'express'

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('회원정보 확인')
})

router.post('/number',(req,res)=>{
    let authNumbers = '';

    async function authNumber(){
        for(let i=0;i<4;i++){
            let num = Math.floor(Math.random()*10).toString()
            authNumbers += num
    }
    console.log(authNumbers)
    }


    async function printTokenResult(phone, token){

        const mysms = coolsms.default;
        const messageService = new mysms("NCSNZ3LCEPD0B6F9","CPMZZ3BLKI7LPOCIV8X4WYXWWGCTVTFA");
        const result = await messageService.sendOne({
            to: `${phone}`,
            from : '01084454689',
            text : `요청하신 인증번호는 [${token}]입니다.`
        })

    console.log(result);
}

    res.status(201).send('휴대폰 문자 인증')
})

router.post('/',(req,res)=>{
    res.status(201).send('회원가입')
})


router.put('/',(req,res)=>{
    res.status(201).send('회원정보 수정')
})


router.delete('/',(req,res)=>{
    res.status(201).send('DELETE:/회원탈퇴')
})

export default router