import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRequest from './models/JobRequest.js';

dotenv.config();

const sampleJobs = [
  {
    title: "Emergency Plumber for Kitchen Sink Leak",
    description: "The PVC pipe beneath the kitchen sink has cracked and water is leaking onto the kitchen floor. Need an experienced plumber urgently to replace the pipe segment and seals.",
    category: "Plumbing",
    location: "Colombo 03",
    contactName: "Chaminda Perera",
    contactEmail: "chaminda.p@example.com",
    status: "Open"
  },
  {
    title: "Main Trip Switch Tripping Intermittently",
    description: "The main trip switch (RCD) in the distribution board keeps tripping whenever the master bedroom AC or the kitchen microwave is turned on. Requires an electrician for fault finding.",
    category: "Electrical",
    location: "Kandy",
    contactName: "Nilmini Silva",
    contactEmail: "nilmini.s@example.com",
    status: "In Progress"
  },
  {
    title: "Living Room & Verandah Painting",
    description: "Looking for a neat painter to repaint a large living room ceiling and the front verandah walls. Weathercoat and emulsion paint will be provided. Looking to start this weekend.",
    category: "Painting",
    location: "Gampaha",
    contactName: "Roshan Fernando",
    contactEmail: "roshan.f@example.com",
    status: "Open"
  },
  {
    title: "Kitchen Pantry Cupboard Door Repair",
    description: "The hinges on the wooden kitchen pantry cupboard have rusted due to moisture, and one door has completely dropped. Needs new hinges fixed and minor alignment.",
    category: "Joinery",
    location: "Galle",
    contactName: "Suresh Jayasinghe",
    contactEmail: "suresh.j@example.com",
    status: "Closed"
  },
  {
    title: "Bespoke Wooden TV Console Unit",
    description: "Wanting a custom floating wooden TV console unit built and mounted on the main living room wall. Material preferences (Teak or Mahogany) and dimensions can be discussed.",
    category: "Joinery",
    location: "Maharagama",
    contactName: "Thusitha Alwis",
    contactEmail: "thusitha.a@example.com",
    status: "Open"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // clear old data
    await JobRequest.deleteMany();
    console.log('🗑️ Existing job requests cleared.');

    // add new data
    await JobRequest.insertMany(sampleJobs);
    console.log('🌱 Database successfully seeded with 5 professional Sri Lankan sample jobs!');
    
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();