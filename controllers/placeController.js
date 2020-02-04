const placeCtrl = {}
const Places = require("../models/placeModel")

// ADD A PLACE TO THE APP
placeCtrl.addPlace = async(req , res) => { // only for use it in postman (only in development)
    const { name , description , image , category , images} = req.body 

    if (!name || !description || !image || !category || !images) {
        res.json("All the fields have to be complete !")
    } else {
        if (description.length > 450) {
            res.json("The description can´t be longer than 450 characters !")
        } else {
            const place = new Places({
                name : name,
                description : description,
                image : image,
                category : category,
                images : images
            })
            place.save()
             .then(place => {
                 res.status(200).send({place})
             })
             .catch(err => {
                 console.log(err)
             })       
        }
    }
}

// GET ALL PLACES
placeCtrl.getAllPlaces = async(req , res) => {
    const mysort = {name : 1}
    const places = await Places.find().sort(mysort)
    res.status(200).send({places})
}

// GET ALL PLACES BY CATEGORY
placeCtrl.getAllByCategory = async(req , res) => {
    const category = req.params.category
    console.log(category);
    const mysort = {name : 1}
    const places = await Places.find({category : category}).sort(mysort)
    res.status(200).send({places})
}

//GET ONE BY ID 
placeCtrl.getOneById = async(req , res) => {
    const { _id } = req.params
    const place = await Places.findById(_id)
    res.status(200).send({place})
}

module.exports = placeCtrl