import * as authRepository from './auth.js';
import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';


const tweetSchema = new mongoose.Schema({
    nickname : {type:String,require:true},
    userid : {type:String,require:true},
    title : {type:String,require:true},
    text : {type:String,require:true},
    img_url1 : String,
    img_url2 : String,
    img_url3 : String,
    like : { type: Number, default: 0 },
    num : { type: Number, default: 0 },
    alert : { type: Number, default: 0 }
},{timestamps:{currentTime: () => new Date(Date.now() + 9 * 60 * 60 * 1000) }})
useVirtualId(tweetSchema)

const Tweet = mongoose.model('community',tweetSchema)


// 모든 트윗을 리턴
export async function getAll() {
    return Tweet.find().sort({ createdAt: -1 });
}

// 좋아요순으로 모든 트윗을 리턴
export async function getAllByLikes() {
    return Tweet.find().sort({ like: -1 });
}

// 조회수순으로 모든 트윗을 리턴
export async function getAllByViews() {
    return Tweet.find().sort({ num: -1 });
}

export async function getAllbyuserid(id){
    return Tweet.find({userid:id}).sort({ createdAt: -1 });
}


// 해당 아이디에 대한 트윗을 리턴
export async function getAllbynickname(nickname) {
    return Tweet.find({nickname:nickname}).sort({createdAt:-1})
}

// 글번호에 대한 트윗을 리턴
export async function getbyId(id) {
    return Tweet.findById(id)
}

// 트윗 제목으로 검색하는 함수
export async function searchByTitle(title) {
    try {
        return await Tweet.find({ title: new RegExp(title, 'i') }); // 대소문자 구분 없이 부분 일치 검색
    } catch (error) {
        console.error('Error searching by title:', error);
        throw error;
    }
}

// 트윗을 작성 객체로 받기
export async function create(data) {
    const newTweet = new Tweet({
        userid: data.userid,
        title: data.title,
        text: data.text,
        img_url1: data.img_url1,
        img_url2: data.img_url2,
        img_url3: data.img_url3
        // 필요한 경우 다른 필드 추가 가능
    });

    // 트윗 저장
    const savedTweet = await newTweet.save();
    return savedTweet;
}

// 트윗을 변경
export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id,{text:text},{ReturnDocument:"after"});
}

// 트윗을 삭제
export async function remove(id) {
    return Tweet.findByIdAndDelete(id);
}