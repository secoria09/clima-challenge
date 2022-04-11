
const { Router } = require('express');
const { check } = require('express-validator');
const { weatherController } = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.get('/location', weatherController.getLocation);

router.get('/current/:city?',[
    check('city', 'Debe ingresar minimo de 3 caracteres.').optional().isLength({min:3}),
    check('city', 'No se permite ingresar números.').optional().isAlpha(),
    validateFields
], weatherController.getCurrentWeather);

router.get('/forecast/:city?', [
    check('city', 'Debe ingresar minimo de 3 caracteres.').optional().isLength({min:3}),
    check('city', 'No se permite ingresar números.').optional().isAlpha(),
    validateFields
], weatherController.getWeekWeather);


module.exports = router;