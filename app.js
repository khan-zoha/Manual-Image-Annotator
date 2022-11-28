//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const ejs = require("ejs");
const _= require("lodash");
const firebase = require("firebase");
const cookieParser = require('cookie-parser')

const app = express();

const port = process.env.PORT || 3000

app.set('view engine','ejs');

var firebaseConfig = {
    apiKey: "AIzaSyA5pRVDTu_-igUdmyVfyyiv7JIhMTiQjSA",
    authDomain: "crt-game.firebaseapp.com",
    projectId: "crt-game",
    storageBucket: "crt-game.appspot.com",
    messagingSenderId: "671633668607",
    appId: "1:671633668607:web:4afb95bb255e2287fd8fca",
    measurementId: "G-J5RGGN76EF"
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const { runInNewContext } = require("vm");
const { concat } = require("lodash");

const testFolder = ''; // CHANGE THIS
const dir = "/img/"
const fs = require('fs');
const { start } = require("repl");

let Images = [];
let labels = [];
let number = 60405;
let sequence = []
let startt = 0
let end = 1

new Promise((resolve, reject) => {

  fs.readdir(testFolder, (error, filenames) => {(!error) ?  resolve(filenames) : reject(error)})}).then((data)=>{
  Images = data

  for(let i=0; i<Images.length; i++)
  {
    let piece1 = Images[i].split(".");
    let piece2 = piece1[0].split("_");
    let label = piece2[1]
    sequence.push(parseInt(piece2[0]))
    labels.push(label)
    Images[i] = dir.concat(Images[i])
  }
})

app.get("/home",(req,res)=>{
  res.render("home", {allImages:Images, numImages:number, allLabel:labels, Start:startt, End:end});
});

app.get("/range",(req,res)=>{
  res.render("range");
});


app.get("/again",(req,res)=>{
  res.render("again");
});

app.get("/",(req,res)=>{
    res.render("range");
})

app.post("/home",(req,res)=>{
  
  let obj = JSON.stringify(req.body)
  obj = obj.slice(1, obj.length-1)
  let objlist = obj.split(",");
  data = objlist.join("\r\n");
  data = data.concat("\n")

  fs.appendFile('output.txt', data, (err) => {
    if (err) throw err;
})

res.redirect("/again");

});

app.post("/range",(req,res)=>{

  startt = req.body.start;
  end = req.body.end;

  res.redirect("/home");
});

app.post("/again",(req,res)=>{
  res.redirect("/range");
});


app.listen(3000,()=>{
  console.log("Server has started on port 3000");
});
