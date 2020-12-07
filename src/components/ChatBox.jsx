import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ChatTools from "./ChatTools";
// import ProfilePic from "./ProfilePic";


const ChatBox = (props) => {
  const { messages, send } = ChatTools(props.roomID, props.currentUser);
  const [newMessage, updateSendMessage] = useState([]);
  const messagesBottomRef = useRef(null);

  const onMessageChange = (e) => {
    //   e.preventDefault();
    updateSendMessage(e.target.value);
  };

  const onSendMessage = () => {
    if (newMessage && typeof newMessage === "string") {
      send(newMessage);
      updateSendMessage("");
      document.getElementById("input").value = "";

    }
  };

  const autoScroll = () => {
    messagesBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messages.unshift(...props.prevLogs.filter((message) => message !== ""));
    // console.log("Prev Logs",props.prevLogs)
     // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // if (messages.length > 0) {
      // console.log(messages);
    // }
    autoScroll();
    // setTimeout(()=>{
    //   autoScroll();
    // }, 5000)
  }, [messages, props.roomID, props.prevLogs]);

  return (
    <div className="chatBox">
      <div className="chatBoxMessages">
        {messages.map((message, i) => (
          <div
            className={
              message.senderID === props.currentUser
                ? "chatMessage self"
                : "chatMessage"
            }
            key={i}
          >
            {/* <ProfilePic username={message.senderID}></ProfilePic> */}
            <Link to={"/profile?user=" + message.senderID}><div className="messageUsername">{message.senderID}: </div></Link>
            {message.body}
          </div>
        ))}
        <div id="messagesBottom" ref={messagesBottomRef}></div>
      </div>
      <div className="chatBoxInputBox">
        <input
          type="text"
          onChange={onMessageChange}
          placeholder="send message..."
          className="chatBoxInput"
          id="input"
        ></input>
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
