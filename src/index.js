'use strict';

const Bq = require('@becquerel/framework');
const mongoose = require('mongoose');

const app = new Bq();
const host = (process.env['NODE_ENV'] === 'production')
    ? 'db'
    : 'localhost';

mongoose.connect(`mongodb://${host}/stuff`);

const Cat = mongoose.model('Cat', {name: String});
const kitty = new Cat({name: 'Evil'});

kitty.save().then(() => console.log('Yipee!'))
    .catch(() => console.error('Boo!'))
    .then(() => {
        Cat.findOne({name: 'Evil'})
            .then(cat => console.log(`Found ${cat.name} the cat!`))
            .catch(() => console.error(`Couldn't find the cat :(`))
            .then(() => mongoose.disconnect());
    });

process.on('SIGINT', () => {
    mongoose.disconnect().then(() => {
        console.log('Mongo disconnected.');
        process.exit(0);
    });
});
