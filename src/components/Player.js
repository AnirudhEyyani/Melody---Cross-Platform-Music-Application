import React, { useEffect, useState,useRef, useCallback } from 'react';
import {  SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline"
import {  FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon } from "@heroicons/react/solid"
import { useDispatch,useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { debounce } from 'lodash';
import axios from 'axios';


function Player() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [playingSongDetails, setPlayingSongDetails] = useState(null)
    const [songDuration, setSongDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(50);
    const [audioStateReady,setAudioStateReady] = useState(false)
    const [songUrl,setSongUrl] = useState('')


    const audioPlayer = useRef()
    const progressBar = useRef()
    const volumeBar = useRef()
    const animationRef = useRef()

    const songDetails = useSelector(state => state.playSong.songDetails)


    // toggle play and pause of audio player
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
        if(isPlaying && audioPlayer?.current?.readyState){
            console.log("play song", isPlaying) 
            audioPlayer.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else{    
            console.log("play song", isPlaying) 
            audioPlayer.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }  

    // song audio seek bar update range
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    // updates the time of the song played
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }

    // song audio seek bar update 
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width',`${progressBar.current.value/songDuration* 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60)
        const returnedMinutes = minutes< 10 ? `0${minutes}`: minutes
        const seconds = Math.floor(secs%60);
        const returnedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const timeTravel = (newTime) => {
        progressBar.current.value = newTime;
        changeRange();
    }

    //volume bar 
    const debouncedVolume = useCallback(
        debounce(async (volume) => {
            console.log(volume/100)
            setVolume(volume)
            const audio = document.getElementById("audio")
            audio.volume = Number(volume/100)
        }, 100),
        []
    )

    const volumeMute = () => {
        const audio = document.getElementById("audio")
        volumeBar.current.value = 0
        audio.volume = 0
    }

    const volumeFull = () => {
        const audio = document.getElementById("audio")
        volumeBar.current.value = 100
        audio.volume = 1
    }



    useEffect(()=>{
       console.log('songDetails has been changed')
       setPlayingSongDetails(songDetails)
        timeTravel(0)
        const getSongUrl = async (id)=> {
            const {data} = await axios.get(`http://localhost:5001/melody-24def/us-central1/playSong?song=${id}`)
            setSongUrl(data.song)
            console.log(songUrl)
        }
        if(songDetails) {
            getSongUrl(songDetails.id)
            console.log(songUrl)
        }
        else {
            console.log("id is not present")
        }
    },[songDetails,])

    useEffect(()=>{
        setAudioStateReady(true)
        const seconds = Math.floor(audioPlayer.current.duration)
        setSongDuration(seconds)
        progressBar.current.max = seconds

    },[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.readyState])

    useEffect(()=>{
        if(currentTime === songDuration){
            togglePlayPause()
            timeTravel(0)
        }
     },[currentTime])

    return (
        <div className={`${songUrl ? 'grid' : "hidden"}  h-24 bg-gradient-to-b from-black to-gray-900 text-white grid-cols-3 text-xs md:text-base px-2 md:px-8`}>
            {/* left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={`${playingSongDetails ? playingSongDetails.imageUrl : ''}`} alt={playingSongDetails? playingSongDetails.title :'song name'} />
                <div>
                    <h3>{playingSongDetails && playingSongDetails.title }</h3>
                    <p>{playingSongDetails && playingSongDetails.artist}</p>
                </div>
            </div>
            {/* center */}
            <div className="flex flex-col items-center justify-evenly">
                <div className="flex items-center justify-evenly space-x-4">
                    <audio id='audio' ref={audioPlayer} src={`${playingSongDetails && `${songUrl}`}` }></audio>
                    <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
                    <RewindIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"  />
                    {
                        (isPlaying) ?
                        <PlayIcon className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"  onClick={togglePlayPause} />
                        :
                        <PauseIcon className="w-10 h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={togglePlayPause} />
                    }
                    <FastForwardIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"  />
                    <ReplyIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
                </div>
                <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5 w-full">

                    <p >{calculateTime(currentTime)}</p>
                    <input type="range" defaultValue="0" className="w-full h-4 progress-bar" ref={progressBar}  onChange={changeRange} />
                    <p className=''>{(songDuration && !isNaN(songDuration)) && calculateTime(songDuration)}</p>
                </div>
            </div>
            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeOffIcon className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={volumeMute}  />
                <input type="range" ref={volumeBar} onChange={()=> debouncedVolume(volumeBar.current.value)} min="0" max="100" className="w-14 md:w-28 "/>
                <VolumeUpIcon  className="w-5 h-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"  onClick={volumeFull} />
            </div>
        </div>
    )
}

export default Player
