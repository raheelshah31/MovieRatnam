let MovieModel = require('../models/movie.model')
let express = require('express')
let router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId;

var mongoose = require('mongoose');
var gridfs = require('gridfs-stream');
const server = 'ds157493.mlab.com:57493'
const database = 'movie_images'
const options = { useNewUrlParser: true, user: 'cherry1155', pass: 'sree@1015' };
const dbUrl = `mongodb://${server}/${database}`
var conn = mongoose.connect(dbUrl, options)
/*
    Check MongoDB connection
*/
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.Promise = global.Promise;

gridfs.mongo = mongoose.mongo;


// GET
router.get('/movies', (req, res) => {
    if (req.query.query) {
        MovieModel.find({
                $or: [{ director_name: { '$regex': "^" + req.query.query, '$options': 'i' } },
                    { genre: { '$regex': "^" + req.query.query, '$options': 'i' } },
                    { movie_title: { '$regex': "^" + req.query.query, '$options': 'i' } }
                ]
            }).sort([
                ['imdb_score', 'descending']
            ])
            .then(doc => {
                res.json(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        MovieModel.find({ movie_poster: { $exists: true } }).sort([
                ['imdb_score', 'descending']
            ]).limit(120)
            .then(doc => {
                res.json(doc)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
})

// UPDATE
router.post('/movies', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    MovieModel.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: req.body.comments } }, {
            new: true,
        })
        .then(doc => {
            // console.log(doc)
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

//GET Images
connection.once('open', () => {

    var gfs = gridfs(connection.db);
    console.log(gfs)
    //gfs.collection("fs.files")
    // Downloading a single file
    router.get('/movies/:fileId', (req, res) => {
        console.log(req.params.fileId)
        gfs.exist({ _id: req.params.fileId }, (err, file) => {
            if (err || !file) {
                console.log(err)
                res.status(404).send('File Not Found');
                return
            } 
            
            var readstream = gfs.createReadStream({ _id: req.params.fileId });
            readstream.pipe(res);            
        });
    });
});


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