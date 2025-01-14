import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

export default {

    cont: 0,

    insertCities: async function(cities,database,City) {
        try{
            await database.sync()
            const CreatedCities = await City.bulkCreate(cities.map(city => ({
                name: city.name,
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
                population: city.population
            })))

            this.cont = 1
            console.log('Cities inserted!')
        }catch(err){
            console.log('Error in syncing: ', err)
        }
    },
    insertUsers: async function(users,database,User){
        try{
            await database.sync()
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
            console.log('Users inserted!')
        }catch(err){
            console.log('Error in syncing: ', err)
        }
    },
    
    instalationGet: function() {
        return this.cont
    }
}
