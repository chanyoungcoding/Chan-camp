const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } =require('./seedHelpers')

mongoose.connect('mongodb://0.0.0.0:27017/chanCamp')
    .then(() => {
        console.log('MONGODB CONNECT!!')
    })  
    .catch(err => {
        console.log('에러가 발생했습니다. ')
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 15; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)}, ${sample(descriptors)}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
