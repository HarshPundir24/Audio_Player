import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';
import FileInput from './components/FileInput';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [audioUpload, setAudioUpload] = useState('');
  const [loading, setLoading] = useState(true);

  const loadingBar = useRef(null);

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

    loadingBar.current.continuousStart();
    try {
      const response = await upload(audioUpload);

      if (response.ok) {
        const responseData = await response.json();
        const updatedFiles = [
          ...audioFiles,
          { name: audioUpload.name, url: responseData.url },
        ];
        setAudioFiles(updatedFiles);
        setAudioUpload('');
      } else {
        console.error('Failed to upload to Cloudinary');
      }
    } catch (error) {
      console.error('Error during Cloudinary upload:', error);
    } 
    finally {
      loadingBar.current.complete();
    }
  };

  const upload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'akdmxjei');
    data.append('cloud_name', 'djnectplo');
    data.append('resource_type', 'audio');

    const response = await fetch('https://api.cloudinary.com/v1_1/djnectplo/upload', {
      method: 'POST',
      body: data,
    });

    return response;
  };

  const removeAudioFile = (index) => {
    const updatedFiles = [...audioFiles];
    updatedFiles.splice(index, 1);
    setAudioFiles(updatedFiles);
    if (currentFileIndex >= updatedFiles.length) {
      setCurrentFileIndex(updatedFiles.length - 1);
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
      <LoadingBar ref={loadingBar} color="#f11946" />
      <h1 className="text-center bg-dark text-white">Audio Player</h1>
      <div className="d-flex justify-content-start my-5">
        <FileInput onFileChange={handleFileChange} />
        <button className="btn btn-success mt-2 mt-md-0 ml-md-2" onClick={handleFileUpload}>
          Upload Audio
        </button>
      </div>
      <div className="d-flex justify-content-around flex-column-reverse flex-md-row my-5">
        <Playlist files={audioFiles} onSelect={handleSelectFile} onRemove={removeAudioFile} />
        {audioFiles.length > 0 && currentFileIndex >= 0 && currentFileIndex < audioFiles.length && (
          <AudioPlayer
            src={audioFiles[currentFileIndex].url}
            onEnded={handleAudioEnded}
            songName={audioFiles[currentFileIndex].name}
          />
        )}
      </div>
    </div>
  );
};

export default App;
