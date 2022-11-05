const { Router } = require("express");
const { usuarioPost, usuariosGet, usuarioGetId, usuarioPutId, busquedaUsuarios } = require("../controllers/usuario");

const router = Router()

router.post('/', usuarioPost)
router.get('/', usuariosGet)
router.get('/:usuario/:password', usuarioGetId)
router.get('/:termino', busquedaUsuarios)
router.put('/:id', usuarioPutId)
module.exports = router