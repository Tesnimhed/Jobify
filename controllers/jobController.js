import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

export const getJobs = async (req,res)=>{
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({jobs})
}

export const createJob = async (req,res)=>{
    const {company, position}= req.body; 
    const newJob = await Job.create({company, position});
    res.status(StatusCodes.CREATED).json({newJob}); 
}

export const getJob = async(req,res)=>{
    const {id}=req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({job});
}


export const deleteJob = async (req,res)=>{
    const {id} = req.params; 
    const job=await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({message: 'Job deleted'}); 
}


export const updateJob = async (req,res)=>{
    const {id} = req.params; 
    const {company,position} = req.body; 
    const job=await Job.findByIdAndUpdate(id,{company,position},{new:true});
    res.status(StatusCodes.OK).json({job}); 
}

