import io from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
// this connects our backend socket io server to out frontend, need to install socket io for the client first

function App() {
  const [message, setMessage] = useState("");
  // to send messages to the back end
  const [messageRecieved, setMessageRecieved] = useState("");
  // to recieve mesages on the front end
  const [room, setRoom] = useState("");
  // to join a room

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  // we use the messsage object to spceify what who we're sending a message too. so we need to add {message, room} so the message thats being sent will be sent just to that room number
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
    // this join function allows a user to join a room as long as theres a value in the input field with the socket.emit("join_room")
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
      // to make sure we're getting the correct messages from a user, we set our usestate to listen to the event thats happening. in this case it would be data.message
    });
  }, [socket]);

  // the emit is an function so we can emit a message /event to another user in the client. and this gets taken to the backend. once its taken to the backend, that new user who recieves the messgae can then send another message via the front end.  in this instance we sent an object of message: hello and on click it should be recieved on the backend.
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message:</h2>
      {messageRecieved}
    </div>
  );
}

export default App;
