import React, { useState, useEffect } from "react";
import firebase from "../Firebase";
import ChannelCard from "./ChannelCard";

export default function Messenger() {
  const [user, setUser] = useState(false);
  const [channels, setChannels] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const db = firebase.firestore();
      const data = await db.collection("channels").get();
      setChannels(data.docs.map((doc) => doc.data()));
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

  /*<ChannelCard
              Title="ChatSex"
              Desc="This channel is about sex."
            ></ChannelCard>*/

  if (user) {
    if (channels) {
      return (
        <div className="messenger-container">
          <div className="channels-container">
            <h1 id="h1-channels">Channels</h1>
            <div className="ccard-flexbox">
              {channels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  Title={channel.name}
                  Desc={channel.desc}
                ></ChannelCard>
              ))}
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
}
