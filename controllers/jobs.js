import Job from  "../models/jobs.js"
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError, NotFoundError } from "../errors/index.js";

export const getAllJobs = async (req, res) => {
    const jobList = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({
        jobList, count:jobList.length, success: true
    })
}

export const getJob = async (req, res) => {
    const {user: { userId }, params: {id: jobId}} = req
    const job = await Job.findOne({
        _id: jobId, createdBy: userId
    })
    if(!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.json({job})
}

export const updateJob = async (req, res) => {
    const {user: { userId }, params: { id: jobId }, body: {company, position}} = req
    if(company === '' || position === ''){
        throw new BadRequest('Company and position must be provided')
    }
    const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true})

    if(!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
    res.status(StatusCodes.OK).json({})
}

export const deleteJob = async (req, res) => {
    const {user: { userId }, params: { id: jobId }, body: {company, position}} = req

    const job = await Job.findByIdAndRemove({
_id: jobId, createdBy: userId
    })
    if(!job){
        throw new NotFoundError(`No job with the id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}