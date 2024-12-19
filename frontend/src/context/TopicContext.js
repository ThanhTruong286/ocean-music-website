// src/contexts/TopicContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo Context cho chủ đề
const TopicContext = createContext();

export const useTopic = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
    const [topic, setTopic] = useState('');  // Giá trị mặc định của topic

    return (
        <TopicContext.Provider value={{ topic, setTopic }}>
            {children}
        </TopicContext.Provider>
    );
};
