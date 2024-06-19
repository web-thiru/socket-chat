import React, { useState, useEffect } from 'react';
// Adjust for your server's URL and port

function Chat(props) {

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    
    const socket = props.socket;
    const room = props.room;
    const username = props.username;

    useEffect(() => {
        socket.on('newMessage', (data) => {
            console.log(data)
            setMessages((prev)=>[...prev,data])
        });
    },[socket]);


    const sendMessage = (e) => {
        e.preventDefault();
        if (currentMessage !== '') {
            socket.emit('sendMessage', { message: currentMessage, username:username,room });
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-container">
            <>
                <h2>Chat Room: {room}</h2>
                <div >
                    {messages.map((message) => (
                        <div key={message.id} >
                            <p>{message.username}: {message.message}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} >
                    <input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </>
        </div>
    );
}

export default Chat;
