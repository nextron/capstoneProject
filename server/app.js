import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.mjs';
import categoryRouter from './routes/categoriesRoutes.mjs';
import postRouter from './routes/postRoutes.mjs';
const app = express();

///creating database connection///
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))
/////End Creating database connection////

app.use(express.json());
//Routes
app.use('/user/', userRouter);
app.use('/category/', categoryRouter);
app.use('/post/', postRouter);

///Initialising Server at desired port///
app.listen(process.env.PORT, function () {
    console.log("server is running on port: " + process.env.PORT)
})
