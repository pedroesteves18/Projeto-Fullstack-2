import CityModel from './CityModel.js';

export default class CityBuilder extends CityModel {
    constructor(){
        super()
        this.city = new CityModel()
    }

    setName(name){
        this.city.name = name
        return this
    }

    setPopulation(population){
        this.city.population = population
        return this
    }

    setLatitude(latitude){
        this.city.latitude = latitude
        return this
    }

    setLongitude(longitude){
        this.city.longitude = longitude
        return this
    }

    setCountry(country){
        this.city.country = country
        return this
    }

    build(){
        return this.city
    }
}