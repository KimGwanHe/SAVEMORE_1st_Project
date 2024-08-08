import * as commentRepository from '../data/comment.js'

//get방식으로 아이디를 받아와 id별 (글별) 댓글을 찾아오는 api
export async function getCommentsByPostId(req,res,next){
    const postId = req.params.postId;
    console.log(postId)
    try {
        const comments = await commentRepository.getByPostId(postId);
        console.log('댓글 목록:', comments);
        res.status(200).json(comments);
      } catch (error) {
        console.error('댓글을 가져오는 중에 오류가 발생했습니다:', error);
        res.status(500).json({ message: '댓글 못 불러옴..', error });
      }
    }

// 댓글 작성
export async function createComment(req,res,next){
    const { userid, text, postId } = req.body;
    console.log('댓글 작성 요청 수신:', req.body);
    try {
        const comment = await commentRepository.create({ userid, text, postId });
        res.status(201).json(comment);
      } catch (error) {
        console.error(error);
        console.error('댓글 작성 중 오류 발생:', error);
        res.status(500).json({ message: '댓글 작성 못함..', error });
      }
    }

// 댓글 삭제
export async function deleteComment(req, res, next) {
    const { id } = req.params;
    try {
      await commentRepository.remove(id);
      res.status(204).end();
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error);
        res.status(500).json({ message: '댓글 삭제 못함..', error });
    }
  }