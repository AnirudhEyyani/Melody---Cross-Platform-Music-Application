const functions = require("firebase-functions");
const axios = require("axios")
const songs = require("node-youtube-music")
const fs = require('fs');
const ytdl = require('ytdl-core');

// https://music.youtube.com/watch?v=AaxFIY-cWH0

exports.searchSongs = functions.https.onRequest(async (req,res) => {
    const {search} = req.query
 
    const song = await songs.searchMusics(`${search}`);
    res.json(song)
})

exports.downloadSong = functions.https.onRequest(async (req,res) => {
    const {song} = req.query
    let url = `https://www.youtube.com/watch?v=${song}`
    
    // res.setHeader(
    //     'Content-Disposition',
    //     `attachment; filename=song.mp3`,
    //   );
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',    
    });
    ytdl(url,{
        format: 'mp3'
    }).pipe(res);
})


exports.playSong = functions.https.onRequest(async (req,res) => {
    const {song} = req.query
    ytdl
    .getInfo(song)
    .then(info => {
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      console.log(audioFormats)
      res.setHeader('Access-Control-Allow-Origin' , '*');    
      res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');    
      res.set('Cache-Control', 'public, max-age=20000'); //6hrs aprox
      res.json({song:audioFormats[1].url})
    })
    .catch(err => res.status(400).json(err.message))
})

