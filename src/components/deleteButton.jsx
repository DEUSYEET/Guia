import React from "react";
import { useHistory } from "react-router-dom";
const tools = require("../tools");

let confirm = false;

const DeleteButton = (props) => {
    let history = useHistory();
    function onDelete(e) {
      if(confirm){
        tools.deleteGuide(props.id)
        history.push("/");
        confirm = false;
      } else {
        e.target.innerHTML = "Confirm Delete"
        confirm = true;
      }
        // console.log(props.id)
  };

  return <div className="deleteButton" onClick={onDelete}>Delete Guide</div>;
};

export default DeleteButton;