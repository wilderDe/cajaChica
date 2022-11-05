const { Router } = require("express");
const { partidaPost, partidaGet, partidaPut } = require("../controllers/partida");


const router = Router()

router.post('/', partidaPost)
router.get('/',partidaGet)
router.put('/:id', partidaPut)
module.exports = router