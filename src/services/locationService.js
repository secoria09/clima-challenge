const axios = require('axios');


class LocationService {

    static async getLocationByApi(req, res) {
        try {
            
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            
            if (!ip) {
                return res.status(404).json({
                    msg: "No se pudo encontrar datos para su busqueda, no pudimos identificar su ubicación."
                });
            }
            const {data} = await axios.get(`http://api.ipapi.com/api/${ ip }?access_key=${ process.env.API_KEY_IPAPI }`);
    
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

module.exports = LocationService;