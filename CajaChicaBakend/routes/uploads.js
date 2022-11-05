const { Router } = require("express");
const { actualizarImagenCloudinary } = require("../controllers/uploads");


const router = Router()

router.put('/:id', actualizarImagenCloudinary)

module.exports = router