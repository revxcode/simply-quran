"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';
<<<<<<< HEAD
=======
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)

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
<<<<<<< HEAD
      audioRef.current.currentTime = seekTime;
=======
      audioRef.current.currentTime = seekTime || 0;
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
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

<<<<<<< HEAD
  return (
    <div className="flex flex-col items-center px-2">
      <audio ref={audioRef} src={audioSrc} className="w-full h-10 bg-neutral-300 rounded-md" />

      <div className="w-full flex justify-between items-center py-2">
=======
  interface ReciterChangeEvent extends React.ChangeEvent<HTMLSelectElement> { }

  const handleReciter = (e: ReciterChangeEvent) => {
    const surahId = audioSrc.split('/')[5].split('.mp3')[0];
    const reciterCode = e.target.value;
    const audioUrl = `/api/quran/murottal?surah=${surahId}&reciter=${reciterCode}`;
    fetch(audioUrl)
      .then((response) => response.json())
      .then((data) => {
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl;
          audioRef.current.play();
          setIsPlaying(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching audio URL:', error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <audio ref={audioRef} src={audioSrc} className="w-full h-10 bg-neutral-300 rounded-md" />

      <div className="w-full flex justify-between items-center py-2 gap-1">
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
        <button
          onClick={togglePlayPause}
          className="text-white p-1 bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          {isPlaying ? (<Pause />) : (<Play />)}
        </button>

<<<<<<< HEAD
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-1/2 h-2"
        />

        <span className="text-neutral-800 text-nowrap text-xs ml-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
=======
        <div className="flex flex-col gap-2">
          <select
            name="reciter"
            id="reciter"
            onChange={handleReciter}
            defaultValue="Alafasy"
            className="bg-neutral-200 rounded-md p-1 text-neutral-800">
            <option value="AbdulBasit">Abdul Basit</option>
            <option value="Alafasy">Mishary Rashid Alafasy</option>
            <option value="AlSudais">Abdul Rahman Al-Sudais</option>
            <option value="SaadAlGhamdi">Saad Al-Ghamdi</option>
            <option value="AbuBakrAlShatri">Abu Bakr Al-Shatri</option>
          </select>

          <input
            type="range"
            value={isNaN(progress) ? 0 : progress}
            onChange={handleSeek}
            className="w-full h-2"
          />

          <span className="text-neutral-800 text-nowrap text-xs ml-2 text-end">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>

      </div>
    </div >
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
  );
};

export default AudioPlayer;
