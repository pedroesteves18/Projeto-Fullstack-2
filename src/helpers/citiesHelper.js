
import City from "../models/City.js"
import CityBuilder from "../models/City/CityBuilder.js"
import {Op} from 'sequelize'

export default {
    listCities: async function(){
        try{
            let cities = await City.findAll()
            return {cities:cities,status:300,msg:'Cities listed'}
        }catch(err){
            return {status:500,msg:'An error ocurred'}
        }
        
    },
    listCity: async function(name){
        try{
            if(!name || name.length < 3){
                return {status: 400, msg: 'The amount of characters must be greater than 3!'}
            }else {
                let cities = await City.findAll({
                                                    where:{
                                                        name: {
                                                                [Op.like]:`${name}%`
                                                        }
                                                    },
                                                    order: [['population','DESC']]
                                                })
                if(cities.length > 0){
                    console.log(cities)
                    return {status: 200, msg: cities}
                } else {
                    return {status: 300, msg:'Cities with this name or characters were not found!'}
                }
                
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
                return {status:200, msg:'The city was removed'}
            } else {
                return {status:300, msg:'ID informed is not registered'}
            }
        }catch(err){
            return {status:400, msg: 'A problem ocurred while deleting the city' + err.message}
        }
    }

}