import { Component } from "react";
const tools = require('../tools')
class SaveChat extends Component {
  componentWillUnmount(){
    tools.saveChatLog(this.props.roomID,this.props.chatLog)
  }
render(){return ""}
}
export default SaveChat;