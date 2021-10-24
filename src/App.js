import "./App.css";
import firebase from "./Firebase";
import Header from "./Components/Header";
import Login from "./Components/Login";
import React, { useState } from "react";
import Messenger from "./Components/Messenger";

function App() {
  const [user, setUser] = useState(false);

  firebase.auth().onAuthStateChanged(function (fUser) {
    if (fUser) {
      setUser(fUser);
      document.getElementById("header-logoutBtn").style.display = "flex";
    } else {
      setUser(false);
    }
  });

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      })
      .catch((error) => {
        console.log("Firebase sign out error: " + error);
      });
  }

  if (!user) {
    return (
      <div className="App">
        <Header renderLogout={false}></Header>
        <Login></Login>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header
          logout={signOut}
          name={user.displayName}
          renderLogout={user ? true : false}
        ></Header>
        <Messenger></Messenger>
      </div>
    );
  }
}

export default App;
