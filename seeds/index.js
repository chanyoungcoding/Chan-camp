
//데이터 베이스만 보고싶을때 열도록 하자!!

const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://0.0.0.0:27017/chan-camp')
    .then(() => {
    console.log('Mongoose가 연결되었습니다.')
    })
    .catch((err) => {
    console.log('ERROR!!!')
    console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30);
        const camp = new Campground({
            author: '63607827a45953f5eaefaee9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/collection/483251`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam eum tempore corporis debitis soluta laborum est consequatur ullam molestias dicta!',
            price,
            geometry:
            {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url:'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1667972771/ChanCamp/jux03a6wtwebuibrrerq.png',
                    filename: 'ChanCamp/jux03a6wtwebuibrrerq'
                },
                {
                    url: 'https://res.cloudinary.com/dnjjlp2uy/image/upload/v1667954501/ChanCamp/u17yyhfwoqbw7z0odltd.png',
                    filename: 'ChanCamp/u17yyhfwoqbw7z0odltd'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})