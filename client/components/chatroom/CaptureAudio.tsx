import { uploadFile } from '@/actions/uploadFile';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop } from 'react-icons/fa';
import { IoTrash } from "react-icons/io5";
import { MdSend } from 'react-icons/md';
import WaveSurfer from 'wavesurfer.js'

export default function CaptureAudio({hide, sendAudio, recieverId}: {hide: Dispatch<SetStateAction<boolean>>, sendAudio: (recieverId: string, mess: string, messageType: string) => Promise<void>, recieverId: string}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(null);
  const [waveform, setWaveForm] = useState<WaveSurfer | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecordedRef = useRef<MediaRecorder | null>(null);
  const waveformRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if(isRecording){
        interval = setInterval(() => {
            setRecordingDuration((prevDuration) => {
                setTotalDuration(prevDuration + 1);
                return prevDuration + 1
            })
        }, 1000);
    }
    return () => {
        clearInterval(interval)
    }
  }, [isRecording])

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null)
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecordedRef.current = mediaRecorder;
        if (audioRef.current) {
            audioRef.current.srcObject = stream;
        }

        const chunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus" });
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            setRecordedAudio(audio);

            waveform?.load(audioUrl)
        }
        mediaRecorder.start()
    }).catch(error => {console.log('Error accessing microphone: ', error)})
  }

  const handleStopRecording = () => {
    if(mediaRecordedRef.current && isRecording){
        mediaRecordedRef.current.stop();
        setIsRecording(false);
        waveform?.stop();
        const audioChunks: BlobPart[] = [];
        mediaRecordedRef.current.addEventListener("dataavailable", (e) => {audioChunks.push(e.data)});
        mediaRecordedRef.current.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, {type: "audio/mp3"});
            const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });
            setRenderedAudio(audioFile)
        })
    }
  }

  const handlePlayRecording = () => {
    if(recordedAudio){
        waveform?.stop();
        waveform?.play();
        recordedAudio.play();
        setIsPlaying(true)
    }
  }

  const handlePauseRecording = () => {
    waveform?.stop();
    recordedAudio?.pause();
    setIsPlaying(false)
  }

  const sendRecording = async() => {
    if(renderedAudio){
        const url = await uploadFile(renderedAudio);
        await sendAudio(recieverId, url, "audio")
        hide(false)
    }
  }

  useEffect(() => {
    if(recordedAudio){
        const updatePlaybackTime = () => {
            setCurrentPlaybackTime(recordedAudio.currentTime)
        }
        recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
        return () => {
            recordedAudio.removeEventListener("timeupdate", updatePlaybackTime)
        }
    }
  }, [recordedAudio])

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
        container: waveformRef.current || "",
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30
    })
    setWaveForm(wavesurfer)
    wavesurfer.on("finish", () => {
        setIsPlaying(false)
    })
    return () => {
        wavesurfer.destroy()
    }
  }, [])

  useEffect(() => {
    if(waveform) {handleStartRecording()}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveform])

  const formatTime = (time: number): string  => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='w-full h-full flex items-center justify-end'>
        <IoTrash className='cursor-pointer' size={20} onClick={(e) => {e.preventDefault(); hide(false)}} />
        <div className='mx-4 py-2 px-4 text-white text-sm flex gap-3 justify-center items-center bg-black rounded-full drop-shadow-lg'>
            {isRecording ? <div className='text-red-500 animate-pulse w-60 text-center text-sm'>Recording <span>{recordingDuration}s</span></div>: 
            <div>
                {recordedAudio && <>{!isPlaying ? <FaPlay onClick={handlePlayRecording} />: <FaStop onClick={handlePauseRecording} />}</>}
            </div>}
            <div className='w-60' hidden = {isRecording} ref={waveformRef} />
            {
                (recordedAudio && isPlaying) && <span>{formatTime(currentPlaybackTime)}</span>    
            }
            {
                (recordedAudio && !isPlaying) && <span>{formatTime(totalDuration)}</span>
            }
            <audio ref={audioRef} hidden />
            <div className='mr-4'>
                {!isRecording ? <FaMicrophone className='text-red-500' onClick={handleStartRecording} /> : <FaPauseCircle className='text-red-500' onClick={handleStopRecording} />}
            </div>
            <div><MdSend className='cursor-pointer mr-4' onClick={async(e) => {e.preventDefault(); await sendRecording() }} /></div>
        </div>
    </div>
  )
}
