import JobRequest from '../models/JobRequest.js';

// @desc    Get all jobs (with category and status filters)
// @route   GET /api/jobs
export const getJobs = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;

    const jobs = await JobRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job
// @route   GET /api/jobs/:id
export const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job request
// @route   POST /api/jobs
export const createJob = async (req, res, next) => {
  try {
    const job = await JobRequest.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Update job status only
// @route   PATCH /api/jobs/:id
export const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    // only Status update 
    if (!status) {
      res.status(400);
      throw new Error('Please provide a status to update');
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    
    if (!job) {
      res.status(404);
      throw new Error('Job request not found');
    }

    res.status(200).json({ message: 'Job request deleted successfully' });
  } catch (error) {
    next(error);
  }
};