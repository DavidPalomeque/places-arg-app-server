const router = require("express").Router()
const placeCtrl = require("../controllers/placeController")

router.get("/places" , placeCtrl.getAllPlaces)
router.post("/places" , placeCtrl.addPlace)
router.get("/category/:category" , placeCtrl.getAllByCategory)
router.get("/places/:_id" , placeCtrl.getOneById)


module.exports = router