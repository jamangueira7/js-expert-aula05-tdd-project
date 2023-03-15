const http = require('http');
const { join } = require('path');
const carService = require('./service/carService');
const Util = require('./utils/util');

const carsDatabase  = new Util({
    file: join(__dirname, '../database', "cars.json")
});

const carCategories  = new Util({
    file: join(__dirname, '../database', "carCategories.json")
});

const custumerCategories  = new Util({
    file: join(__dirname, '../database', "customers.json")
});

const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type' : 'application/json' };

const routes = {

    '/car?categoryId:get': async (request, response) => {

        const { id } = request;
        const service = new carService({
           cars: await carsDatabase.currentFileConent(),
        });

        const carCategory = await carCategories.find(id);

        const car = await service.getAvailableCar(carCategory);

        response.write(JSON.stringify(car));
        return response.end();
    },

    '/cars:get': async (request, response) => {

        response.write(JSON.stringify(await carsDatabase.currentFileConent()));
        return response.end();
    },

    '/car?cardId:get': async (request, response) => {
        const { id } = request;

        const car = await carsDatabase.find(id);

        if(!car) {
            response.writeHead(400, DEFAULT_HEADER);
            response.write(JSON.stringify({ error: "car not found" }));
            return response.end();
        }

        response.write(JSON.stringify(car));
        return response.end();
    },

    '/customers:get': async (request, response) => {

        response.write(JSON.stringify(await custumerCategories.currentFileConent()));
        return response.end();
    },

    '/customer?customerId:get': async (request, response) => {
        const { id } = request;

        const customer = await custumerCategories.find(id);

        if(!customer) {
            response.writeHead(400, DEFAULT_HEADER);
            response.write(JSON.stringify({ error: "customer not found" }));
            return response.end();
        }

        response.write(JSON.stringify(customer));
        return response.end();
    },

    '/rent:post': async (request, response) => {
        let dataValue = {}
        for await (const data of request) {
            dataValue = JSON.parse(data);

        }

        const service = new carService({
            cars:  await carsDatabase.currentFileConent(),
        });

        const carCategory = await carCategories.findByCarId(dataValue.carId);
        const car = await service.getAvailableCar(carCategory);

        if(!carCategory || !car || car.id !== dataValue.carId) {
            response.writeHead(400, DEFAULT_HEADER);
            response.write(JSON.stringify({ error: "car not available" }));
            return response.end();
        }

        const custumer = await custumerCategories.find(dataValue.custumerId);
        if(!custumer) {
            response.writeHead(400, DEFAULT_HEADER);
            response.write(JSON.stringify({ error: "customer does not exist" }));
            return response.end();
        }

        if(dataValue.dateInit >= dataValue.dateFinish) {
            response.writeHead(400, DEFAULT_HEADER);
            response.write(JSON.stringify({ error: "end date must be greater than start date" }));
            return response.end();
        }

        const init = new Date(dataValue.dateFinish);
        const finish = new Date(dataValue.dateInit);
        const diffInMs =  Math.abs(init.getTime() -  finish.getTime());
        const numberOfDay = Math.ceil(diffInMs / (1000 * 3600 * 24));

        const transaction = await service.rent(
            custumer,
            carCategory,
            numberOfDay,
        )

        response.write(JSON.stringify(transaction));
        return response.end();
    },

    default: (request, response) => {
        response.write(JSON.stringify({ msg: 'Hello World!' }));
        return response.end();
    }
};

const header = function (request, response) {
    let { url, method } = request;
    if(method === 'GET' && !!url.split("=")) {
        const aux = url.split("=");
        url = aux[0];
        request.id = aux[1];
    }

    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;

    response.writeHeader(200, DEFAULT_HEADER);

    return chosen(request, response);
}

const app = new http.createServer(header).listen(PORT, () => console.log(`App running at ${3000}`));

module.exports = app;
