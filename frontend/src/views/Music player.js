import React, { useState, useEffect, useRef } from 'react';
import '../styles/music.scss';
import song1 from '../assets/images/music/song1.mp3';
import song2 from '../assets/images/music/Swordland.mp3';
import opm from '../assets/images/playlists/one_punch_man.png';
import sao from '../assets/images/playlists/SAO.jpg';
const songs = [
    {
        path: song1,
        displayName: 'Im Hero',
        cover: opm,
        artist: 'Derck Uzumaki',
    },
    {
        path: song2,
        displayName: 'Swordland',
        cover: sao,
        artist: 'Yuki Kajiura',
    },
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicIndex, setMusicIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const audioRef = useRef(new Audio(songs[musicIndex].path));

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgressBar = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateProgressBar);
        audio.addEventListener('ended', () => changeMusic(1));

        return () => {
            audio.removeEventListener('timeupdate', updateProgressBar);
            audio.removeEventListener('ended', () => changeMusic(1));
        };
    }, [musicIndex]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const changeMusic = (direction) => {
        const newIndex = (musicIndex + direction + songs.length) % songs.length;
        setMusicIndex(newIndex);
        loadMusic(newIndex);
    };

    const loadMusic = (index) => {
        const audio = audioRef.current;
        audio.src = songs[index].path;
        setCurrentTime(0);
        if (isPlaying) audio.play();
    };

    const setProgressBar = (e) => {
        const width = e.target.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        audioRef.current.currentTime = (clickX / width) * duration;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="container">
            <div className="player-img">
                <img src={songs[musicIndex].cover} alt="cover" className="active" />
            </div>
            <h2>{songs[musicIndex].displayName}</h2>
            <h3>{songs[musicIndex].artist}</h3>

            <div className="player-progress" onClick={setProgressBar}>
                <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                <div className="music-duration">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="player-controls">
                <i className="fa-solid fa-backward" onClick={() => changeMusic(-1)}></i>
                <i
                    className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} play-button`}
                    onClick={togglePlay}
                ></i>
                <i className="fa-solid fa-forward" onClick={() => changeMusic(1)}></i>
            </div>
        </div>
    );
};

export default MusicPlayer;
