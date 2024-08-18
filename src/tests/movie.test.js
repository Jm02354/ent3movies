require('../models')

const request = require("supertest")
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let movieId

const movie = {
    name: "Interstellar",
    image: "interstellar.png",
    synopsis: "lorem input",
    releaseYear: 2014
};

const BASE_URL = '/api/v1/movies'

// POST 
test("POST -> BASE_URL, should return statusCode 201, res.body.name === movie.name", async () => {
  
  const res = await request(app)
    .post(BASE_URL) 
    .send(movie) 

  movieId = res.body.id 
  // console.log(res.body)

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

//GET
test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
      
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  //expect(res.body.length).toBe(1)
  
  //Ask if actors column exists
  expect(res.body[0].actors).toBeDefined() //res.body -> array --- position 0
  expect(res.body[0].actors).toHaveLength(0)

  //Ask if directors column exists 
  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)

  //Ask if genres column exists
  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)
})

//PUT
test("PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movieUpdate.name", async () => {
  const movieUpdate = {
    name: "The Lord of the Ring"
  }
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
})

//SET ACTORS
test("POST -> BASE_URL/:id/actors, should return statusCode 200, and res.body.length === 1", async () => {

  const actor = {
    firstName: "Elijah",
    lastName: "Wood",
    nationality: "American",
    image: "elijah.png",
    birthday: "1981-01-28"
  }
  
  const createActors = await Actor.create(actor)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActors.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createActors.id)

  await createActors.destroy()
})

//SET DIRECTORS
test("POST -> BASE_URL/:id/directors, should return statusCode 200, and res.body.length === 1", async () => {

  const director = {
    firstName: "Peter",
    lastName: "Jackson",
    nationality: "New Zealand",
    image: "jackson.png",
    birthday: "1961-10-31"
  }

  const createDirectors = await Director.create(director)

  const res = await request(app) 
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirectors.id])
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createDirectors.id)

  await createDirectors.destroy()
})

//SET GENRES
test("POST -> BASE_URL/:id/genres, should return statusCode 200, and res.body.length === 1", async () => {

  const genre = {
    name: "Fantasie"
  }

  const createGenres = await Genre.create(genre)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenres.id])
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createGenres.id)

  await createGenres.destroy()

})

//DELETE
test("DELETE -> BASE_URL/movieId, should return statusCode 204, and res.body.name === movie.name", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
  
  expect(res.statusCode).toBe(204)
})







