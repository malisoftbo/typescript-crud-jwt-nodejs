import mongoose from "mongoose"

mongoose.connect(process.env.URLDB ||"mongodb://localhost/tcrudj",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})
.then(db=>{console.log("Base de datos conectado")})
.catch(err=>{console.log(err)})

