const request = require('supertest')
const app = require('../app')

let actorId 

const actor = {
  firstName: "Matthew",
  lastName: "McConaughey",
  nationality: "American",
  image: "matthew.png",
  birthday: "1969-11-04"
}

const BASE_URL = '/api/v1/actors'

// POST 
test("POST -> BASE_URL, should return statusCode 201, res.body.firstName === actor.firstName", async () => {
  
  const res = await request(app)
    .post(BASE_URL) //URL
    .send(actor) //BODY

  actorId = res.body.id 

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

//GET
test("GET -> BASE_URL, should return statusCode 200, res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)  
  //expect(res.body.length).toBe(1)
})

//PUT
test("PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Matt Damon"
  }
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)
})

//DELETE
test("DELETE -> BASE_URL/actorId, should return statusCode 204, and res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
  
  expect(res.statusCode).toBe(204)
})