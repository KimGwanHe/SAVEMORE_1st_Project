import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
// import { getBus } from '../db/database.js';

const busSchema = new mongoose.Schema({
    region : {type:String,require:true},
    bus_num : {type:String,require:true},
    seq_num : {type:String,require:true},
    station : {type:String,require:true},
    time1 : String,
    time2 : String,
    time3 : String,
    time4 : String,
    time5 : String,
    time6 : String,
    time7 : String,
    time8 : String,
    time9 : String
},{timestamps:{currentTime: () => new Date(Date.now() + 9 * 60 * 60 * 1000) }})

useVirtualId(busSchema)

const Bus = mongoose.model('bus',busSchema)

export async function getAllbyGu(region) {
    // return Bus.find({region: `${gu}`}).sort({bus_num: -1, seq_num: -1});
    console.log('구별 버스 조회')
    console.log(region)
    const buses = await Bus.find({region:region}).sort( { "bus_num": 1 , "seq_num":1} )
    console.log(buses)
    return buses;
}