import request from 'supertest';
import express from 'express';
import jobRoutes from '../routes/jobRoutes.js';
import JobRequest from '../models/JobRequest.js';

// Mongoose Model Mock
jest.mock('../models/JobRequest.js');

const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

describe('📊 Job Request API Unit Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jobs', () => {
    it('should fetch paginated jobs and return 200 status code', async () => {
      // Mock Data Create
      const mockJobs = [
        { title: 'Emergency Plumber', category: 'Plumbing', location: 'Colombo' },
        { title: 'Electrician Needed', category: 'Electrical', location: 'Kandy' }
      ];

      // Pagination Chain (find.sort.skip.limit) Mock 
      JobRequest.countDocuments.mockResolvedValue(2);
      JobRequest.find.mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          skip: jest.fn().mockImplementation(() => ({
            limit: jest.fn().mockResolvedValue(mockJobs)
          }))
        }))
      }));

      // Supertest Endpoint Request 
      const res = await request(app).get('/api/jobs?page=1&limit=6');

      // Assertions
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('jobs');
      expect(res.body).toHaveProperty('totalPages');
      expect(res.body.jobs.length).toBe(2);
      expect(res.body.jobs[0].title).toBe('Emergency Plumber');
    });
  });
});