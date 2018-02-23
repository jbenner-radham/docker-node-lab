'use strict';

const Bq = require('@becquerel/framework');
const mongoose = require('mongoose');

const app = new Bq();
const host = (process.env['NODE_ENV'] === 'production')? 'db' : 'localhost';
const url = `mongodb://${host}/stuff`;
const getReadyStateName = (connection) => connection.states[connection.readyState];

(async () => {
    mongoose.connect(url);

    const Cat = mongoose.model('Cat', new mongoose.Schema({name: String}));
    const kitty = new Cat({name: 'Evil'});
    const results = await Cat.find({name: kitty.name});

    if (!results.length) {
        await kitty.save();
        console.log(`Saved ${kitty.name} the kitty.`);
    } else {
        console.log(results);
    }

    mongoose.disconnect();
})()

// kitty.save().then(() => console.log('Yipee!'))
//     .catch(() => console.error('Boo!'))
//     .then(() => {
//         Cat.findOne({name: 'Evil'})
//             .then(cat => console.log(`Found ${cat.name} the cat!`))
//             .catch(() => console.error(`Couldn't find the cat :(`))
//             .then(() => mongoose.disconnect());
//     });

process.on('SIGINT', () => {
    mongoose.disconnect().then(() => {
        console.log('Mongo disconnected.');
        process.exit(0);
    });
});
