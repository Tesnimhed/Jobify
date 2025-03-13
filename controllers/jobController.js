import Job from '../models/jobModel.js'

import { nanoid } from "nanoid";


let jobs= [
    {id: nanoid(), company: 'google', position: 'qa tester'},    
    {id: nanoid(), company: 'youtube', position: 'frontend developer'},    
    ];


export const getJobs = (req,res)=>{
    res.status(200).json({jobs})
}

export const createJob = (req,res)=>{
    const {company, position}= req.body; 

    if(!company || !position){
        res.status(400).json({ message : 'Veuillez nous envoyer l entreprise et la position'});
        return;
    }

    const id = nanoid(10); 
    const newJob= {id,company,position}; 

    jobs.push(newJob); 

    res.status(201).json({jobs}); 
}


export const getJob = (req,res)=>{
    const {id}=req.params;
    const job=jobs.find((i)=>i.id==id)

    if(!job){ return res.status(404).json({message: 'Job not Found'}); }

    res.status(201).json(job);

}


export const deleteJob = (req,res)=>{
    const {id} = req.params; 
    const job=jobs.find((i)=>i.id==id)
    if(!job){ return res.status(404).json({message: 'Job not Found'}); }

    const newjob= jobs.filter((i)=>i.id != id); 
    jobs=newjob; 
    res.status(200).json({message: 'Job deleted'}); 
}


export const updateJob = (req,res)=>{
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
}

