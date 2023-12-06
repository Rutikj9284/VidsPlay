import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const Video = ({ videoURL }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const player = playerRef.current;
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const rewind = () => {
    const player = playerRef.current;
    player.seekTo(player.getCurrentTime() - 5);
  };

  const forward = () => {
    const player = playerRef.current;
    player.seekTo(player.getCurrentTime() + 10);
  };

  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      <ReactPlayer
        ref={playerRef}
        url={videoURL}
        playing={isPlaying}
        controls
        onClick={togglePlayPause}
        width="100%"
        height="auto"
      />
      <div
        onClick={togglePlayPause}
        onDoubleClick={rewind}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
};

export default Video;
