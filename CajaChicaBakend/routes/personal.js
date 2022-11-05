const { Router } = require("express");
const { personalGet, personalPost, personalPut, personalDelete, personalGetId } = require("../controllers/personal");


const router = Router()

router.get('/', personalGet)
router.get('/:id', personalGetId)
router.post('/', personalPost)
router.put('/:id', personalPut)
router.delete('/:id', personalDelete)


module.exports = router