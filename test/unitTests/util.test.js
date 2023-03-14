const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');

const Util = require('./../../src/utils/util');

const { join } = require('path');
const { expect } = require('chai');

const carsDatabase  = join(__dirname, './../../database', "cars.json");

const mocks = {
    validCarCategory: require('./../mocks/valid-multiple-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
};

describe('Util Suite Tests', () => {

    let util = {};
    let sandbox = {};

    before(() => {
        util = new Util({
            file: carsDatabase
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('return all car file', async () => {
        const result = await util.currentFileConent();

        const expected = [
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

        expect(result.length).to.be.equal(expected.length);
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
    });

    it('return all car file use find method', async () => {
        const result = await util.find();

        const expected = [
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

        expect(result.length).to.be.equal(expected.length);
        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
    });

    it('return a specific car', async () => {
        const id = '25b1d2f7-776b-4bb1-a26c-532fc15f75b5';
        const result = await util.find(id);

        const expected = { id: '25b1d2f7-776b-4bb1-a26c-532fc15f75b5', name: 'A8', releaseYear: 2023, available: true, gasAvailable: true };

        expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
    });

});
