import React from "react";
import { useHistory } from "react-router-dom";
const tools = require("../tools");



const DeleteButton = (props) => {
    let history = useHistory();
    function onDelete() {
        // console.log(props.id)
    tools.deleteGuide(props.id)
    history.push("/");
  };

  return <div className="deleteButton" onClick={onDelete}>Delete Guide</div>;
};

export default DeleteButton;