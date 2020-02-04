const mongoose = require("mongoose")
const {Schema} = mongoose

const Places = new Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    image : {type : String , required : true},
    category : {type : String , required : true},
    images : {type : Array , required : true}
})

module.exports = mongoose.model("Places" , Places)