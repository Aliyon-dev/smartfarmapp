import React, { createContext, useState, useEffect, useContext } from 'react';
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://16.171.23.214:8000/ws/BX0001');
        setSocket(ws);
        console.log("this is ", ws)

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);