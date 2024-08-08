import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import { connectDB } from "./db/database.js";
import userRouter from './routes/auth.js' //회원정보
import busRouter from './routes/bus.js' //버스
import communityRouter from './routes/tweets.js' //물가생활
import mytextRouter from './routes/mytext.js' //내가 쓴글
import commentRouter from './routes/comment.js' //댓글
import {config}  from './config.js';
import adRouter from './routes/ad.js';


const app = express()
const html = fs.readFileSync('index.html')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('combined'))

app.use('/user',userRouter)
app.use('/bus',busRouter)
app.use('/comments',commentRouter)
app.use('/price/community',communityRouter)
app.use('/mytext',mytextRouter)
app.use(express.static('public'));
app.use('/api', adRouter);
app.use('/public', express.static('public'));


app.get('/',(req,res)=>{
  res.writeHead(200)
  res.write(html)
  res.end()
})

app.get('/index.html',(req,res)=>{
  res.writeHead(200)
  res.write(html)
  res.end()
})

connectDB().then((db) => {
  console.log('몽구스를 사용하여 연결성공')
  app.listen(config.host.port);
}).catch(console.error);
