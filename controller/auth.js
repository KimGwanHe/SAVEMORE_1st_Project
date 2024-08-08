import * as authRepository from '../data/auth.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from "../config.js";

function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

//회원가입
export async function signup(req, res, next) {
    let {name, userid, password, nickname, ssn1,ssn2,gender,income,hp} = req.body;
    const found = await authRepository.findByUserId(userid);
    if(found){
        return res.status(409).json({message:`${userid}이 이미 있습니다.`});
    }
    password = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await authRepository.createUser({name, userid, password, nickname, ssn1,ssn2,gender,income,hp});
    console.log('회원가입완료')
    res.send(`
        <script>
          alert('회원가입 완료.');
          window.location.href = '../../../index.html';
        </script>
      `);
}

//로그인
export async function login(req, res, next) {
    const {userid, password} = req.body;
    console.log(userid)
    console.log(password)
    const user = await authRepository.findByUserId(userid);
    if(!user){
        return res.send(`
        <script>
          alert('해당 아이디가 존재하지않습니다.');
          window.location.href = '../public/sub_page/main/login.html';
        </script>
      `);
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.send(`
        <script>
          alert('비밀번호가 틀렸습니다.');
          window.location.href = '../public/sub_page/main/login.html';
        </script>
      `);
    }
    const token = createJwtToken(user.id);
    res.send(`
        <script>
            alert('로그인에 성공했습니다.');
            sessionStorage.setItem('token', '${token}');
            sessionStorage.setItem('userid', '${userid}');
            window.location.href = '/';
        </script>
    `);
}

//회원정보 수정
export async function mod_user(req,res,next){
    let {name, userid, password, nickname, email, ssn1,ssn2,birth,gender,income,hp} = req.body;
    const user = await authRepository.findByOne({userid : userid});
    if(!user){
        return res.status(401).json({message: `해당 유저가 존재하지않음`});
    }
    return user.update({password : password, email:email, hp:hp, income : income})
}

//회원탈퇴
export async function del_user(req,res,next){
    const userid = req.params.userid
    // const user = await authRepository.findAll();
    await authRepository.delete_(userid);
    console.log('회원 탈퇴 완료')
    res.status(204).json({ msg: "successfully deleted" });
}

//내정보 찾기
export async function my(req,res,next){
    const userid = req.params.userid
    console.log(userid)
    const myinfo = await authRepository.findByUserId(userid);
    console.log(myinfo)
    console.log('내 정보 조회 완료')
    res.status(200).json(myinfo);
}

export async function finduserid(req,res,next){
    const userid = req.params.userid
    const userids = await authRepository.findByUserId(userid);
    if (userids){
        res.send(`
        <script>
            alert('해당 아이디는 이미 존재합니다.');
        </script>
    `);
    }
    else{
        res.send(`
        <script>
            alert('사용가능한 아이디입니다.');
            dulid=true
        </script>
    `);
    }
    // res.status(200).json(userids)
}

export async function findnick(req,res,next){
    const nickname = req.params.nick
    console.log(nickname)
    const nicknames = await authRepository.findByNickname(nickname);
    console.log(nicknames)
    if(nicknames == null){
        res.sendStatus(200)
    }else{
        res.sendStatus(201)}
}

export async function finduserids(req,res,next){
    const nickname = req.params.userid
    console.log(nickname)
    const nicknames = await authRepository.findByUserId(nickname);
    console.log(nicknames)
    if(nicknames == null){
        res.sendStatus(200)
    }else{
        res.sendStatus(201)}
}