import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
import City from '../models/City.js'
import User from '../models/User.js'
import cache from '../config/cache.js';
export default {

    cont: 0,

    insertCities: async function(cities) {
        try{
            const CreatedCities = await City.bulkCreate(cities.map(city => ({
                name: city.name,
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
                population: city.population
            })))


            cache.del('cities_cache');
            let allCities = await City.findAll();
            allCities = allCities.map(city => city.toJSON())
            cache.set('cities_cache', allCities);


            this.cont = 1
            console.log('Cities inserted!')
        }catch(err){
            console.log('Error in syncing: ', err)
        }
    },
    insertUsers: async function(users){
        try{
            const CreatedUsers = await User.bulkCreate(await Promise.all (users.map(async (user) => {
                const crypt = await bcrypt.hash(user.password, parseInt(process.env.ROUNDS))
                return {
                    email: user.email,
                    password: crypt.toString()
                }
            })))
            const crypt = await bcrypt.hash('senhaAdmin1', parseInt(process.env.ROUNDS))
            const AdmCreated = await User.create({
                email: 'admin@admin.com',
                password: crypt.toString(),
                admin: true
            })
            this.cont = 1

            cache.del('users_cache');
            let allUsers = await User.findAll();
            allUsers = allUsers.map(user => user.toJSON())
            cache.set('users_cache', allUsers);

            console.log('Users inserted!')
        }catch(err){
            console.log('Error in syncing: ', err)
        }
    },
    
    instalationGet: function() {
        return this.cont
    }
}
