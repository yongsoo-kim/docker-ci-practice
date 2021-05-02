const express = require("express")
const redis = require("redis")

//레디스 클라이언트 생성.
//Docker컴포스를 쓸때는 host옵션을 docker-compose.yml파일에 명시한 컨테이너 이름으로 주면 된다.
const client = redis.createClient({
    host:"redis-server",
    port: 6379
})

const app = express();


//숫자는 0부터 시작합니다.
client.set("number", 0);

//레디스에서 받아온 숫자는 String타입이기에, number를 pareInt한다.
app.get('/',(req,res) => {
    client.get("number", (err, number) => {
        //현재 숫자를 가져온후에 1씩 올려줍니다.
        res.send("숫자가 1씩 올라갑니다. 숫자: "+number)
        client.set("number", parseInt(number) + 1)
    })
})



app.listen(8080);
console.log('Server is running');
