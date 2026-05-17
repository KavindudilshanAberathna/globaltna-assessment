import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

import {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} from '../controllers/jobController.js';

const router = express.Router();

router.route('/').get(getJobs).post(protect,createJob);
router.route('/:id').get(getJobById).patch(updateJobStatus).delete(protect,deleteJob);

export default router;