import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSongDetails } from '../actions/songActions';


function Songs({searchResults,loading,error}) {
    const [id,setId] = useState('')
    const [songUrl,setSongUrl] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const [title,setTitle] = useState('')
    const [artist,setArtist] = useState('')
    const [album,setAlbum] = useState('')
    const [duration,setDuration] = useState('')
    const [playSongDetails,setSongDetails] = useState('')
    const dispatch = useDispatch()


    // const playSong = {
    //     id,
    //     songUrl,
    //     imageUrl,
    //     title,
    //     artist,
    //     album,
    //     duration
    // }

    // useEffect(() => {
    //     console.log({id,songUrl,imageUrl,title,artist,album,duration})
    // },[id,songUrl,imageUrl,title,artist,album,duration])
    
    return (
        <ul className="px-8 flex flex-col space-y-1 pb-28 text-white">
            {
             loading ? <p>Loading...</p> : error ? <p>{error}</p>
             :
            searchResults?.map((song,order) => {
                return (
                    <li key={song.youtubeId} 
                    onClick={() => {
                        console.log("i clicked li")
                        const playSong = {
                            id:song.youtubeId ,
                            imageUrl: song.thumbnailUrl,
                            title: song.title,
                            artist:song.album ,
                            album:song.artists[0].name ? song.artists[0].name: "",
                            duration: song.duration.label
                        }
                        dispatch(getSongDetails(playSong))
                    }} 
                    // onClick={() => {
                    //     console.log("i clicked li")
                    //     setId(`${song.youtubeId}`)
                    //     setImageUrl(`${song.thumbnailUrl}`)
                    //     setTitle(`${song.title}`)
                    //     // setArtist(`${song.artists[0].name}`)
                    //     setAlbum(`${song.album}`)
                    //     setDuration(`${song.duration.label}`)
                    //     setSongUrl(`http://localhost:5001/melody-24def/us-central1/downloadSong?song=${song.youtubeId}`)
                    //     dispatch(getSongDetails(playSong))
                    // }} 
                    className="grid grid-cols-2 text-gray-500 py-2 px-5 hover:bg-gray-900 rounded-lg cursor-pointer " >
                        <div className="flex items-center space-x-4"> 
                            <p>{order+1}</p>
                            <img className="h-10 w-10 " src={`${song.thumbnailUrl ? song.thumbnailUrl : `./images/audio.jpg`}`} alt="song image" />
                            <div>
                                <p className="w-36 lg:w-64 truncate text-white">{song.title && song.title}</p>
                                {/* <p className="w-40">{song.artists[0].name && song.artists[0].name}</p> */}
                            </div>

                        </div>
                        <div className="flex items-center justify-between ml-auto md:ml-0">
                            <p className="w-40 hidden md:inline">{song.album}</p>
                            <p>{song.duration.label}</p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Songs
