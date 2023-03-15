const { describe, it, beforeEach, afterEach } = require('mocha');
const request = require('supertest');
const app = require('../../src/api');
const assert = require('assert');
const sinon = require("sinon");


describe('API Suite test', () => {

    let sandbox = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('/', () => {
        it('request default routes', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);

            assert.deepStrictEqual(JSON.parse(response.text), { msg: 'Hello World!' });
        });
    });

    describe('/car', () => {
        it('request a random available car by category', async () => {

            const response = await request(app)
                .get(`/car`)
                .query({ categoryId: "f5d825ca-d075-4b58-80f1-face110b586b" })
                .expect(200);

            const expect = {
                    "id": "5ecafd11-792f-4580-8878-0856ff5749c2",
                    "name":"Countach",
                    "releaseYear":2022,
                    "available":true,
                    "gasAvailable":true
                };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('request a specific car by ID', async () => {

            const response = await request(app)
                .get(`/car`)
                .query({ cardId: "5ecafd11-792f-4580-8878-0856ff5749c2" })
                .expect(200);

            const expect = {
                "id": "5ecafd11-792f-4580-8878-0856ff5749c2",
                "name":"Countach",
                "releaseYear":2022,
                "available":true,
                "gasAvailable":true
            };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('request a specific car by ID error', async () => {

            const response = await request(app)
                .get(`/car`)
                .query({ cardId: "5ecafd11ff-792f-4580-8878-0856ff5749c2" })
                .expect(400);

            const expect = { error: "car not found" };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('request all cars', async () => {

            const response = await request(app)
                .get(`/cars`)
                .expect(200);

            const expect = [
                {
                    id: '25b1d2f7-776b-4bb1-a26c-532fc15f75b5',
                    name: 'A8',
                    releaseYear: 2023,
                    available: true,
                    gasAvailable: true
                },
                {
                    id: 'c059c78b-5523-415e-afa7-2f4ebb2dd585',
                    name: 'Grand Cherokee',
                    releaseYear: 2022,
                    available: true,
                    gasAvailable: true
                },
                {
                    id: '2fe91e45-740d-41ad-8e48-3b27d2bda38c',
                    name: 'Silverado',
                    releaseYear: 2022,
                    available: false,
                    gasAvailable: true
                },
                {
                    id: '5ecafd11-792f-4580-8878-0856ff5749c2',
                    name: 'Countach',
                    releaseYear: 2022,
                    available: true,
                    gasAvailable: true
                },
                {
                    id: '5ecafd11-792f-4580-8845-0856ff5749c2',
                    name: 'Fiat',
                    releaseYear: 2023,
                    available: false,
                    gasAvailable: true
                }
            ];

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });
    });

    describe('/customers', () => {
        it('request all customers', async () => {

            const response = await request(app)
                .get(`/customers`)
                .expect(200);

            const expect = [
                {
                    "id":"1c006be8-f900-48e5-845d-6db43edc15be",
                    "name":"Lillian Grant",
                    "age":35
                },
                {
                    "id":"4f59be7b-29c2-48a4-8671-113cdf6edc6d",
                    "name":"Jorge Ratke",
                    "age":24
                },
                {
                    "id":"d465398a-b458-43b1-aae9-a5a795d5a997",
                    "name":"Andrew Wilkinson",
                    "age":34
                }
            ];

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('request a specific customer by ID', async () => {

            const response = await request(app)
                .get(`/customer`)
                .query({ customerId: "4f59be7b-29c2-48a4-8671-113cdf6edc6d" })
                .expect(200);

            const expect = {
                "id":"4f59be7b-29c2-48a4-8671-113cdf6edc6d",
                "name":"Jorge Ratke",
                "age":24
            };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('request a specific customer by ID error', async () => {

            const response = await request(app)
                .get(`/customer`)
                .query({ customerId: "4f59be7ffb-29c2-48a4-8671-113cdf6edc6d" })
                .expect(400);

            const expect = { error: "customer not found" };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });
    });

    describe('/rent', () => {
        it('rent a car', async () => {

            const today = new Date()
            today.setDate(today.getDate() + 2);

            const response = await request(app)
                .post(`/rent`)
                .send({
                    carId: "5ecafd11-792f-4580-8878-0856ff5749c2",
                    custumerId: "d465398a-b458-43b1-aae9-a5a795d5a997",
                    dateInit: new Date(),
                    dateFinish: today,
                })
                .expect(200);


            const options = { year: "numeric", month: "long", day: "numeric" };

            const expect = {
                "customer": {
                    "id": "d465398a-b458-43b1-aae9-a5a795d5a997",
                    "name": "Andrew Wilkinson",
                    "age": 34
                },
                "car": {
                    "id": "5ecafd11-792f-4580-8878-0856ff5749c2",
                    "name": "Countach",
                    "releaseYear": 2022,
                    "available": true,
                    "gasAvailable": true
                },
                "amount": "R$ 133,38",
                "dueDate": today.toLocaleDateString('pt-br', options)
            };

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('rent a car error car not available', async () => {

            const today = new Date()
            today.setDate(today.getDate() + 2);

            const response = await request(app)
                .post(`/rent`)
                .send({
                    carId: "2fe91e45-740d-41ad-8e48-3b27d2bda38c",
                    custumerId: "d465398a-b458-43b1-aae9-a5a795d5a997",
                    dateInit: new Date(),
                    dateFinish: today,
                })
                .expect(400);

            const expect = {"error":"car not available"};

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('rent a car error car not available with dont car', async () => {

            const today = new Date()
            today.setDate(today.getDate() + 2);

            const response = await request(app)
                .post(`/rent`)
                .send({
                    carId: "5ecafd11-792f-4580-8845-085F685749c2",
                    custumerId: "d465398a-b458-43b1-aae9-a5a795d5a997",
                    dateInit: new Date(),
                    dateFinish: today,
                })
                .expect(400);

            const expect = {"error":"car not available"};

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

        it('rent a car error customer does not exist', async () => {

            const today = new Date()
            today.setDate(today.getDate() + 2);

            const response = await request(app)
                .post(`/rent`)
                .send({
                    carId: "5ecafd11-792f-4580-8878-0856ff5749c2",
                    custumerId: "f5d825ca-d075-4b58-80f1-face110b586b",
                    dateInit: new Date(),
                    dateFinish: today,
                })
                .expect(400);

            const expect = {"error":"customer does not exist"};

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });


        it('rent a car error end date must be greater than start date', async () => {

            const today = new Date()
            today.setDate(today.getDate() + 2);

            const response = await request(app)
                .post(`/rent`)
                .send({
                    carId: "5ecafd11-792f-4580-8878-0856ff5749c2",
                    custumerId: "d465398a-b458-43b1-aae9-a5a795d5a997",
                    dateInit: today,
                    dateFinish:  new Date(),
                })
                .expect(400);

            const expect = {"error":"end date must be greater than start date"};

            assert.deepStrictEqual(JSON.parse(response.text), expect);
        });

    });
});