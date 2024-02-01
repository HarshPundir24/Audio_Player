import React, { useEffect, useState } from 'react';

const Playlist = ({ files, onSelect }) => {
  const [playlistFiles, setPlaylistFiles] = useState([]);

  useEffect(() => {
    setPlaylistFiles(files);
  }, [files]);

  return (
    <ul>
      <h2>Playlist</h2>
      {playlistFiles.map((file, index) => (
        <li key={index} onClick={() => onSelect(index)}>
          {file.name}
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
