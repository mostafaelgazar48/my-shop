const mongoose= require("mongoose");

    try {
         mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,

        })
        console.log(` successfully connected to database`)

    }catch (err){
        console.log(err.message)
        process.exit(1)
    }
