import * as bcrypt from "bcrypt";
// npm i bcrypt

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10);  // 10은 넘기지말자. 느려진다.
console.log(`password: ${password}, hashed: ${hashed}`);

// password: abcd1234
// hashed: $2b$10$lXJEihhFxQ6f7O.myu5wmeTrPYS/hj5YF8SUKzTmCIWf5vQaHUCl6

const result = bcrypt.compareSync('abcd1234', hashed);  // 실제 암호와 해시값을 비교해서 같으면 true
console.log(result);