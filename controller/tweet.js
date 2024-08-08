import * as tweetRepository from '../data/tweet.js';

// 여러 트윗을 가져오는 함수
export async function getTweets(req, res) {
    const data = await tweetRepository.getAll()
    res.status(200).json(data);
}

// 좋아요순으로 가져오는 함수
export async function getAllByLikes(req, res, next) {
    const data = await tweetRepository.getAllByLikes();
    res.status(200).json(data);
}

// 조회수순으로 가져오는 함수
export async function getAllByViews(req, res, next) {
    const data = await tweetRepository.getAllByViews();
    res.status(200).json(data);
}

// 유저아이디별로 트윗 가져오기
export async function getTweetByUserId(req, res) {
    const userid = req.query.userid;
    const data = await (userid ? tweetRepository.getAllbyUsername(userid)
                                : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getByuserid(req, res){
    const userid = req.params.userid;
    console.log(userid)
    const tweets = await tweetRepository.getAllbyuserid(userid)
    console.log(tweets)
    return res.status(200).json(tweets)
}

// 하나의 트윗을 가져오는 함수
export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getbyId(id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 트읫이 없습니다`})
    }
}

// 트윗을 생성하는 함수
export async function createTweet(req, res, next) {
    const {userid,title,text,img_url1,img_url2,img_url3} = req.body;
    const tweets = await tweetRepository.create({userid,title,text,img_url1,img_url2,img_url3});
    res.status(201).json(tweets)
};

// 트윗을 변경하는 함수
export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const { nickname,userid,title,text,img_url1,img_url2,img_url3} = req.body;
    const tweet = await tweetRepository.getbyId(id);
    tweet.title = title
    tweet.text = text
    tweet.img_url1 = img_url1
    tweet.img_url2 = img_url2
    tweet.img_url3 = img_url3
    await tweet.save()
    res.status(201).json(tweet);
}

// 트윗을 삭제하는 함수 
//데이터 파싱해서 뿌릴때 아이디도 같이 뿌리기(displaynone으로 뿌리고 그 아이디를 가져와서 제거)
export async function deleteTweet(req, res, next) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    return res.send(`
    <script>
      alert('글이 삭제되었습니다.');
      window.location.href = '/';
    </script>
  `);
}

//(추가) 조회수 올리기
export async function incrementNum(req, res, next) {
    const id = req.params.id;
    try {
        const post = await tweetRepository.getbyId(id);
        console.log(post)
        if (!post) {

            return res.status(404).json({ error: 'Tweet not found' })
        }
        post.num+= 1;
        console.log(post.num);
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        throw error;
    }
}

export async function incrementAlert(req, res, next) {
    const id = req.params.id;
    try {
        const tweet = await tweetRepository.getbyId(id);
        if (!tweet) {
            throw new Error('Tweet not found');
        }
        tweet.alert += 1;
        await tweet.save();
        return res.status(200).json(tweet);
    }catch (error) {
        console.error('Error incrementing alert:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export async function unlikeTweet(req, res, next) {
    const id = req.params.id;
    // const tweet = await tweetRepository.findByOne({userid : userid,title:title});
    try {
        const tweet = await tweetRepository.getbyId(id);
        if (!tweet) {
            return res.status(404).json({ error: "Tweet not found" });
        }
        
        // 해당 트윗이 존재하면 like 필드를 업데이트합니다.
        tweet.like -= 1;

        // 업데이트한 필드를 저장합니다.
        await tweet.save();

        return res.status(200).json(tweet); // 성공적으로 업데이트된 트윗을 반환합니다.
    } catch (error) {
        console.error("Error while liking tweet:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//(추가) 좋아요수 올리기
export async function likeTweet (req, res, next) {
    const id = req.params.id;
    // const tweet = await tweetRepository.findByOne({userid : userid,title:title});
    try {
        const tweet = await tweetRepository.getbyId(id);
        if (!tweet) {
            return res.status(404).json({ error: "Tweet not found" });
        }
        
        // 해당 트윗이 존재하면 like 필드를 업데이트합니다.
        tweet.like += 1;

        // 업데이트한 필드를 저장합니다.
        await tweet.save();

        return res.status(200).json(tweet); // 성공적으로 업데이트된 트윗을 반환합니다.
    } catch (error) {
        console.error("Error while liking tweet:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// 검색 함수
export async function searchPosts(req, res) {
    const query = req.query.title;  // 검색어를 쿼리 문자열에서 가져옴
    try {
        const posts = await tweetRepository.searchByTitle(query);
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}