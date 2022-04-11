const { locationModel, weatherModel } = require('../models');

const { locationService, weatherService } = require('../services')


class WeatherController {

    /**
     * 
     * @param {*} req 
     * @param {*} res
     * @returns 
     */
    static async getLocation(req, res) {
        try {
            const { city, ...data } = await locationService.getLocationByApi(req);

            if (!city) {
                return res.status(404).json({
                    msg: "Su ubicación no pudo ser identificada por nuestro sistema."
                });
            }

            res.json({
                ubicacion: new locationModel(city, data.country_name, data.latitude, data.longitude)
            });

        } catch(err) {
            console.error(err.message ? err.message : 'Error interno')
            res.status(500).json({
                msg: err.message ? err.message : 'Error interno'
            });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getCurrentWeather(req, res) {
        try {
            
            
            let { city } = req.params;
            
            var { ...data } = await locationService.getLocationByApi(req);

            if (!city) {
                city = data.city;              
            }
           
            const { weather, main } = await weatherService.getWeather(city);
                     
            res.json({
                ubicacion: new locationModel(data.city, data.country_name, data.latitude, data.longitude),
                clima: new weatherModel(city, weather[0].description, main.temp_min, main.temp_max, main.temp, main.humidity)
            });

        } catch (msg) {
            res.status(404).json({
                error: true,
                msg
            });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async getWeekWeather(req, res) {
        try {
            let { city } = req.params;

            const { ...data } = await locationService.getLocationByApi(req);

            if (!city) {
                city = data.city;
            }

            const { list } = await weatherService.getWeather(city, 5, 'forecast');
            
            const weekClima = list.map((day, i) => ({
                    'dia': (i + 1),
                    'desc': day.weather[0].description,
                    'temp_min': day.main.temp_min,
                    'temp_max': day.main.temp_max,
                    'temp': day.main.temp,
                    'humedad': day.main.humidity
            })
            );
            
            res.status(200).json({
                ubicacion: new locationModel(data.city, data.country_name, data.latitude, data.longitude),
                clima: {
                    'ciudad': city, 
                    'pronosticoExtendido':weekClima
                }
            });

        } catch (msg) {

            res.status(404).json({
                error: true,
                msg
            });
        }
    }

}


module.exports = WeatherController;