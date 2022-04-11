require('dotenv').config();
const request = require('supertest');
const Server = require('../src/server');

const { app } = new Server();

describe("GET /location", () => {
    
    test(`should respond whit json status 200`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }/location`) 
            .set('x-forwarded-for', '200.122.36.79')
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            ); 
            expect(response.statusCode).toBe(200);
    });

    test(`respond whit json error status 404`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }location`)
            expect(response.status).toEqual(404);
        });
});

describe("GET /currentWeather", () => {
    
    test(`should respond whit json status 200`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }/current`) 
            .set('x-forwarded-for', '200.122.36.79')
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            ); 
            expect(response.statusCode).toBe(200);
    });

    test(`respond whit json error status 404`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }/current`)
            expect(response.status).toEqual(404);
        });
});

describe("GET /getWeekWeather", () => {
    
    test(`should respond whit json status 200`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }/forecast`) 
            .set('x-forwarded-for', '200.122.36.79')
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            ); 
            expect(response.statusCode).toBe(200);
    });

    test(`respond whit json error status 404`, async() => {
        const response = await request(app)
            .get(`/${ process.env.API_VERSION }/forecast`)
            expect(response.status).toEqual(404);
        });
});