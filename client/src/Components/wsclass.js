import {io} from 'socket.io-client'
class NetworkManager{
    ws= new io("/api")

    moveEvent(messObj){
        this.ws.emit("move",JSON.stringify(messObj))
    }
    wsMessageEvent(func){
        this.ws.addEventListener("message",func)
    }

}
export const wsInstance=new NetworkManager();
