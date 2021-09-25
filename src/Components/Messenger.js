import React, { useState, useEffect } from "react";
import firebase from "../Firebase";

export default function Messenger() {
  const [user, setUser] = useState(false);
  const [channels, setChannels] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currChannel, setCurrChannel] = useState(false);
  const [currChannelName, setCurrChannelName] = useState(false)

  useEffect(() => {
    const fetchChannels = async () => {
      const db = firebase.firestore();
      const data = await db.collection("channels").get();
      setChannels(data.docs.map((doc) => doc));
    };
    fetchChannels();
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
    setCurrChannel(id)
    setCurrChannelName(name);
  }
  //log:
  console.log(currChannel + ' :: ' + currChannelName);

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
                    onClick={() => changeChannel(channel.id, channel.data().name)}
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
                      <h1>{currChannelName ? currChannelName : 'Select a channel'}</h1>
                    </div>
                    <div className="messages-header-right">
                      <img className="messages-header-right-user-pfp" src={user.photoURL} alt="User PFP" />
                    </div>
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
