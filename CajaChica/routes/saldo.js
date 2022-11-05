const { Router } = require("express");
const { saldoPost, ultimoSaldo, saldoGet } = require("../controllers/saldo");


const router = Router()

router.get('/',saldoGet)
router.post('/', saldoPost)

module.exports = router