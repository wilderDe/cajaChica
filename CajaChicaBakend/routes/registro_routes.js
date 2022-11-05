const { Router } = require("express");
const registroController = require("../controllers/registro_controller");


const router = Router()


router.post('/', registroController)

module.exports = router