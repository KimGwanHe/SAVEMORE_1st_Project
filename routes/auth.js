import express from "express";
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from '../middleware/auth.js';
import coolsms from 'coolsms-node-sdk'

const router = express.Router()

const validateLogin = [
    body('userid').trim().notEmpty().withMessage('userid을 입력하세요'),
    body('password').trim().isLength({min: 4}).withMessage('password는 최소 4자 이상 입력하세요'), validate
];

const validateSignup = [
    ... validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력하세요'),validate
    // body('email').isEmail().withMessage('이메일 형식 확인하세요'), validate
];


router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',(req,res)=>{
    res.status(200).send('회원정보 확인')
})

router.get('/number/:num/:hp',(req,res)=>{
    const num = req.params.num
    const hp = req.params.hp

    console.log(num)
    console.log(hp)

    // async function printTokenResult(phone, token){

        const mysms = coolsms.default;
        const messageService = new mysms("NCSNZ3LCEPD0B6F9","CPMZZ3BLKI7LPOCIV8X4WYXWWGCTVTFA");
        const result = messageService.sendOne({
            to: `${hp}`,
            from : '01084454689',
            text : `요청하신 인증번호는 [${num}]입니다.`
        })
    
    console.log(result);
// }

    res.status(200).send('휴대폰 문자 인증 전송완료')
})


//회원탈퇴
router.delete('/:userid', authController.del_user);
//회원가입
router.post('/signup', validateSignup, authController.signup);
//로그인
router.post('/login',authController.login);
//내정보조회
router.get('/:userid', authController.my);

//닉네임 중복확인
router.get('/dul_nick/:nick', authController.findnick)

//아이디중복확인
router.get('/dul_id/:userid', authController.finduserids)

export default router