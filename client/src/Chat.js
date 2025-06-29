import React, { useState, useEffect , useRef} from 'react';
// Adjust for your server's URL and port

function Chat(props) {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
        const messagesEndRef = useRef(null); 
    
    const socket = props.socket;
    const room = props.room;
    const username = props.username;

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages((prev)=>[...prev,data])
        });
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[socket ]);

    const onLeaveRoom = () => {
        socket.emit('leaveRoom', room);
        props.onLeaveRoom();
    };

    


    const sendMessage = (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            socket.emit('sendMessage', { message: currentMessage, username:username,room });
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-room">
                <div className="chat-header">
                    <h2>Chat Room: <span className="room-name">{room}</span></h2>
                    <button className="leave-button" onClick={onLeaveRoom}>Leave Room</button>
                </div>

                <div className="messages-box">
                    {messages.map((message,index) => (
                        <div key={index} className={`message-item ${message.username === username ? 'my-message' : ''}`}>
                            <p>
                                <span className="message-username">{message.username}:</span> {message.message}
                            </p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* For auto-scrolling */}
                </div>

                <form onSubmit={sendMessage} className="message-form">
                    <div className="input-with-button"> {/* New wrapper div */}
                        <input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            {/* Icon for send button (you might use an actual SVG or font icon library) */}
                            <svg className="send-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
