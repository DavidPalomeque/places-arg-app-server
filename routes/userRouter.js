const router = require("express").Router()
const userCtrl = require("../controllers/userController")

router.post("/registration" , userCtrl.registration)
router.post("/login" , userCtrl.login)

module.exports = router