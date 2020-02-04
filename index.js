//MODULES
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

//INITIALIZATIONS
const app = express()
require('dotenv').config()
require("./database")

//SETTINGS
app.set("port" , process.env.PORT || 3029)

//MIDDLEWARES
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({origin : "https://places-arg-app-view.herokuapp.com"}))

// PUBLIC
app.use( express.static(__dirname + "/client" ) )

//ROUTES
app.use(require("./routes/userRouter"))
app.use(require("./routes/placeRouter"))

//SERVER
app.listen(app.get("port") , () => {
    console.log("Server on port " + app.get("port"))
})
