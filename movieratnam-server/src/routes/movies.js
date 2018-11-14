let MovieModel = require('../models/movie.model')
let express = require('express')
let router = express.Router()

// Create a new customer
// POST localhost:3000/customer
router.post('/movies', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    if (!req.body.email) {
        // ...
    }

    // let user = {
    //   name: 'firstname lastname',
    //   email: 'email@gmail.com'
    // }

    let model = new MovieModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET
router.get('/movies', (req, res) => {
    if (req.query.query) {
        MovieModel.find({$or:[{director_name:{ '$regex' : req.query.query, '$options' : 'i' }},
          {genre:{ '$regex' : req.query.query, '$options' : 'i' }},
          { movie_title: { '$regex' : req.query.query, '$options' : 'i' }}
          ]}).sort([['imdb_score', 'descending']])
            .then(doc => {
                res.json(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        MovieModel.find({movie_poster: {$exists: true}}).sort([['imdb_score', 'descending']]).limit(120)
            .then(doc => {
                res.json(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
})

// UPDATE
router.put('/movies', (req, res) => {
    if (!req.query.movie_title) {
        return res.status(400).send('Missing URL parameter: movie_title')
    }

    MovieModel.findOneAndUpdate({
            movie_title: req.query.movie_title
        }, req.body, {
            new: true
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// DELETE
router.delete('/movies', (req, res) => {
    if (!req.query.movie_title) {
        return res.status(400).send('Missing URL parameter: movie_title')
    }

    MovieModel.findOneAndRemove({
            movie_title: req.query.movie_title
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router