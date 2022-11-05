const { Router } = require("express");
const { partidGet, partidaPost } = require("../controllers/partida");


const router = Router()

router.get('/', partidGet)
router.post('/', partidaPost)

module.exports = router