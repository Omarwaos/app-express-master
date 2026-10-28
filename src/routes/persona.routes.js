const router = require('express').Router()
const c = require('../controllers/persona.controller')
const { route } = require('./auth.routes')

//RECUERDA:
//Las rutas requieren las funcionalidades en los controladores

router.get('/', c.list)       //listar
router.get('/:id',c.get)    //buscar
router.post('/', c.create)      //registrar
router.put('/:id', c.update)    //modificar
router.delete('/:id', c.remove) //elminar

module.exports = router