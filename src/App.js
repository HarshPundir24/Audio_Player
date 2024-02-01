import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import FileInput from './components/FileInput';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [audioUpload, setAudioUpload] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('audioFiles')) || [];
    setAudioFiles(storedFiles);
    const lastPlayedIndex = parseInt(localStorage.getItem('lastPlayedIndex')) || 0;
    setCurrentFileIndex(lastPlayedIndex);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('audioFiles', JSON.stringify(audioFiles));
      localStorage.setItem('lastPlayedIndex', currentFileIndex);
    }
  }, [audioFiles, currentFileIndex, loading]);

  const handleFileUpload = async () => {
    if (audioUpload === '') return;

    const data = new FormData();
    data.append("file", audioUpload);
    data.append("upload_preset", "akdmxjei");
    data.append("cloud_name", "djnectplo");
    data.append("resource_type", "audio");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djnectplo/upload", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedFiles = [
          ...audioFiles,
          { name: audioUpload.name, url: responseData.url },
        ];
        setAudioFiles(updatedFiles);
        setAudioUpload('');
      } else {
        console.error("Failed to upload to Cloudinary");
      }
    } catch (error) {
      console.error("Error during Cloudinary upload:", error);
    }
  };

  const handleFileChange = (selectedFile) => {
    setAudioUpload(selectedFile);
  };

  const handleSelectFile = (index) => {
    setCurrentFileIndex(index);
  };

  const handleAudioEnded = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  return (
    <div className="App mb-5">
      <h1 className='text-center bg-dark text-white'>Audio Player</h1>
      <div className='d-flex justify-content-start my-5'>
        <FileInput onFileChange={handleFileChange} />
        <button className='btn btn-success mt-2 mt-md-0 ml-md-2' onClick={handleFileUpload}>Upload Audio</button>
      </div>
      <div className='d-flex justify-content-around flex-column-reverse flex-md-row my-5'>
        <Playlist files={audioFiles} onSelect={handleSelectFile} />
        {audioFiles.length > 0 && (
          <AudioPlayer  src={audioFiles[currentFileIndex].url}
            onEnded={handleAudioEnded} songName={audioFiles[currentFileIndex].name} />
        )}
      </div>
    </div>
  );
};

export default App;
