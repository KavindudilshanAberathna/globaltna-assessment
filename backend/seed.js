import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobRequest from './models/JobRequest.js';
import User from './models/User.js';

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
  },
  {
    title: "Overhead Water Tank Leak Repair",
    description: "The overhead polyethylene water tank is leaking from the bottom connection valve, causing water to waste continuously. Need a plumber to patch the leak or replace the connector setup.",
    category: "Plumbing",
    location: "Negombo",
    contactName: "Asanka Wijesinghe",
    contactEmail: "asanka.w@example.com",
    status: "Open"
  },
  {
    title: "Ceiling Fan Installation & Regulator Wiring",
    description: "Need to install 3 new ceiling fans in the living room and bedrooms, along with wiring up the wall regulators securely. Hook points are already available on the slab.",
    category: "Electrical",
    location: "Malabe",
    contactName: "Dilini Gunaratne",
    contactEmail: "dilini.g@example.com",
    status: "Open"
  },
  {
    title: "Exterior Boundary Wall Weatherproofing",
    description: "Looking for an experienced painter to pressure-wash and apply a fresh coat of weatherproof exterior paint to a 60-foot front boundary wall to clear existing moss and fungus.",
    category: "Painting",
    location: "Kurunegala",
    contactName: "Mahela Bandara",
    contactEmail: "mahela.b@example.com",
    status: "In Progress"
  },
  {
    title: "Main Teak Entrance Door Alignment & Lock Fitting",
    description: "The main teak wood entrance door is scraping the tiled floor due to hinge sagging. Also need to replace the old door lock with a new secure mortise lock unit.",
    category: "Joinery",
    location: "Matara",
    contactName: "Kasun Rajapakse",
    contactEmail: "kasun.r@example.com",
    status: "Open"
  },
  {
    title: "Inverter Power Backup Troubleshooting",
    description: "The home inverter backup system is not automatically switching over during power cuts. Requires an experienced industrial electrician to check the changeover switch and battery charging circuit.",
    category: "Electrical",
    location: "Kalutara",
    contactName: "Sanduni Rathnayake",
    contactEmail: "sanduni.r@example.com",
    status: "Closed"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // clear old data
    await JobRequest.deleteMany();
    await User.deleteMany();
    
    await User.create({
      name: "Kavindu Dilshan",
      email: "admin@example.com",
      password: "admin123"
    });
    console.log('👤 Test User created ( admin@example.com / admin123)');
    console.log('🗑️ Existing job requests cleared.');

    // add new data
    await JobRequest.insertMany(sampleJobs);
    console.log('🌱 Database successfully seeded with 10 professional Sri Lankan sample jobs!');
    
    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();