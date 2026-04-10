import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const wsRef = useRef(null);

    useEffect(() => {
        const wsUrl = 'ws://localhost:8000/ws/updates/';
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('Connected to WebSocket for updates');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'update' && data.message) {
                const newNotification = {
                    id: Date.now(),
                    message: data.message
                };
                setNotifications(prev => [...prev, newNotification]);

                // Auto remove after 5 seconds
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                }, 5000);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        setSocket(ws);
        wsRef.current = ws;

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    const sendUpdate = (message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ message }));
        } else {
            console.warn('Cannot send: WebSocket is not open');
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendUpdate, notifications }}>
            {children}
            
            {/* Global Notification Overlay */}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
                {notifications.map(note => (
                    <div key={note.id} className="bg-blue-600 text-white px-4 py-3 rounded-md shadow-lg flex items-center justify-between min-w-[250px] transition-all">
                        <span>{note.message}</span>
                        <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== note.id))} className="ml-4 font-bold text-white hover:text-gray-200">
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </WebSocketContext.Provider>
    );
};
