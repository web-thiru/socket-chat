import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';


const socket = io('http://localhost:3001');
function Login() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [joined, setJoined] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [roomError, setRoomError] = useState(false);
    const join = () => {
        if (!username) {
            setUsernameError(true);
        }
        if (!room) {
            setRoomError(true);
        }
        if (username && room) {
            socket.emit('joinRoom', room);
            setJoined(true);
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (usernameError && e.target.value.trim() !== '') {
            setUsernameError(false);
        }
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
        if (roomError && e.target.value.trim() !== '') {
            setRoomError(false);
        }
    };

    const onLeaveRoom = () => {
        socket.emit('leaveRoom', room);
        setJoined(false);
        setUsername('');
        setRoom('');
    };

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('socket is connected');
        });
        return ()=>socket.disconnect();
    },[])
    return (
        <div>
            {!joined && (
                <div className="login-container">
            <div className="join-form" >
                <h2>Join Chat</h2>
                <div className="input-group">
                    <input
                        type="text" // Added type for semantic correctness
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder=" " // Important for placeholder animation
                        id="username" // Added id for label association
                    />
                    <label htmlFor="username">Username</label>
                    {usernameError && <p className="error-message">Username is required!</p>}
                </div>
                <div className="input-group">
                    <input
                        type="text" // Added type
                        value={room}
                        onChange={handleRoomChange}
                        placeholder=" " // Important for placeholder animation
                        id="room" 
                    />
                    <label htmlFor="room">Room</label>
                    {roomError && <p className="error-message">Room is required!</p>}
                </div>
                <button onClick={join}>Join</button>
            </div>
        </div>

            )
            }
            {joined && <Chat socket={socket} room={room} username={username} onLeaveRoom={onLeaveRoom} />}
        </div >
    )
}

export default Login