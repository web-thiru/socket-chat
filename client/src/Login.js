import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';


const socket = io('http://localhost:3001');
function Login() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [joined, setJoined] = useState(false);
    const join = () => {
        socket.emit('joinRoom', room);
        setJoined(true);
    }
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('socket is connected');
        });
        return ()=>socket.disconnect();
    },[])
    return (
        <div>
            {!joined && (
                <div>
                    <h2>Join Chat</h2>
                    <div className="join-form">
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            placeholder="Room"
                        />
                        <button onClick={join}>Join</button>
                    </div>
                </div>

            )
            }
            {joined && <Chat socket={socket} room={room} username={username}/>}
        </div >
    )
}

export default Login