import React, {useState} from 'react';

const AudioPlayer = ({ src, onEnded ,songName}) => {
    const [currenttime, setCurrentTime] = useState(0);
  
    const handleTimeUpdate = (e) => {
      setCurrentTime(e.target.currenttime);
    };
  
    const handleEnded = () => {
      setCurrentTime(0);
      onEnded();
    };
  
    return (
      <div>
        <h3>Now Playing</h3><p>{songName}</p>
        <audio controls src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}
         currenttime={currenttime}/>
      </div>
    );
  };

export default AudioPlayer;
