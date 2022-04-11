const axios = require('axios');

const URL_API_WEATHER = 'https://api.openweathermap.org/data/2.5/';


class WeatherService {

    static async getWeather( city, cantDias = '', tipo = 'weather' ) {
    try{    
        const paramsOpenWeather = {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }

        const {data} = await axios.get(`${URL_API_WEATHER}${tipo}`,
                                { params: { ...paramsOpenWeather, 'q': city, 'cnt': cantDias }
        
                            });
    
        if(data.error) {
            console.error(`Error getting location data: ${data.error.info ? data.error.info : 'error desconocido'}`)
            throw new Error(`Error obteniendo ubicación data.error`)
        }

        return data;
    } catch(err) {
        console.error(err)
        throw new Error(err.message ? err.message : 'error obteniendo datos de la localización')
    }

    }
}

module.exports = WeatherService;