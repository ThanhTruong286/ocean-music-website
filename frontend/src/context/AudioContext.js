import React, { createContext, useState, useContext, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);

    // Lấy trạng thái từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const savedIsPlaying = JSON.parse(localStorage.getItem('audioIsPlaying')) || false;
        const savedCurrentTime = parseFloat(localStorage.getItem('audioCurrentTime')) || 0;
        const savedVolume = parseInt(localStorage.getItem('audioVolume')) || 100;

        setIsPlaying(savedIsPlaying);
        setCurrentTime(savedCurrentTime);
        setVolume(savedVolume);
    }, []);

    // Lưu trạng thái vào localStorage khi có thay đổi
    useEffect(() => {
        localStorage.setItem('audioIsPlaying', JSON.stringify(isPlaying));
        localStorage.setItem('audioCurrentTime', currentTime);
        localStorage.setItem('audioVolume', volume);
    }, [isPlaying, currentTime, volume]);

    return (
        <AudioContext.Provider value={{ isPlaying, setIsPlaying, currentTime, setCurrentTime, volume, setVolume }}>
            {children}
        </AudioContext.Provider>
    );
};
