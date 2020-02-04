const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-pka7s.mongodb.net/test?retryWrites=true&w=majority` , {
    useNewUrlParser : true , 
    useUnifiedTopology : true
})
.then(db => console.log("DB is connected"))
.catch(err => console.log(err))