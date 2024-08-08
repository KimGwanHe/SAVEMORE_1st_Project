import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';


const userSchema = new mongoose.Schema({
    name : {type:String,require:true},
    userid : {type:String,require:true},
    password : {type:String,require:true},
    nickname : {type:String,require:true},
    ssn1 : {type:String,require:true, maxlength: 6},
    ssn2 : {type:String,require:true, maxlength: 1},
    birth : {type:String,require:true},
    gender : {type:String,require:true},
    income : {type:String,require:true, maxlength: 1},
    hp : {type:String,require:true}
},{timestamps:{currentTime: () => new Date(Date.now() + 9 * 60 * 60 * 1000) }})

useVirtualId(userSchema)

const User = mongoose.model('member',userSchema)

// const ObjectID = MongoDB.ObjectId;


// 아이디(userid) 중복검사
export async function findAll(){
    return User.find({});
}

export async function findByUserId(userid){
    return User.findOne({userid:userid});
}

export async function findByNickname(nickname){
    return User.findOne({nickname:nickname});
}

// id 중복검사
export async function findById(id){
    return User.findById(id);
}

// 회원가입
export async function createUser(user){
    return new User(user).save().then((data)=>{data.id});
}

//로그인
export async function login(username){
    const user = User.find((user) => user.username === username)
    return user;
}

//회원탈퇴
export async function delete_(userid){
    return User.deleteOne({userid:userid})
}
