import React, { useState } from "react";

export default function Message(props) {
  console.log(props.Who)
  if (props.Own) {
    // If my own msg.
    return (
      <>
        <div className="msg-own">
          <p className="msg-sender">You</p>
          <p>{props.Content}</p>
          <p className="msg-sender">{props.CreatedAt}</p>
        </div>
      </>
    );
  } else {
    // Someone else's message.
    return (
      <>
        <div className="msg-others">
          <p className="msg-sender">{props.Who}</p>
          <p>{props.Content}</p>
          <p className="msg-sender">{props.CreatedAt}</p>
        </div>
      </>
    );
  }
}
