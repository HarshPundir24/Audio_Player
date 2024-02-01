import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ src, onEnded, songName }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play().catch((error) => console.error('Auto-play failed:', error));
  }, [src]);

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    onEnded();
  };

  return (
    <div>
      <h3>Now Playing</h3>
      <p>{songName}</p>
      <audio ref={audioRef} controls src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}
      />
    </div>
  );
};

export default AudioPlayer;
