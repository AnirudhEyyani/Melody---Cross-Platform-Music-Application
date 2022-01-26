import React from 'react';
import { useEffect, useState } from "react";
import {shuffle} from 'lodash'


const colors = [
    "from-indigo-500",
    "from-red-500",
    "from-orange-500",
    "from-amber-500",
    "from-yellow-500",
    "from-lime-500",
    "from-green-500",
    "from-emerald-500",
    "from-teal-500",
    "from-cyan-500",
    "from-sky-500",
    "from-blue-500",
    "from-violet-500",
    "from-purple-500",
    "from-fuchsia-500",
    "from-pink-500",
    "from-rose-500",
]

function Center() {
    const [color,setColor] = useState(null)

    useEffect(() => {
        setColor(shuffle(colors).pop());
    },[])

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide  text-white">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 curosro-pointer rounded-full p-1 pr-2">
                    <img src={`https://avatars.dicebear.com/api/bottts/Anonymous User.svg`} alt="profile picture" className="rounded-full w-10 h-10 border-2 border-lime-300 p-2" />
                    <h2 className="pr-3">Anonymous User</h2>
                    {/* <ChevronDownIcon className="h-5 w-5"/> */}
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-96 text-white p-8`}>
                <img className="h-60 w-60 shadow-4xl " src={`https://lh3.googleusercontent.com/2tVo4wzeIZp713873Nf0kC-XFl2-7OGaWiPPXIdQcvbW60ckARocPuaOnOBQh-Rj75Mf-dHoMgQP-H8=w120-h120-l90-rj`} alt="" />
                <div>
                    <p className="uppercase font-medium pb-3">Playlist</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-extrabold pb-3">Playlist Name</h1>
                    <p className="text-gray-400">Playlist Description</p>
                    <div>
                        <p className="font-bold py-2 tracking-wide">post malone</p>
                    </div>
                </div>
            </section>

            <div>
                {/* <Songs/> */}
            </div>

        </div>
    )
}

export default Center
