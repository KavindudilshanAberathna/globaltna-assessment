import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  contactName: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// "jobRequests" ලෙස collection name එක හරියටම හැදෙන බව තහවුරු කිරීමට තුන්වන parameter එක භාවිතා කිරීම
const JobRequest = mongoose.model('JobRequest', jobRequestSchema, 'jobRequests');

export default JobRequest;