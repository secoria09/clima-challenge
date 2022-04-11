

class WeatherModel {

    constructor(city, desc, temp_min, temp_max, temp, humedad) {
        this.ciudad = city,
        this.desc = desc,
        this.temp_min = temp_min,
        this.temp_max = temp_max,
        this.temp = temp,
        this.humedad = humedad
    }
}

module.exports = WeatherModel;