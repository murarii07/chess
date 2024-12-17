class NetworkManager{
    ws= new WebSocket("http://localhost:5000")

    messageSend(messObj){
        this.ws.send(JSON.stringify(messObj))
    }
    wsMessageEvent(func){
        this.ws.addEventListener("message",func)
    }

}
export const wsInstance=new NetworkManager();