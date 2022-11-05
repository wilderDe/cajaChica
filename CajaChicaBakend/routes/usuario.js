
const { Router} = require('express')
const { usuarioPost, usuarioPut } = require('../controllers/usuario')


const router = Router()

router.post('/', usuarioPost)
router.put('/:id', usuarioPut)

module.exports = router