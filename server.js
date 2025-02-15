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

// Get One Job
app.get('/api/v1/jobs/:id', (req,res)=>{  

const {id}=req.params;
const job=jobs.find((i)=>i.id==id)

if(!job){ return res.status(404).json({message: 'Job not Found'}); }

res.status(201).json(job);

})

// Delete One job
app.delete('/api/v1/jobs/:id', (req,res)=> {
    const {id} = req.params; 
    const job=jobs.find((i)=>i.id==id)
    if(!job){ return res.status(404).json({message: 'Job not Found'}); }

  const newjob= jobs.filter((i)=>i.id != id); 
//   jobs={...newjob}; 
  jobs=newjob; 
  res.status(200).json({message: 'Job deleted'}); 
})

// Patch : Modification Partielle des informations
app.patch('/api/v1/jobs/:id', (req,res)=>{
    const {id} = req.params; 
    const {company,position} = req.body; 
    const job=jobs.find((i)=>i.id==id)
    if(!job){ return res.status(404).json({message: 'Job not Found'}); }

    if(!company || !position){
        res.status(400).json({message:" veuillez envoyer companie et position"});
    }

    job.company = company; 
    job.position = position; 
    res.status(201).json(job); 
})

// Gestion des routes inexistantes
app.use('*', (req,res)=> { res.status(404).json({message : 'route inexistante'}); })

// Gestion des erreurs serveurs incompréhensibles
app.use((error,req,res,next)=> { res.status(500).json({message: 'something went wrong'}); })


const PORT= process.env.PORT || 5100; 
app.get('/', (req,res) => {  res.send('salut')   });

app.listen(PORT, () =>{console.log(`Listening the port ${PORT}`)});