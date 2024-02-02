To access the site's interface and explore its features, kindly follow this link: https://audio-player-eight-phi.vercel.app/

Description:
It is a React application for an audio player with features such as file upload, playlist management, and audio playback. It utilizes components like AudioPlayer, Playlist, FileInput, and LoadingBar to create a user-friendly audio playback experience.

Features:

File Upload:
Users can upload audio files by selecting a file through the FileInput component.
Uploaded files are sent to Cloudinary using the upload function, and the progress is displayed using the LoadingBar component.

Playlist Management:
The Playlist component displays a list of uploaded audio files with options to select and remove each item.
Users can remove a specific audio file from the playlist, and the playlist automatically updates.

Local Storage Persistence:
The application uses the localStorage API to persist the list of audio files and the last played index across browser sessions.
Upon initialization, the app retrieves the stored audio files and the last played index, providing a seamless user experience.

Audio Player:
The AudioPlayer component plays the selected audio file from the playlist.
It automatically proceeds to the next audio file when the current one ends, creating a continuous playback experience.
The user can see the name of the currently playing song.

Responsive Design:
The application is designed with responsiveness in mind, ensuring a consistent layout and functionality across different devices and screen sizes.

Visual Feedback:
The LoadingBar component provides visual feedback on the progress of audio file uploads, enhancing the user experience.

Styling:
The app includes minimal styling for a clean and modern look, with a dark-themed header and organized layout.

Usability:
The user interface is designed to be user-friendly, with clear instructions for file upload and intuitive playlist management.
Cloudinary Integration:

Overall, this React audio player application provides a feature-rich and responsive platform for users to manage and enjoy their audio files seamlessly.
