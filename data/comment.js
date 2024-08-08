import * as authRepository from './auth.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const commentSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    userId: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, required: true }
}, { timestamps: {currentTime: () => new Date(Date.now() + 9 * 60 * 60 * 1000) }});
// useVirtualId(commentSchema)

const Comment = mongoose.model('Comment',commentSchema)

//댓글달기
export async function create(comment) {
    console.log('댓글 생성 요청 수신:', comment);
    const user = await authRepository.findByUserId(comment.userid);
    if (!user) {
        console.error(`ID가 ${comment.userId}인 사용자를 찾을 수 없습니다.`);
        throw new Error(`회원ID: ${comment.userId} 를 못찾음..?`);
    }
    console.log('사용자 정보:', user);
    return new Comment({
        nickname: user.nickname,
        userId: user.userid,
        postId: new mongoose.Types.ObjectId(comment.postId),
        text: comment.text
    }).save();
}

//글번호에 대한 댓글들을 리턴(글을 출력할때 댓글도 함께 출력해줘야함)
// 글번호에 대한 트윗을 리턴
export async function getByPostId(postId) {
    try {
        const comments = await Comment.find({ postId: new ObjectId(postId) }).sort({ createdAt: 1 });
        console.log('가져온 댓글들:', comments); // 디버깅용 로그
        return comments;
      } catch (error) {
        console.error('댓글 조회 중 오류 발생:', error);
        throw error;
      }
    }

//댓글삭제
export async function remove(id) {
    return Comment.findByIdAndDelete(id);
}