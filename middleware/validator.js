import { body, validationResult} from 'express-validator'

// 트윗 생성 시의 검증 규칙 함수
export const tweetValidationRules = () => [
    body('title').notEmpty().withMessage('글제목을 작성해주세요.'),
    body('text').notEmpty().withMessage('글 내용을 작성해주세요.'),
  ];

// 댓글 생성 시의 검증 규칙 함수
  export const commentValidationRules = () => [
    body('text').notEmpty().withMessage('댓글을 작성해주세요.')
];


// 검증 함수
export function validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // export function validate(req,res,next){
//     const errors = validationResult(req)
//     if(errors.isEmpty()){
//         return next();
//     }
//     return res.status(400).json({message:errors.array()[0].msg})
// }