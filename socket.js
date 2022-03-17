const webSocket = require('ws') //npm install ws

//아래 코드들이 이미 구현되어있는 편리한 socket.io가 있다.
let sockets = []
module.exports = (server) => {
    //웹소켓 기능구현
    const wss = new webSocket.Server({ server }) //port를 http와 공유한다
    //const wss= new webSocket.Server({port:3001}) 이렇게하면 port를 구분지어사용할수도있다.

    wss.on('connection',(ws,req)=>{ 
        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws) //채팅프로그램(프론트에서 받아온 값을 ws전체에 뿌려주려고)
        // console.log(sockets.length)
        // console.log(ws,req)
        console.log(req.connection.remoteAddress)

        //code : 연결이 종료되는 이유를 가르쳐주는 숫자 기본값:1000
        //reason: 왜 종료되는지 사람이 읽을수있도록 나탄는 문자열
        //utf-8 포멧 123바이트를 넘을수없다
        ws.on('close',(code,reason)=>{
            console.log('연결끊길때~')
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })
            console.log(sockets.length)
        })

        //객체 만들기
        let layout = {
            event : 'init',
            msg : '클라이언트야 이거 받아지니?'
        }
        let example = {
            event : 'ingoo',
            msg : 'hello socket'
        }
        let return_msg = {
            event : 'return',
            msg : '메세지 리턴해줘'
        }

        // ws.send(JSON.stringify(layout))
        // ws.send(JSON.stringify(example))
        // ws.send(JSON.stringify(return_msg))
        ws.on("message",(response)=>{
            let obj = JSON.parse(response.toString('utf-8')) //프론트에서 send받은 메세지 : response
            // ws.send(data.toString('utf-8'))
            let {type,data} = obj

            switch(type){
                case 'send_msg':
                    sockets.forEach( v=>{
                        v.send(data)
                    } )
                break;
            }

            
        })
    }) 
} 
//이벤트 기법
//on -> 듣기
//send -> 말하기
