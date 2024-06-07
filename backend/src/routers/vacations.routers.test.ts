import server from "../app"
import request from "supertest"

describe('Test for Vacations router', () => {
    describe('test /api/vacations endpoint', () => {
        test('Should return an array of vacations', async () => {
            const result = await request(server).get('/api/vacations')
            expect(result.statusCode).toBe(200);
            expect(Array.isArray(result.body)).toBeTruthy()
            expect(result.body[0]).toHaveProperty('vacationId')
            expect(result.body[0]).toHaveProperty('destination')
            expect(result.body[0]).toHaveProperty('description')
            expect(result.body[0]).toHaveProperty('startDate')
            expect(result.body[0]).toHaveProperty('endDate')
            expect(result.body[0]).toHaveProperty('price')
            expect(result.body[0]).toHaveProperty('imageUrl')
        })
    })
})