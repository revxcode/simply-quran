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

  const fetchReciterAudio = async (reciter: string) => {
    const surah = audioSrc.split('/').pop()?.split('.mp3')[0];
    if (!surah) {
      throw new Error('Surah not found in audioSrc');
    }
    // Fetch the audio URL from the server
    const response = await fetch(`/api/quran/murottal?reciter=${reciter}&surah=${surah}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reciter audio');
    }
    const data = await response.json();
    return data.audioUrl;
  };

  const handleReciterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReciter = e.target.value;
    fetchReciterAudio(selectedReciter)
      .then((url) => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play();
          setIsPlaying(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching reciter audio:', error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} src={audioSrc} className="w-full h-10 rounded-md" />

      <div className='flex flex-col gap-2'>
        <div className="w-full flex justify-between items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="text-white p-1 bg-emerald-500 rounded-md hover:bg-emerald-600 cursor-pointer"
          >
            {isPlaying ? (<Pause />) : (<Play />)}
          </button>
          <select
            defaultValue="Alafasy"
            onChange={handleReciterChange}
            className="bg-white dark:bg-neutral-800 text-gray-800 dark:text-white border-none rounded-md px-2 py-1">
            <option value="AbdulBasit">Abdul Basit</option>
            <option value="Alafasy">Mishary Rashid Alafasy</option>
            <option value="AlSudais">Abdul Rahman Al-Sudais</option>
            <option value="SaadAlGhamdi">Saad Al-Ghamdi</option>
            <option value="AbuBakrAlShatri">Abu Bakr Al-Shatri</option>
          </select>
        </div>

        <input
          type="range"
          value={isNaN(progress) ? 0 : progress}
          min="0"
          max="100"
          step="0.1"
          style={{ backgroundSize: `${progress}%` }}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-center text-neutral-800 dark:text-neutral-200 text-nowrap text-xs ml-2">
          {formatTime(currentTime)} / {formatTime(duration) === 'NaN:NaN' ? '00:00' : formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;