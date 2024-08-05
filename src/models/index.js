//A many-to-many relationships

const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


//2 A many-to-many relationship between movies and genres

Genre.belongsToMany(Movie, { through: 'genresMovies' })
Movie.belongsToMany(Genre, { through: 'genresMovies'})

//3 A many-to-many relationship between movies and actors

Actor.belongsToMany(Movie, { through: 'actorsMovies' })
Movie.belongsToMany(Actor, { through: 'actorsMovies' } )

//4 A many-to-many relationship between movies and directors

Director.belongsToMany(Movie, { through: 'directorsMovies' })
Movie.belongsToMany(Director, {through: 'directorsMovies'})

