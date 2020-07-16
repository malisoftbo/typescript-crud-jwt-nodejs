import express,{Application} from "express"
import authRoutes from "./routes/auth"
import morgan from "morgan"

const app:Application = express();

//settings

app.set('port',process.env.PORT || 3500)


//middlawares
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use("/api/auth",authRoutes)

export default app;
