import express from "express";
import * as commentController from '../controller/comment.js';
import {body} from 'express-validator';
import { isAuth } from "../middleware/auth.js";
import { validate , commentValidationRules} from "../middleware/validator.js"; // (수정)

const router = express.Router();

// 글별 댓글을 가져와서 뿌려주는 역할
router.get('/:postId', commentController.getCommentsByPostId);

//(수정) 댓글을 작성
router.post('/', isAuth,  commentValidationRules(), validate,commentController.createComment);

// 댓글 삭제
router.delete('/:id', isAuth, commentController.deleteComment);

export default router;