'use strict';

const Bq = require('@becquerel/framework');
const mongoose = require('mongoose');

const app = new Bq();
const Cat = mongoose.model('Cat', new mongoose.Schema({name: String}));
const host = (process.env['NODE_ENV'] === 'production') ? 'db' : 'localhost';
const url = `mongodb://${host}/cats`;
const getReadyStateName = (connection) => connection.states[connection.readyState];

app.route('/', {
    get: async (request, response) => {
        mongoose.connect(url);

        const results = await Cat.find({name: 'Evil'});
        response.json = {results};

        mongoose.disconnect();
    }
});

app.run();

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    process.exit(0);
});
