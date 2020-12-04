import { useEffect, useRef, useState } from "react";
import socketIOClient from 'socket.io-client'
const tools = require("../tools");



let url = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8080/";
} else {
  url =
    "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/";
}

const ChatTools = (roomID, currentUser) => {
    // console.log(roomID)
    const [messages, updateMessages] = useState([]);
    const ref = useRef();
    useEffect(()=>{
    
        ref.current = socketIOClient(url,{
            query:{roomID:roomID}
        });


        ref.current.on("newChatMessage", (message)=>{
            let incoming = {
                ...message,
                isCurrentUser:message.senderID === currentUser,
            };
            // console.log(incoming)
            updateMessages((messages)=>[...messages, incoming]);
            
            let newLog = messages;
            newLog.push(incoming)

            // console.log(newLog)

            tools.saveChatLog(roomID, newLog);

        });

        return () =>{
            ref.current.disconnect();
        }
    }, [roomID, currentUser])
    const send = (message) =>{
        ref.current.emit("newChatMessage",{
            body:message,
            senderID:currentUser
        });
      
    };
    return {messages, send}
};

export default ChatTools;
