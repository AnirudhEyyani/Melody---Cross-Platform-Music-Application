import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    ChevronDownIcon,
    LogoutIcon,
    LoginIcon,
    QuestionMarkCircleIcon
}from "@heroicons/react/outline"
import React from 'react';
import { Link } from "react-router-dom";


function Sidebar() {

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block w-[30vw]">
            <div className="space-y-4">
                <h1 className="text-5xl text-white rolest-font tracking-wider ">Melody</h1>
                <button className="flex items-center space-x-2 hover:text-white">
                    <QuestionMarkCircleIcon className="h-5 w-5"/>
                    <p className="">Help & FAQ</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p className="">Contributors</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p className="">Sponsor Us</p>
                </button>
                <Link to='/search' className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p className="">Search Songs</p>
                </Link>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LoginIcon className="h-5 w-5"/>
                    <p className="Library">Login</p>
                </button> 
                <button  className="flex items-center space-x-2 hover:text-white">
                    <LogoutIcon className="h-5 w-5"/>
                    <p className="">Logout</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p className="">Create Playlist</p>
                </button> 
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p className="">Liked Songs</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {/* <button className={`flex items-center  space-x-2 cursor-pointer hover:text-white hover:bg-gray-900 rounded-lg py-2 px-2 focus:outline-none focus:ring focus:ring-black ${showPlaylist && "bg-gray-900 text-white"}`} onClick={()=> setShowPlaylist(!showPlaylist)}>
                    <object data="./svg/spotify-logo.svg" className="w-8 h-8"></object>
                    <p className="text-md">Spotify Playlists</p>
                    <ChevronDownIcon className="h-5 w-5"/>
                </button> */}

                {/* Playlist */}
                {/* {showPlaylist &&
                playlist.map(playlist => {
                    return(
                        <p key={playlist.id} onClick={()=> setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white truncate">{playlist.name}</p>
                    )
                })} */}
                <p className="cursor-pointer hover:text-white truncate">playlist name</p>
                <p className="cursor-pointer hover:text-white truncate">playlist name</p>

            </div>
        </div>
    )
}

export default Sidebar
