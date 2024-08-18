const request = require("supertest")
const app = require('../app')

let directorId

const director = {
  firstName: "Christopher",
  lastName: "Nolan",
  nationality: "British",
  image: "nolan.png",
  birthday: "1970-07-30"
}

const BASE_URL = '/api/v1/directors'

//POST 
test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director)
  
  directorId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
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
test("PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName === directorUpdate.firstName", async () => {
  
  const directorUpdate = {
    firstName: "Peter"
  }
  
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)
})

//DELETE
test("DELETE -> BASE_URL/directorId, should return statusCode 204, and res.body.firstName === director.firstName", async () => {
  
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

  expect(res.statusCode).toBe(204)
})