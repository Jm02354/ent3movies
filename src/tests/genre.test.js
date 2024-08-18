const request = require("supertest");
const app = require('../app')

let genreId 

const genre = {
  name: "Science Fiction"
}

const BASE_URL = '/api/v1/genres'

//POST
test("POST -> BASE_URL, should return statusCode 201, and res.body.name === genre.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(genre)
  
  genreId = res.body.id
  
  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

//GET
test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  
  const res = await request(app)
    .get(BASE_URL)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

//PUT
test("PUT -> BASE_URL/genreId, should return statusCode 200, and res.body.name === genreUpdate.name", async () => {

  const genreUpdate = {
    name: "Adventure"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(genreUpdate)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genreUpdate.name)
})

//DELETE
test("DELETE -> BASE_URL/genreId, should return starusCode 204, and res.body.name === genre.name", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)
  
  expect(res.statusCode).toBe(204)
})