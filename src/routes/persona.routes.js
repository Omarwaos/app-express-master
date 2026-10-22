const router = require('express').Router()
const c = require('../controllers/persona.controller')
const { route } = require('./auth.routes')

//RECUERDA:
//Las rutas requieren las funcionalidades en los controladores

router.get('/')       //listar
router.get('/:id')    //buscar
router.post('/')      //registrar
router.put('/:id')    //modificar
router.delete('/:id') //elminar

module.exports = router