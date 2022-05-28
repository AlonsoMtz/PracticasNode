const fs = require('fs');
const axios = require('axios');

//pk.eyJ1IjoiYWxvbnNvbXR6IiwiYSI6ImNsMHU0aG10NDB0czkza3FvYWd3cWg5eDYifQ.sXw8PlIFzTJpzJoGyIRbIg


class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get hitorialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }
    
    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        };
    }

    async ciudad( lugar = '' ) {

        try{
            //https://api.mapbox.com/geocoding/v5/mapbox.places/ottawa.json?proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYWxvbnNvbXR6IiwiYSI6ImNsMHU0aG10NDB0czkza3FvYWd3cWg5eDYifQ.sXw8PlIFzTJpzJoGyIRbIg
            //const resp = await axios.get('https://reqres.in/api/users?page=2');
    
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        }catch(error){

            return [];
        }
    }

    async climaLugar(lat, lon){

        try{

            //instance axios.create()
            const instance = axios.create({
                //baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                baseURL: `https://api.openweathermap.org/data/2.5/weather`, //&appid=b200eb1d51954264aef18804aaa4b797&units=metric&lang=es`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;
            
            //respuesta
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }

        }catch(error){
            console.log(error);
        }

    }

    agregarHistorial(lugar = ''){

        if(!this.historial.includes(lugar.toLowerCase())){
            this.historial.unshift(lugar.toLowerCase());
        }
        //grabar db
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return null;
        }
    
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
    
        this.historial = data.historial;
    }

}


module.exports = Busquedas;