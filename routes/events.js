// Todas tienen que pasar por la validación de JWT
// Events routes
const {Router} = require('express');
const { check } = require('express-validator');
const { crearEvento, actualizarEvento, eliminarEvento, getEventos } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);


// Crear un evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar Evento
router.put('/:id', 
    [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de fin es obligatoria').custom(isDate),
    validarCampos
    ],
    actualizarEvento);

// Eliminar evento
router.delete('/:id', eliminarEvento);


module.exports = router;