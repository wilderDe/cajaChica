const { Router } = require("express");
const { registroPost, registroGet } = require("../controllers/registro");


const router = Router()

router.post('/', registroPost)
router.get('/',registroGet)

module.exports = router