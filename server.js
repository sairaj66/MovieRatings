const express = require("express")
const app = express()
const mysql = require('mysql')

app.listen(3000,console.log("connected to server"))

app.use(express.json())

const pool = mysql.createPool({
    port:"3306",
    host:"localhost",
    user:"root",
    password:"mOmlover@66",      
    database:"login",
    connectionLimit:10
 })

 pool.getConnection((err) => {
    if(err){
        console.log(err)
    }
    return console.log("DB connected")
 })

 //get top Duration movies
app.get('/api/v1/longest-duration-movies',(req,res) => {
    const getTopRUntime = `SELECT tconst,primaryTitle,runtimeMinutes,genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10 `
    pool.query(getTopRUntime,(err,results) => {
        if(!err){
            res.send(results)
        }else{
            res.send("no such elements found")
        }
    })
})

// insert new movie record
app.post('/api/v1/new-movie',(req,res) => {
    const postmovie = `insert into movies(tconst,titleType,primaryTitle,runtimeMinutes,genres) 
    values('${req.body.tconst}',
    '${req.bodytitleType}',
    '${req.body.primaryTitle}',
    '${req.body.runtimeMinutes}',
    '${req.body.genres}')`
    pool.query(postmovie,(err,results) => {
        if(!err){
            res.send("Sucess")
        } else{
            res.send("Not inserted")
        }
    })
})

app.get('/api/v1/top-rated-movies',(req,res) => {
    const getTopRated = " SELECT ratings.tconst,movies.primaryTitle,movies.genres,ratings.averageRatings FROM ratings INNER JOIN movies ON movies.tconst = ratings.tconst where averageRatings>6  Order by averageRatings";
    pool.query(getTopRated,(err,results) => {
        if(!err){
            res.send(results)
        }else{
            res.send("no such elements found")
            console.log(err)
        }
    })
})