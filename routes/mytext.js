import express from 'express'
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router()

router.use((req,res,next)=>{
    console.log('users에 존재하는 미들웨어')
    next()
})

router.get('/',isAuth, tweetController.getTweetByUserId)


// isAuth, tweetController.getTweetByUserId
// router.post('/',(req,res)=>{
//     res.status(200).send('게시글 작성')
// })


router.get('/:id', isAuth, tweetController.getTweet);


router.put('/:id', isAuth, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router