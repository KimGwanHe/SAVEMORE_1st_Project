import express from "express";
import * as tweetController from '../controller/tweet.js';
import {body} from 'express-validator';
import { validate , tweetValidationRules} from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

/*
    Post, Put에 text에 대해 빈문자열을 없애고, 최소 3자 이상 입력해야 데이터를 저장하도록 API에 적용
*/
// const validateTweet = [
//     body('text').trim().isLength({min: 3}).withMessage('최소 3자 이상 입력'), validate
// ]


// 모든 트윗 가져오기
// GET
router.get('/', tweetController.getTweets)

// 좋아요순으로 트윗 가져오기
// GET
router.get('/byLikes', tweetController.getAllByLikes)

// 조회수순으로 트윗 가져오기
// GET
router.get('/byViews', tweetController.getAllByViews)


// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
router.get('/:id', tweetController.getTweet);


// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/user/:userid', tweetController.getByuserid);



// 제목으로 검색하기
// GET
router.get('/searchPosts/:title', tweetController.searchPosts);


// 좋아요
// http://localhost:8080/price/like/:id
// http://localhost:8080/price/unlike/:id
// POST
router.post('/like/:id', tweetController.likeTweet);
router.post('/unlike/:id', tweetController.unlikeTweet);


// 신고하기
// http://localhost:8080/price/warning/:id
// POST
router.post('/warning/:id', tweetController.incrementAlert);

// 조회수 올리기
// POST
router.post('/incrementNum/:id', tweetController.incrementNum);

// (수정) 트윗 작성하기 
// POST 
// http://localhost:8080/price/community/
// name, username, text
// json형태로 입력 후, 추가된 데이터까지 모두 json으로 출력
router.post('/',  tweetValidationRules(), validate , tweetController.createTweet);

// 트윗 수정하기
// PUT
// http://localhost:8080/price/community/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력
router.put('/:id', tweetController.updateTweet);

// 트윗 삭제하기
// DELETE
// http://localhost:8080/price/community/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
