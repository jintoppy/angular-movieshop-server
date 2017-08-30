const express = require('express');
const fs = require('fs');
const movies = JSON.parse(fs.readFileSync('data/movies.json', 'utf8'));

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

const router = express.Router();


function addMovie(req, res){
    let newMovie = req.body;
    const newId = Math.max.apply(Math, movies.map(x=> x.id))+1;
    newMovie.id = newId;
    movies.push(newMovie);
    res.send(newMovie).status(200);
}

function getMovies(resq, res){
    console.log('inside get movies');
    res.json(movies).status(200);
}

function getMovieById(req, res){
    const movieId = req.params.movieId;
    res.json(movies.find(x => x.id == movieId));
}

function deleteMovie(req, res){
    const movieId = req.params.movieId;
    movies = movies.filter(m => m.id != movieId);
    res.json(movies).status(200);
}

router.post('/api/movies', addMovie);
router.get('/api/movies', getMovies);
router.get('/api/movies/:movieId', getMovieById);
router.delete('/api/movies/:movieId',deleteMovie);


function loginUser(req, res){
    let userCredentials = req.body;
    let user = users.find(u => u.username == userCredentials.username && u.password == userCredentials.password);
    if(user){
        res.json({
            message: 'success',
            user: {
                role: user.role,
                name: user.name
            }
        })
        .status(200);
    }
    else{
        res
        .status(401)
        .send({
            message: 'Not Authenticated'
        });
    }
}

router.post('/api/login', loginUser);
module.exports = router;