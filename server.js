import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan'; 
import jobRoutes from './routes/jobRoutes.js';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routes/authRouter.js';





if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json());

app.get('/', (req,res) => {
    res.send('salut')   
});

app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/auth', authRouter);

// Gestion des routes inexistantes
app.use('*', (req,res)=> { res.status(404).json({message : 'route inexistante'}); })

// Gestion des erreurs serveurs incompréhensibles
app.use(errorHandlerMiddleware);


const PORT= process.env.PORT || 5100; 



try {
  
  mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to the database');

  app.listen(PORT, () =>{console.log(`Listening the port ${PORT}`)});

} catch (error) {
  console.log(error); 
}




