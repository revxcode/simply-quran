"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update time progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(totalDuration);
      setProgress((current / totalDuration) * 100);
    }
  };

  // Seek to a specific time in the audio
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && duration) {
      const seekTime = (parseFloat(e.target.value) / 100) * duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  // Format time into mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Event listener for time updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      setDuration(audioRef.current.duration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center px-2">
      <audio ref={audioRef} src={audioSrc} className="w-full h-10 rounded-md" />

      <div className="w-full flex justify-between items-center gap-2">
        <button
          onClick={togglePlayPause}
          className="text-white p-1 bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          {isPlaying ? (<Pause />) : (<Play />)}
        </button>

        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />

        <span className="text-neutral-800 dark:text-neutral-200 text-nowrap text-xs ml-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;