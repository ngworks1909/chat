import { Message } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FaPause, FaPlay } from 'react-icons/fa';

export default function VoiceMessage({message}: {message: Message}) {
  const [audioMessage, setAudioMessage] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const waveformRef = useRef<HTMLInputElement | null>(null);
  const waveform = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    waveform.current = WaveSurfer.create({
        container: waveformRef.current || "",
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30
    })
    waveform.current.on("finish", () => {
        setIsPlaying(false)
    })
    return () => {
        waveform.current?.destroy()
    }
  }, [waveform])

  const handlePlayRecording = () => {
    if(audioMessage){
        waveform.current?.stop();
        waveform.current?.play();
        audioMessage.play();
        setIsPlaying(true)
    }
  }

  const handlePauseRecording = () => {
    waveform.current?.stop();
    audioMessage?.pause();
    setIsPlaying(false)
  }

  useEffect(() => {
    if(audioMessage){
        const updatePlaybackTime = () => {
            setCurrentPlaybackTime(audioMessage.currentTime)
        }
        audioMessage.addEventListener("timeupdate", updatePlaybackTime);
        return () => {
            audioMessage.removeEventListener("timeupdate", updatePlaybackTime)
        }
    }
  }, [audioMessage]);

  useEffect(() => {
    const audio = new Audio(message.message);
    setAudioMessage(audio);
    waveform.current?.load(message.message);
    waveform.current?.on("ready", () => {
        setTotalDuration(waveform.current?.getDuration() || 0)
    })

  }, [message.message])

  

  const formatTime = (time: number): string  => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex gap-5 items-center justify-center py-2'>
      <Avatar className='h-7 w-7'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {!isPlaying ? <FaPlay onClick={handlePlayRecording} /> : <FaPause onClick={handlePauseRecording} />}
      <div className='relative flex items-center gap-2'>
      <div className='w-20 sm:w-40' ref={waveformRef} />
        <div className='text-neutral-300 text-[11px] pt-1 flex justify-between'>
            <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
        </div>
      </div>
    </div>
  )
}
