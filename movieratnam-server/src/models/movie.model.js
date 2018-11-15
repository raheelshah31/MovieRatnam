let mongoose = require('mongoose').set('debug', true);

const server = 'ds029831.mlab.com:29831'
const database = 'moviemetadata'
const options = {useNewUrlParser: true , user: 'Sreecharan', pass: 'Sree@1015'};
const dbUrl = `mongodb://${server}/${database}`

mongoose.connect(dbUrl,options)

let MovieSchema = new mongoose.Schema({
    color: {
        type: 'String'
    },
    director_name: {
        type: 'String'
    },
    num_critic_for_reviews: {
        type: 'Number'
    },
    duration: {
        type: 'Number'
    },
    director_facebook_likes: {
        type: 'Number'
    },
    actor_3_facebook_likes: {
        type: 'Number'
    },
    actor_2_name: {
        type: 'String'
    },
    actor_1_facebook_likes: {
        type: 'Number'
    },
    gross: {
        type: 'Number'
    },
    genres: {
        type: 'String'
    },
    actor_1_name: {
        type: 'String'
    },
    movie_title: {
        type: 'String'
    },
    num_voted_users: {
        type: 'Number'
    },
    cast_total_facebook_likes: {
        type: 'Number'
    },
    actor_3_name: {
        type: 'String'
    },
    facenumber_in_poster: {
        type: 'Number'
    },
    plot_keywords: {
        type: 'String'
    },
    movie_imdb_link: {
        type: 'String'
    },
    num_user_for_reviews: {
        type: 'Number'
    },
    language: {
        type: 'String'
    },
    country: {
        type: 'String'
    },
    content_rating: {
        type: 'String'
    },
    budget: {
        type: 'Number'
    },
    title_year: {
        type: 'Number'
    },
    actor_2_facebook_likes: {
        type: 'Number'
    },
    imdb_score: {
        type: 'Number'
    },
    aspect_ratio: {
        type: 'Number'
    },
    movie_facebook_likes: {
        type: 'Number'
    },
    movie_poster: { type: 'String' }
})

module.exports = mongoose.model('Movies', MovieSchema)