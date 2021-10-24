import React, { useState, useEffect } from "react";
import firebase from "../Firebase";
import Message from "./Message";

export default function Messenger() {
  const [user, setUser] = useState(false);
  const [channels, setChannels] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currChannel, setCurrChannel] = useState(false);
  const [currChannelName, setCurrChannelName] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const db = firebase.firestore();
      const data = await db.collection("channels").get();
      setChannels(data.docs.map((doc) => doc));
    };
    fetchChannels();
  }, []);

  function getMessages() {
    setLoading(true);
    firebase
      .firestore()
      .collection("messages")
      .orderBy("createdAt")
      .limit(15)
      .onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc);
        });
        
        setMessages(items);
        setLoading(false);
      });
  }



  useEffect(() => {
    getMessages();
  }, []);



  firebase.auth().onAuthStateChanged(function (fUser) {
    if (fUser) {
      setUser(fUser);
      document.getElementById("header-logoutBtn").style.display = "flex";
    } else {
      setUser(false);
    }
  });

  function changeChannel(id, name) {
    setCurrChannel(id);
    setCurrChannelName(name);
  }

  function scrollToBottom(elementID) {
    /*window.setInterval(function () {
      var elem = document.getElementById(elementID);
      elem.scrollTop = elem.scrollHeight;
    }, 500);*/
  }

  function sendMessage() {
    const input = document.getElementById("message-input");
    let txtContent = input.value;
    firebase
      .firestore()
      .collection("messages")
      .add({
        channel: "",
        content: txtContent,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sender: user.uid,
        senderName: user.displayName,
        inChannel: currChannel,
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    input.value = "";
  }


  if (!loading) {
    if (user) {
      if (channels) {
        return (
          <div className="messenger-container">
            <div className="channels-container">
              <h1 id="h1-channels"></h1>
              <div className="ccard-flexbox">
                {channels.map((channel) => (
                  <div
                    onClick={() =>
                      changeChannel(channel.id, channel.data().name)
                    }
                    className="ccard-container"
                  >
                    <h1>{channel.data().name}</h1>
                    <h2>{channel.data().desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="messages-container">
              <div className="messages-box">
                <div className="messages-header">
                  <div className="messages-header-left">
                    <h1>
                      {currChannelName ? currChannelName : "Select a channel"}
                    </h1>
                  </div>
                  <div className="messages-header-right">
                    <img
                      className="messages-header-right-user-pfp"
                      src={user.photoURL}
                      alt="User PFP"
                    />
                  </div>
                </div>
                <div className="messenger-flexbox">
                  {currChannelName ? (
                    <>
                      <div className="messenger-messages-box" id="messages-box">
                        {
                        messages.map((msg) => (
                          <Message
                            Display={msg.data().inChannel == currChannel ? true : false}
                            Own={msg.data().sender == user.uid ? true : false}
                            Content={msg.data().content}
                            Who={msg.data().senderName}
                            CreatedAt={
                              msg.data().createdAt
                                ? msg
                                    .data()
                                    .createdAt.toDate()
                                    .toLocaleTimeString("en-US") +
                                  " on " +
                                  msg.data().createdAt.toDate().toDateString()
                                : "Now"
                            }
                            key={msg.id}
                          ></Message>
                        ))}
                        {scrollToBottom("messages-box")}
                      </div>
                      <div className="messenger-bottom">
                        <input
                          type="text"
                          placeholder="Type your message here..."
                          id="message-input"
                        />
                        <div className="messenger-send-box">
                          <i
                            onClick={sendMessage}
                            className="far fa-reply-all "
                          ></i>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="messenger-container">
            <div className="channels-container">
              <h1 id="h1-channels">Channels</h1>
              <div className="ccard-flexbox">
                <h1 id="noChannels">You have no channels </h1>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  } else {
    return <h1>Loading...</h1>;
  }
}
