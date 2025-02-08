
import City from "../models/City.js"
import CityBuilder from "../models/City/CityBuilder.js"
import cache from '../config/cache.js'
import sanitizer from "../auth/sanitizer.js"

export default {
    listCities: async function(){
        try{
            let cities = cache.get('cities_cache');
            if(cities){
                return {status: 200, cities:cities}
            }
            return {status:300,msg:'No cities are cadastred!'}
        }catch(err){
            return {status:500,msg:'An error ocurred' + err}
        }
        
    },
    listCity: async function(name){
        try{
            if(!name || name.length < 3){
                return {status: 400, msg: 'The amount of characters must be greater than 3!'}
            }else {
                let cities = cache.get('cities_cache')
                let reqCities = []
                for(const city of cities){
                    if(city.name.includes(name)){
                        reqCities.push(city)
                    }
                }
                if(reqCities.length > 0){
                    return {status:200,msg:reqCities}
                }
                return {status:300,msg:'Cities with this name or characters were not found!'}
            }


        }catch(err){
            return {status: 500, msg: 'Error occurred while listing cities' + err.message}
        }
    },
    verifyCity: function(city){
        for(const key in city){
            if(city[key] === null || city[key] === undefined){
                return false
            }
        }
        if(city.population < 0){
            return false
        }
        if(city.name < 3 || city.country < 3){
            return false
        }
        return true
    },
    creatCity: async function(city){
        try{

            let builder = new CityBuilder()
            let cityBuilded = builder.setCountry(city.country).setLatitude(city.latitude).setLongitude(city.longitude).setName(city.name).setPopulation(city.population).build()
            let CreatedCity = await City.create(cityBuilded)
            if(CreatedCity != null){
                cache.del('cities_cache');
                let Cities = await City.findAll()
                Cities = Cities.map(city => city.toJSON())
                cache.set('cities_cache',Cities)
                return {status: 200, msg: 'City inserted!: '}
            }

            return {status: 400, msg: 'City was not created!'}

        }catch(err){
            return {status: 400, msg: 'A problem ocurred while creating the city: ' + err.message}
        }
    },
    deleteCity: async function(id){
        try{
            if(!id){
                return {status:400, msg: 'ID not informed'}
            }

            let removedCity = await City.destroy({where: {id:id}})
            if(removedCity){
                cache.del('cities_cache');
                let Cities = await City.findAll()
                Cities = Cities.map(city => city.toJSON())
                cache.set('cities_cache',Cities)
                return {status:200, msg:'The city was removed'}
            } else {
                return {status:300, msg:'ID informed is not registered'}
            }
        }catch(err){
            return {status:400, msg: 'A problem ocurred while deleting the city' + err.message}
        }
    }

}