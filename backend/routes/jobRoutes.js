import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJobById).patch(updateJobStatus).delete(deleteJob);

export default router;