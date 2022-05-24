import io from "socket.io-client";
import "./App.css";
const socket = io.connect("http://localhost:3001");
// this connects our backend socket io server to out frontend, need to install socket io for the client first

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello" });
  };
  // the emit is an function so we can emit a message /event to another user in the client. and this gets taken to the backend. once its taken to the backend, that new user who recieves the messgae can then send another message via the front end
  return (
    <div className="App">
      <input placeholder="Message..." />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
