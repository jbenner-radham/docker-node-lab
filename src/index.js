'use strict';

const Bq = require('@becquerel/framework');
const mongoose = require('mongoose');

const app = new Bq();
const host = (process.env['NODE_ENV'] === 'production')? 'db' : 'localhost';
const url = `mongodb://${host}/stuff`;
const getReadyStateName = (connection) => connection.states[connection.readyState];

mongoose.connect(url);

const Cat = mongoose.model('Cat', new mongoose.Schema({name: String}));
const kitty = new Cat({name: 'Evil'});

kitty.save().then(() => console.log('Yipee!'))
    .catch(() => console.error('Boo!'))
    .then(() => {
        Cat.findOne({name: 'Evil'})
            .then(cat => console.log(`Found ${cat.name} the cat!`))
            .catch(() => console.error(`Couldn't find the cat :(`))
            .then(() => mongoose.disconnect());
    });

/*
Cat.find({name: 'Evil?'})
    .then(results => console.log(results))
    .catch(error => console.error(error))
    .then(() => mongoose.disconnect())
*/

process.on('SIGINT', () => {
    mongoose.disconnect().then(() => {
        console.log('Mongo disconnected.');
        process.exit(0);
    });
});
