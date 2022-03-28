import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io.connect("https://vivekchatsocket.herokuapp.com/");

function App() {
  const [userName, setuserName] = useState("");
  const [chatRoom, setchatRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && chatRoom !== "") {
      socket.emit("join_room", chatRoom);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Let's Chat</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setuserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setchatRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Ready</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} chatRoom={chatRoom} />
      )}
    </div>
  );
}

export default App;
