import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Playlist = ({ files, onSelect, onRemove }) => {
  const [playlistFiles, setPlaylistFiles] = useState([]);

  useEffect(() => {
    setPlaylistFiles(files);
  }, [files]);

  return (
    <ul>
      <h2>Playlist</h2>
      {playlistFiles.map((file, index) => (
        <li role="button" key={index} onClick={() => onSelect(index)}>
          {file.name}
          <FontAwesomeIcon
            icon={faTrash}
            className='text-danger float-right mx-4'
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
