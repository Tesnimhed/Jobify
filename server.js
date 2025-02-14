import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan'; 
import { nanoid } from 'nanoid';




let jobs= [
{id: nanoid(), company: 'google', position: 'qa tester'},    
{id: nanoid(), company: 'youtube', position: 'frontend developer'},    
];

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json());

// Get all jobs
app.get('/api/v1/jobs', (req,res)=>{  res.status(200).json({jobs})   })

// Create a new job
app.post('/api/v1/jobs', (req,res)=>{  

const {company, position}= req.body; 

if(!company || !position){
    res.status(400).json({ message : 'Veuillez nous envoyer l entreprise et la position'});
    return;
}

const id = nanoid(10); 
const newJob= {id,company,position}; 

jobs.push(newJob); 

res.status(201).json({jobs}); 
})


const PORT= process.env.PORT || 5100; 
app.get('/', (req,res) => {  res.send('salut')   });

app.listen(PORT, () =>{console.log(`Listening the port ${PORT}`)});